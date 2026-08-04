// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: true,
  app: {
    baseURL: "/",
  },
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      // 互動問答中繼後端（實驗室 widm 機台的 Nginx 轉發路徑，見 llm-server/README.md）
      // 留空字串 = 隱藏互動問答模式，導覽員只保留劇本式導覽
      chatApi: "https://widm.csie.ncu.edu.tw/napai",
    },
  },

  nitro: {
    preset: "github-pages",
  },

  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxtjs/sitemap",
    "@nuxtjs/i18n",
  ],

  i18n: {
    baseUrl: "https://napaincu.github.io",
    strategy: "prefix_except_default",
    defaultLocale: "zh",
    locales: [
      {
        code: "zh",
        language: "zh-Hant-TW",
        name: "中文",
        file: "zh.json",
      },
      {
        code: "en",
        language: "en",
        name: "English",
        file: "en.json",
      },
    ],
    bundle: {
      optimizeTranslationDirective: false,
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  site: {
    url: "https://napaincu.github.io/",
    name: "前瞻AI人培-智慧代理及實體AI課程推動計畫",
  },
});
