<script setup lang="ts">
const { t } = useI18n();
const i18nHead = useLocaleHead();

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir,
  },
  title: t("project.name"),
  meta: [
    { name: "description", content: t("app.metaDescription") },
    ...(i18nHead.value.meta ?? []),
  ],
  script: [
    {
      async: true,
      src: "https://gc.zgo.at/count.js",
      "data-goatcounter": "https://napai.goatcounter.com/count",
    },
  ],
  link: [
    ...(i18nHead.value.link ?? []),
    { rel: "icon", type: "image/png", href: "/image/logos/favicon.png" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap",
    },
  ],
}));
</script>

<template>
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'page',
        mode: 'out-in',
      }"
    />
  </NuxtLayout>
</template>

<style>
* {
  font-family: "Roboto", sans-serif !important;
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
