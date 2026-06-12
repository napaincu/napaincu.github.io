<template>
  <section class="py-16 bg-white min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtLink
        :to="localePath('/news')"
        class="mb-6 inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-teal-700"
      >
        <Icon name="heroicons:arrow-left" class="mr-2 h-4 w-4" />
        {{ $t("news.backToList") }}
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
            <span
              v-if="newsItem.updatedAt"
              class="inline-flex items-center gap-1 text-teal-600"
            >
              <Icon name="heroicons:clock" class="h-4 w-4" />
              {{ $t("news.updatedLabel") }} {{ newsItem.updatedAt }}
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

        <div v-if="eventVideos.length" class="mt-10 border-t border-slate-100 pt-6">
          <h2 class="mb-4 text-xl font-bold text-slate-900">
            {{ $t("news.eventVideo") }}
          </h2>
          <div class="space-y-8">
            <div v-for="(video, index) in eventVideos" :key="video">
              <p
                v-if="eventVideos.length > 1"
                class="mb-2 text-sm font-semibold text-slate-600"
              >
                {{ $t("news.videoPart") }} {{ index + 1 }}
              </p>
              <div
                class="overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
              >
                <iframe
                  v-if="toYouTubeEmbedUrl(video)"
                  :src="toYouTubeEmbedUrl(video)"
                  class="aspect-video w-full"
                  :title="$t('news.youTubeTitle')"
                  frameborder="0"
                  allow="
                    accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture;
                    web-share;
                  "
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>

              <a
                :href="video"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-2 inline-flex items-center text-sm font-semibold text-teal-700 transition hover:text-teal-800"
              >
                {{ $t("news.watchOnYouTube") }}
                <Icon
                  name="heroicons:arrow-top-right-on-square"
                  class="ml-1.5 h-4 w-4"
                />
              </a>
            </div>
          </div>
        </div>

        <div
          v-if="newsItem.notesLink"
          class="mt-10 border-t border-slate-100 pt-6"
        >
          <a
            :href="newsItem.notesLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center rounded-lg border border-teal-600 px-5 py-2.5 font-medium text-teal-700 transition hover:bg-teal-50"
          >
            <Icon name="heroicons:document-text" class="mr-2 h-5 w-5" />
            {{ $t("news.notes") }}
          </a>
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
            {{ $t("news.externalLink") }}
            <Icon
              name="heroicons:arrow-top-right-on-square"
              class="ml-2 h-4 w-4"
            />
          </a>
        </div>
      </article>

      <div
        v-else-if="!pending"
        class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600"
      >
        {{ $t("news.notFound") }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();

const collection = computed(() => (locale.value === "en" ? "news_en" : "news"));

const { data: newsItem, pending } = await useAsyncData(
  () => `news-${route.path}`,
  () => queryCollection(collection.value).path(route.path).first(),
  { watch: [() => route.path] },
);

if (import.meta.server && (!newsItem.value || newsItem.value.draft)) {
  throw createError({
    statusCode: 404,
    statusMessage: t("news.notFound"),
  });
}

const canonicalUrl = computed(() => {
  const siteUrl = "https://napaincu.github.io";
  return `${siteUrl}${route.path}`;
});

const shortName = computed(() => t("project.shortName"));
const fallbackTitle = computed(() => t("news.meta.listTitle"));
const fallbackDesc = computed(() => t("news.meta.listDescription"));

useSeoMeta({
  title: () =>
    newsItem.value
      ? `${newsItem.value.title} - ${shortName.value}`
      : fallbackTitle.value,
  description: () => newsItem.value?.description ?? fallbackDesc.value,
  ogTitle: () => newsItem.value?.title ?? t("news.pageTitle"),
  ogDescription: () => newsItem.value?.description ?? fallbackDesc.value,
  ogImage: () => newsItem.value?.cover,
  ogUrl: () => canonicalUrl.value,
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl.value }],
});

// 活動影片：優先用 videos 陣列（多支），否則退回舊的單一 videoLink 欄位。
const eventVideos = computed(() => {
  const videos = newsItem.value?.videos;
  if (videos?.length) return videos;
  return newsItem.value?.videoLink ? [newsItem.value.videoLink] : [];
});

const statusLabel = (value: string) => {
  if (value === "upcoming") return t("news.status.upcoming");
  if (value === "ongoing") return t("news.status.ongoing");
  if (value === "past") return t("news.status.past");
  return value;
};

const toYouTubeEmbedUrl = (url?: string | null) => {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace(/^\/+/, "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return null;
  }

  return null;
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
