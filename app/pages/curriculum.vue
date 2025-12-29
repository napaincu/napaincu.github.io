<template>
    <section class="py-20 bg-white min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2 mb-12">課程專區</h1>
                
                <div class="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-10 text-white shadow-xl max-w-4xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
                    <h3 class="text-2xl font-bold mb-4">GitHub 開源教材平台</h3>
                    <p class="mb-8 text-gray-300">我們採用 GitHub 作為核心課程發布平台，提供最即時、開放的教材資源。</p>
                    <a href="#" class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 md:text-lg transition-colors">
                    <Icon name="uil:github" class="mr-2" size="24" />
                    前往 GitHub 教材平台
                    </a>
                </div>
        </div>
    </section>
</template>

<script setup lang="ts">
useHead({
  title: '課程專區 - 前瞻AI人培',
})
</script>
