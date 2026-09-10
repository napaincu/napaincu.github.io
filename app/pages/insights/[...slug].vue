<template>
  <div class="min-h-screen bg-slate-50">
    <!-- 閱讀進度條：疊在導覽列上緣，長文才看得出還剩多少 -->
    <div
      v-if="item"
      class="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent"
      aria-hidden="true"
    >
      <div
        class="h-full bg-teal-500 transition-[width] duration-150 ease-out"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <div
      v-if="pending"
      class="mx-auto max-w-3xl px-4 py-20 text-slate-600 sm:px-6 lg:px-8"
    >
      {{ $t("insights.loading") }}
    </div>

    <template v-else-if="item">
      <!-- 滿版標題區：頁面從全寬開始，再收進閱讀欄，就不會像一張卡片浮在空地上 -->
      <header class="border-b border-slate-200 bg-white">
        <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <NuxtLink
            :to="localePath('/insights')"
            class="inline-flex items-center gap-2 text-sm font-medium text-teal-700 transition hover:text-teal-800"
          >
            <Icon name="heroicons:arrow-left" class="h-4 w-4" />
            {{ $t("insights.backToList") }}
          </NuxtLink>

          <div class="mt-6 flex flex-wrap items-center gap-2 text-xs">
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

          <h1
            class="mt-4 max-w-5xl text-3xl/[1.35] font-bold text-slate-900 md:text-4xl/[1.35] lg:text-[2.75rem]/[1.35]"
          >
            {{ item.title }}
          </h1>

          <p class="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            {{ item.description }}
          </p>
        </div>
      </header>

      <div class="mx-auto flex max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <!-- 左欄：目錄，捲動時固定並標出目前段落 -->
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

        <!-- 中欄：內文，寬度維持在好讀的範圍 -->
        <article
          ref="articleEl"
          class="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"
        >
          <div class="insight-content max-w-none">
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

        <!-- 右欄：作者與延伸閱讀 -->
        <aside class="hidden w-64 shrink-0 xl:block">
          <div class="sticky top-24 space-y-6">
            <div
              v-if="item.author || item.affiliation"
              class="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <p
                class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                {{ $t("insights.authorLabel") }}
              </p>
              <div class="flex items-start gap-3">
                <Icon
                  name="heroicons:user-circle"
                  class="h-9 w-9 shrink-0 text-slate-300"
                />
                <div class="min-w-0">
                  <p class="font-semibold text-slate-800">{{ item.author }}</p>
                  <p class="mt-0.5 text-sm leading-snug text-slate-500">
                    {{ item.affiliation }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-if="recentNews.length"
              class="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div class="mb-3 flex items-baseline justify-between gap-2">
                <p
                  class="text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  {{ $t("nav.news") }}
                </p>
                <NuxtLink
                  :to="localePath('/news')"
                  class="text-xs font-medium text-teal-700 hover:text-teal-800"
                >
                  {{ $t("insights.viewAll") }}
                </NuxtLink>
              </div>
              <ul class="space-y-3">
                <li v-for="news in recentNews" :key="news.path">
                  <NuxtLink
                    :to="news.path"
                    class="block text-sm leading-snug text-slate-600 transition hover:text-teal-700"
                  >
                    {{ news.title }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <!-- 底部：相關文章，讓讀完的人有下一步 -->
      <section
        v-if="related.length"
        class="border-t border-slate-200 bg-white py-14"
      >
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 class="mb-6 text-xl font-bold text-slate-900">
            {{ $t("insights.related") }}
          </h2>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <NuxtLink
              v-for="post in related"
              :key="post.path"
              :to="post.path"
              class="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
            >
              <div class="mb-2 flex flex-wrap gap-1.5 text-[11px]">
                <span
                  v-for="a in post.audiences"
                  :key="a"
                  class="rounded px-1.5 py-0.5 font-semibold"
                  :class="AUDIENCE_CHIP[a]"
                >
                  {{ $t(`insights.audiences.${a}`) }}
                </span>
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
      v-else
      class="mx-auto max-w-3xl px-4 py-20 text-center text-slate-500 sm:px-6 lg:px-8"
    >
      {{ $t("insights.notFound") }}
    </div>
  </div>
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
const newsCollection = computed(() =>
  locale.value === "en" ? "news_en" : "news",
);

const { data: item, pending } = await useAsyncData(
  () => `insights-${route.path}`,
  () => queryCollection(collection.value).path(route.path).first(),
  { watch: [() => route.path] },
);

if (import.meta.server && (!item.value || item.value.draft)) {
  throw createError({ statusCode: 404, statusMessage: t("insights.notFound") });
}

// 側欄與頁尾用的延伸閱讀
const { data: siblings } = await useAsyncData(
  () => `insights-related-${route.path}`,
  () => queryCollection(collection.value).order("date", "DESC").all(),
  { watch: [() => route.path, collection] },
);

const { data: news } = await useAsyncData(
  () => `insights-rail-news-${locale.value}`,
  () => queryCollection(newsCollection.value).order("date", "DESC").limit(3).all(),
  { watch: [newsCollection] },
);

const recentNews = computed(() => news.value ?? []);

// 同受眾的優先，不足再用最新的補滿，避免只有一兩篇時整區空掉
const related = computed(() => {
  const pool = (siblings.value ?? []).filter(
    (p) => !p.draft && p.path !== route.path,
  );
  const mine = item.value?.audiences ?? [];
  const shared = pool.filter((p) => p.audiences?.some((a) => mine.includes(a)));
  const rest = pool.filter((p) => !shared.includes(p));
  return [...shared, ...rest].slice(0, 3);
});

const toc = computed(() => item.value?.body?.toc?.links ?? []);

// 閱讀進度與目前所在段落
const articleEl = ref<HTMLElement | null>(null);
const progress = ref(0);
const activeId = ref<string | null>(null);

// 導覽列高度，判定標題是否已捲過頂端時要扣掉
const NAV_OFFSET = 96;

function onScroll() {
  const el = articleEl.value;
  if (!el) return;

  // 進度＝從頁面頂端捲到「文章結尾剛好露出」為止的比例。用文章自身高度當分母的話，
  // 標題區那段會一直卡在 0%，短文更是一下就跳到 100%
  const rect = el.getBoundingClientRect();
  const finish = window.scrollY + rect.bottom - window.innerHeight;
  progress.value =
    finish <= 0
      ? 100
      : Math.min(100, Math.max(0, (window.scrollY / finish) * 100));

  // 目前段落＝最後一個已經捲過頂端的標題。用 IntersectionObserver 的話，
  // 捲到最後一段以下就沒有標題落在偵測帶裡，高亮會整個消失
  const headings = el.querySelectorAll<HTMLElement>("h2[id]");
  if (!headings.length) return;
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

// 站內切到另一篇文章時 DOM 換了一批標題，重算一次
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
  /* 點目錄跳過去時，標題不要被固定的導覽列蓋住 */
  scroll-margin-top: 6rem;
  margin: 2.4rem 0 0.9rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.35;
  color: #004d80;
}

.insight-content :deep(h2:first-child) {
  margin-top: 0;
}

.insight-content :deep(h3) {
  scroll-margin-top: 6rem;
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
