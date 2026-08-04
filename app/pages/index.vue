<template>
  <div class="overflow-x-hidden">
    <!-- Hero Carousel -->
    <HeroCarousel />

    <!-- About Section (editorial layout) -->
    <section id="about" class="py-24 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <header class="max-w-3xl mx-auto text-center mb-20">
          <p
            class="text-sm font-semibold tracking-[0.35em] text-teal-600 uppercase"
          >
            About NAPAI
          </p>
          <h2
            class="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
          >
            {{ $t("home.about.title") }}
          </h2>
          <div class="mt-6 mx-auto h-px w-16 bg-teal-500"></div>
          <p class="mt-6 text-lg text-slate-600 leading-relaxed">
            {{ $t("home.about.subtitle") }}
          </p>
        </header>

        <!-- 計畫緣起 -->
        <article>
          <h3
            class="flex items-center gap-3 text-2xl font-bold text-slate-900 tracking-tight"
          >
            <span class="h-6 w-1 rounded-full bg-teal-500"></span>
            {{ $t("home.origin.title") }}
          </h3>

          <p
            class="mt-8 text-lg md:text-xl text-slate-700 leading-loose text-justify"
            v-html="$t('home.origin.intro')"
          ></p>

          <!-- 兩大挑戰 -->
          <div class="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
            <div class="border-t-2 border-teal-500 pt-6">
              <p class="text-sm font-semibold text-teal-600 tabular-nums">01</p>
              <h4 class="mt-2 text-lg font-bold text-slate-900">
                {{ $t("home.origin.realityGapTitle") }}
              </h4>
              <p class="mt-3 text-base text-slate-600 leading-relaxed">
                {{ $t("home.origin.realityGapBody") }}
              </p>
            </div>
            <div class="border-t-2 border-teal-500 pt-6">
              <p class="text-sm font-semibold text-teal-600 tabular-nums">02</p>
              <h4 class="mt-2 text-lg font-bold text-slate-900">
                {{ $t("home.origin.dynamicTitle") }}
              </h4>
              <p class="mt-3 text-base text-slate-600 leading-relaxed">
                {{ $t("home.origin.dynamicBody") }}
              </p>
            </div>
          </div>

          <!-- 核心洞察（引言式） -->
          <blockquote class="mt-16 border-l-2 border-teal-500 pl-6 md:pl-8">
            <p
              class="text-lg md:text-xl font-medium text-slate-800 leading-relaxed"
            >
              {{ $t("home.origin.insight1") }}
            </p>
            <p class="mt-4 text-base text-slate-500 leading-relaxed">
              {{ $t("home.origin.insight2") }}
            </p>
          </blockquote>

          <!-- NAPAI 的定位 -->
          <div class="mt-16">
            <p
              class="text-base md:text-lg text-slate-700 leading-loose"
              v-html="$t('home.origin.positioning')"
            ></p>
            <ul class="mt-8 space-y-4">
              <li class="flex items-start gap-4">
                <span
                  class="mt-0.5 inline-flex w-24 flex-shrink-0 justify-center rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700 ring-1 ring-teal-200"
                  >Agentic</span
                >
                <p class="text-base md:text-lg text-slate-700 leading-relaxed">
                  {{ $t("home.origin.pillar1") }}
                </p>
              </li>
              <li class="flex items-start gap-4">
                <span
                  class="mt-0.5 inline-flex w-24 flex-shrink-0 justify-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200"
                  >Physical</span
                >
                <p class="text-base md:text-lg text-slate-700 leading-relaxed">
                  {{ $t("home.origin.pillar2") }}
                </p>
              </li>
            </ul>
            <p
              class="mt-8 text-base text-slate-600 leading-relaxed"
              v-html="$t('home.origin.closing')"
            ></p>
          </div>

          <!-- 結語（陳述句） -->
          <div class="mt-20 text-center">
            <div class="mx-auto h-px w-16 bg-teal-500"></div>
            <p
              class="mt-8 mx-auto max-w-3xl text-2xl md:text-3xl font-bold leading-snug tracking-tight text-slate-900"
            >
              {{ $t("home.origin.banner") }}
            </p>
          </div>
        </article>

        <hr class="my-24 border-slate-200" />

        <!-- 計畫目標 -->
        <article>
          <h3
            class="flex items-center gap-3 text-2xl font-bold text-slate-900 tracking-tight"
          >
            <span class="h-6 w-1 rounded-full bg-teal-500"></span>
            {{ $t("home.goals.title") }}
          </h3>

          <p
            class="mt-8 text-lg md:text-xl text-slate-700 leading-loose text-justify"
            v-html="$t('home.goals.intro')"
          ></p>

          <!-- 四大重點 -->
          <div
            class="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2"
          >
            <div class="border-t border-slate-200 pt-6">
              <p class="text-sm font-semibold text-teal-600 tabular-nums">01</p>
              <h4 class="mt-2 text-lg font-bold text-slate-900">
                {{ $t("home.goals.feature1Title") }}
              </h4>
              <p class="mt-3 text-base text-slate-600 leading-relaxed">
                {{ $t("home.goals.feature1Body") }}
              </p>
            </div>
            <div class="border-t border-slate-200 pt-6">
              <p class="text-sm font-semibold text-teal-600 tabular-nums">02</p>
              <h4 class="mt-2 text-lg font-bold text-slate-900">
                {{ $t("home.goals.feature2Title") }}
              </h4>
              <p class="mt-3 text-base text-slate-600 leading-relaxed">
                {{ $t("home.goals.feature2Body") }}
              </p>
            </div>
            <div class="border-t border-slate-200 pt-6">
              <p class="text-sm font-semibold text-teal-600 tabular-nums">03</p>
              <h4 class="mt-2 text-lg font-bold text-slate-900">
                {{ $t("home.goals.feature3Title") }}
              </h4>
              <p class="mt-3 text-base text-slate-600 leading-relaxed">
                {{ $t("home.goals.feature3Body") }}
              </p>
            </div>
            <div class="border-t border-slate-200 pt-6">
              <p class="text-sm font-semibold text-teal-600 tabular-nums">04</p>
              <h4 class="mt-2 text-lg font-bold text-slate-900">
                {{ $t("home.goals.feature4Title") }}
              </h4>
              <p class="mt-3 text-base text-slate-600 leading-relaxed">
                {{ $t("home.goals.feature4Body") }}
              </p>
            </div>
          </div>

          <p
            class="mt-16 border-t border-slate-200 pt-8 text-base md:text-lg text-slate-600 leading-loose"
            v-html="$t('home.goals.closing')"
          ></p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("home.meta.title"),
  description: () => t("home.meta.description"),
});
</script>
