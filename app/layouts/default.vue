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
            <NuxtLink :to="localePath('/')" class="flex items-center gap-2 group">
              <img
                class="h-10 w-auto transition-transform group-hover:scale-105"
                src="/image/logos/logo-removebg_new.png"
                alt="NAPAI Logo"
              />
            </NuxtLink>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex md:items-center">
            <div class="ml-10 flex items-baseline space-x-1">
              <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="localePath(item.to)"
                :data-tour="item.tour"
                class="relative px-3 py-2 text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors duration-200 ease-in-out group"
                active-class="!text-teal-700"
              >
                {{ item.name }}
                <span
                  class="absolute bottom-1 left-3 right-3 h-0.5 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                ></span>
                <span
                  v-if="
                    localePath(item.to) === $route.path ||
                    ($route.path.startsWith(localePath(item.to)) &&
                      item.to !== '/')
                  "
                  class="absolute bottom-1 left-3 right-3 h-0.5 bg-teal-500"
                ></span>
              </NuxtLink>
            </div>

            <!-- YouTube Channel (Desktop) -->
            <a
              href="https://www.youtube.com/@NAPAI-b1g"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              :aria-label="$t('common.youtubeChannel')"
              :title="$t('common.youtubeChannel')"
            >
              <Icon name="simple-icons:youtube" class="h-5 w-5" />
            </a>

            <!-- Language Switcher (Desktop) -->
            <Menu as="div" class="relative ml-2">
              <MenuButton
                data-tour="lang"
                class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-teal-200 hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                :aria-label="$t('common.switchLanguage')"
                :title="$t('common.switchLanguage')"
              >
                <Icon name="heroicons:globe-alt" class="h-5 w-5" />
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 z-50 mt-2 w-40 origin-top-right overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-lg focus:outline-none"
                >
                  <MenuItem
                    v-for="l in availableLocales"
                    :key="l.code"
                    v-slot="{ active }"
                  >
                    <NuxtLink
                      :to="switchLocalePath(l.code)"
                      class="flex items-center justify-between px-4 py-2 text-sm transition-colors"
                      :class="[
                        active ? 'bg-slate-50' : '',
                        locale === l.code
                          ? 'font-semibold text-teal-700'
                          : 'text-slate-600',
                      ]"
                    >
                      {{ l.name }}
                      <Icon
                        v-if="locale === l.code"
                        name="heroicons:check"
                        class="h-4 w-4 text-teal-600"
                      />
                    </NuxtLink>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
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
              :key="item.to"
              :to="localePath(item.to)"
              @click="isMobileMenuOpen = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-teal-700 transition-colors"
              active-class="bg-teal-50 text-teal-800"
            >
              {{ item.name }}
            </NuxtLink>

            <!-- YouTube Channel (Mobile) -->
            <a
              href="https://www.youtube.com/@NAPAI-b1g"
              target="_blank"
              rel="noopener noreferrer"
              @click="isMobileMenuOpen = false"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors"
            >
              <Icon name="simple-icons:youtube" class="h-5 w-5 text-red-600" />
              {{ $t("common.youtubeChannel") }}
            </a>

            <!-- Language Switcher (Mobile) -->
            <div class="mt-2 border-t border-slate-100 pt-2">
              <p
                class="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                <Icon name="heroicons:globe-alt" class="h-4 w-4" />
                {{ $t("common.switchLanguage") }}
              </p>
              <NuxtLink
                v-for="l in availableLocales"
                :key="l.code"
                :to="switchLocalePath(l.code)"
                @click="isMobileMenuOpen = false"
                class="flex items-center justify-between rounded-md px-3 py-2 text-base font-medium transition-colors"
                :class="
                  locale === l.code
                    ? 'text-teal-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-teal-700'
                "
              >
                {{ l.name }}
                <Icon
                  v-if="locale === l.code"
                  name="heroicons:check"
                  class="h-5 w-5 text-teal-600"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- AI Agent 網站導覽 -->
    <ClientOnly>
      <AgentGuide />
    </ClientOnly>

    <!-- Footer -->
    <footer class="bg-white border-t-4 border-teal-600 pt-12 pb-8 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="flex flex-col items-center">
            <span
              class="font-bold text-slate-700 mb-4 pb-1 border-b-2 border-slate-200"
              >{{ $t("footer.guidance") }}</span
            >
            <img
              src="/image/logos/logo_ITE.png"
              :alt="$t('footer.guidance')"
              class="h-16 object-contain hover:scale-105 transition-transform"
            />
          </div>
          <div class="flex flex-col items-center">
            <span
              class="font-bold text-slate-700 mb-4 pb-1 border-b-2 border-slate-200"
              >{{ $t("footer.host") }}</span
            >
            <img
              src="/image/logos/logo_NCU.png"
              :alt="$t('footer.host')"
              class="h-16 object-contain hover:scale-105 transition-transform"
            />
          </div>
          <div class="flex flex-col items-center">
            <span
              class="font-bold text-slate-700 mb-4 pb-1 border-b-2 border-slate-200"
              >{{ $t("footer.coHost") }}</span
            >
            <img
              src="/image/logos/logo_NTPU.png"
              :alt="$t('footer.coHost')"
              class="h-16 object-contain hover:scale-105 transition-transform"
            />
          </div>
          <div class="flex flex-col items-center">
            <span
              class="font-bold text-slate-700 mb-4 pb-1 border-b-2 border-slate-200"
              >{{ $t("footer.coHost") }}</span
            >
            <img
              src="/image/logos/logo_NTHU.jpg"
              :alt="$t('footer.coHost')"
              class="h-16 object-contain hover:scale-105 transition-transform"
            />
          </div>
        </div>
        <div
          class="mt-12 pt-8 border-t border-slate-200 text-slate-500 text-sm"
        >
          <div class="mb-4 flex items-center justify-center gap-6">
            <a
              href="https://www.youtube.com/@NAPAI-b1g"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors"
            >
              <Icon name="simple-icons:youtube" class="h-5 w-5" />
              {{ $t("common.youtubeChannel") }}
            </a>
            <a
              href="https://discord.gg/aatUjnEKmY"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-slate-500 hover:text-[#5865F2] transition-colors"
            >
              <Icon name="ic:baseline-discord" class="h-5 w-5" />
              Discord
            </a>
          </div>
          <div class="relative md:flex md:items-center md:justify-center">
            <p class="text-center">
              {{ $t("footer.copyright") }}
            </p>
            <p
              class="mt-2 text-center md:mt-0 md:absolute md:right-0 md:text-right"
            >
              {{ $t("footer.visits")
              }}<span class="font-semibold text-slate-700">{{
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
import { computed, onMounted, ref } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const isMobileMenuOpen = ref(false);
const totalVisitsText = ref(t("footer.visitsLoading"));

const navItems = computed(() => [
  { name: t("nav.home"), to: "/", tour: "home" },
  { name: t("nav.news"), to: "/news", tour: "news" },
  { name: t("nav.team"), to: "/team", tour: "team" },
  { name: t("nav.curriculum"), to: "/curriculum", tour: "curriculum" },
  { name: t("nav.community"), to: "/community", tour: "community" },
  { name: t("nav.partners"), to: "/partners", tour: "partners" },
  { name: t("nav.faq"), to: "/faq", tour: "faq" },
  { name: t("nav.contact"), to: "/contact", tour: "contact" },
]);

const availableLocales = computed(() =>
  (locales.value as { code: string; name: string }[]).map((l) => ({
    code: l.code,
    name: l.name,
  })),
);

onMounted(async () => {
  try {
    const data = await $fetch<{ count: string }>(
      "https://napai.goatcounter.com/counter/TOTAL.json",
    );
    // GoatCounter 會用空白分隔千分位（例如 "1 093"），
    // 直接 parseInt 會停在空白只取到第一段數字（"1 093" -> 1），
    // 所以先移除所有非數字字元再轉換。
    const count = Number.parseInt(data.count.replace(/\D/g, ""), 10);
    totalVisitsText.value = Number.isNaN(count)
      ? data.count
      : count.toLocaleString(locale.value === "en" ? "en-US" : "zh-TW");
  } catch {
    totalVisitsText.value = t("footer.visitsError");
  }
});
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
