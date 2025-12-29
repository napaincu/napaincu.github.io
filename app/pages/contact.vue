<template>
    <section class="py-20 bg-slate-50 min-h-screen">
         <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
             <div class="text-center mb-12">
                 <h1 class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2">聯絡我們</h1>
             </div>
             
             <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                 <div class="space-y-6 text-lg text-slate-700">
                     <div class="flex items-start gap-4">
                         <div class="w-12 h-12 bg-blue-100 rounded-full text-blue-600 shrink-0 flex items-center justify-center">
                             <Icon name="heroicons:map-pin" size="24" />
                         </div>
                         <div>
                             <strong class="block text-slate-900 mb-1">計畫辦公室</strong>
                             國立中央大學 工程五館 B317-1室
                         </div>
                     </div>
                     <div class="flex items-start gap-4">
                         <div class="w-12 h-12 bg-blue-100 rounded-full text-blue-600 shrink-0 flex items-center justify-center">
                             <Icon name="heroicons:phone" size="24" />
                         </div>
                         <div>
                             <strong class="block text-slate-900 mb-1">電話</strong>
                             (03)422-7151 轉 35364 / 35365
                         </div>
                     </div>
                     <div class="flex items-start gap-4">
                         <div class="w-12 h-12 bg-blue-100 rounded-full text-blue-600 shrink-0 flex items-center justify-center">
                             <Icon name="heroicons:envelope" size="24" />
                         </div>
                         <div>
                             <strong class="block text-slate-900 mb-1">信箱</strong>
                             <a href="mailto:napai.ncu@gmail.com" class="text-blue-600 hover:underline">napai.ncu@gmail.com</a>
                         </div>
                     </div>
                 </div>

                 <div class="mt-8 pt-8 border-t border-slate-100 bg-orange-50 border-orange-200 border-dashed rounded-xl p-6 text-center">
                     <strong class="block text-orange-800 mb-2">已經是成員但找不到 Discord 或 Notion 連結？</strong>
                     <a href="mailto:napai.ncu@gmail.com?subject=索取社群加入連結" class="inline-flex items-center px-6 py-2 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg mt-2 text-sm">
                         <Icon name="heroicons:question-mark-circle" class="mr-2" size="20" />
                         忘記社群連結？請聯繫我們
                     </a>
                 </div>
             </div>
         </div>
    </section>
</template>

<script setup lang="ts">
useHead({
  title: '聯絡我們 - 前瞻AI人培',
})
</script>
