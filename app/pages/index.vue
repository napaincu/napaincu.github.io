<template>
  <div class="overflow-x-hidden">
    <!-- Hero Carousel -->
    <HeroCarousel />

    <!-- About Section (Redesigned) -->
    <section
      id="about"
      class="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      <!-- Decorative Background Elements -->
      <div
        class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5"
      >
        <div
          class="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2
            class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
          >
            {{ $t("home.about.title") }}
          </h2>
          <p class="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            {{ $t("home.about.subtitle") }}
          </p>
        </div>

        <!-- Main Content Cards -->
        <div class="space-y-6">
          <!-- Background Card -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div class="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-6">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">
                  {{ $t("home.origin.title") }}
                </h3>
              </div>
            </div>
            <div class="p-8 space-y-6">
              <!-- 開場段落 -->
              <div class="relative">
                <div
                  class="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full"
                ></div>
                <p
                  class="text-base md:text-lg text-slate-700 leading-relaxed text-justify pl-4"
                  v-html="$t('home.origin.intro')"
                ></p>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <!-- 實體系統挑戰 -->
                <div
                  class="relative p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm"
                >
                  <div class="flex items-center gap-2 mb-3">
                    <div
                      class="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <svg
                        class="w-5 h-5 text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        ></path>
                      </svg>
                    </div>
                    <h4 class="text-base md:text-lg font-bold text-slate-800">
                      {{ $t("home.origin.realityGapTitle") }}
                    </h4>
                  </div>
                  <p class="text-base text-slate-600 leading-relaxed">
                    {{ $t("home.origin.realityGapBody") }}
                  </p>
                </div>

                <!-- 應用情境挑戰 -->
                <div
                  class="relative p-5 bg-teal-50 rounded-xl border border-teal-100 shadow-sm"
                >
                  <div class="flex items-center gap-2 mb-3">
                    <div
                      class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <svg
                        class="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>
                    </div>
                    <h4 class="text-base md:text-lg font-bold text-teal-900">
                      {{ $t("home.origin.dynamicTitle") }}
                    </h4>
                  </div>
                  <p class="text-base text-slate-600 leading-relaxed">
                    {{ $t("home.origin.dynamicBody") }}
                  </p>
                </div>
              </div>

              <!-- 核心洞察 -->
              <div
                class="p-6 bg-slate-50 rounded-xl border-l-4 border-teal-500 shadow-sm"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  >
                    <svg
                      class="w-6 h-6 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p
                      class="text-base md:text-lg text-slate-800 leading-relaxed font-medium mb-3"
                    >
                      {{ $t("home.origin.insight1") }}
                    </p>
                    <p class="text-base text-slate-600 leading-relaxed">
                      {{ $t("home.origin.insight2") }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- NAPAI 的定位 -->
              <div
                class="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm"
              >
                <p
                  class="text-base md:text-lg text-slate-800 leading-relaxed mb-5"
                  v-html="$t('home.origin.positioning')"
                ></p>
                <div class="grid md:grid-cols-2 gap-3 mb-4">
                  <div
                    class="flex items-start gap-2 p-3 bg-white rounded-lg border border-teal-100 shadow-sm"
                  >
                    <svg
                      class="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p class="text-base text-slate-700">
                      {{ $t("home.origin.pillar1") }}
                    </p>
                  </div>
                  <div
                    class="flex items-start gap-2 p-3 bg-white rounded-lg border border-emerald-100 shadow-sm"
                  >
                    <svg
                      class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p class="text-base text-slate-700">
                      {{ $t("home.origin.pillar2") }}
                    </p>
                  </div>
                </div>
                <p
                  class="text-base text-slate-600 leading-relaxed"
                  v-html="$t('home.origin.closing')"
                ></p>
              </div>

              <!-- 結語強調 -->
              <div
                class="relative p-5 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl shadow-lg overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
                ></div>
                <div class="relative flex items-center gap-3">
                  <svg
                    class="w-8 h-8 text-white flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                  <p
                    class="text-white font-bold text-xl md:text-2xl leading-relaxed"
                  >
                    {{ $t("home.origin.banner") }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Goals Card -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div
              class="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-6"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">
                  {{ $t("home.goals.title") }}
                </h3>
              </div>
            </div>
            <div class="p-8">
              <p
                class="text-base md:text-lg text-slate-700 leading-relaxed mb-8"
                v-html="$t('home.goals.intro')"
              ></p>

              <!-- Key Features Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div
                  class="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-base font-semibold text-slate-800">
                      {{ $t("home.goals.feature1Title") }}
                    </p>
                    <p class="text-sm text-slate-600 mt-1">
                      {{ $t("home.goals.feature1Body") }}
                    </p>
                  </div>
                </div>

                <div
                  class="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-base font-semibold text-slate-800">
                      {{ $t("home.goals.feature2Title") }}
                    </p>
                    <p class="text-sm text-slate-600 mt-1">
                      {{ $t("home.goals.feature2Body") }}
                    </p>
                  </div>
                </div>

                <div
                  class="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-base font-semibold text-slate-800">
                      {{ $t("home.goals.feature3Title") }}
                    </p>
                    <p class="text-sm text-slate-600 mt-1">
                      {{ $t("home.goals.feature3Body") }}
                    </p>
                  </div>
                </div>

                <div
                  class="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-base font-semibold text-slate-800">
                      {{ $t("home.goals.feature4Title") }}
                    </p>
                    <p class="text-sm text-slate-600 mt-1">
                      {{ $t("home.goals.feature4Body") }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="p-6 bg-slate-50 rounded-xl border-l-4 border-teal-500"
              >
                <p
                  class="text-base md:text-lg text-slate-700 leading-relaxed"
                  v-html="$t('home.goals.closing')"
                ></p>
              </div>
            </div>
          </div>
        </div>
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

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
@keyframes blob {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  33% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  66% {
    transform: translate(-50%, -50%) scale(0.9);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
