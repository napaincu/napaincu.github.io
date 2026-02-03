<template>
  <div
    class="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-slate-50 group"
  >
    <!-- Slider Track (Flex Container) -->
    <div
      class="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <!-- Slide 0: Custom Hero Content -->
      <div
        class="min-w-full h-full relative flex flex-col justify-center items-center bg-slate-900 overflow-hidden"
      >
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img
            src="/image/intro/hero-bg.png"
            alt="Hero Background"
            class="w-full h-full object-cover opacity-100"
          />
          <!-- Dark Overlay for better text readability -->
          <div class="absolute inset-0 bg-black/30"></div>
        </div>

        <!-- Content -->
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 scale-90 md:scale-100"
        >
          <h1
            class="text-3xl tracking-tight font-extrabold text-white sm:text-4xl md:text-5xl mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            前瞻AI技術人才培育計畫<br />
            智慧代理與實體AI機器人課程推動計畫<br />
            <span
              class="text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mt-2 block drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
              >National Agentic & Physical AI Initiative</span
            >
          </h1>

          <div class="flex flex-col items-center justify-center gap-4">
            <!-- <NuxtLink to="/curriculum" class="px-8 py-3 rounded-full flex items-center justify-center gap-2 bg-[#24292e] text-white hover:bg-slate-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium">
                        <Icon name="uil:github" size="20" /> GitHub 課程資源
                    </NuxtLink> -->
            <button
              @click="$emit('open-modal')"
              class="w-full sm:w-auto px-8 py-3 rounded-full flex items-center justify-center gap-2 bg-[#28a745] text-white hover:bg-green-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <Icon name="heroicons:user-plus" size="20" /> 申請加入專業社群
            </button>
            <button
              @click="scrollToAbout"
              class="w-full sm:w-auto px-8 py-3 rounded-full flex items-center justify-center gap-2 bg-white text-[#004d80] hover:bg-slate-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium border border-blue-100"
            >
              <Icon name="heroicons:arrow-down-circle" size="20" /> 瀏覽計畫介紹
            </button>
          </div>
        </div>
      </div>

      <!-- Slide 1 to N: Image Slides -->
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="min-w-full h-full relative"
      >
        <!-- 1. Blurred Background Layer -->
        <div class="absolute inset-0 overflow-hidden bg-slate-900">
          <img
            :src="slide"
            alt=""
            class="w-full h-full object-cover blur-3xl scale-110 opacity-50 brightness-50"
          />
        </div>

        <!-- 2. Main Image Layer -->
        <div class="relative w-full h-full flex items-center justify-center">
          <img
            :src="slide"
            alt="Intro Slide"
            class="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      @click="manualPrev"
      class="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-black/10 hover:bg-black/30 text-slate-800 hover:text-white p-2 rounded-full backdrop-blur-sm transition-all focus:outline-none"
    >
      <Icon name="heroicons:chevron-left" class="w-8 h-8 md:w-10 md:h-10" />
    </button>
    <button
      @click="manualNext"
      class="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-black/10 hover:bg-black/30 text-slate-800 hover:text-white p-2 rounded-full backdrop-blur-sm transition-all focus:outline-none"
    >
      <Icon name="heroicons:chevron-right" class="w-8 h-8 md:w-10 md:h-10" />
    </button>

    <!-- Indicators -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2"
    >
      <!-- Custom indicator logic: Total items = slides.length + 1 (for the hero slide) -->
      <button
        v-for="i in slides.length + 1"
        :key="'indicator-' + i"
        @click="goToSlide(i - 1)"
        class="h-1.5 rounded-full transition-all duration-300 focus:outline-none shadow-sm backdrop-blur-sm border border-white/20"
        :class="
          currentSlide === i - 1
            ? 'w-12 bg-[#004d80]'
            : 'w-6 bg-[#004d80]/20 hover:bg-[#004d80]/50'
        "
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const slides = ["/image/intro/推動策略.png", "/image/intro/共創課程模組.png"];

const currentSlide = ref(0);
// Total slides = 1 (Hero) + 11 (Images) = 12
const totalSlides = slides.length + 1;
let slideInterval: any = null;
let resumeTimeout: any = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides;
};

const manualNext = () => {
  nextSlide();
  pauseOnInteraction();
};

const manualPrev = () => {
  prevSlide();
  pauseOnInteraction();
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  pauseOnInteraction();
};

const pauseOnInteraction = () => {
  stopTimer();
  if (resumeTimeout) clearTimeout(resumeTimeout);
  // Resume auto-play after 30 seconds
  resumeTimeout = setTimeout(startTimer, 30000);
};

const startTimer = () => {
  stopTimer(); // Ensure no duplicate intervals
  slideInterval = setInterval(nextSlide, 8000); // 8 seconds per slide
};

const stopTimer = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
};

const scrollToAbout = () => {
  const element = document.getElementById("about");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  stopTimer();
  if (resumeTimeout) clearTimeout(resumeTimeout);
});

// Define emits
defineEmits(["open-modal"]);
</script>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
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
