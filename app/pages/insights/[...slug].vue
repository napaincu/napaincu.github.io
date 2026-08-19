<template>
  <section class="min-h-screen bg-white py-20">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <NuxtLink
        :to="localePath('/insights')"
        class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-teal-700 transition hover:text-teal-800"
      >
        <Icon name="heroicons:arrow-left" class="h-4 w-4" />
        {{ $t("insights.backToList") }}
      </NuxtLink>

      <div
        v-if="pending"
        class="rounded-xl border border-slate-200 bg-white p-6 text-slate-600"
      >
        {{ $t("insights.loading") }}
      </div>

      <article v-else-if="item" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <div class="mb-4 flex flex-wrap items-center gap-2 text-xs">
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

        <h1 class="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
          {{ item.title }}
        </h1>

        <p
          v-if="item.author || item.affiliation"
          class="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600"
        >
          <Icon name="heroicons:user-circle" class="h-5 w-5 flex-shrink-0 text-slate-400" />
          <span>{{ [item.author, item.affiliation].filter(Boolean).join(" · ") }}</span>
        </p>

        <!-- 知識型長文：行距與標題間距都比活動公告放寬，適合久讀 -->
        <div class="insight-content mt-8 max-w-none">
          <ContentRenderer :value="item" />
        </div>

        <div
          v-if="item.tags?.length"
          class="mt-10 flex flex-wrap gap-2 border-t border-slate-200 pt-6"
        >
          <span
            v-for="tag in item.tags"
            :key="tag"
            class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            #{{ tag }}
          </span>
        </div>
      </article>

      <div
        v-else
        class="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-500"
      >
        {{ $t("insights.notFound") }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();

const AUDIENCE_CHIP: Record<string, string> = {
  application: "bg-sky-100 text-sky-800",
  developer: "bg-violet-100 text-violet-800",
  researcher: "bg-emerald-100 text-emerald-800",
};

const collection = computed(() =>
  locale.value === "en" ? "insights_en" : "insights",
);

const { data: item, pending } = await useAsyncData(
  () => `insights-${route.path}`,
  () => queryCollection(collection.value).path(route.path).first(),
  { watch: [() => route.path] },
);

if (import.meta.server && (!item.value || item.value.draft)) {
  throw createError({ statusCode: 404, statusMessage: t("insights.notFound") });
}

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(
    locale.value === "en" ? "en-US" : "zh-TW",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

const shortName = computed(() => t("project.shortName"));

useSeoMeta({
  title: () =>
    item.value
      ? `${item.value.title} - ${shortName.value}`
      : t("insights.meta.listTitle"),
  description: () => item.value?.description ?? t("insights.meta.listDescription"),
  ogTitle: () => item.value?.title ?? t("insights.pageTitle"),
  ogDescription: () => item.value?.description ?? t("insights.meta.listDescription"),
});
</script>

<style scoped>
/* 沿用消息文章頁的做法（專案未安裝 tailwind typography），
   但行距與段落間距放寬，因為這裡是知識型長文而非短篇公告。 */
.insight-content :deep(p) {
  margin: 1.15rem 0;
  line-height: 1.95;
  color: rgb(51 65 85);
}

.insight-content :deep(h2) {
  margin: 2.4rem 0 0.9rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.35;
  color: #004d80;
}

.insight-content :deep(h3) {
  margin: 1.8rem 0 0.7rem;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.4;
  color: rgb(15 23 42);
}

.insight-content :deep(ul),
.insight-content :deep(ol) {
  margin: 1.1rem 0;
  padding-left: 1.4rem;
  color: rgb(51 65 85);
}

.insight-content :deep(ul) {
  list-style: disc;
}

.insight-content :deep(ol) {
  list-style: decimal;
}

.insight-content :deep(li) {
  margin: 0.45rem 0;
  line-height: 1.9;
}

.insight-content :deep(a) {
  color: rgb(13 148 136);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.insight-content :deep(strong) {
  font-weight: 700;
  color: rgb(15 23 42);
}

.insight-content :deep(code) {
  border-radius: 0.25rem;
  background-color: rgb(241 245 249);
  padding: 0.1rem 0.35rem;
  font-size: 0.9em;
  color: rgb(15 76 129);
}

.insight-content :deep(blockquote) {
  margin: 1.3rem 0;
  border-left: 3px solid rgb(153 246 228);
  padding-left: 1rem;
  color: rgb(71 85 105);
}
</style>
