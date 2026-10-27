<script setup lang="ts">
import { ref } from "vue";
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from "@headlessui/vue";

const isOpen = ref(false);
</script>

<template>
  <button
    type="button"
    class="fixed bottom-5 right-5 z-[60] h-14 w-14 rounded-full bg-white shadow-lg transition hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
    aria-haspopup="dialog"
    :aria-label="$t('migration.chatTitle')"
    :title="$t('migration.chatTitle')"
    @click="isOpen = true"
  >
    <img src="/image/guide-avatar.png" alt="" class="h-full w-full rounded-full" />
  </button>

  <Dialog :open="isOpen" class="relative z-[100]" @close="isOpen = false">
    <div class="fixed inset-0 bg-slate-900/40" aria-hidden="true"></div>
    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 sm:p-6">
        <DialogPanel class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <button
            type="button"
            class="absolute right-3 top-3 rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
            :aria-label="$t('migration.close')"
            @click="isOpen = false"
          >
            <Icon name="heroicons:x-mark" class="h-5 w-5" />
          </button>
          <img src="/image/guide-avatar.png" alt="" class="mb-4 h-14 w-14 rounded-full" />
          <DialogTitle class="pr-4 text-xl font-bold text-teal-800">
            {{ $t('migration.chatTitle') }}
          </DialogTitle>
          <DialogDescription class="mt-3 text-sm leading-relaxed text-slate-600">
            {{ $t('migration.chatMessage') }}
          </DialogDescription>
          <a
            href="https://napai.ncu.edu.tw/"
            class="mt-3 inline-block break-all text-sm font-medium text-teal-700 underline underline-offset-4"
          >https://napai.ncu.edu.tw/</a>
          <div class="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              class="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
              @click="isOpen = false"
            >{{ $t('migration.close') }}</button>
            <a
              href="https://napai.ncu.edu.tw/"
              class="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
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
