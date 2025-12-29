<script setup lang="ts">
useHead({
  title: '前瞻AI人培-智慧代理及實體AI課程推動計畫',
  meta: [
    { name: 'description', content: '教育部前瞻AI技術人才培育計畫 - 智慧代理與實體AI機器人課程推動計畫' }
  ],
  link: [
      { rel: 'icon', type: 'image/png', href: '/image/logos/favicon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage :transition="{
      name: 'page',
      mode: 'out-in'
    }" />
  </NuxtLayout>
</template>

<style>
* {
  font-family: 'Roboto', sans-serif !important;
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
