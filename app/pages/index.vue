<template>
    <div class="overflow-x-hidden">
        
        <!-- Hero Carousel -->
        <HeroCarousel @open-modal="openModal" />

        <!-- About Section (Redesigned) -->
        <section id="about" class="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            <!-- Decorative Background Elements -->
            <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <div class="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                <div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2">計畫介紹</h2>
                    <p class="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">因應AI技術典範轉移，培育智慧代理與實體AI領域的前瞻人才</p>
                </div>

                <!-- Main Content Cards -->
                <div class="space-y-6">
                    <!-- Background Card -->
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h3 class="text-2xl font-bold text-white">計畫緣起</h3>
                            </div>
                        </div>
                        <div class="p-8">
                            <p class="text-slate-700 leading-relaxed text-justify">
                                面對<span class="font-semibold text-[#004d80]">生成式AI、Agentic AI 與 AI 機器人技術</span>快速演進，全球對能夠結合理論、系統開發與實務應用的 AI 專業人才需求大幅提升。臺灣長期在半導體與資通訊產業具備關鍵優勢，但在 AI 應用落地與跨域整合上，仍面臨「<span class="font-semibold text-orange-600">技術更新快速、教學資源分散、軟硬體整合門檻高、以及AI治理與倫理思維尚待深化</span>」等挑戰。
                            </p>
                            <div class="mt-6 p-5 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border-l-4 border-blue-500">
                                <p class="text-slate-700 leading-relaxed">
                                    在此背景下，教育部持續推動人工智慧人才培育計畫，期望從大專校院端建立<span class="font-semibold text-[#004d80]">穩定而前瞻的人才供給管道</span>。NAPAI 系列計畫即因應臺灣在全球 AI 發展浪潮中的戰略定位而規劃，本子計畫聚焦「<span class="font-semibold text-purple-600">Agent AI 與 Physical AI</span>」，透過系統性的課程設計與教學示範，回應產業對智慧代理、智慧機器人及具跨域應用能力之 AI 人才的實際需求。
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Goals Card -->
                    <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div class="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 class="text-2xl font-bold text-white">計畫目標</h3>
                            </div>
                        </div>
                        <div class="p-8">
                            <p class="text-slate-700 leading-relaxed mb-6">
                                NAPAI 採取「<span class="font-bold text-[#004d80]">少而精、重實效</span>」的策略，鎖定兩大技術主軸，整合種子師資培訓、課程模組共創、示範課程試行、學生實作競賽與社群經營等面向。
                            </p>
                            
                            <!-- Key Features Grid -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div class="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
                                    <div class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-sm font-semibold text-slate-800">開源教材平台</p>
                                        <p class="text-xs text-slate-600 mt-1">共編課程地圖與 GitHub 課程庫</p>
                                    </div>
                                </div>
                                
                                <div class="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100">
                                    <div class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-sm font-semibold text-slate-800">前瞻技術視野</p>
                                        <p class="text-xs text-slate-600 mt-1">培育跨域實作能力的 AI 專業人才</p>
                                    </div>
                                </div>
                                
                                <div class="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100">
                                    <div class="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-sm font-semibold text-slate-800">師資能量提升</p>
                                        <p class="text-xs text-slate-600 mt-1">強化教師教學與實務能量</p>
                                    </div>
                                </div>
                                
                                <div class="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-white rounded-lg border border-orange-100">
                                    <div class="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-sm font-semibold text-slate-800">社群支持系統</p>
                                        <p class="text-xs text-slate-600 mt-1">建立可擴散、可維護的課程模組</p>
                                    </div>
                                </div>
                            </div>

                            <div class="p-5 bg-gradient-to-r from-purple-50 to-slate-50 rounded-xl border-l-4 border-purple-500">
                                <p class="text-slate-700 leading-relaxed text-sm">
                                    透過實作專題與競賽，引導學生關注真實產業情境與社會需求，為臺灣未來 AI 產業與智慧應用發展<span class="font-semibold text-[#004d80]">奠定扎實的人才基礎</span>。
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
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                            <button @click="closeModal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                                <Icon name="heroicons:x-mark" size="24" />
                            </button>
                            
                        <div class="flex flex-col items-center text-center">
                            <div class="mb-4 text-[#004d80]">
                                <Icon name="fa6-solid:user-plus" size="48" />
                            </div>
                            <DialogTitle as="h3" class="text-2xl font-bold leading-6 text-slate-900 mb-4">
                                申請加入師資社群
                            </DialogTitle>
                            
                            <div class="mt-2">
                                <p class="text-sm text-slate-500">
                                本計畫之 Discord 與 Notion 平台僅開放予<strong>計畫相關教師與研究人員</strong>。請點擊下方按鈕填寫申請表單，經核核後我們將發送邀請連結至您的信箱。
                                </p>
                            </div>
                    
                            <div class="mt-6 flex flex-col w-full gap-3">
                                <a href="https://forms.gle/https://docs.google.com/forms/d/e/1FAIpQLScMh7SUKG_XfPbzDYs9CTSwomtsRH4KGxJYmWUuUN4bDr2i5A/viewform" target="_blank" class="inline-flex justify-center rounded-md border border-transparent bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-colors">
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
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
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
    0% { transform: translate(-50%, -50%) scale(1); }
    33% { transform: translate(-50%, -50%) scale(1.1); }
    66% { transform: translate(-50%, -50%) scale(0.9); }
    100% { transform: translate(-50%, -50%) scale(1); }
}
</style>
