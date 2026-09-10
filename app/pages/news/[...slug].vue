<template>
  <div class="min-h-screen bg-slate-50">
    <template v-if="newsItem">
      <!-- 滿版標題區：與前沿新知同一套骨架，兩種文章頁看起來是同一個網站 -->
      <header class="border-b border-slate-200 bg-white">
        <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <NuxtLink
            :to="localePath('/news')"
            class="inline-flex items-center gap-2 text-sm font-medium text-teal-700 transition hover:text-teal-800"
          >
            <Icon name="heroicons:arrow-left" class="h-4 w-4" />
            {{ $t("news.backToList") }}
          </NuxtLink>

          <div class="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <span
              class="rounded-md bg-teal-100 px-2.5 py-1 font-semibold text-teal-800"
            >
              {{ newsItem.category }}
            </span>
            <span class="text-slate-500">{{ newsItem.date }}</span>
            <span
              v-if="newsItem.status"
              class="rounded-md px-2.5 py-1 font-medium"
              :class="STATUS_CHIP[newsItem.status] ?? 'bg-slate-100 text-slate-700'"
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
            class="mt-4 max-w-5xl text-3xl/[1.35] font-bold text-slate-900 md:text-4xl/[1.35] lg:text-[2.75rem]/[1.35]"
          >
            {{ newsItem.title }}
          </h1>

          <p class="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            {{ newsItem.description }}
          </p>

          <div v-if="newsItem.tags?.length" class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="tag in newsItem.tags"
              :key="tag"
              class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </header>

      <div class="mx-auto flex max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <!-- 左欄：目錄 -->
        <aside v-if="toc.length" class="hidden w-56 shrink-0 lg:block">
          <nav class="sticky top-24" :aria-label="$t('insights.toc')">
            <p
              class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              {{ $t("insights.toc") }}
            </p>
            <ul class="space-y-1 border-l border-slate-200">
              <li v-for="link in toc" :key="link.id">
                <a
                  :href="`#${link.id}`"
                  class="-ml-px block border-l-2 py-1.5 pl-4 text-sm transition"
                  :class="
                    activeId === link.id
                      ? 'border-teal-500 font-semibold text-teal-700'
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800'
                  "
                  :aria-current="activeId === link.id ? 'true' : undefined"
                >
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <article
          ref="articleEl"
          class="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"
        >
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
        </article>

        <!-- 右欄：活動資訊卡。報名與簡報連結原本壓在長文最底下，
             捲不到底就看不到，這裡改成跟著捲動固定在側邊 -->
        <aside class="hidden w-64 shrink-0 xl:block">
          <div class="sticky top-24 space-y-6">
            <div class="rounded-2xl border border-slate-200 bg-white p-5">
              <p
                class="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                {{ $t("news.eventInfo") }}
              </p>

              <dl class="space-y-3 text-sm">
                <div class="flex items-start gap-2">
                  <Icon
                    name="heroicons:calendar-days"
                    class="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                  />
                  <dd class="text-slate-700">{{ newsItem.date }}</dd>
                </div>
                <div v-if="newsItem.status" class="flex items-start gap-2">
                  <Icon
                    name="heroicons:flag"
                    class="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                  />
                  <dd class="text-slate-700">
                    {{ statusLabel(newsItem.status) }}
                  </dd>
                </div>
              </dl>

              <div
                v-if="newsItem.externalLink || newsItem.notesLink"
                class="mt-5 space-y-2 border-t border-slate-100 pt-5"
              >
                <a
                  v-if="newsItem.externalLink"
                  :href="newsItem.externalLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                >
                  {{ $t("news.externalLink") }}
                  <Icon
                    name="heroicons:arrow-top-right-on-square"
                    class="h-4 w-4"
                  />
                </a>
                <a
                  v-if="newsItem.notesLink"
                  :href="newsItem.notesLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 rounded-lg border border-teal-600 px-4 py-2.5 text-sm font-medium text-teal-700 transition hover:bg-teal-50"
                >
                  <Icon name="heroicons:document-text" class="h-4 w-4" />
                  {{ $t("news.notes") }}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- 窄螢幕沒有右欄，行動裝置上把報名／簡報按鈕補在文章後面 -->
      <div
        v-if="newsItem.externalLink || newsItem.notesLink"
        class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 xl:hidden"
      >
        <div class="flex flex-wrap gap-3">
          <a
            v-if="newsItem.externalLink"
            :href="newsItem.externalLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 font-medium text-white transition hover:bg-teal-700"
          >
            {{ $t("news.externalLink") }}
            <Icon name="heroicons:arrow-top-right-on-square" class="h-4 w-4" />
          </a>
          <a
            v-if="newsItem.notesLink"
            :href="newsItem.notesLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg border border-teal-600 px-5 py-2.5 font-medium text-teal-700 transition hover:bg-teal-50"
          >
            <Icon name="heroicons:document-text" class="h-5 w-5" />
            {{ $t("news.notes") }}
          </a>
        </div>
      </div>

      <!-- 底部：其他消息 -->
      <section
        v-if="moreNews.length"
        class="border-t border-slate-200 bg-white py-14"
      >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="mb-6 text-xl font-bold text-slate-900">
            {{ $t("news.moreNews") }}
          </h2>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <NuxtLink
              v-for="post in moreNews"
              :key="post.path"
              :to="post.path"
              class="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
            >
              <div class="mb-2 flex items-center gap-2 text-xs">
                <span
                  class="rounded bg-teal-100 px-1.5 py-0.5 font-semibold text-teal-800"
                >
                  {{ post.category }}
                </span>
                <span class="text-slate-400">{{ post.date }}</span>
              </div>
              <h3
                class="font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-700"
              >
                {{ post.title }}
              </h3>
              <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                {{ post.description }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </section>
    </template>

    <div
      v-else-if="!pending"
      class="mx-auto max-w-3xl px-4 py-20 text-center text-slate-600 sm:px-6 lg:px-8"
    >
      {{ $t("news.notFound") }}
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();

const collection = computed(() => (locale.value === "en" ? "news_en" : "news"));

// 狀態用顏色輔助，但文字本身就說明了狀態，顏色不是唯一的識別管道
const STATUS_CHIP: Record<string, string> = {
  upcoming: "bg-amber-100 text-amber-800",
  ongoing: "bg-emerald-100 text-emerald-800",
  past: "bg-slate-100 text-slate-600",
};

const { data: newsItem, pending } = await useAsyncData(
  () => `news-${route.path}`,
  () => queryCollection(collection.value).path(route.path).first(),
  { watch: [() => route.path] },
);

// 頁尾的其他消息
const { data: siblings } = await useAsyncData(
  () => `news-more-${route.path}`,
  () => queryCollection(collection.value).order("date", "DESC").limit(4).all(),
  { watch: [() => route.path, collection] },
);

const moreNews = computed(() =>
  (siblings.value ?? [])
    .filter((p) => !p.draft && p.path !== route.path)
    .slice(0, 3),
);

const toc = computed(() => newsItem.value?.body?.toc?.links ?? []);

// 目錄高亮（與前沿新知文章頁同一套做法）
const articleEl = ref<HTMLElement | null>(null);
const activeId = ref<string | null>(null);
const NAV_OFFSET = 96;

function onScroll() {
  const headings = articleEl.value?.querySelectorAll<HTMLElement>("h2[id]");
  if (!headings?.length) return;
  let current = headings[0]!.id;
  for (const h of headings) {
    if (h.getBoundingClientRect().top <= NAV_OFFSET) current = h.id;
  }
  activeId.value = current;
}

onMounted(async () => {
  await nextTick();
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
});

watch(
  () => route.path,
  async () => {
    await nextTick();
    onScroll();
  },
);

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});

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
  /* 點目錄跳過去時，標題不要被固定的導覽列蓋住 */
  scroll-margin-top: 6rem;
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
