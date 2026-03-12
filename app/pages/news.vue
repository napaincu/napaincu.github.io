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
            class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            @click="openModal('agenticForum')"
          >
            <div class="relative overflow-hidden">
              <img
                src="/image/news/Agentic AI_Forum.png"
                alt="Agentic AI 技術論壇"
                class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
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

          <!-- NAPAI SIGRobot -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            @click="openModal('sigRobot')"
          >
            <div class="relative overflow-hidden">
              <div class="block">
                <img
                  src="/image/news/NAPAI_SIGRobot.png"
                  alt="NAPAI_SIGRobot讀書會"
                  class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
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

      <!-- Event Detail Modal -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-0">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
          
          <!-- Modal Panel -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl z-10 max-h-[90vh] flex flex-col relative transform transition-all">
            <button @click="closeModal" class="absolute top-4 right-4 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-500 transition-colors z-20">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
            
            <div class="overflow-y-auto p-6 md:p-8">
              <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-6 pr-8">{{ selectedEventData?.title }}</h2>
              
              <div v-if="selectedEventData?.image" class="mb-8 flex justify-center bg-slate-50 rounded-xl overflow-hidden">
                <img :src="selectedEventData.image" :alt="selectedEventData.title" class="w-full h-auto object-contain max-h-[400px]" />
              </div>
              
              <div v-if="selectedEventData?.description" class="prose max-w-none text-slate-600 mb-8 whitespace-pre-line text-lg">
                {{ selectedEventData.description }}
              </div>
              
              <div v-if="selectedEventData?.schedule" class="mb-8">
                <h3 class="text-xl font-bold text-[#004d80] mb-4 border-l-4 border-blue-500 pl-3">活動議程</h3>
                <div class="flex flex-col gap-4">
                  <div v-for="(item, i) in selectedEventData.schedule" :key="i" class="bg-slate-50 rounded-lg p-4 border border-slate-100 hover:shadow-md transition-shadow">
                    <div class="flex flex-col sm:flex-row gap-2 sm:gap-6">
                      <div class="sm:w-32 flex-shrink-0">
                         <div v-if="item.date" class="text-teal-600 font-bold font-mono">{{ item.date }}</div>
                         <div v-if="item.time" :class="item.date ? 'text-teal-600/80 font-mono text-sm mt-1' : 'text-teal-600 font-bold font-mono'">{{ item.time }}</div>
                      </div>
                      <div class="flex-1">
                        <div class="font-bold text-slate-800 text-lg mb-1">{{ item.topic }}</div>
                        <div v-if="item.speaker" class="text-slate-600 text-sm whitespace-pre-line leading-relaxed mb-1">{{ item.speaker }}</div>
                        <div v-if="item.location" class="text-slate-500 text-xs flex items-center mt-2 border-t border-slate-200 pt-2"><Icon name="heroicons:map-pin" class="w-4 h-4 mr-1 text-slate-400"/>{{ item.location }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="selectedEventData?.registrationLink" class="mt-8 pt-6 border-t border-slate-200 flex justify-center">
                <a :href="selectedEventData.registrationLink" target="_blank" class="inline-flex items-center justify-center text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg bg-teal-600 hover:bg-teal-700 transition-all hover:-translate-y-1">
                  <span>前往報名表單</span>
                  <Icon name="heroicons:arrow-top-right-on-square" class="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </transition>

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
import { ref, computed, onUnmounted } from "vue";

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

// Modal State
const isModalOpen = ref(false);
const selectedEventData = ref<any>(null);

const eventDetails = {
  agenticForum: {
    title: "Agentic AI 技術論壇",
    image: "/image/news/Agentic AI_Forum.png",
    schedule: [
      { time: "13:30–14:00", topic: "報到", speaker: "" },
      { time: "14:00–14:10", topic: "計畫簡介", speaker: "國立中央大學資訊工程學系張嘉惠教授（計畫主持人）" },
      { time: "14:10–14:30", topic: "「Agent 驅動的ERP流程」之課程設計", speaker: "國立中央大學企業管理學系許秉瑜教授" },
      { time: "14:30–14:50", topic: "強化學習與數據科學於智慧製造場域", speaker: "國立臺灣大學資訊管理學系李家岩教授" },
      { time: "14:50–15:10", topic: "Agentic AI於校園資訊系統之落地：以中興大學AI興學伴為例", speaker: "國立中興大學資訊工程學系范耀中教授" },
      { time: "15:10–15:30", topic: "Agentic AI 在大學教學與研究的實踐", speaker: "國立中央大學資訊工程學系蔡宗翰教授" },
      { time: "15:30–16:00", topic: "跨域 Agent AI 人才培育座談與產業接軌：挑戰與展望", speaker: "主持人：國立臺北大學資訊管理研究所戴敏育教授（協同主持人）\n與談人：\n國立中央大學企業管理學系許秉瑜教授\n國立臺灣大學資訊管理學系李家岩教授\n國立中興大學資訊工程學系范耀中教授\n國立中央大學資訊工程學系蔡宗翰教授" },
    ]
  },
  sigRobot: {
    title: "NAPAI SIGRobot 讀書會",
    image: "/image/news/NAPAI_SIGRobot.png",
    description: "本活動為 NAPAI SIGRobot 讀書會活動，歡迎大家填寫報名表單報名參加！\n\n【系列講座議程】",
    schedule: [
      { date: "2026/4/1 (三)", time: "12:30~16:00", speaker: "國立陽明交通大學資工系\n陳奕廷老師", topic: "Learning from Humans: Teleoperation and Demonstration for Robot Policy Training", location: "國立中央大學教研大樓\n四樓中大創意園區" },
      { date: "2026/4/17 (五)", time: "13:00~16:30", speaker: "國立清華大學資工系\n朱宏國老師", topic: "Real World to Digital Twin Scene: Building and Augmenting Environments for Robotics", location: "國立中央大學教研大樓\n三樓未來教室" },
      { date: "2026/4/29 (三)", time: "13:00~16:30", speaker: "國立臺灣科技大學人工智慧跨域科技研究所\n潘則佑老師", topic: "Dive into Digital Twins for Robotics: Architecting with USD, Isaac Sim, and Isaac Lab", location: "國立中央大學教研大樓\n三樓未來教室" },
      { date: "2026/5/15 (五)", time: "13:00~16:30", speaker: "國立臺灣科技大學資工系\n姚智原老師", topic: "Grounding VLA Decision-Making: Integrating High-Fidelity Digital Twin Scenes for Robotic Autonomy", location: "國立中央大學教研大樓\n三樓未來教室" },
      { date: "2026/5/29 (五)", time: "13:00~16:30", speaker: "國立清華大學資工系\n洪仕軒老師", topic: "Physical Simulation: Fundamentals for Physical AI", location: "國立中央大學教研大樓\n三樓未來教室" },
      { date: "2026/6/11 (四)", time: "13:00~16:30", speaker: "國立臺灣大學資工系\n柯宗瑋老師", topic: "Learning and Planning to Act in a Physical World", location: "國立中央大學教研大樓\n四樓中大創意園區" },
    ],
    registrationLink: "https://forms.gle/4YkjiiyRtsKeZUU96"
  }
};

const openModal = (eventKey: keyof typeof eventDetails) => {
  selectedEventData.value = eventDetails[eventKey];
  isModalOpen.value = true;
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    selectedEventData.value = null;
  }, 300);
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
};

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});

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
