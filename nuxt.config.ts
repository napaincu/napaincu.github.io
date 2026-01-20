// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  app: {
    baseURL: "/",
  },
  devtools: { enabled: true },

  nitro: {
    preset: "github-pages",
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxtjs/sitemap",
  ],

  site: {
    url: "https://napaincu.github.io/",
    name: "前瞻AI人培-智慧代理及實體AI課程推動計畫",
  },
});
