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

      <div data-landmark="curriculum" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
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
          <p class="text-slate-600 mb-6">
            {{ $t("curriculum.intro") }}
          </p>

          <div
            v-for="(group, groupIndex) in resourceGroups"
            :key="group.title"
            :class="groupIndex > 0 ? 'mt-8' : ''"
          >
            <h3 class="text-lg font-semibold text-slate-800 mb-3">
              {{ group.title }}
            </h3>
            <ul class="space-y-2">
              <li v-for="entry in group.items" :key="entry.url">
                <a
                  :href="entry.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#004d80] text-sm font-bold text-white"
                  >
                    <!-- 讀書會有場次編號，工作坊沒有，就用圖示佔同樣的位置 -->
                    <template v-if="entry.no">{{ entry.no }}</template>
                    <Icon
                      v-else
                      name="heroicons:academic-cap"
                      class="h-4 w-4"
                    />
                  </span>
                  <span class="flex-1 text-slate-700 group-hover:text-[#004d80]">
                    {{ entry.label }}
                  </span>
                  <Icon
                    name="heroicons:arrow-top-right-on-square"
                    class="h-5 w-5 shrink-0 text-slate-400 group-hover:text-blue-600"
                  />
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section
          class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <h2 class="text-2xl font-bold text-[#004d80] mb-3">
            {{ $t("curriculum.relatedResources") }}
          </h2>
          <p class="text-slate-600 mb-6">
            {{ $t("curriculum.communityIntro") }}
          </p>

          <!-- 社群入口：原本放在 /community，該頁下架後移到這裡 -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              v-for="link in communityLinks"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex flex-col items-start gap-3 rounded-xl border border-slate-200 p-5 transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Icon
                :name="link.icon"
                size="40"
                class="shrink-0 transition-all duration-300"
                :class="
                  link.icon === 'logos:notion-icon'
                    ? 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100'
                    : ''
                "
              />
              <h3
                class="text-lg font-bold text-slate-800 transition-colors group-hover:text-teal-700"
              >
                {{ $t(link.title) }}
              </h3>
              <p class="text-sm text-slate-600">{{ $t(link.desc) }}</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

const { t, locale } = useI18n();

// 2026 暑期工作坊
const summerWorkshops = [
  {
    label:
      "2026 Summer Camp: Deploying Imitation Learning across Virtual and Physical Platforms: A Guided Guide to Data Collection and Testing",
    url: "https://app.notion.com/p/2026-Summer-Camp_Deploying-Imitation-Learning-across-Virtual-and-Physical-Platforms-A-Guided-Guide--3bce05e67dac80bb9e7ff3d67befa334",
  },
  {
    label: "2026 Summer Camp: Wildbot Workshop",
    url: "https://app.notion.com/p/2026-Summer-Camp_Wildbot-3d5e05e67dac80fc8593db69a09732e4",
  },
];

// SIGRobot 讀書會各場次的 Notion 共筆（標題用演講主題，與 /news 的消息稿一致）
const sigrobotSessions = [
  {
    no: 1,
    topic: "Learning from Humans",
    url: "https://app.notion.com/p/NAPAI-SIGRobot-1_2026-4-1-38be05e67dac80c29509ea4604c322d1",
  },
  {
    no: 2,
    topic: "Real World to Digital Twin Scene",
    url: "https://app.notion.com/p/NAPAI-SIGRobot-2_2026-4-17-343e05e67dac80829c45fa9cf7de814c",
  },
  {
    no: 3,
    topic: "Dive into Digital Twins for Robotics",
    url: "https://app.notion.com/p/NAPAI-SIGRobot-3_2026-4-29-34ae05e67dac80ab9fd8fbc55013fa1b",
  },
  {
    no: 4,
    topic: "Grounding VLA Decision-Making",
    url: "https://app.notion.com/p/NAPAI-SIGRobot-4_2026-5-15-35fe05e67dac80cdb963c75a3426d80e",
  },
  {
    no: 5,
    topic: "Physical Simulation Fundamentals",
    url: "https://app.notion.com/p/NAPAI-SIGRobot-5_2026-5-29-36de05e67dac80e9a0e4ff5850d5872f",
  },
  {
    no: 6,
    topic: "Learning and Planning to Act in a Physical World",
    url: "https://app.notion.com/p/NAPAI-SIGRobot-6_2026-6-11-37ae05e67dac80228e6feb06e03cae7c",
  },
];

// SIGAgent 讀書會。第 3、4 場的主題中英文不同，另外記 topicEn；
// 其餘各場中英一致，就只留 topic
const sigagentSessions = [
  {
    no: 1,
    topic: "Building Agentic AI RAG Systems",
    url: "https://app.notion.com/p/NAPAI-SIGAgent-1_Building-Agentic-AI-RAG-Systems-with-Memory-Architectures-and-Context-Engineering-33be05e67dac8086b326fba8e6cca243",
  },
  {
    no: 2,
    topic: "Writing is Coding",
    url: "https://app.notion.com/p/NAPAI-SIGAgent-2_Writing-is-Coding-AI-343e05e67dac803a9305d56e6d50f139",
  },
  {
    no: 3,
    topic: "機器學習初探",
    topicEn: "Machine Learning: An Introduction",
    url: "https://app.notion.com/p/NAPAI-SIGAgent-3_-352e05e67dac808aac4ddaa1e9f8b293",
  },
  {
    no: 4,
    topic: "用 MCP 打造大學智慧問答 Agent",
    topicEn: "Building a Campus Q&A Agent with MCP",
    url: "https://app.notion.com/p/NAPAI-SIGAgent-4_MCP-LLM-MCP-364e05e67dac80e3be0ffaa1afdf089c",
  },
  {
    no: 5,
    topic: "Human-AI Collaboration",
    url: "https://app.notion.com/p/NAPAI-SIGAgent-5_Human-AI-Collaboration-HRI-AIMR-AI-373e05e67dac8076b014f405fa368626",
  },
  {
    no: 6,
    topic: "How Language Enables Thinking and Coordination",
    url: "https://app.notion.com/p/NAPAI-SIGAgent-6_-Agent-Agentic-AI-37ce05e67dac8044baafc600a4b2c13b",
  },
  {
    no: 7,
    topic: "AI Governance and Sustainable AI",
    url: "https://app.notion.com/p/NAPAI-SIGAgent-7_AI-Governance-AI-382e05e67dac80968293e7e3aabba86e",
  },
];

// 課程資源庫的分區與排序：暑期工作坊 → SIGRobot → SIGAgent
const resourceGroups = computed(() => [
  {
    title: t("curriculum.summerWorkshops"),
    items: summerWorkshops,
  },
  {
    title: t("curriculum.sigrobotSeries"),
    items: sigrobotSessions.map((s) => ({
      ...s,
      label: `NAPAI SIGRobot #${s.no}｜${s.topic}`,
    })),
  },
  {
    title: t("curriculum.sigagentSeries"),
    items: sigagentSessions.map((s) => ({
      ...s,
      label: `NAPAI SIGAgent #${s.no}｜${
        locale.value === "en" && s.topicEn ? s.topicEn : s.topic
      }`,
    })),
  },
]);

// 沿用 community.* 的翻譯字串，/community 之後若復原，兩邊文案不會走鐘
const communityLinks = [
  {
    url: "https://discord.gg/aatUjnEKmY",
    icon: "logos:discord-icon",
    title: "community.discordTitle",
    desc: "community.discordDesc",
  },
  {
    url: "https://www.notion.so/Agentic-AI-2fee05e67dac801a8436c5c6d5a67b92?source=copy_link",
    icon: "logos:notion-icon",
    title: "community.agenticKbTitle",
    desc: "community.agenticKbDesc",
  },
  {
    url: "https://www.notion.so/Physical-AI-2fee05e67dac803a827ceeee5ffec64d?source=copy_link",
    icon: "logos:notion-icon",
    title: "community.physicalKbTitle",
    desc: "community.physicalKbDesc",
  },
];

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
