<template>
  <div>
    <!-- Spotlight highlight over the current tour target -->
    <Teleport to="body">
      <div
        v-if="spotRect"
        class="fixed z-[55] pointer-events-none rounded-xl border-2 border-teal-300 transition-all duration-300 ease-out"
        :style="{
          top: `${spotRect.top}px`,
          left: `${spotRect.left}px`,
          width: `${spotRect.width}px`,
          height: `${spotRect.height}px`,
          boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.45), 0 0 24px rgba(45, 212, 191, 0.6)',
        }"
      ></div>
    </Teleport>

    <div class="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      <!-- Chat panel -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform translate-y-4 scale-95 opacity-0"
        enter-to-class="transform translate-y-0 scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 scale-100 opacity-100"
        leave-to-class="transform translate-y-4 scale-95 opacity-0"
      >
        <div
          v-if="isOpen"
          class="w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div
            class="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600"
          >
            <div
              class="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
            >
              <Icon name="heroicons:cpu-chip" class="h-6 w-6 text-white" />
              <span
                class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-teal-600 bg-emerald-300"
              ></span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-white truncate">
                {{ $t("guide.name") }}
              </p>
              <p class="text-xs text-teal-100 flex items-center gap-1">
                <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                {{ $t("guide.status") }}
              </p>
            </div>
            <!-- 重看導覽（互動問答模式時顯示的小按鈕） -->
            <button
              v-if="mode === 'chat'"
              type="button"
              class="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-teal-50 hover:bg-white/15 transition-colors"
              :title="$t('guide.replayTour')"
              @click="replayTour"
            >
              <Icon name="heroicons:map" class="h-4 w-4" />
              <span class="hidden sm:inline">{{ $t("guide.replayTour") }}</span>
            </button>
            <button
              type="button"
              class="rounded-full p-1.5 text-teal-100 hover:bg-white/15 hover:text-white transition-colors"
              :aria-label="$t('guide.closeLabel')"
              @click="closePanel"
            >
              <Icon name="heroicons:x-mark" class="h-5 w-5" />
            </button>
          </div>

          <!-- Messages -->
          <div
            ref="bodyEl"
            class="h-80 overflow-y-auto bg-slate-50 px-4 py-4 space-y-3"
            @click="skipTyping"
          >
            <template v-for="(m, i) in messages" :key="i">
              <!-- Agent bubble -->
              <div v-if="m.role === 'agent'" class="flex items-end gap-2">
                <div
                  class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600"
                >
                  <Icon name="heroicons:cpu-chip" class="h-4 w-4 text-white" />
                </div>
                <div class="max-w-[80%] space-y-2">
                  <div
                    class="rounded-2xl rounded-bl-sm bg-white border border-slate-200 px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 shadow-sm whitespace-pre-wrap"
                    v-html="renderMarkdown(m.text)"
                  ></div>
                  <!-- 帶路動作按鈕（① 關鍵字後備 / ② 模型指定） -->
                  <button
                    v-for="a in m.actions"
                    :key="a.id"
                    type="button"
                    class="flex w-full items-center justify-between gap-2 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-medium text-teal-700 transition hover:bg-teal-100"
                    @click="goToLandmark(a.id)"
                  >
                    <span class="flex items-center gap-1.5">
                      <Icon name="heroicons:map-pin" class="h-4 w-4" />
                      {{ a.label }}
                    </span>
                    <Icon name="heroicons:arrow-right" class="h-4 w-4" />
                  </button>
                </div>
              </div>
              <!-- User bubble -->
              <div v-else class="flex justify-end">
                <div
                  class="max-w-[80%] rounded-2xl rounded-br-sm bg-teal-600 px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm"
                >
                  {{ m.text }}
                </div>
              </div>
            </template>

            <!-- Streaming reply (chat mode) -->
            <div v-if="chatState === 'streaming'" class="flex items-end gap-2">
              <div
                class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600"
              >
                <Icon name="heroicons:cpu-chip" class="h-4 w-4 text-white" />
              </div>
              <div
                class="max-w-[80%] rounded-2xl rounded-bl-sm bg-white border border-slate-200 px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 shadow-sm whitespace-pre-wrap"
              >
                <span v-html="renderMarkdown(streamDisplay)"></span
                ><span class="guide-cursor">▍</span>
              </div>
            </div>

            <!-- Thinking indicator -->
            <div
              v-if="phase === 'thinking' || chatState === 'waiting'"
              class="flex items-end gap-2"
            >
              <div
                class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600"
              >
                <Icon name="heroicons:cpu-chip" class="h-4 w-4 text-white" />
              </div>
              <div
                class="rounded-2xl rounded-bl-sm bg-white border border-slate-200 px-4 py-3 shadow-sm flex items-center gap-1"
              >
                <span class="guide-dot" style="animation-delay: 0ms"></span>
                <span class="guide-dot" style="animation-delay: 150ms"></span>
                <span class="guide-dot" style="animation-delay: 300ms"></span>
              </div>
            </div>

            <!-- Typing bubble (character-by-character) -->
            <div v-if="phase === 'typing'" class="flex items-end gap-2">
              <div
                class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600"
              >
                <Icon name="heroicons:cpu-chip" class="h-4 w-4 text-white" />
              </div>
              <div
                class="max-w-[80%] rounded-2xl rounded-bl-sm bg-white border border-slate-200 px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 shadow-sm whitespace-pre-wrap cursor-pointer"
              >
                {{ typedText }}<span class="guide-cursor">▍</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="border-t border-slate-200 bg-white px-4 py-3">
            <!-- Chat mode: input -->
            <template v-if="mode === 'chat'">
              <form class="flex items-center gap-2" @submit.prevent="sendChat">
                <input
                  v-model="chatInput"
                  type="text"
                  :maxlength="500"
                  :placeholder="$t('guide.chat.placeholder')"
                  :disabled="chatState !== 'idle'"
                  class="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white disabled:opacity-60 transition"
                />
                <button
                  type="submit"
                  :disabled="chatState !== 'idle' || !chatInput.trim()"
                  class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-white transition hover:bg-teal-700 disabled:opacity-40"
                  :aria-label="$t('guide.chat.send')"
                >
                  <Icon name="heroicons:paper-airplane" class="h-4 w-4" />
                </button>
              </form>
              <p class="mt-2 text-center text-[11px] text-slate-400">
                {{ $t("guide.chat.disclaimer") }}
              </p>
            </template>

            <div
              v-else-if="phase === 'awaiting'"
              class="flex flex-wrap items-center justify-end gap-2"
            >
              <!-- Greeting step: start / skip -->
              <template v-if="stepIndex === 0">
                <button type="button" class="guide-btn-secondary" @click="declineTour">
                  {{ $t("guide.skip") }}
                </button>
                <button type="button" class="guide-btn-primary" @click="acceptTour">
                  {{ $t("guide.start") }}
                </button>
              </template>
              <!-- Final step: replay / ask / done -->
              <template v-else-if="stepIndex === steps.length - 1">
                <button type="button" class="guide-btn-secondary" @click="restartTour">
                  {{ $t("guide.restart") }}
                </button>
                <button
                  v-if="chatAvailable"
                  type="button"
                  class="guide-btn-secondary"
                  @click="askQuestion"
                >
                  {{ $t("guide.chat.ask") }}
                </button>
                <button type="button" class="guide-btn-primary" @click="finishTour">
                  {{ $t("guide.done") }}
                </button>
              </template>
              <!-- Middle steps: skip / next -->
              <template v-else>
                <button type="button" class="guide-btn-secondary" @click="declineTour">
                  {{ $t("guide.skip") }}
                </button>
                <button type="button" class="guide-btn-primary" @click="nextStep">
                  {{ $t("guide.next") }}
                  <Icon name="heroicons:arrow-right" class="h-4 w-4" />
                </button>
              </template>
            </div>
            <!-- Progress dots -->
            <div
              v-if="mode === 'tour'"
              class="mt-2 flex items-center justify-center gap-1.5"
            >
              <span
                v-for="(s, i) in steps"
                :key="s.key"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="
                  i === stepIndex
                    ? 'w-4 bg-teal-500'
                    : i < stepIndex
                      ? 'w-1.5 bg-teal-300'
                      : 'w-1.5 bg-slate-200'
                "
              ></span>
            </div>
          </div>
        </div>
      </transition>

    </div>

    <!-- Floating launcher button：平時縮在右下角只露出左上 1/4，hover 時滑出並放大 -->
    <button
      v-if="!isOpen"
      type="button"
      class="group fixed bottom-0 right-0 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md transition-all duration-300 ease-out translate-x-1/2 translate-y-1/2 hover:-translate-x-2 hover:-translate-y-2 hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:-translate-x-2 focus-visible:-translate-y-2 focus-visible:ring-2 focus-visible:ring-teal-500"
      :aria-label="$t('guide.openLabel')"
      :title="$t('guide.openLabel')"
      @click="openPanel"
    >
      <span
        v-if="!hasSeenGuide"
        class="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-40"
      ></span>
      <Icon
        name="heroicons:chat-bubble-left-right"
        class="h-5 w-5 relative -translate-x-1.5 -translate-y-1.5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import landmarksData from "../utils/guide-landmarks.json";

interface Landmark {
  id: string;
  path: string;
  selector: string;
  zh: string;
  en: string;
  desc: string;
  keywords: string[];
}
const LANDMARKS = landmarksData as Landmark[];

type Phase = "idle" | "thinking" | "typing" | "awaiting";
interface GuideAction {
  id: string;
  label: string;
}
interface Message {
  role: "agent" | "user";
  text: string;
  actions?: GuideAction[];
}
interface Step {
  key: string;
  target: string | null;
  scroll?: boolean;
}

const { t, te, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const config = useRuntimeConfig();

const steps: Step[] = [
  { key: "greet", target: null },
  { key: "about", target: "#about", scroll: true },
  { key: "news", target: '[data-tour="news"]' },
  { key: "curriculum", target: '[data-tour="curriculum"]' },
  { key: "community", target: '[data-tour="community"]' },
  { key: "partners", target: '[data-tour="partners"]' },
  { key: "lang", target: '[data-tour="lang"]' },
  { key: "end", target: null },
];

const hasSeenGuide = useLocalStorage("napai-agent-guide-seen", false);

const isOpen = ref(false);
const phase = ref<Phase>("idle");
const stepIndex = ref(0);
const messages = ref<Message[]>([]);
const typedText = ref("");
const bodyEl = ref<HTMLElement | null>(null);

// --- 互動問答（接 llm-server 中繼後端；未設定或未上線時整個模式隱藏） ---
const chatApiBase = ((config.public.chatApi as string) || "").replace(/\/+$/, "");
const chatAvailable = ref(false);
const mode = ref<"tour" | "chat">("tour");
const chatInput = ref("");
const chatState = ref<"idle" | "waiting" | "streaming">("idle");
const streamText = ref("");
const chatHistory: { role: "user" | "assistant"; content: string }[] = [];
let chatIntroShown = false;

const spotRect = ref<{ top: number; left: number; width: number; height: number } | null>(null);
let spotTarget: HTMLElement | null = null;
let pendingTimer: ReturnType<typeof setTimeout> | null = null;
let typingTimer: ReturnType<typeof setTimeout> | null = null;
let fullText = "";
let typedCount = 0;

const reduceMotion = computed(
  () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
);

// 串流過程中即時隱藏尚未完成/已完成的 [[goto:...]] 指令，避免閃現
const streamDisplay = computed(() =>
  streamText.value.replace(/\[\[\s*goto\b[^\]]*\]?\]?\s*$/i, "").replace(/\[\[\s*goto\s*:\s*[a-z-]+\s*\]\]/gi, ""),
);

// 模型回覆是 Markdown；先 escape 再轉換粗體/程式碼/連結，避免 XSS 也讓連結可點
function renderMarkdown(src: string): string {
  let s = src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  s = s.replace(
    /`([^`\n]+)`/g,
    '<code class="rounded bg-slate-100 px-1 text-[0.85em]">$1</code>',
  );
  s = s.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
  // [文字](網址)：站內相對路徑同頁開啟，http 外部連結開新分頁，mailto 直接寄信
  s = s.replace(
    /\[([^\]\n]+)\]\(((?:https?:\/\/|mailto:|\/)[^\s)]+)\)/g,
    (_m, label: string, url: string) => {
      const ext = url.startsWith("http")
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";
      return `<a href="${url}"${ext} class="text-teal-700 underline underline-offset-2 break-all">${label}</a>`;
    },
  );
  // 裸網址（前一字元不是引號或 >，避免重複處理已產生的 <a>）
  s = s.replace(
    /(^|[^"'>=\w])(https?:\/\/[^\s<]+)/g,
    '$1<a href="$2" target="_blank" rel="noopener noreferrer" class="text-teal-700 underline underline-offset-2 break-all">$2</a>',
  );
  // 裸露的 email（避開已在 href="mailto:..." 或連結文字中的）
  s = s.replace(
    /(^|[^">:\w.])([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g,
    '$1<a href="mailto:$2" class="text-teal-700 underline underline-offset-2 break-all">$2</a>',
  );
  return s;
}

// 每個步驟從 v1~v5 之間隨機挑一個存在的文案版本，讓每次導覽的語氣都不太一樣
function pickVariant(key: string): string {
  const candidates: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const k = `guide.steps.${key}.v${i}`;
    if (te(k)) candidates.push(k);
  }
  if (!candidates.length) return "";
  const chosen = candidates[Math.floor(Math.random() * candidates.length)]!;
  return t(chosen);
}

function clearTimers() {
  if (pendingTimer) clearTimeout(pendingTimer);
  if (typingTimer) clearTimeout(typingTimer);
  pendingTimer = null;
  typingTimer = null;
}

function scrollToBottom() {
  nextTick(() => {
    if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight;
  });
}

watch([messages, typedText, phase, streamText, chatState], scrollToBottom, {
  deep: true,
});

// --- Spotlight ---
function updateSpotRect() {
  if (!spotTarget) return;
  const r = spotTarget.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) {
    spotRect.value = null;
    return;
  }
  const pad = 6;
  spotRect.value = {
    top: r.top - pad,
    left: r.left - pad,
    width: r.width + pad * 2,
    height: r.height + pad * 2,
  };
}

function setSpotlight(selector: string | null, scroll = false) {
  spotTarget = null;
  spotRect.value = null;
  if (!selector) return;
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  const r = el.getBoundingClientRect();
  // 行動版導覽列收在漢堡選單裡（寬高為 0），此時只顯示對話、不打聚光燈
  if (r.width === 0 && r.height === 0) return;
  spotTarget = el;
  if (scroll) el.scrollIntoView({ behavior: reduceMotion.value ? "auto" : "smooth", block: "center" });
  updateSpotRect();
}

// --- 帶使用者前往某地標並標示（可跨頁；供互動問答的動作按鈕使用） ---
let spotClearTimer: ReturnType<typeof setTimeout> | null = null;

function waitForEl(selector: string, tries = 20): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    let n = 0;
    const tick = () => {
      const el = document.querySelector<HTMLElement>(selector);
      if (el && (el.offsetWidth > 0 || el.offsetHeight > 0)) return resolve(el);
      if (++n >= tries) return resolve(null);
      setTimeout(tick, 100);
    };
    tick();
  });
}

async function goToLandmark(id: string) {
  const lm = LANDMARKS.find((l) => l.id === id);
  if (!lm) return;
  if (spotClearTimer) clearTimeout(spotClearTimer);
  const targetPath = localePath(lm.path);
  if (route.path !== targetPath) {
    await router.push(targetPath);
    await nextTick();
  }
  const el = await waitForEl(lm.selector);
  if (!el) return;
  // 手機版把面板收起，讓使用者看得到被標示的位置
  if (window.matchMedia("(max-width: 640px)").matches) isOpen.value = false;
  spotTarget = el;
  el.scrollIntoView({
    behavior: reduceMotion.value ? "auto" : "smooth",
    block: "center",
  });
  updateSpotRect();
  // 幾秒後自動取消標示，避免一直蓋著頁面
  spotClearTimer = setTimeout(() => setSpotlight(null), 5000);
}

// 從模型回覆解析 [[goto:id]] 指令（僅接受註冊表內的 id），回傳 { text, ids }
function extractActions(raw: string): { text: string; ids: string[] } {
  const ids: string[] = [];
  const text = raw
    .replace(/\[\[\s*goto\s*:\s*([a-z-]+)\s*\]\]/gi, (_m, id: string) => {
      const key = id.toLowerCase();
      if (LANDMARKS.some((l) => l.id === key) && !ids.includes(key)) ids.push(key);
      return "";
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { text, ids };
}

// 模型沒給指令時，用關鍵字從使用者提問猜一個最相關的地標（① 的後備）
function guessLandmark(question: string): string | null {
  const q = question.toLowerCase();
  let best: string | null = null;
  let bestScore = 0;
  for (const lm of LANDMARKS) {
    const score = lm.keywords.reduce(
      (s, kw) => (q.includes(kw.toLowerCase()) ? s + 1 : s),
      0,
    );
    if (score > bestScore) {
      bestScore = score;
      best = lm.id;
    }
  }
  return bestScore > 0 ? best : null;
}

function actionsFor(ids: string[]): GuideAction[] {
  const label = locale.value === "en" ? "en" : "zh";
  return ids
    .map((id) => {
      const lm = LANDMARKS.find((l) => l.id === id);
      return lm ? { id, label: `${t("guide.chat.takeMeTo")} ${lm[label]}` } : null;
    })
    .filter((a): a is GuideAction => a !== null);
}

// --- Typewriter ---
function charDelay(ch: string): number {
  if ("，。！？!?…；;：".includes(ch)) return 160;
  return 16 + Math.random() * 24;
}

function typeTick() {
  if (typedCount >= fullText.length) {
    finishTyping();
    return;
  }
  typedCount++;
  typedText.value = fullText.slice(0, typedCount);
  typingTimer = setTimeout(typeTick, charDelay(fullText[typedCount - 1] ?? ""));
}

function finishTyping() {
  clearTimers();
  if (fullText) messages.value.push({ role: "agent", text: fullText });
  typedText.value = "";
  fullText = "";
  phase.value = "awaiting";
}

function skipTyping() {
  if (phase.value === "typing") finishTyping();
}

function speak(text: string) {
  clearTimers();
  fullText = text;
  typedCount = 0;
  typedText.value = "";
  phase.value = "thinking";
  const thinkTime = reduceMotion.value ? 0 : 450 + Math.random() * 450;
  pendingTimer = setTimeout(() => {
    if (reduceMotion.value) {
      finishTyping();
    } else {
      phase.value = "typing";
      typeTick();
    }
  }, thinkTime);
}

// --- Tour flow ---
function runStep(i: number) {
  stepIndex.value = i;
  const step = steps[i]!;
  setSpotlight(step.target, step.scroll);
  speak(pickVariant(step.key));
}

function openPanel() {
  isOpen.value = true;
  // 已看過導覽且問答後端上線 → 直接進互動問答；否則（第一次造訪／後端未上線）走導覽
  if (hasSeenGuide.value && chatAvailable.value) {
    enterChat();
  } else if (phase.value === "idle") {
    messages.value = [];
    runStep(0);
  }
}

function enterChat() {
  mode.value = "chat";
  setSpotlight(null);
  if (!chatIntroShown) {
    chatIntroShown = true;
    messages.value.push({
      role: "agent",
      text: t("guide.chat.intro"),
      actions: actionsFor(["news", "curriculum", "community"]),
    });
  }
}

// 從互動問答點「重看導覽」：清空對話、切回導覽並從頭播放
function replayTour() {
  clearTimers();
  mode.value = "tour";
  chatState.value = "idle";
  streamText.value = "";
  messages.value = [];
  chatHistory.length = 0;
  chatIntroShown = false;
  phase.value = "idle";
  runStep(0);
}

function closePanel() {
  hasSeenGuide.value = true;
  isOpen.value = false;
  clearTimers();
  phase.value = "idle";
  messages.value = [];
  setSpotlight(null);
  mode.value = "tour";
  chatState.value = "idle";
  streamText.value = "";
  chatHistory.length = 0;
  chatIntroShown = false;
}

function askQuestion() {
  pushUserReply(t("guide.chat.ask"));
  enterChat();
}

async function sendChat() {
  const text = chatInput.value.trim();
  if (!text || chatState.value !== "idle") return;
  chatInput.value = "";
  messages.value.push({ role: "user", text });
  chatHistory.push({ role: "user", content: text });
  chatState.value = "waiting";
  streamText.value = "";
  try {
    const res = await fetch(`${chatApiBase}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: chatHistory.slice(-10),
        locale: locale.value,
      }),
    });
    // 429 = 實驗室 Nginx 限流（每 IP 每分鐘 10 次），給專屬提示而非一般錯誤
    if (res.status === 429) {
      messages.value.push({ role: "agent", text: t("guide.chat.rateLimited") });
      chatHistory.pop();
      return;
    }
    if (!res.ok || !res.body) throw new Error(`status ${res.status}`);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let upstreamError = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const payload = line.trim();
        if (!payload.startsWith("data:")) continue;
        const data = payload.slice(5).trim();
        if (data === "[DONE]") continue;
        let parsed: { delta?: string; error?: string };
        try {
          parsed = JSON.parse(data);
        } catch {
          continue;
        }
        if (parsed.error) upstreamError = parsed.error;
        if (parsed.delta) {
          streamText.value += parsed.delta;
          chatState.value = "streaming";
        }
      }
    }
    const raw = streamText.value.trim();
    if (!raw) throw new Error(upstreamError || "empty reply");
    const { text: reply, ids } = extractActions(raw);
    // 模型有指定就用它的；沒有就用關鍵字後備猜一個
    const actionIds = ids.length ? ids : [guessLandmark(text)].filter(Boolean) as string[];
    messages.value.push({
      role: "agent",
      text: reply,
      actions: actionIds.length ? actionsFor(actionIds) : undefined,
    });
    // 存進歷史的用乾淨版（不含指令），避免污染後續對話
    chatHistory.push({ role: "assistant", content: reply });
  } catch {
    messages.value.push({ role: "agent", text: t("guide.chat.error") });
  } finally {
    streamText.value = "";
    chatState.value = "idle";
  }
}

function pushUserReply(label: string) {
  messages.value.push({ role: "user", text: label });
}

function acceptTour() {
  pushUserReply(t("guide.start"));
  runStep(1);
}

function declineTour() {
  pushUserReply(t("guide.skip"));
  closePanel();
}

function nextStep() {
  pushUserReply(t("guide.next"));
  runStep(stepIndex.value + 1);
}

function finishTour() {
  pushUserReply(t("guide.done"));
  closePanel();
}

function restartTour() {
  pushUserReply(t("guide.restart"));
  runStep(0);
}

// --- Lifecycle ---
function onViewportChange() {
  if (spotTarget) updateSpotRect();
}

onMounted(() => {
  window.addEventListener("scroll", onViewportChange, { passive: true });
  window.addEventListener("resize", onViewportChange, { passive: true });
  // 首次造訪且在首頁時，稍等片刻後自動打開導覽
  if (!hasSeenGuide.value && route.path === localePath("/")) {
    pendingTimer = setTimeout(openPanel, 1500);
  }
  // 後端健康檢查通過才顯示互動問答模式
  if (chatApiBase) {
    fetch(`${chatApiBase}/health`, { signal: AbortSignal.timeout(5000) })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j?.ok) chatAvailable.value = true;
      })
      .catch(() => {});
  }
});

onBeforeUnmount(() => {
  clearTimers();
  window.removeEventListener("scroll", onViewportChange);
  window.removeEventListener("resize", onViewportChange);
});

// 換頁時收掉聚光燈，避免殘留在錯誤位置
watch(
  () => route.path,
  () => setSpotlight(null),
);
</script>

<style scoped>
.guide-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: #94a3b8;
  animation: guide-bounce 1s infinite ease-in-out;
}
@keyframes guide-bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}
.guide-cursor {
  color: #14b8a6;
  animation: guide-blink 0.8s steps(1) infinite;
}
@keyframes guide-blink {
  50% {
    opacity: 0;
  }
}
.guide-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border-radius: 9999px;
  background-color: #0d9488;
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  transition: background-color 0.15s;
}
.guide-btn-primary:hover {
  background-color: #0f766e;
}
.guide-btn-secondary {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  transition: all 0.15s;
}
.guide-btn-secondary:hover {
  border-color: #99f6e4;
  color: #0d9488;
}
</style>
