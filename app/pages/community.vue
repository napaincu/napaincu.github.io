<template>
  <div class="py-20 bg-white min-h-screen text-center max-w-7xl mx-auto px-4">
    <h1 class="text-4xl font-bold text-[#004d80] mb-8">社群與活動</h1>
    <p class="text-xl text-slate-600 mb-12">加入我們的 Discord 與 Notion 作為互動社群。</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Community Cards Here -->
         <div class="block p-8 rounded-xl border border-slate-200 transition-all bg-slate-50 opacity-75 cursor-default">
            <Icon name="logos:discord-icon" size="48" class="mb-4 grayscale" />
            <h3 class="text-xl font-bold mb-2 text-slate-500">Discord 交流社群</h3>
            <!-- <p class="text-slate-600">即時討論、問題解答與活動公告。</p> -->
            <p class="text-slate-400 font-medium">~敬請期待~</p>
        </div>

         <div class="block p-8 rounded-xl border border-slate-200 transition-all bg-slate-50 opacity-75 cursor-default">
            <Icon name="logos:notion-icon" size="48" class="mb-4 grayscale" />
            <h3 class="text-xl font-bold mb-2 text-slate-500">Agent AI 知識庫</h3>
            <!-- <p class="text-slate-600">Agent AI 相關課程與資源彙整。</p> -->
            <p class="text-slate-400 font-medium">~敬請期待~</p>
        </div>

         <div class="block p-8 rounded-xl border border-slate-200 transition-all bg-slate-50 opacity-75 cursor-default">
             <Icon name="logos:notion-icon" size="48" class="mb-4 text-slate-400 grayscale" />
            <h3 class="text-xl font-bold mb-2 text-slate-500">Physical AI 知識庫</h3>
            <!-- <p class="text-slate-600">機器人 AI 相關課程與資源彙整。</p> -->
            <p class="text-slate-400 font-medium">~敬請期待~</p>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '社群與活動 - 前瞻AI人培',
})
</script>
