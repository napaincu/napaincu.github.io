<template>
  <section class="min-h-screen bg-white py-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="mb-10 text-center">
        <h1
          class="relative inline-block text-4xl font-bold text-[#004d80] after:mx-auto after:mt-2 after:block after:h-1 after:w-2/3 after:bg-blue-500 after:content-['']"
        >
          {{ $t("insights.pageTitle") }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          {{ $t("insights.subtitle") }}
        </p>
      </div>

      <!-- 依身分篩選：文章沒有圖片，這排籌碼同時也是頁面的視覺起點 -->
      <div class="mb-8 flex flex-wrap items-center justify-center gap-2">
        <span class="mr-1 text-sm text-slate-500">{{ $t("insights.filterHint") }}</span>
        <button
          type="button"
          class="rounded-full border px-4 py-1.5 text-sm font-medium transition"
          :class="
            activeAudience === null
              ? 'border-slate-800 bg-slate-800 text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          "
          @click="activeAudience = null"
        >
          {{ $t("insights.filterAll") }}
        </button>
        <button
          v-for="a in AUDIENCES"
          :key="a"
          type="button"
          class="rounded-full border px-4 py-1.5 text-sm font-medium transition"
          :class="
            activeAudience === a
              ? AUDIENCE_ACTIVE[a]
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          "
          :title="$t(`insights.audienceDesc.${a}`)"
          @click="activeAudience = a"
        >
          {{ $t(`insights.audiences.${a}`) }}
        </button>
      </div>

      <div
        v-if="pending"
        class="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600"
      >
        {{ $t("insights.loading") }}
      </div>
      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700"
      >
        {{ $t("insights.error") }}
      </div>

      <div v-else-if="displayed.length" data-landmark="insights" class="space-y-4">
        <NuxtLink
          v-for="item in displayed"
          :key="item.path"
          :to="item.path"
          class="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md md:p-6"
        >
          <div class="mb-2 flex flex-wrap items-center gap-2 text-xs">
            <span
              v-for="a in item.audiences"
              :key="a"
              class="rounded-md px-2 py-1 font-semibold"
              :class="AUDIENCE_CHIP[a]"
            >
              {{ $t(`insights.audiences.${a}`) }}
            </span>
            <span class="text-slate-400">{{ formatDate(item.date) }}</span>
            <span
              v-if="item.updatedAt"
              class="inline-flex items-center gap-1 text-teal-600"
            >
              <Icon name="heroicons:clock" class="h-3.5 w-3.5" />
              {{ $t("insights.updatedLabel") }} {{ formatDate(item.updatedAt) }}
            </span>
          </div>

          <h2
            class="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-teal-700"
          >
            {{ item.title }}
          </h2>

          <p class="mt-2 leading-relaxed text-slate-600">
            {{ item.description }}
          </p>

          <p
            v-if="item.author || item.affiliation"
            class="mt-3 flex items-center gap-1.5 text-sm text-slate-500"
          >
            <Icon name="heroicons:user-circle" class="h-4 w-4 flex-shrink-0" />
            <span>{{ [item.author, item.affiliation].filter(Boolean).join(" · ") }}</span>
          </p>
        </NuxtLink>
      </div>

      <div
        v-else
        class="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-500"
      >
        {{ activeAudience ? $t("insights.noMatch") : $t("insights.empty") }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const AUDIENCES = ["application", "developer", "researcher"] as const;
type Audience = (typeof AUDIENCES)[number];

// 每個受眾一個色系；標籤本身有文字，顏色只是輔助，不是唯一的識別管道
const AUDIENCE_CHIP: Record<Audience, string> = {
  application: "bg-sky-100 text-sky-800",
  developer: "bg-violet-100 text-violet-800",
  researcher: "bg-emerald-100 text-emerald-800",
};
const AUDIENCE_ACTIVE: Record<Audience, string> = {
  application: "border-sky-600 bg-sky-600 text-white",
  developer: "border-violet-600 bg-violet-600 text-white",
  researcher: "border-emerald-600 bg-emerald-600 text-white",
};

const activeAudience = ref<Audience | null>(null);

const collection = computed(() =>
  locale.value === "en" ? "insights_en" : "insights",
);

const {
  data: items,
  pending,
  error,
} = await useAsyncData(
  () => `insights-list-${locale.value}`,
  () => queryCollection(collection.value).order("date", "DESC").all(),
  { watch: [collection] },
);

const displayed = computed(() => {
  const list = (items.value ?? []).filter((i) => !i.draft);
  if (!activeAudience.value) return list;
  return list.filter((i) => i.audiences?.includes(activeAudience.value!));
});

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(
    locale.value === "en" ? "en-US" : "zh-TW",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

useSeoMeta({
  title: () => t("insights.meta.listTitle") + " - " + t("project.shortName"),
  description: () => t("insights.meta.listDescription"),
  ogTitle: () => t("insights.meta.listTitle"),
  ogDescription: () => t("insights.meta.listDescription"),
});
</script>
