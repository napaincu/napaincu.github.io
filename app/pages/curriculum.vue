<template>
  <section class="py-20 bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1
        class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2 mb-6"
      >
        課程專區
      </h1>

      <!-- Description -->
      <p
        class="text-center text-base md:text-lg text-slate-600 mb-12 max-w-3xl mx-auto"
      >
        歡迎加入專業社群共編課程，以取得完整教材資料。
      </p>

      <!-- Curriculum Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Agentic AI Curriculum Card -->
        <div
          @click="
            openImageModal(
              '/image/courses/Agentic AI Curriculum.png',
              'Agentic AI 課程模組',
            )
          "
          class="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
          <div
            class="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50"
          >
            <img
              src="/image/courses/Agentic AI Curriculum.png"
              alt="Agentic AI 課程模組"
              class="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center"
            >
              <div
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3"
              >
                <Icon
                  name="heroicons:magnifying-glass-plus"
                  size="32"
                  class="text-[#004d80]"
                />
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl md:text-2xl font-bold text-[#004d80] mb-3">
              Agentic AI 課程模組
            </h3>
            <p class="text-base text-slate-600 leading-relaxed">
              智慧代理系統設計與開發，培養學生主動推理、規劃並回應使用者需求的能力。
            </p>
          </div>
        </div>

        <!-- Physical AI Curriculum Card -->
        <div
          @click="
            openImageModal(
              '/image/courses/Physical AI  Curriculum.png',
              'Physical AI 課程模組',
            )
          "
          class="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
          <div
            class="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50"
          >
            <img
              src="/image/courses/Physical AI  Curriculum.png"
              alt="Physical AI 課程模組"
              class="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center"
            >
              <div
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3"
              >
                <Icon
                  name="heroicons:magnifying-glass-plus"
                  size="32"
                  class="text-[#004d80]"
                />
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl md:text-2xl font-bold text-[#004d80] mb-3">
              Physical AI 課程模組
            </h3>
            <p class="text-base text-slate-600 leading-relaxed">
              實體AI機器人系統整合，培育學生將AI落實於真實世界的實作能力。
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <Teleport to="body">
      <TransitionRoot appear :show="isModalOpen" as="template">
        <Dialog as="div" @close="closeImageModal" class="relative z-[2000]">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="fixed inset-0 bg-black/80 backdrop-blur-sm"
              @click="closeImageModal"
            />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="relative max-w-7xl w-full">
                  <!-- Close Button -->
                  <button
                    @click="closeImageModal"
                    class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                  >
                    <Icon name="heroicons:x-mark" size="32" />
                  </button>

                  <!-- Image -->
                  <div class="bg-white rounded-lg overflow-hidden shadow-2xl">
                    <img
                      :src="selectedImage"
                      :alt="selectedImageTitle"
                      class="w-full h-auto object-contain max-h-[85vh]"
                    />
                  </div>

                  <!-- Image Title -->
                  <div v-if="selectedImageTitle" class="text-center mt-4">
                    <h3 class="text-xl font-bold text-white">
                      {{ selectedImageTitle }}
                    </h3>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

useHead({
  title: "課程專區 - 前瞻AI人培",
});

const isModalOpen = ref(false);
const selectedImage = ref("");
const selectedImageTitle = ref("");

function openImageModal(imageSrc: string, imageTitle: string) {
  selectedImage.value = imageSrc;
  selectedImageTitle.value = imageTitle;
  isModalOpen.value = true;
}

function closeImageModal() {
  isModalOpen.value = false;
}
</script>
