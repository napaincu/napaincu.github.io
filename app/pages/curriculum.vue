<template>
  <section class="py-20 bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1
        class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2 mb-6"
      >
        {{ $t("curriculum.pageTitle") }}
      </h1>

      <p
        class="text-center text-base md:text-lg text-slate-600 mb-12 max-w-3xl mx-auto"
      >
        {{ $t("curriculum.intro") }}
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div
          class="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50"
          >
            <img
              src="/image/courses/Agentic AI Curriculum.png"
              :alt="$t('curriculum.agenticModule')"
              class="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-zoom-in"
              @click="openViewer"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none"
            >
              <div
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 pointer-events-none"
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
              {{ $t("curriculum.agenticModule") }}
            </h3>
          </div>
        </div>

        <div
          class="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50"
          >
            <img
              src="/image/courses/Physical AI  Curriculum.png"
              :alt="$t('curriculum.physicalModule')"
              class="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-zoom-in"
              @click="openViewer"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none"
            >
              <div
                class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 pointer-events-none"
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
              {{ $t("curriculum.physicalModule") }}
            </h3>
          </div>
        </div>
      </div>

      <div class="space-y-6 text-left max-w-5xl mx-auto">
        <section
          class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <h2 class="text-2xl font-bold text-[#004d80] mb-3">
            {{ $t("curriculum.resourceLib") }}
          </h2>
          <p class="text-slate-600">
            {{ $t("curriculum.intro") }}
          </p>
        </section>

        <section
          class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <h2 class="text-2xl font-bold text-[#004d80] mb-3">
            {{ $t("curriculum.relatedResources") }}
          </h2>
          <p class="text-slate-600">{{ $t("curriculum.building") }}</p>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

const { t } = useI18n();

useSeoMeta({
  title: () => t("curriculum.meta.title"),
  description: () => t("curriculum.meta.description"),
});

let viewer: Viewer | null = null;

function openViewer(event: MouseEvent) {
  const target = event.currentTarget as HTMLImageElement | null;
  if (!target) return;
  destroyViewer();
  viewer = new Viewer(target, {
    navbar: false,
    title: false,
    toolbar: {
      zoomIn: true,
      zoomOut: true,
      oneToOne: true,
      reset: true,
      rotateLeft: true,
      rotateRight: true,
      flipHorizontal: true,
      flipVertical: true,
    },
    movable: true,
    zoomable: true,
    scalable: true,
    transition: true,
    keyboard: true,
  });
  viewer?.show();
}

function destroyViewer() {
  if (viewer) {
    viewer.destroy();
    viewer = null;
  }
}

onBeforeUnmount(() => {
  destroyViewer();
});
</script>
