<template>
  <section class="py-16 bg-white min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtLink
        to="/news"
        class="mb-6 inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-teal-700"
      >
        <Icon name="heroicons:arrow-left" class="mr-2 h-4 w-4" />
        返回消息列表
      </NuxtLink>

      <article
        v-if="newsItem"
        class="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm"
      >
        <header class="mb-8 border-b border-slate-100 pb-6">
          <div class="mb-3 flex flex-wrap items-center gap-2 text-sm">
            <span
              class="rounded-md bg-teal-100 px-2.5 py-1 font-semibold text-teal-800"
            >
              {{ newsItem.category }}
            </span>
            <span class="text-slate-500">{{ newsItem.date }}</span>
            <span
              v-if="newsItem.status"
              class="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700"
            >
              {{ statusLabel(newsItem.status) }}
            </span>
          </div>

          <h1
            class="mb-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl"
          >
            {{ newsItem.title }}
          </h1>
          <p class="text-slate-600 leading-relaxed">
            {{ newsItem.description }}
          </p>

          <div v-if="newsItem.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in newsItem.tags"
              :key="tag"
              class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              #{{ tag }}
            </span>
          </div>
        </header>

        <img
          v-if="newsItem.cover"
          :src="newsItem.cover"
          :alt="newsItem.title"
          class="mb-8 h-auto w-full rounded-xl border border-slate-200"
        />

        <div class="news-content max-w-none">
          <ContentRenderer :value="newsItem" />
        </div>

        <div
          v-if="newsItem.externalLink"
          class="mt-10 border-t border-slate-100 pt-6"
        >
          <a
            :href="newsItem.externalLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center rounded-lg bg-teal-600 px-5 py-2.5 font-medium text-white transition hover:bg-teal-700"
          >
            前往外部連結
            <Icon
              name="heroicons:arrow-top-right-on-square"
              class="ml-2 h-4 w-4"
            />
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();

const slug = computed(() => {
  const rawSlug = route.params.slug;

  if (Array.isArray(rawSlug)) {
    return rawSlug.join("/");
  }

  return (rawSlug ?? "").toString().replace(/^\/+|\/+$/g, "");
});

const { data: newsItem } = await useAsyncData(`news-${slug.value}`, () =>
  queryCollection("news").path(`/news/${slug.value}`).first(),
);

if (!newsItem.value || newsItem.value.draft) {
  throw createError({
    statusCode: 404,
    statusMessage: "找不到這篇消息",
  });
}

const canonicalUrl = computed(() => {
  const siteUrl = "https://napaincu.github.io";
  return `${siteUrl}${route.path}`;
});

useSeoMeta({
  title: `${newsItem.value.title} - 前瞻AI人培`,
  description: newsItem.value.description,
  ogTitle: newsItem.value.title,
  ogDescription: newsItem.value.description,
  ogImage: newsItem.value.cover,
  ogUrl: canonicalUrl.value,
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl.value }],
});

const statusLabel = (value: string) => {
  if (value === "upcoming") return "即將開始";
  if (value === "ongoing") return "進行中";
  if (value === "past") return "已結束";
  return value;
};
</script>

<style scoped>
.news-content :deep(p) {
  margin: 0.9rem 0;
  line-height: 1.8;
  color: rgb(51 65 85);
}

.news-content :deep(h2) {
  margin: 1.6rem 0 0.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: rgb(15 23 42);
}

.news-content :deep(h3) {
  margin: 1.3rem 0 0.7rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  color: rgb(15 23 42);
}

.news-content :deep(ul),
.news-content :deep(ol) {
  margin: 0.9rem 0;
  padding-left: 1.4rem;
  color: rgb(51 65 85);
}

.news-content :deep(ul) {
  list-style: disc;
}

.news-content :deep(ol) {
  list-style: decimal;
}

.news-content :deep(li) {
  margin: 0.35rem 0;
  line-height: 1.75;
}

.news-content :deep(a) {
  color: rgb(13 148 136);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.news-content :deep(strong) {
  font-weight: 700;
  color: rgb(15 23 42);
}
</style>
