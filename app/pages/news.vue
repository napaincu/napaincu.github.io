<template>
  <section class="py-20 bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Title - Consistent with other pages -->
      <div class="text-center mb-16">
        <h1
          class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
        >
          最新消息
        </h1>
      </div>

      <!-- Featured News Section -->
      <div class="mb-16">
        <h2
          class="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-teal-500 pl-4"
        >
          焦點新聞
        </h2>

        <div
          class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <div class="grid grid-cols-1 lg:grid-cols-5">
            <!-- Visual Side -->
            <div
              class="lg:col-span-2 bg-gradient-to-br from-teal-700 to-emerald-600 flex items-center justify-center p-12 relative min-h-[300px]"
            >
              <div
                class="absolute inset-0 opacity-10 bg-[url('/image/logos/logo.png')] bg-center bg-no-repeat bg-contain"
              ></div>

              <div class="text-center relative z-10 text-white">
                <div
                  class="bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block mb-6 border border-white/30"
                >
                  <Icon
                    name="heroicons:megaphone"
                    class="w-16 h-16 text-white"
                  />
                </div>
                <h3 class="text-2xl font-bold mb-3">NAPAI SIGRobot 讀書會</h3>
                <div
                  class="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-teal-50"
                >
                  <Icon name="heroicons:calendar" class="w-4 h-4 mr-2" />
                  2025-03-09
                </div>
              </div>
            </div>

            <!-- Content Side -->
            <div
              class="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-teal-50 to-slate-50"
            >
              <span
                class="inline-block px-3 py-1 bg-teal-50 text-teal-700 rounded-md text-xs font-semibold mb-5 border border-teal-100 w-fit"
              >
                活動公告
              </span>
              <h2 class="text-3xl font-bold text-slate-900 mb-5 leading-tight">
                【活動報名】NAPAI SIGRobot 讀書會活動開放報名中！！
              </h2>
              <p class="text-slate-600 text-base leading-relaxed mb-8">
                本活動為 NAPAI SIGRobot 讀書會活動，歡迎大家填寫報名表單報名參加！
              </p>

              <div>
                <a
                  href="https://forms.gle/4YkjiiyRtsKeZUU96"
                  target="_blank"
                  class="inline-flex items-center justify-center text-white px-6 py-3 rounded-lg transition-all font-medium shadow-sm hover:shadow-md bg-teal-600 hover:bg-teal-700"
                >
                  <span>報名表單</span>
                  <Icon name="heroicons:arrow-right" class="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Events Section -->
      <div class="mb-16">
        <h2
          class="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-teal-500 pl-4"
        >
          近期活動
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Agentic AI Forum -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div class="relative overflow-hidden">
              <img
                src="/image/news/Agentic AI_Forum.png"
                alt="Agentic AI 技術論壇"
                class="w-full h-auto object-cover"
              />
            </div>
            <div class="p-6">
              <h3
                class="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors"
              >
                Agentic AI 技術論壇
              </h3>
            </div>
          </div>

          <!-- NAPAI SIGPhysical -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div class="relative overflow-hidden">
              <a href="https://forms.gle/4YkjiiyRtsKeZUU96" target="_blank" rel="noopener noreferrer" class="block">
                <img
                  src="/image/news/NAPAI_SIGRobot.png"
                  alt="NAPAI_SIGRobot讀書會"
                  class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>
            <div class="p-6">
              <h3
                class="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors"
              >
                NAPAI SIGRobot 讀書會
              </h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Past Events Section -->
      <div class="mb-16">
        <h2
          class="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-slate-400 pl-4"
        >
          過去活動
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Physical AI Forum -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div class="relative overflow-hidden">
              <!-- Black mask overlay -->
              <div class="absolute inset-0 bg-slate-900/40 z-10 transition-colors group-hover:bg-slate-900/20"></div>
              <img
                src="/image/news/Physical AI_Forum.png"
                alt="Physical AI 技術論壇"
                class="w-full h-auto object-cover grayscale brightness-75 transition-all group-hover:grayscale-[50%] group-hover:brightness-90 z-0 relative"
              />
              <div class="absolute top-4 right-4 bg-slate-800/90 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm z-20">已結束</div>
            </div>
            <div class="p-6">
              <h3
                class="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors"
              >
                Physical AI 技術論壇
              </h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Filter - Commented out for future use -->
      <!--
            <div class="mb-12">
                <h3 class="text-xl font-bold text-[#004d80] mb-6 border-l-4 border-blue-500 pl-4">文章分類</h3>
                <div class="flex flex-wrap gap-2">
                    <button 
                        v-for="cat in categories" 
                        :key="cat"
                        @click="activeCategory = cat"
                        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                        :style="activeCategory === cat 
                            ? 'background-color: #2563eb; color: white; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);' 
                            : 'background-color: #f1f5f9; color: #334155;'"
                    >
                        {{ cat }}
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <article 
                    v-for="(news, index) in filteredNews" 
                    :key="index"
                    class="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                >
                    <div class="h-52 relative overflow-hidden bg-slate-100">
                        <div :class="`absolute inset-0 bg-gradient-to-br ${news.gradient} transition-transform duration-700 group-hover:scale-110`"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 group-hover:scale-110 transition-transform duration-300">
                                <Icon :name="news.icon" class="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <span class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-sm border border-white/50">
                            {{ news.category }}
                        </span>
                    </div>

                    <div class="p-6 flex-1 flex flex-col">
                        <div class="flex items-center text-xs font-medium text-slate-400 mb-3">
                            <Icon name="heroicons:calendar" class="w-4 h-4 mr-1.5"/>
                            {{ news.date }}
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#004d80] transition-colors">
                            {{ news.title }}
                        </h3>
                        <p class="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                            {{ news.excerpt }}
                        </p>
                        
                        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span class="text-xs text-slate-400">詳細內容</span>
                            <button class="inline-flex items-center text-sm font-bold text-[#004d80] group-hover:text-blue-600 transition-colors">
                                閱讀更多
                                <Icon name="heroicons:arrow-right" class="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </article>
            </div>
            -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

useHead({
  title: "最新消息 - 前瞻AI人培",
  meta: [
    {
      name: "description",
      content: "計畫公告、論壇資訊與近期活動消息，掌握前瞻AI人培最新動態。",
    },
  ],
});

const categories = ["全部", "活動公告", "課程資訊", "榮譽榜", "技術專欄"];
const activeCategory = ref("全部");

const newsItems = [
  {
    title: "2025 春季課程大綱發布，開放下載！",
    date: "2024-12-15",
    category: "課程資訊",
    excerpt:
      "全新的 Agentic AI 與 Physical AI 課程地圖已經更新，包含基礎理論到進階實作的完整規劃，歡迎各校教師下載參考引用。",
    gradient: "from-emerald-400 to-green-600",
    icon: "heroicons:book-open",
  },
  {
    title: "恭喜本計畫團隊榮獲全國 AI 實作競賽特優",
    date: "2024-11-30",
    category: "榮譽榜",
    excerpt:
      "計畫團隊指導之學生團隊參加「2024 全國大專校院 AI 智慧應用競賽」，以「自主導航機器人」專題榮獲特優殊榮。",
    gradient: "from-amber-300 to-orange-500",
    icon: "heroicons:trophy",
  },
  {
    title: "實體 AI 機器人工作坊 - 精彩回顧",
    date: "2024-11-15",
    category: "活動公告",
    excerpt:
      "上週舉辦的實體 AI 機器人工作坊圓滿落幕，共有來自 20 所學校的 50 位種子教師參與，活動照片與簡報已上傳至官網。",
    gradient: "from-rose-400 to-pink-600",
    icon: "heroicons:camera",
  },
  {
    title: "生成式 AI 在教育場域的應用趨勢分享",
    date: "2024-11-01",
    category: "技術專欄",
    excerpt:
      "本期技術專欄邀請到計畫主持人張教授，分享生成式 AI 如何輔助程式設計教學，以及未來的發展趨勢與挑戰。",
    gradient: "from-sky-400 to-blue-600",
    icon: "heroicons:light-bulb",
  },
  {
    title: "歡迎新加入的合作夥伴學校",
    date: "2024-10-20",
    category: "活動公告",
    excerpt:
      "熱烈歡迎國立高雄科技大學、逢甲大學加入本計畫合作夥伴行列，共同推動 AI 人才培育與課程推廣。",
    gradient: "from-violet-400 to-purple-600",
    icon: "heroicons:user-group",
  },
];

const filteredNews = computed(() => {
  if (activeCategory.value === "全部") {
    return newsItems;
  }
  return newsItems.filter((item) => item.category === activeCategory.value);
});
</script>
