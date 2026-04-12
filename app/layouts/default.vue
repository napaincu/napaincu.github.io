<template>
  <div
    class="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50 selection:bg-blue-200 selection:text-blue-900"
  >
    <!-- Navigation -->
    <nav
      class="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="flex items-center gap-2 group">
              <img
                class="h-10 w-auto transition-transform group-hover:scale-105"
                src="/image/logos/logo-removebg_new.png"
                alt="NAPAI計畫Logo"
              />
            </NuxtLink>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-1">
              <NuxtLink
                v-for="item in navItems"
                :key="item.name"
                :to="item.to"
                class="relative px-3 py-2 text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors duration-200 ease-in-out group"
                active-class="!text-teal-700"
              >
                {{ item.name }}
                <span
                  class="absolute bottom-1 left-3 right-3 h-0.5 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                ></span>
                <span
                  v-if="
                    item.to === $route.path ||
                    ($route.path.startsWith(item.to) && item.to !== '/')
                  "
                  class="absolute bottom-1 left-3 right-3 h-0.5 bg-teal-500"
                ></span>
              </NuxtLink>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="-mr-2 flex md:hidden">
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-teal-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-teal-500"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  v-if="!isMobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-show="isMobileMenuOpen"
          class="md:hidden bg-white border-t border-slate-100 shadow-lg"
        >
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NuxtLink
              v-for="item in navItems"
              :key="item.name"
              :to="item.to"
              @click="isMobileMenuOpen = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-teal-700 transition-colors"
              active-class="bg-teal-50 text-teal-800"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t-4 border-teal-600 pt-12 pb-8 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="flex flex-col items-center">
            <span
              class="font-bold text-slate-700 mb-4 pb-1 border-b-2 border-slate-200"
              >指導單位</span
            >
            <img
              src="/image/logos/logo_ITE.png"
              alt="指導單位"
              class="h-16 object-contain hover:scale-105 transition-transform"
            />
          </div>
          <div class="flex flex-col items-center">
            <span
              class="font-bold text-slate-700 mb-4 pb-1 border-b-2 border-slate-200"
              >主辦單位</span
            >
            <img
              src="/image/logos/logo_NCU.png"
              alt="主辦單位"
              class="h-16 object-contain hover:scale-105 transition-transform"
            />
          </div>
          <div class="flex flex-col items-center">
            <span
              class="font-bold text-slate-700 mb-4 pb-1 border-b-2 border-slate-200"
              >協辦單位</span
            >
            <img
              src="/image/logos/logo_NTPU.png"
              alt="協辦單位"
              class="h-16 object-contain hover:scale-105 transition-transform"
            />
          </div>
          <div class="flex flex-col items-center">
            <span
              class="font-bold text-slate-700 mb-4 pb-1 border-b-2 border-slate-200"
              >協辦單位</span
            >
            <img
              src="/image/logos/logo_NTHU.jpg"
              alt="協辦單位"
              class="h-16 object-contain hover:scale-105 transition-transform"
            />
          </div>
        </div>
        <div
          class="mt-12 pt-8 border-t border-slate-200 text-slate-500 text-sm"
        >
          <div class="relative md:flex md:items-center md:justify-center">
            <p class="text-center">
              &copy; 2026 前瞻AI人培-智慧代理及實體AI課程推動計畫 All rights
              reserved.
            </p>
            <p
              class="mt-2 text-center md:mt-0 md:absolute md:right-0 md:text-right"
            >
              網站來訪人次：<span class="font-semibold text-slate-700">{{
                totalVisitsText
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const isMobileMenuOpen = ref(false);
const totalVisitsText = ref("載入中...");

const navItems = [
  { name: "首頁", to: "/" },
  { name: "最新消息", to: "/news" },
  { name: "計畫團隊", to: "/team" },
  { name: "課程專區", to: "/curriculum" },
  { name: "社群與活動", to: "/community" },
  { name: "常見問題", to: "/faq" },
  { name: "聯絡我們", to: "/contact" },
];

onMounted(async () => {
  try {
    const data = await $fetch<{ count: string }>(
      "https://napai.goatcounter.com/counter/TOTAL.json",
    );
    const count = Number.parseInt(data.count, 10);
    totalVisitsText.value = Number.isNaN(count)
      ? data.count
      : count.toLocaleString("zh-TW");
  } catch {
    totalVisitsText.value = "讀取失敗";
  }
});
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
