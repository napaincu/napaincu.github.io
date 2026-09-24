<template>
  <div class="flex flex-wrap items-center gap-2 text-xs">
    <span
      v-if="item.status"
      class="rounded-md px-2.5 py-1 font-semibold"
      :class="statusClasses[item.status] || 'bg-slate-100 text-slate-700'"
      >{{ $t(`news.status.${item.status}`) }}</span
    >
    <span
      v-if="registration"
      class="rounded-md px-2.5 py-1 font-semibold"
      :class="
        registration === 'open'
          ? 'bg-teal-100 text-teal-800'
          : 'bg-slate-100 text-slate-700'
      "
      >{{ $t(`news.registration.${registration}`) }}</span
    >
    <span v-if="item.eventStart" class="text-slate-600"
      >{{ $t("news.eventDate") }}：{{ item.eventStart
      }}<template v-if="item.eventEnd && item.eventEnd !== item.eventStart">
        – {{ item.eventEnd }}</template
      ><template v-else-if="!item.eventEnd"
        >（{{ $t("news.startDateOnly") }}）</template
      ></span
    >
    <span v-if="item.registrationDeadline" class="text-slate-600"
      >{{ $t("news.deadline") }}：{{ deadlineText }}</span
    >
  </div>
</template>
<script setup lang="ts">
import { registrationState } from "~/utils/news-state.mjs";
const props = defineProps<{
  item: {
    status?: string | null;
    registrationStatus?: string | null;
    eventStart?: string | null;
    eventEnd?: string | null;
    registrationDeadline?: string | null;
  };
}>();
const { locale } = useI18n();
const registration = computed(() => registrationState(props.item));
const statusClasses: Record<string, string> = {
  upcoming: "bg-amber-100 text-amber-800",
  ongoing: "bg-sky-100 text-sky-800",
  past: "bg-slate-100 text-slate-700",
};
const deadlineText = computed(() => {
  const value = props.item.registrationDeadline || "";
  if (!value.includes("T") || Number.isNaN(Date.parse(value))) return value;
  return (
    new Intl.DateTimeFormat(locale.value === "en" ? "en-GB" : "zh-TW", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(new Date(value)) + " (UTC+8)"
  );
});
</script>
