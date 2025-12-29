<template>
  <div class="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center p-6 h-full relative">
    <div class="relative w-32 h-32 mb-4">
      <div class="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      <img :src="props.image" :alt="props.name" class="w-full h-full object-cover rounded-full border-4 border-blue-50 shadow-md group-hover:border-blue-200 transition-colors duration-300" loading="lazy">
    </div>
    
    <h4 class="text-xl font-bold text-[#004d80] mb-1 group-hover:text-blue-600 transition-colors">{{ props.name }}</h4>
    <p class="text-sm font-semibold text-blue-500 mb-3 text-center min-h-[1.25rem]">{{ props.title }}</p>
    
    <div class="text-slate-600 text-sm leading-relaxed text-left w-full flex-grow">
      <slot name="description">
          {{ props.description }}
      </slot>
    </div>

    <div v-if="props.link" class="mt-4 pt-4 border-t border-slate-100 w-full text-center">
        <a :href="props.link" target="_blank" class="text-xs font-medium text-blue-500 hover:text-blue-700 flex items-center justify-center gap-1">
            個人網頁 <span aria-hidden="true">&rarr;</span>
        </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, default: '' },
  link: { type: String, default: '' }
})
</script>
