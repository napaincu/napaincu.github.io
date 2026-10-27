<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from "@headlessui/vue";

const sessionKey = "napai-legacy-migration-notice-shown";
const hasShown = useState("legacy-migration-notice-shown", () => false);
const isOpen = ref(false);
const newSiteLink = ref<HTMLAnchorElement | null>(null);

onMounted(() => {
  if (hasShown.value) return;
  try {
    if (sessionStorage.getItem(sessionKey) === "1") {
      hasShown.value = true;
      return;
    }
  } catch {
    // Keep navigation usable when browser storage is unavailable.
  }
  hasShown.value = true;
  isOpen.value = true;
  try {
    sessionStorage.setItem(sessionKey, "1");
  } catch {
    // Nuxt state still prevents repeat prompts during in-app navigation.
  }
});
</script>

<template>
  <Dialog :open="isOpen" :initial-focus="newSiteLink" class="relative z-[110]" @close="isOpen = false">
    <div class="fixed inset-0 bg-slate-900/40" aria-hidden="true"></div>
    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 sm:p-6">
        <DialogPanel class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <img src="/image/logos/logo-removebg_new.png" alt="NAPAI" class="mb-6 h-12 w-auto" />
          <p class="mb-2 text-xs font-semibold tracking-wide text-teal-700">{{ $t('migration.title') }}</p>
          <DialogTitle class="text-xl font-bold leading-snug text-teal-800 sm:text-2xl">
            {{ $t('migration.welcomeTitle') }}
          </DialogTitle>
          <DialogDescription class="mt-4 text-sm leading-relaxed text-slate-600">
            {{ $t('migration.welcomeMessage') }}
          </DialogDescription>
          <a href="https://napai.ncu.edu.tw/" class="mt-3 inline-block break-all text-sm font-medium text-teal-700 underline underline-offset-4">https://napai.ncu.edu.tw/</a>
          <div class="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              @click="isOpen = false"
            >{{ $t('migration.stayOnOldSite') }}</button>
            <a
              ref="newSiteLink"
              href="https://napai.ncu.edu.tw/"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              {{ $t('migration.visitNewSite') }}
              <Icon name="heroicons:arrow-right" class="h-4 w-4" />
            </a>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>
