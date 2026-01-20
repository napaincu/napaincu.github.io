<template>
  <div class="py-20 bg-white min-h-screen text-center max-w-7xl mx-auto px-4">
    <h1 class="text-4xl font-bold text-[#004d80] mb-8">社群與活動</h1>
    <p class="text-xl text-slate-600 mb-12">
      加入我們的 Discord 與 Notion 作為互動社群。
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Community Cards Here -->
      <a
        href="https://discord.gg/sxCr6hrd"
        target="_blank"
        rel="noopener noreferrer"
        class="block p-8 rounded-xl border border-slate-200 transition-all bg-white hover:shadow-lg hover:-translate-y-1"
      >
        <Icon name="logos:discord-icon" size="48" class="mb-4" />
        <h3 class="text-xl font-bold mb-2 text-[#004d80]">Discord 交流社群</h3>
        <p class="text-slate-600">即時討論、問題解答與活動公告。</p>
      </a>

      <a
        href="https://www.notion.so/Agent-AI-aefef4ca13864056b7ebbc70e624e084?source=copy_link"
        target="_blank"
        rel="noopener noreferrer"
        class="block p-8 rounded-xl border border-slate-200 transition-all bg-white hover:shadow-lg hover:-translate-y-1"
      >
        <Icon name="logos:notion-icon" size="48" class="mb-4" />
        <h3 class="text-xl font-bold mb-2 text-[#004d80]">Agentic AI 知識庫</h3>
        <p class="text-slate-600">Agentic AI 相關課程與資源彙整。</p>
      </a>

      <a
        href="https://www.notion.so/Physical-AI-5a3bc5d40bb845e1b55e909104518526?source=copy_link"
        target="_blank"
        rel="noopener noreferrer"
        class="block p-8 rounded-xl border border-slate-200 transition-all bg-white hover:shadow-lg hover:-translate-y-1"
      >
        <Icon name="logos:notion-icon" size="48" class="mb-4" />
        <h3 class="text-xl font-bold mb-2 text-[#004d80]">
          Physical AI 知識庫
        </h3>
        <p class="text-slate-600">機器人 AI 相關課程與資源彙整。</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "社群與活動 - 前瞻AI人培",
  meta: [
    {
      name: "description",
      content:
        "加入前瞻AI人培計畫社群與活動公告，包含 Discord 交流與 Agentic/Physical AI 知識庫資源。",
    },
  ],
});
</script>
