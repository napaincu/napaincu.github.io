<template>
  <section class="py-20 bg-white min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Title -->
      <div class="text-center mb-16">
        <h1
          class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
        >
          {{ $t("faq.pageTitle") }}
        </h1>
        <p class="mt-6 text-lg text-slate-600">
          {{ $t("faq.subtitle") }}
        </p>
      </div>

      <!-- FAQ Section -->
      <div class="space-y-4">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <!-- Question Header -->
          <button
            @click="toggleItem(index)"
            class="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-white/50"
            :class="{ 'bg-white/80': isOpen(index) }"
          >
            <div class="flex items-start gap-4 flex-1">
              <!-- Q Icon -->
              <div
                class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg transition-all duration-300"
                :style="
                  isOpen(index)
                    ? 'background: linear-gradient(135deg, #2563eb 0%, #0d2252 100%);'
                    : 'background: linear-gradient(135deg, #004d80 0%, #112D6D 100%);'
                "
              >
                Q
              </div>
              <!-- Question Text -->
              <h3
                class="text-lg font-bold text-slate-800 pt-1 leading-relaxed"
                :class="{ 'text-[#004d80]': isOpen(index) }"
              >
                {{ item.question }}
              </h3>
            </div>
            <!-- Chevron Icon -->
            <div
              class="flex-shrink-0 ml-4 transition-transform duration-300"
              :class="{ 'rotate-180': isOpen(index) }"
            >
              <svg
                class="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </button>

          <!-- Answer Content -->
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-show="isOpen(index)" class="overflow-hidden">
              <div class="px-6 pb-6 pt-2">
                <div
                  class="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm border border-blue-100"
                >
                  <!-- A Icon -->
                  <div
                    class="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg"
                  >
                    A
                  </div>
                  <!-- Answer Text -->
                  <div class="flex-1 pt-1">
                    <p
                      class="text-slate-700 leading-relaxed whitespace-pre-line"
                    >
                      {{ item.answer }}
                    </p>
                    <img
                      v-if="item.image"
                      :src="item.image"
                      :alt="item.imageAlt"
                      class="mt-4 w-full h-auto rounded-lg border border-slate-200"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Additional Info Section -->
      <div
        class="mt-16 bg-gradient-to-br from-[#004d80] to-blue-700 rounded-2xl shadow-xl p-8 text-white"
      >
        <div class="text-center">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-3">{{ $t("faq.moreTitle") }}</h3>
          <p class="text-blue-100 mb-6 text-lg">
            {{ $t("faq.moreText") }}
          </p>
          <NuxtLink
            :to="localePath('/contact')"
            class="inline-flex items-center justify-center px-8 py-3 bg-white text-[#004d80] rounded-lg font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {{ $t("faq.contactCta") }}
            <svg
              class="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const { t } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
  title: () => t("faq.meta.title"),
  description: () => t("faq.meta.description"),
});

const openItems = ref<number[]>([0]); // 默認展開第一個問題

const faqItems = computed(() => [
  {
    question: t("faq.items.q1.question"),
    answer: t("faq.items.q1.answer"),
  },
  {
    question: t("faq.items.q2.question"),
    answer: t("faq.items.q2.answer"),
  },
  {
    question: t("faq.items.q3.question"),
    answer: t("faq.items.q3.answer"),
    image: "/image/faq/讀書會期程規劃.png",
    imageAlt: t("faq.items.q3.imageAlt"),
  },
  {
    question: t("faq.items.q4.question"),
    answer: t("faq.items.q4.answer"),
    image: "/image/faq/讀書會的預期成果.png",
    imageAlt: t("faq.items.q4.imageAlt"),
  },
]);

const toggleItem = (index: number) => {
  const itemIndex = openItems.value.indexOf(index);
  if (itemIndex > -1) {
    openItems.value.splice(itemIndex, 1);
  } else {
    openItems.value.push(index);
  }
};

const isOpen = (index: number) => openItems.value.includes(index);
</script>
