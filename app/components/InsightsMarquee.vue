<template>
  <div
    v-if="latest.length"
    class="border-b border-teal-100 bg-gradient-to-r from-teal-50 via-white to-teal-50"
  >
    <div
      class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6 lg:px-8"
    >
      <span
        class="hidden shrink-0 items-center gap-1.5 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white sm:inline-flex"
      >
        <Icon name="heroicons:sparkles" class="h-3.5 w-3.5" />
        {{ $t("insights.pageTitle") }}
      </span>

      <!-- 把 N 則接成一條，再複製兩份接龍：捲到 -50% 時剛好回到起點，看起來是無縫循環 -->
      <div class="marquee relative min-w-0 flex-1">
        <div
          class="marquee__track flex w-max"
          :style="{ animationDuration: duration }"
        >
          <div
            v-for="copy in 2"
            :key="copy"
            class="flex items-center pr-16"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <template v-for="(item, index) in latest" :key="item.path">
              <span
                v-if="index > 0"
                class="mx-6 h-3.5 w-px shrink-0 bg-teal-300"
                aria-hidden="true"
              ></span>
              <NuxtLink
                :to="item.path"
                :tabindex="copy === 2 ? -1 : undefined"
                class="flex items-center gap-2 whitespace-nowrap text-sm hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <span class="font-semibold text-slate-800">{{
                  item.title
                }}</span>
                <span class="text-teal-500" aria-hidden="true">·</span>
                <span class="text-slate-600">{{ item.description }}</span>
                <Icon
                  name="heroicons:arrow-right"
                  class="h-4 w-4 shrink-0 text-teal-600"
                />
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 首頁跑馬燈輪播最新幾則前沿新知
const LATEST_COUNT = 3;

const { locale } = useI18n();

const collection = computed(() =>
  locale.value === "en" ? "insights_en" : "insights",
);

const { data: items } = await useAsyncData(
  () => `insights-marquee-${locale.value}`,
  () => queryCollection(collection.value).order("date", "DESC").all(),
  { watch: [collection] },
);

const latest = computed(() =>
  (items.value ?? []).filter((i) => !i.draft).slice(0, LATEST_COUNT),
);

// 文字越長捲越久，讓閱讀速度大致固定（約每秒 6 個字），下限 20 秒免得內容少時像在閃
const duration = computed(() => {
  const len = latest.value.reduce(
    (sum, i) => sum + i.title.length + (i.description?.length ?? 0),
    0,
  );
  return `${Math.max(20, Math.round(len / 6))}s`;
});
</script>

<style scoped>
.marquee {
  /* 兩側淡出，讓文字是「捲進捲出」而不是被硬切斷 */
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 2rem,
    black calc(100% - 2rem),
    transparent
  );
}

.marquee__track {
  animation-name: marquee-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* 滑鼠停留或鍵盤 focus 到任一則時暫停，方便看完整句或點進去 */
.marquee:hover .marquee__track,
.marquee:focus-within .marquee__track {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* 使用者若在系統設定關閉動態效果就不要捲，改成可以自己左右滑，三則都還讀得到 */
@media (prefers-reduced-motion: reduce) {
  .marquee {
    overflow-x: auto;
    mask-image: none;
  }

  .marquee__track {
    animation: none;
  }

  .marquee__track > div:last-child {
    display: none;
  }
}
</style>
