<template>
  <section class="min-h-screen bg-white py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <h1
          class="relative inline-block text-4xl font-bold text-[#004d80] after:mx-auto after:mt-2 after:block after:h-1 after:w-2/3 after:bg-blue-500 after:content-['']"
        >
          最新消息
        </h1>
      </div>

      <section>
        <div class="mb-6 flex items-center justify-between gap-4">
          <h2
            class="border-l-4 border-blue-500 pl-4 text-2xl font-bold text-slate-800"
          >
            消息列表
          </h2>

          <div
            class="inline-flex items-center rounded-xl border border-slate-300 bg-white p-1.5 shadow-sm"
            role="group"
            aria-label="顯示模式"
          >
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg transition"
              :class="
                viewMode === 'compact'
                  ? 'bg-teal-100 text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              "
              aria-label="條列模式"
              @click="viewMode = 'compact'"
            >
              <Icon name="heroicons:list-bullet" class="h-4 w-4" />
            </button>

            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg transition"
              :class="
                viewMode === 'detailed'
                  ? 'bg-teal-100 text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              "
              aria-label="圖片模式"
              @click="viewMode = 'detailed'"
            >
              <Icon name="heroicons:squares-2x2" class="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          v-if="pending"
          class="rounded-xl border border-slate-200 bg-white p-6 text-slate-600"
        >
          資料載入中...
        </div>
        <div
          v-else-if="error"
          class="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700"
        >
          消息資料讀取失敗，請稍後再試。
        </div>

        <template v-else-if="displayedNews.length">
          <div v-if="viewMode === 'compact'" class="space-y-4">
            <article
              v-for="item in displayedNews"
              :key="resolveNewsPath(item)"
              class="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div class="flex flex-col p-5 md:p-6">
                <div class="mb-2 flex flex-wrap items-center gap-2 text-xs">
                  <span
                    v-if="item.featured"
                    class="inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-semibold text-slate-900 shadow-sm"
                    style="background-color: #f59e0b !important"
                  >
                    <Icon
                      name="heroicons:star-solid"
                      class="h-3.5 w-3.5 text-slate-900"
                    />
                    置頂
                  </span>
                  <span
                    v-if="item.videoLink"
                    class="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-1 font-semibold text-rose-700"
                  >
                    <Icon
                      name="heroicons:play-circle-solid"
                      class="h-3.5 w-3.5"
                    />
                    影片
                  </span>
                  <span
                    class="rounded-md bg-slate-100 px-2 py-1 font-semibold text-slate-700"
                  >
                    {{ item.category }}
                  </span>
                  <span class="text-slate-400">{{
                    formatDate(item.date)
                  }}</span>
                </div>
                <NuxtLink
                  :to="resolveNewsPath(item)"
                  class="group inline-block"
                >
                  <h3
                    class="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-teal-700"
                  >
                    {{ item.title }}
                  </h3>
                </NuxtLink>

                <div class="mt-3 flex items-start justify-between gap-4">
                  <p
                    class="line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600"
                  >
                    {{ item.description }}
                  </p>

                  <NuxtLink
                    :to="resolveNewsPath(item)"
                    class="inline-flex shrink-0 items-center text-sm font-semibold text-teal-700 transition hover:text-teal-800"
                  >
                    閱讀更多
                    <Icon name="heroicons:arrow-right" class="ml-1.5 h-4 w-4" />
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>

          <div
            v-else
            class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            <article
              v-for="item in displayedNews"
              :key="resolveNewsPath(item)"
              class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <NuxtLink
                :to="resolveNewsPath(item)"
                class="flex h-72 items-center justify-center overflow-hidden bg-slate-100"
              >
                <img
                  v-if="item.cover"
                  :src="item.cover"
                  :alt="item.title"
                  class="h-full w-full object-contain p-2"
                />
                <div
                  v-else
                  class="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-slate-500"
                >
                  <Icon name="heroicons:newspaper" class="h-12 w-12" />
                </div>
              </NuxtLink>

              <div class="flex flex-1 flex-col p-5">
                <div class="mb-2 flex flex-wrap items-center gap-2 text-xs">
                  <span
                    v-if="item.featured"
                    class="inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-semibold text-slate-900 shadow-sm"
                    style="background-color: #f59e0b !important"
                  >
                    <Icon
                      name="heroicons:star-solid"
                      class="h-3.5 w-3.5 text-slate-900"
                    />
                    置頂
                  </span>
                  <span
                    v-if="item.videoLink"
                    class="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-1 font-semibold text-rose-700"
                  >
                    <Icon
                      name="heroicons:play-circle-solid"
                      class="h-3.5 w-3.5"
                    />
                    影片
                  </span>
                  <span
                    class="rounded-md bg-slate-100 px-2 py-1 font-semibold text-slate-700"
                  >
                    {{ item.category }}
                  </span>
                  <span class="text-slate-400">{{
                    formatDate(item.date)
                  }}</span>
                </div>

                <NuxtLink
                  :to="resolveNewsPath(item)"
                  class="group inline-block"
                >
                  <h3
                    class="line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-snug text-slate-900 transition group-hover:text-teal-700"
                  >
                    {{ item.title }}
                  </h3>
                </NuxtLink>

                <p
                  class="mt-2 line-clamp-3 min-h-[5.25rem] text-sm leading-relaxed text-slate-600"
                >
                  {{ item.description }}
                </p>

                <div class="mt-auto flex justify-end pt-4">
                  <NuxtLink
                    :to="resolveNewsPath(item)"
                    class="inline-flex items-center text-sm font-semibold text-teal-700 transition hover:text-teal-800"
                  >
                    閱讀更多
                    <Icon name="heroicons:arrow-right" class="ml-1.5 h-4 w-4" />
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>
        </template>

        <div
          v-else
          class="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500"
        >
          目前沒有可顯示的消息。
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

const STORAGE_KEY = "news:viewMode";

const {
  data: newsData,
  pending,
  error,
} = await useAsyncData("news-list", () =>
  queryCollection("news").order("date", "DESC").all(),
);

const viewMode = ref<"compact" | "detailed">("detailed");

onMounted(() => {
  const savedMode = localStorage.getItem(STORAGE_KEY);
  if (savedMode === "compact" || savedMode === "detailed") {
    viewMode.value = savedMode;
  }
});

watch(viewMode, (mode) => {
  localStorage.setItem(STORAGE_KEY, mode);
});

const allNews = computed(() => {
  return (newsData.value ?? []).filter((item) => !item.draft);
});

const displayedNews = computed(() => {
  return [...allNews.value].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    return b.date.localeCompare(a.date);
  });
});

const resolveNewsPath = (item: {
  path?: string | null;
  stem?: string | null;
}) => {
  if (item.path && item.path.trim()) {
    return item.path;
  }

  if (item.stem && item.stem.trim()) {
    const normalizedStem = item.stem.replace(/^news\//, "");
    return `/news/${normalizedStem}`;
  }

  return "/news";
};

const formatDate = (value: string) => value;

useSeoMeta({
  title: "最新消息 - 前瞻AI人培",
  description: "前瞻AI人培計畫最新消息列表，提供可分享的活動與公告資訊。",
});
</script>
