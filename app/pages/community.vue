<template>
  <div class="py-20 bg-white min-h-screen text-center max-w-7xl mx-auto px-4">
    <h1 class="text-4xl font-bold text-[#004d80] mb-8">社群與活動</h1>
    <p class="text-xl text-slate-600 mb-12">加入我們的 Discord 與 Notion 作為互動社群。</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Community Cards Here -->
         <a href="https://discord.gg/aatUjnEKmY" target="_blank" class="block p-8 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group bg-slate-50">
            <Icon name="logos:discord-icon" size="48" class="mb-4" />
            <h3 class="text-xl font-bold mb-2 group-hover:text-blue-600">Discord 交流社群</h3>
            <p class="text-slate-600">即時討論、問題解答與活動公告。</p>
        </a>

        <a href="https://www.notion.so/Agent-AI-..." target="_blank" class="block p-8 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group bg-slate-50">
            <Icon name="logos:notion-icon" size="48" class="mb-4" />
            <h3 class="text-xl font-bold mb-2 group-hover:text-blue-600">Agent AI 知識庫</h3>
            <p class="text-slate-600">Agent AI 相關課程與資源彙整。</p>
        </a>

        <a href="https://www.notion.so/Physical-AI-..." target="_blank" class="block p-8 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group bg-slate-50">
             <Icon name="logos:notion-icon" size="48" class="mb-4 text-[#004d80]" />
            <h3 class="text-xl font-bold mb-2 group-hover:text-blue-600">Physical AI 知識庫</h3>
            <p class="text-slate-600">機器人 AI 相關課程與資源彙整。</p>
        </a>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '社群與活動 - 前瞻AI人培',
})
</script>
