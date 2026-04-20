<template>
  <div
    class="py-20 bg-slate-50 min-h-screen text-center max-w-7xl mx-auto px-4"
  >
    <h1
      class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
    >
      社群與活動
    </h1>
    <p class="text-xl text-slate-600 mt-6 mb-12">
      關注 Facebook 最新動態、活動照片回顧與 YouTube
      影音內容，並加入專屬社群平台。
    </p>

    <nav class="mb-8 flex flex-wrap justify-center gap-3 text-sm font-semibold">
      <a
        href="#featured-video"
        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
        >影音精選</a
      >
      <a
        href="#activity-gallery"
        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
        >活動回顧</a
      >
      <a
        href="#community-links"
        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
        >社群入口</a
      >
      <a
        href="#fb-feed"
        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
        >Facebook 動態</a
      >
    </nav>

    <!-- Main Content Layout -->
    <div
      class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start text-left px-4"
    >
      <!-- Left Side: Links Section -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <section
          id="featured-video"
          class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <div
            class="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100"
          >
            <Icon name="heroicons:play-circle" class="w-8 h-8 text-rose-500" />
            <h2 class="text-2xl font-bold text-slate-800">活動影音精選</h2>
          </div>

          <div
            class="overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
          >
            <iframe
              :src="featuredVideo.embedUrl"
              class="aspect-video w-full"
              title="NAPAI 活動影片"
              frameborder="0"
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
                web-share;
              "
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </section>

        <!-- Activity Recap -->
        <section
          id="activity-gallery"
          class="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <div
            class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100"
          >
            <Icon name="heroicons:camera" class="w-8 h-8 text-teal-600" />
            <h2 class="text-2xl font-bold text-slate-800">活動照片回顧</h2>
          </div>

          <div
            v-for="album in activityAlbums"
            :key="album.key"
            class="mb-8 last:mb-0"
          >
            <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 class="text-lg font-bold text-slate-800">
                {{ album.title }}
              </h3>
              <span class="text-xs font-semibold text-slate-500"
                >{{ album.count }} 張照片</span
              >
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="i in album.count"
                :key="`${album.key}-${i}`"
                class="aspect-[4/3] rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer bg-slate-50 flex items-center justify-center"
                @click="openImage(`${album.folder}/IMG_Agentic_${i}.jpg`)"
              >
                <img
                  :src="`${album.folder}/IMG_Agentic_${i}.jpg`"
                  :alt="`${album.title} 活動照片 ${i}`"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 object-[center_20%]"
                  style="
                    image-rendering: -webkit-optimize-contrast;
                    image-rendering: crisp-edges;
                  "
                />
              </div>
            </div>
          </div>
        </section>

        <section id="community-links" class="mt-4 flex flex-col gap-6">
          <a
            href="https://discord.gg/aatUjnEKmY"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center p-6 sm:p-8 rounded-xl border border-slate-200 transition-all bg-white hover:shadow-lg hover:-translate-y-1 hover:border-teal-200 group gap-6"
          >
            <Icon name="logos:discord-icon" size="56" class="flex-shrink-0" />
            <div>
              <h3
                class="text-xl md:text-2xl font-bold mb-2 text-slate-800 group-hover:text-teal-700 transition-colors"
              >
                Discord 交流社群
              </h3>
              <p class="text-slate-600">即時討論、問題解答與活動公告。</p>
            </div>
          </a>

          <a
            href="https://www.notion.so/Agentic-AI-2fee05e67dac801a8436c5c6d5a67b92?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center p-6 sm:p-8 rounded-xl border border-slate-200 transition-all bg-white hover:shadow-lg hover:-translate-y-1 hover:border-teal-200 group gap-6"
          >
            <Icon
              name="logos:notion-icon"
              size="56"
              class="flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
            />
            <div>
              <h3
                class="text-xl md:text-2xl font-bold mb-2 text-slate-800 group-hover:text-teal-700 transition-colors"
              >
                Agentic AI 知識庫
              </h3>
              <p class="text-slate-600">Agentic AI 相關課程與資源彙整。</p>
            </div>
          </a>

          <a
            href="https://www.notion.so/Physical-AI-2fee05e67dac803a827ceeee5ffec64d?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center p-6 sm:p-8 rounded-xl border border-slate-200 transition-all bg-white hover:shadow-lg hover:-translate-y-1 hover:border-teal-200 group gap-6"
          >
            <Icon
              name="logos:notion-icon"
              size="56"
              class="flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
            />
            <div>
              <h3
                class="text-xl md:text-2xl font-bold mb-2 text-slate-800 group-hover:text-teal-700 transition-colors"
              >
                Physical AI 知識庫
              </h3>
              <p class="text-slate-600">機器人 AI 相關課程與資源彙整。</p>
            </div>
          </a>
        </section>
      </div>

      <!-- Right Side: Facebook Page Plugin -->
      <div class="lg:col-span-1 flex justify-center lg:justify-end w-full">
        <!-- Sticky Wrapper -->
        <div id="fb-feed" class="sticky top-24 w-full">
          <div
            class="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-slate-200 overflow-hidden relative border-t-4 border-t-teal-500 hover:shadow-lg transition-shadow w-full max-w-[390px] text-center mx-auto lg:mx-0"
          >
            <div class="flex items-center justify-center gap-2 mb-6">
              <Icon name="logos:facebook" size="24" />
              <h3 class="text-xl font-bold text-teal-800">最新消息動態</h3>
            </div>
            <div
              class="flex justify-center w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-100"
            >
              <!-- User provided facebook iframe -->
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61587137796896&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=9790778257672194"
                width="340"
                height="500"
                style="border: none; overflow: hidden"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  picture-in-picture;
                  web-share;
                "
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Lightbox Modal -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="closeImage"
      >
        <div class="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
        <div class="relative z-10 max-w-5xl max-h-[90vh] w-full" @click.stop>
          <button
            @click="closeImage"
            class="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
          >
            <Icon name="heroicons:x-mark" class="w-8 h-8" />
          </button>
          <img
            :src="selectedImage"
            alt="活動放大照片"
            class="w-full h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";

const featuredVideo = {
  title: "NAPAI 社群首支影片",
  url: "https://www.youtube.com/watch?v=HYTb4kH9JlA",
  embedUrl: "https://www.youtube.com/embed/HYTb4kH9JlA",
};

const activityAlbums = [
  {
    key: "agentic-forum-0209",
    title: "Physical AI 技術論壇活動回顧",
    folder: "/image/activity/agentic_forum_0209",
    count: 10,
  },
];

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

// Image Lightbox State
const selectedImage = ref<string | null>(null);

const openImage = (src: string) => {
  selectedImage.value = src;
  if (typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
  }
};

const closeImage = () => {
  selectedImage.value = null;
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
};

onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});
</script>
