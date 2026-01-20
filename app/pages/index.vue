<template>
  <div class="overflow-x-hidden">
    <!-- Hero Carousel -->
    <HeroCarousel @open-modal="openModal" />

    <!-- About Section (Redesigned) -->
    <section
      id="about"
      class="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      <!-- Decorative Background Elements -->
      <div
        class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5"
      >
        <div
          class="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        ></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2
            class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
          >
            計畫介紹
          </h2>
          <p class="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            因應AI技術典範轉移，培育智慧代理與實體AI領域的前瞻人才
          </p>
        </div>

        <!-- Main Content Cards -->
        <div class="space-y-6">
          <!-- Background Card -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">計畫緣起</h3>
              </div>
            </div>
            <div class="p-8 space-y-6">
              <!-- 開場段落 -->
              <div class="relative">
                <div
                  class="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
                ></div>
                <p
                  class="text-base md:text-lg text-slate-700 leading-relaxed text-justify pl-4"
                >
                  近年來，AI 技術快速發展，<span
                    class="font-semibold text-[#004d80]"
                    >模型能力與模擬成果不斷突破</span
                  >，然而多數 AI 教育與訓練仍停留在「<span
                    class="font-semibold text-orange-600"
                    >模型使用</span
                  >」與「<span class="font-semibold text-orange-600"
                    >理想化模擬</span
                  >」階段。當 AI
                  系統真正走入真實生活與產業場景時，往往才發現<span
                    class="font-bold text-red-600"
                    >挑戰才正要開始</span
                  >。
                </p>
              </div>

              <!-- 雙重挑戰區塊 -->
              <div class="grid md:grid-cols-2 gap-4">
                <!-- 實體系統挑戰 -->
                <div
                  class="relative p-5 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-xl border border-orange-200 shadow-sm"
                >
                  <div class="flex items-center gap-2 mb-3">
                    <div
                      class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <svg
                        class="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        ></path>
                      </svg>
                    </div>
                    <h4 class="text-base md:text-lg font-bold text-orange-900">
                      實體系統的真實落差
                    </h4>
                  </div>
                  <p class="text-base text-slate-700 leading-relaxed">
                    在模擬環境中可順利完成的任務，一旦接上實體設備，便會面臨<span
                      class="font-semibold text-orange-700"
                      >馬達誤差、感測雜訊、反應延遲與環境不確定性</span
                    >。
                  </p>
                </div>

                <!-- 應用情境挑戰 -->
                <div
                  class="relative p-5 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-200 shadow-sm"
                >
                  <div class="flex items-center gap-2 mb-3">
                    <div
                      class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <svg
                        class="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>
                    </div>
                    <h4 class="text-base md:text-lg font-bold text-blue-900">
                      動態情境的複雜需求
                    </h4>
                  </div>
                  <p class="text-base text-slate-700 leading-relaxed">
                    在日常生活中，問題往往是<span
                      class="font-semibold text-blue-700"
                      >多面向且動態變化</span
                    >的，需要同時考量使用者需求、情境判斷與資源限制，而非單一指令即可解決。
                  </p>
                </div>
              </div>

              <!-- 核心洞察 -->
              <div
                class="p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-xl border-l-4 border-purple-500 shadow-sm"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  >
                    <svg
                      class="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p
                      class="text-base md:text-lg text-slate-800 leading-relaxed font-medium mb-3"
                    >
                      許多應用型 AI 並非單純「回答問題」，而是必須<span
                        class="font-bold text-purple-700"
                        >從使用者角度出發</span
                      >，理解需求、拆解任務並持續調整行動策略。
                    </p>
                    <p class="text-base text-slate-700 leading-relaxed">
                      顯示當前 Agent
                      開發所欠缺的，往往不是模型能力，而是來自<span
                        class="font-semibold text-purple-600"
                        >真實使用情境的經驗與系統整合能力</span
                      >。
                    </p>
                  </div>
                </div>
              </div>

              <!-- NAPAI 的定位 -->
              <div
                class="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 shadow-sm"
              >
                <p
                  class="text-base md:text-lg text-slate-800 leading-relaxed mb-5"
                >
                  因此，<span class="font-bold text-[#004d80] text-xl"
                    >NAPAI</span
                  >
                  將 AI 人才培育的重心，聚焦於
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold text-base"
                    >Agentic AI</span
                  >
                  與
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-semibold text-base"
                    >Physical AI</span
                  >
                  兩大前瞻主軸：
                </p>
                <div class="grid md:grid-cols-2 gap-3 mb-4">
                  <div
                    class="flex items-start gap-2 p-3 bg-white rounded-lg border border-blue-100"
                  >
                    <svg
                      class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p class="text-base text-slate-700">
                      培育能<span class="font-semibold text-blue-700"
                        >主動推理、規劃並回應使用者需求</span
                      >的智慧代理能力
                    </p>
                  </div>
                  <div
                    class="flex items-start gap-2 p-3 bg-white rounded-lg border border-purple-100"
                  >
                    <svg
                      class="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p class="text-base text-slate-700">
                      培育能<span class="font-semibold text-purple-700"
                        >面對真實世界限制，將 AI 落實於實體系統</span
                      >中的實作能力
                    </p>
                  </div>
                </div>
                <p class="text-base text-slate-700 leading-relaxed">
                  透過這兩大主軸的整合，NAPAI
                  致力培育能跨越模型、模擬與真實世界落差，<span
                    class="font-bold text-[#004d80]"
                    >真正解決現實問題</span
                  >的前瞻 AI 技術人才。
                </p>
              </div>

              <!-- 結語強調 -->
              <div
                class="relative p-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
                ></div>
                <div class="relative flex items-center gap-3">
                  <svg
                    class="w-8 h-8 text-white flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                  <p
                    class="text-white font-bold text-xl md:text-2xl leading-relaxed"
                  >
                    AI 的下一步，不只是更強的模型，而是能<span
                      class="underline decoration-2 underline-offset-2"
                      >理解真實需求、並在真實世界中行動</span
                    >的系統。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Goals Card -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div
              class="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">計畫目標</h3>
              </div>
            </div>
            <div class="p-8">
              <p
                class="text-base md:text-lg text-slate-700 leading-relaxed mb-8"
              >
                NAPAI 採取「<span class="font-bold text-[#004d80]"
                  >少而精、重實效</span
                >」的策略，鎖定兩大技術主軸，整合種子師資培訓、課程模組共創、示範課程試行、學生實作競賽與社群經營等面向。
              </p>

              <!-- Key Features Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div
                  class="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100"
                >
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-base font-semibold text-slate-800">
                      開源教材平台
                    </p>
                    <p class="text-sm text-slate-600 mt-1">
                      共編課程地圖與 GitHub 課程庫
                    </p>
                  </div>
                </div>

                <div
                  class="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100"
                >
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-base font-semibold text-slate-800">
                      前瞻技術視野
                    </p>
                    <p class="text-sm text-slate-600 mt-1">
                      培育跨域實作能力的 AI 專業人才
                    </p>
                  </div>
                </div>

                <div
                  class="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100"
                >
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-base font-semibold text-slate-800">
                      師資能量提升
                    </p>
                    <p class="text-sm text-slate-600 mt-1">
                      強化教師教學與實務能量
                    </p>
                  </div>
                </div>

                <div
                  class="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-white rounded-lg border border-orange-100"
                >
                  <div
                    class="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-base font-semibold text-slate-800">
                      社群支持系統
                    </p>
                    <p class="text-sm text-slate-600 mt-1">
                      建立可擴散、可維護的課程模組
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="p-6 bg-gradient-to-r from-purple-50 to-slate-50 rounded-xl border-l-4 border-purple-500"
              >
                <p class="text-base md:text-lg text-slate-700 leading-relaxed">
                  透過實作專題與競賽，引導學生關注真實產業情境與社會需求，為臺灣未來
                  AI 產業與智慧應用發展<span
                    class="font-semibold text-[#004d80]"
                    >奠定扎實的人才基礎</span
                  >。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Modal -->
    <Teleport to="body">
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-[2000]">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative"
                >
                  <button
                    @click="closeModal"
                    class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Icon name="heroicons:x-mark" size="24" />
                  </button>

                  <div class="flex flex-col items-center text-center">
                    <div class="mb-4 text-[#004d80]">
                      <Icon name="fa6-solid:user-plus" size="48" />
                    </div>
                    <DialogTitle
                      as="h3"
                      class="text-2xl font-bold leading-6 text-slate-900 mb-4"
                    >
                      申請加入師資社群
                    </DialogTitle>

                    <div class="mt-2">
                      <p class="text-sm text-slate-500">
                        本計畫之 Discord 與 Notion
                        平台僅開放予<strong>計畫相關教師與研究人員</strong>。請點擊下方按鈕填寫申請表單，經核核後我們將發送邀請連結至您的信箱。
                      </p>
                    </div>

                    <div class="mt-6 flex flex-col w-full gap-3">
                      <a
                        href="https://forms.gle/NgfvhPfsbohyMacYA"
                        target="_blank"
                        class="inline-flex justify-center rounded-md border border-transparent bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-colors"
                      >
                        前往填寫申請表單
                      </a>
                      <button
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 transition-colors"
                        @click="closeModal"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

// Add animation keyframes for the blob effect
</script>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
@keyframes blob {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  33% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  66% {
    transform: translate(-50%, -50%) scale(0.9);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
