<template>
  <div
    class="py-20 bg-slate-50 min-h-screen text-center max-w-7xl mx-auto px-4"
  >
    <h1
      class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
    >
      {{ $t("community.pageTitle") }}
    </h1>
    <p class="text-xl text-slate-600 mt-6 mb-12">
      {{ $t("community.subtitle") }}
    </p>

    <nav class="mb-8 flex flex-wrap justify-center gap-3 text-sm font-semibold">
      <a
        href="#featured-video"
        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
        >{{ $t("community.nav.video") }}</a
      >
      <a
        href="#activity-gallery"
        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
        >{{ $t("community.nav.recap") }}</a
      >
      <a
        href="#community-links"
        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
        >{{ $t("community.nav.links") }}</a
      >
      <a
        href="#fb-feed"
        class="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
        >{{ $t("community.nav.fb") }}</a
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
            <h2 class="text-2xl font-bold text-slate-800">
              {{ $t("community.videoHeading") }}
            </h2>
          </div>

          <div
            class="overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
          >
            <iframe
              :src="featuredVideo.embedUrl"
              class="aspect-video w-full"
              :title="$t('community.videoIframeTitle')"
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
            <h2 class="text-2xl font-bold text-slate-800">
              {{ $t("community.galleryHeading") }}
            </h2>
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
              <span class="text-xs font-semibold text-slate-500">{{
                $t("community.photoCount", { count: album.count })
              }}</span>
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
                  :alt="$t('community.photoAlt', { title: album.title, index: i })"
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
          <button
            type="button"
            @click="openModal"
            class="w-full px-8 py-4 rounded-xl flex items-center justify-center gap-3 bg-teal-600 text-white hover:bg-teal-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold text-lg"
          >
            <Icon name="heroicons:user-plus" size="24" />
            {{ $t("community.applyBtn") }}
          </button>

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
                {{ $t("community.discordTitle") }}
              </h3>
              <p class="text-slate-600">{{ $t("community.discordDesc") }}</p>
            </div>
          </a>

          <a
            id="notion-links"
            href="https://www.notion.so/Agentic-AI-2fee05e67dac801a8436c5c6d5a67b92?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            class="scroll-mt-24 flex items-center p-6 sm:p-8 rounded-xl border border-slate-200 transition-all bg-white hover:shadow-lg hover:-translate-y-1 hover:border-teal-200 group gap-6"
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
                {{ $t("community.agenticKbTitle") }}
              </h3>
              <p class="text-slate-600">{{ $t("community.agenticKbDesc") }}</p>
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
                {{ $t("community.physicalKbTitle") }}
              </h3>
              <p class="text-slate-600">{{ $t("community.physicalKbDesc") }}</p>
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
              <h3 class="text-xl font-bold text-teal-800">
                {{ $t("community.fbHeading") }}
              </h3>
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
                      {{ $t("community.modal.title") }}
                    </DialogTitle>

                    <div class="mt-2">
                      <p
                        class="text-sm text-slate-500"
                        v-html="$t('community.modal.body')"
                      ></p>
                    </div>

                    <div class="mt-6 flex flex-col w-full gap-3">
                      <a
                        href="https://forms.gle/iGk76DXyyu38U2Be8"
                        target="_blank"
                        class="inline-flex justify-center rounded-md border border-transparent bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-colors"
                      >
                        {{ $t("community.modal.submit") }}
                      </a>
                      <button
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 transition-colors"
                        @click="closeModal"
                      >
                        {{ $t("community.modal.cancel") }}
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
            :alt="$t('community.lightboxAlt')"
            class="w-full h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const { t } = useI18n();

const featuredVideo = {
  url: "https://www.youtube.com/watch?v=HYTb4kH9JlA",
  embedUrl: "https://www.youtube.com/embed/HYTb4kH9JlA",
};

const activityAlbums = computed(() => [
  {
    key: "agentic-forum-0209",
    title: t("community.albums.agenticForum0209"),
    folder: "/image/activity/agentic_forum_0209",
    count: 10,
  },
]);

useSeoMeta({
  title: () => t("community.meta.title"),
  description: () => t("community.meta.description"),
});

// Join Modal State
const isOpen = ref(false);
const openModal = () => {
  isOpen.value = true;
};
const closeModal = () => {
  isOpen.value = false;
};

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
