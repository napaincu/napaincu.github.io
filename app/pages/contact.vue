<template>
  <section class="py-20 bg-slate-50 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1
          class="text-4xl font-bold text-[#004d80] inline-block relative after:content-[''] after:block after:w-2/3 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
        >
          {{ $t("contact.pageTitle") }}
        </h1>
      </div>

      <div data-landmark="contact" class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div class="space-y-6 text-lg text-slate-700">
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 bg-blue-100 rounded-full text-blue-600 shrink-0 flex items-center justify-center"
            >
              <Icon name="heroicons:map-pin" size="24" />
            </div>
            <div>
              <strong class="block text-slate-900 mb-1">{{
                $t("contact.office")
              }}</strong>
              {{ $t("contact.officeAddr") }}
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 bg-blue-100 rounded-full text-blue-600 shrink-0 flex items-center justify-center"
            >
              <Icon name="heroicons:phone" size="24" />
            </div>
            <div>
              <strong class="block text-slate-900 mb-1">{{
                $t("contact.phone")
              }}</strong>
              {{ $t("contact.phoneValue") }}
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 bg-blue-100 rounded-full text-blue-600 shrink-0 flex items-center justify-center"
            >
              <Icon name="heroicons:envelope" size="24" />
            </div>
            <div>
              <strong class="block text-slate-900 mb-1">{{
                $t("contact.email")
              }}</strong>
              <a
                href="mailto:napai.ncu@gmail.com"
                class="text-blue-600 hover:underline"
                >napai.ncu@gmail.com</a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Google Map -->
      <div
        class="mt-12 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-2"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.969518109097!2d121.18294759678957!3d24.967151700000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346823ec9d6d4167%3A0xf1c9f93ab06af735!2z5ZyL56uL5Lit5aSu5aSn5a24IOW3peeoi-S6lOmkqA!5e0!3m2!1szh-TW!2stw!4v1767013513544!5m2!1szh-TW!2stw"
          class="w-full h-[450px] rounded-xl"
          style="border: 0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        >
        </iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t("contact.meta.title"),
  description: () => t("contact.meta.description"),
});
</script>
