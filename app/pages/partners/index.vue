<template>
  <section
    class="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-14 text-center">
        <h1
          class="relative inline-block text-4xl font-bold text-[#004d80] after:mx-auto after:mt-2 after:block after:h-1 after:w-2/3 after:bg-blue-500 after:content-['']"
        >
          {{ $t("partners.pageTitle") }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          {{ $t("partners.subtitle") }}
        </p>
      </div>

      <div
        v-if="pending"
        class="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600"
      >
        {{ $t("partners.loading") }}
      </div>
      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700"
      >
        {{ $t("partners.error") }}
      </div>

      <template v-else-if="displayedPartners.length">
        <!-- Featured partners: full-width showcase -->
        <div class="space-y-8">
          <NuxtLink
            v-for="item in featuredPartners"
            :key="resolvePath(item)"
            :to="resolvePath(item)"
            class="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:grid-cols-2"
          >
            <!-- Visual panel -->
            <div
              class="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-slate-900"
            >
              <img
                v-if="item.cover"
                :src="item.cover"
                :alt="item.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <template v-else>
                <div
                  class="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-800"
                ></div>
                <div
                  class="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl"
                ></div>
                <div
                  class="absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-emerald-300/20 blur-2xl"
                ></div>
                <div
                  class="absolute inset-0 opacity-[0.07]"
                  style="
                    background-image: radial-gradient(
                      circle,
                      #fff 1px,
                      transparent 1px
                    );
                    background-size: 22px 22px;
                  "
                ></div>
                <div
                  class="relative z-10 flex flex-col items-center gap-4 px-6 text-center"
                >
                  <Icon
                    :name="categoryIcon(item)"
                    class="h-14 w-14 text-white/90"
                  />
                  <span
                    class="max-w-xs text-xl font-bold leading-snug text-white drop-shadow-sm"
                  >
                    {{ item.title }}
                  </span>
                </div>
              </template>

              <span
                v-if="item.status"
                class="absolute left-4 top-4 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur"
              >
                {{ statusLabel(item.status) }}
              </span>
            </div>

            <!-- Content -->
            <div class="flex flex-col p-8 lg:p-10">
              <span
                class="mb-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-800"
              >
                <Icon :name="categoryIcon(item)" class="h-3.5 w-3.5" />
                {{ item.category }}
              </span>

              <h2
                class="text-2xl font-bold leading-snug text-slate-900 transition group-hover:text-teal-700 lg:text-3xl"
              >
                {{ item.title }}
              </h2>

              <p class="mt-4 leading-relaxed text-slate-600">
                {{ item.description }}
              </p>

              <dl
                v-if="item.organizer || item.sponsor || item.period"
                class="mt-6 flex flex-wrap gap-2"
              >
                <div
                  v-if="item.organizer"
                  class="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs"
                >
                  <Icon
                    name="heroicons:building-library"
                    class="h-3.5 w-3.5 text-slate-400"
                  />
                  <span class="text-slate-400">{{ $t("partners.organizer") }}</span>
                  <span class="font-semibold text-slate-700">{{
                    item.organizer
                  }}</span>
                </div>
                <div
                  v-if="item.sponsor"
                  class="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs"
                >
                  <Icon
                    name="heroicons:sparkles"
                    class="h-3.5 w-3.5 text-slate-400"
                  />
                  <span class="text-slate-400">{{ $t("partners.sponsor") }}</span>
                  <span class="font-semibold text-slate-700">{{
                    item.sponsor
                  }}</span>
                </div>
                <div
                  v-if="item.period"
                  class="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs"
                >
                  <Icon
                    name="heroicons:calendar-days"
                    class="h-3.5 w-3.5 text-slate-400"
                  />
                  <span class="font-semibold text-slate-700">{{
                    item.period
                  }}</span>
                </div>
              </dl>

              <div class="mt-8 flex items-center">
                <span
                  class="inline-flex items-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-teal-700"
                >
                  {{ $t("partners.viewDetail") }}
                  <Icon
                    name="heroicons:arrow-right"
                    class="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Other partners: grid -->
        <div
          v-if="gridPartners.length"
          class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <NuxtLink
            v-for="item in gridPartners"
            :key="resolvePath(item)"
            :to="resolvePath(item)"
            class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
          >
            <div
              class="relative flex h-44 items-center justify-center overflow-hidden bg-slate-900"
            >
              <img
                v-if="item.cover"
                :src="item.cover"
                :alt="item.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <template v-else>
                <div
                  class="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-700"
                ></div>
                <Icon
                  :name="categoryIcon(item)"
                  class="relative z-10 h-12 w-12 text-white/90"
                />
              </template>
              <span
                v-if="item.status"
                class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur"
              >
                {{ statusLabel(item.status) }}
              </span>
            </div>

            <div class="flex flex-1 flex-col p-6">
              <span
                class="mb-3 inline-flex w-fit items-center gap-1 rounded-md bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-800"
              >
                {{ item.category }}
              </span>
              <h2
                class="text-lg font-bold leading-snug text-slate-900 transition group-hover:text-teal-700"
              >
                {{ item.title }}
              </h2>
              <p
                class="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600"
              >
                {{ item.description }}
              </p>
              <div class="mt-4 flex justify-end">
                <span
                  class="inline-flex items-center text-sm font-semibold text-teal-700"
                >
                  {{ $t("partners.viewDetail") }}
                  <Icon name="heroicons:arrow-right" class="ml-1.5 h-4 w-4" />
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </template>

      <div
        v-else
        class="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500"
      >
        {{ $t("partners.empty") }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { t, locale } = useI18n();
const collection = computed(() =>
  locale.value === "en" ? "partners_en" : "partners",
);

const {
  data: partnersData,
  pending,
  error,
} = await useAsyncData(
  () => `partners-list-${locale.value}`,
  () => queryCollection(collection.value).all(),
  { watch: [locale] },
);

const displayedPartners = computed(() =>
  [...(partnersData.value ?? [])]
    .filter((item) => !item.draft)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (a.order ?? 0) - (b.order ?? 0);
    }),
);

const featuredPartners = computed(() =>
  displayedPartners.value.filter((item) => item.featured),
);
const gridPartners = computed(() =>
  displayedPartners.value.filter((item) => !item.featured),
);

const resolvePath = (item: { path?: string | null; stem?: string | null }) => {
  if (item.path && item.path.trim()) return item.path;
  if (item.stem && item.stem.trim()) {
    return `/${item.stem.replace(/^\/+/, "")}`;
  }
  return locale.value === "en" ? "/en/partners" : "/partners";
};

const categoryIcon = (item: { status?: string | null }) => {
  // Competitions get a trophy; everything else a generic partner icon.
  return item.status ? "heroicons:trophy" : "heroicons:user-group";
};

const statusLabel = (value: string) => {
  if (value === "upcoming") return t("partners.status.upcoming");
  if (value === "ongoing") return t("partners.status.ongoing");
  if (value === "ended") return t("partners.status.ended");
  return value;
};

useSeoMeta({
  title: () => t("partners.meta.listTitle"),
  description: () => t("partners.meta.listDescription"),
});
</script>
