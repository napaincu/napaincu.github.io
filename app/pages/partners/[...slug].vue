<template>
  <div v-if="partner" class="min-h-screen bg-white">
    <!-- Hero -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-[#01243b] via-[#004d80] to-teal-700"
    >
      <!-- decorative -->
      <div
        class="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.06]"
        style="
          background-image: radial-gradient(circle, #fff 1px, transparent 1px);
          background-size: 24px 24px;
        "
      ></div>

      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <NuxtLink
          :to="localePath('/partners')"
          class="mb-8 inline-flex items-center text-sm font-medium text-teal-100 transition hover:text-white"
        >
          <Icon name="heroicons:arrow-left" class="mr-2 h-4 w-4" />
          {{ $t("partners.backToList") }}
        </NuxtLink>

        <div class="grid items-center gap-10 lg:grid-cols-2">
          <!-- Text -->
          <div class="order-2 lg:order-1">
            <div class="mb-5 flex flex-wrap items-center gap-2">
              <span
                class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
              >
                <Icon name="heroicons:trophy" class="h-3.5 w-3.5" />
                {{ partner.category }}
              </span>
              <span
                v-if="partner.status"
                class="rounded-full bg-emerald-400/90 px-3 py-1 text-xs font-semibold text-emerald-950"
              >
                {{ statusLabel(partner.status) }}
              </span>
            </div>

            <h1
              class="text-3xl font-extrabold leading-tight text-white drop-shadow-sm md:text-4xl lg:text-5xl"
            >
              {{ partner.title }}
            </h1>
            <p class="mt-5 max-w-xl text-base leading-relaxed text-teal-50/90 md:text-lg">
              {{ partner.description }}
            </p>

            <div
              v-if="partner.organizer || partner.period"
              class="mt-7 flex flex-wrap gap-x-8 gap-y-3"
            >
              <div v-if="partner.organizer" class="flex flex-col">
                <span class="text-xs font-medium uppercase tracking-wide text-teal-200/80">
                  {{ $t("partners.organizer") }}
                </span>
                <span class="mt-0.5 font-semibold text-white">{{
                  partner.organizer
                }}</span>
              </div>
              <div v-if="partner.period" class="flex flex-col">
                <span class="text-xs font-medium uppercase tracking-wide text-teal-200/80">
                  {{ $t("partners.period") }}
                </span>
                <span class="mt-0.5 font-semibold text-white">{{
                  partner.period
                }}</span>
              </div>
            </div>

            <a
              v-if="partner.externalLink"
              :href="partner.externalLink"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-8 inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-[#004d80] shadow-lg transition hover:bg-teal-50"
            >
              {{ $t("partners.visitOfficial") }}
              <Icon
                name="heroicons:arrow-top-right-on-square"
                class="ml-2 h-4 w-4"
              />
            </a>
          </div>

          <!-- Visual -->
          <div class="order-1 lg:order-2">
            <div
              v-if="partner.cover"
              class="rounded-3xl bg-white p-3 shadow-2xl ring-1 ring-white/20"
            >
              <img
                :src="partner.cover"
                :alt="partner.title"
                class="h-auto w-full rounded-2xl object-cover"
              />
            </div>
            <div
              v-else
              class="flex aspect-[4/3] items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/20"
            >
              <Icon name="heroicons:trophy" class="h-20 w-20 text-white/80" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Results podium -->
    <section
      v-if="results.length"
      class="border-b border-slate-100 bg-slate-50 py-16"
    >
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2
          class="mb-12 text-center text-2xl font-bold text-[#004d80] md:text-3xl"
        >
          <Icon
            name="heroicons:trophy-solid"
            class="mr-2 inline-block h-7 w-7 text-amber-400 align-text-bottom"
          />
          {{ $t("partners.resultsTitle") }}
        </h2>

        <div class="flex flex-col items-stretch justify-center gap-6 md:flex-row md:items-end">
          <div
            v-for="r in results"
            :key="r.rank"
            class="flex-1 md:max-w-xs"
            :class="podiumOrder(r.rank)"
          >
            <div
              class="flex flex-col items-center rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:shadow-md"
              :class="[
                rankStyle(r.rank).border,
                r.rank === 1 ? 'md:-translate-y-3 md:scale-105 md:shadow-lg' : '',
              ]"
            >
              <div
                class="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white shadow"
                :class="rankStyle(r.rank).medal"
              >
                <Icon
                  v-if="r.rank === 1"
                  name="heroicons:trophy-solid"
                  class="h-8 w-8"
                />
                <span v-else class="text-2xl font-extrabold">{{ r.rank }}</span>
              </div>
              <span
                class="mb-2 rounded-full px-3 py-0.5 text-xs font-bold"
                :class="rankStyle(r.rank).label"
              >
                {{ rankLabel(r.rank) }}
              </span>
              <p class="text-xl font-bold text-slate-900">{{ r.team }}</p>
              <p v-if="r.school" class="mt-1 text-sm text-slate-500">
                {{ r.school }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Details -->
    <section class="py-16">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div class="partner-content max-w-none">
          <ContentRenderer :value="partner" />
        </div>

        <div
          v-if="partner.externalLink"
          class="mt-12 flex justify-center border-t border-slate-100 pt-10"
        >
          <a
            :href="partner.externalLink"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-teal-700"
          >
            {{ $t("partners.visitOfficial") }}
            <Icon
              name="heroicons:arrow-top-right-on-square"
              class="ml-2 h-4 w-4"
            />
          </a>
        </div>
      </div>
    </section>
  </div>

  <div
    v-else-if="!pending"
    class="flex min-h-[60vh] items-center justify-center bg-white px-4"
  >
    <div
      class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600"
    >
      {{ $t("partners.notFound") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();

const collection = computed(() =>
  locale.value === "en" ? "partners_en" : "partners",
);

const { data: partner, pending } = await useAsyncData(
  () => `partner-${route.path}`,
  () => queryCollection(collection.value).path(route.path).first(),
  { watch: [() => route.path] },
);

if (import.meta.server && (!partner.value || partner.value.draft)) {
  throw createError({
    statusCode: 404,
    statusMessage: t("partners.notFound"),
  });
}

const results = computed(() =>
  [...(partner.value?.results ?? [])].sort((a, b) => a.rank - b.rank),
);

const podiumOrder = (rank: number) => {
  // Desktop podium: 2nd · 1st · 3rd, with 1st in the middle.
  if (rank === 1) return "md:order-2";
  if (rank === 2) return "md:order-1";
  return "md:order-3";
};

const rankStyle = (rank: number) => {
  if (rank === 1)
    return {
      medal: "bg-gradient-to-br from-amber-400 to-yellow-500",
      border: "border-amber-200",
      label: "bg-amber-100 text-amber-700",
    };
  if (rank === 2)
    return {
      medal: "bg-gradient-to-br from-slate-300 to-slate-400",
      border: "border-slate-200",
      label: "bg-slate-100 text-slate-600",
    };
  return {
    medal: "bg-gradient-to-br from-orange-400 to-amber-700",
    border: "border-orange-200",
    label: "bg-orange-100 text-orange-700",
  };
};

const rankLabel = (rank: number) => {
  const key = `partners.rank.${rank}`;
  return t(key) === key ? `#${rank}` : t(key);
};

const canonicalUrl = computed(() => {
  const siteUrl = "https://napaincu.github.io";
  return `${siteUrl}${route.path}`;
});

const shortName = computed(() => t("project.shortName"));

useSeoMeta({
  title: () =>
    partner.value
      ? `${partner.value.title} - ${shortName.value}`
      : t("partners.meta.listTitle"),
  description: () =>
    partner.value?.description ?? t("partners.meta.listDescription"),
  ogTitle: () => partner.value?.title ?? t("partners.pageTitle"),
  ogDescription: () =>
    partner.value?.description ?? t("partners.meta.listDescription"),
  ogImage: () => partner.value?.cover,
  ogUrl: () => canonicalUrl.value,
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl.value }],
});

const statusLabel = (value: string) => {
  if (value === "upcoming") return t("partners.status.upcoming");
  if (value === "ongoing") return t("partners.status.ongoing");
  if (value === "ended") return t("partners.status.ended");
  return value;
};
</script>

<style scoped>
.partner-content :deep(h2) {
  position: relative;
  margin: 2rem 0 1rem;
  padding-left: 0.9rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: rgb(15 23 42);
}

.partner-content :deep(h2)::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.15rem;
  bottom: 0.15rem;
  width: 4px;
  border-radius: 9999px;
  background: rgb(13 148 136);
}

.partner-content :deep(h3) {
  margin: 1.4rem 0 0.7rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgb(15 23 42);
}

.partner-content :deep(p) {
  margin: 0.9rem 0;
  line-height: 1.85;
  color: rgb(51 65 85);
}

.partner-content :deep(ul),
.partner-content :deep(ol) {
  margin: 0.9rem 0;
  padding-left: 1.4rem;
  color: rgb(51 65 85);
}

.partner-content :deep(ul) {
  list-style: disc;
}

.partner-content :deep(ol) {
  list-style: decimal;
}

.partner-content :deep(li) {
  margin: 0.4rem 0;
  line-height: 1.8;
}

.partner-content :deep(a) {
  color: rgb(13 148 136);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.partner-content :deep(strong) {
  font-weight: 700;
  color: rgb(15 23 42);
}
</style>
