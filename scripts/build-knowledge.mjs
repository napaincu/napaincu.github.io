/**
 * 從建置完成的靜態頁面萃取全站文字，生成 AI 導覽員的知識庫檔。
 *
 * 在 `nuxi generate` 之後執行（見 package.json 的 generate script），
 * 輸出 .output/public/knowledge.txt，隨網站一起部署到 GitHub Pages；
 * llm-server 會定期抓取這個檔案作為 system prompt 的知識來源，
 * 因此網站內容更新後，導覽員的知識會自動跟上，無需人工維護。
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT_DIR = join(ROOT, ".output/public");

// 每頁的字數預算（避免知識庫過長塞爆模型 context）
const PAGES = [
  { path: "index.html", label: "首頁／計畫介紹 (/)", budget: 2200 },
  { path: "team/index.html", label: "計畫團隊 (/team)", budget: 4500 },
  { path: "curriculum/index.html", label: "課程專區 (/curriculum)", budget: 2500 },
  { path: "community/index.html", label: "社群與活動 (/community)", budget: 2500 },
  { path: "partners/index.html", label: "合作夥伴 (/partners)", budget: 1800 },
  { path: "faq/index.html", label: "常見問題 (/faq)", budget: 3000 },
  { path: "contact/index.html", label: "聯絡我們 (/contact)", budget: 800 },
];

const NEWS_LIMIT = 12; // 最新 N 則消息
const NEWS_BODY_EXCERPT = 600; // 進行中/即將開始的消息附上內文摘要

function htmlToText(html) {
  let main = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html)?.[1] ?? html;
  return main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6]|tr|section|article)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

/**
 * 極簡 frontmatter 解析（只取單行 key: value）。
 * 行尾必須容許 CRLF：Windows 上 git 檢出會把 LF 轉成 CRLF，
 * 只比對 \n 會導致每一篇都解析失敗、知識庫的消息區塊整個空掉。
 */
function parseFrontmatter(md) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(md);
  if (!m) return { meta: {}, body: md };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z][\w]*):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: m[2] };
}

async function collectNews() {
  const newsRoot = join(ROOT, "content/news");
  const files = [];
  async function walk(dir) {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name.endsWith(".md")) files.push(p);
    }
  }
  await walk(newsRoot);

  const items = [];
  for (const f of files) {
    const { meta, body } = parseFrontmatter(await readFile(f, "utf8"));
    if (meta.draft === "true" || !meta.title) continue;
    // 站內路徑＝內容路徑（供 [[goto:/news/...]] 深連結使用）
    const sitePath =
      "/news/" + relative(newsRoot, f).replace(/\\/g, "/").replace(/\.md$/, "");
    items.push({ meta, body, sitePath });
  }
  // 編輯後台對沒填的選填日期會寫入空字串，所以用 || 讓它退回 date（?? 擋不掉空字串）
  const sortKey = (m) => m.updatedAt?.trim() || m.date?.trim() || "";
  items.sort((a, b) => sortKey(b.meta).localeCompare(sortKey(a.meta)));

  const lines = [];
  for (const { meta, body, sitePath } of items.slice(0, NEWS_LIMIT)) {
    let line = `- 【${meta.category ?? "消息"}】${meta.title}（發布 ${meta.date ?? "?"}${meta.status ? `，狀態：${meta.status}` : ""}）：${meta.description ?? ""} 路徑：${sitePath}`;
    if (meta.externalLink) line += ` 相關連結：${meta.externalLink}`;
    lines.push(line);
    // 進行中／即將開始的活動附上內文重點（報名方式、時程等常被詢問）
    if (meta.status === "upcoming" || meta.status === "ongoing") {
      const excerpt = body
        .replace(/[#>*|`-]/g, " ")
        .replace(/\[([^\]]*)\]\(([^)]*)\)/g, "$1 $2")
        .replace(/[ \t]+/g, " ")
        .replace(/\s*\n\s*/g, "\n")
        .trim()
        .slice(0, NEWS_BODY_EXCERPT);
      lines.push(`  內容摘要：${excerpt.replace(/\n/g, "；")}`);
    }
  }
  return lines.join("\n");
}

const header = `NAPAI 網站知識庫（自動生成於 ${new Date().toISOString().slice(0, 10)}）

計畫全名：前瞻AI人培-智慧代理及實體AI課程推動計畫（National Agentic & Physical AI Initiative, NAPAI）
指導單位：教育部資訊及科技教育司；主辦：國立中央大學；協辦：國立臺北大學、國立清華大學
官方網站：https://napaincu.github.io/（中英雙語，右上角地球圖示切換）
YouTube 頻道：https://www.youtube.com/@NAPAI-b1g
Discord 社群：https://discord.gg/aatUjnEKmY
網站分區：最新消息 /news、計畫團隊 /team、課程專區 /curriculum、社群與活動 /community、合作夥伴 /partners、常見問題 /faq、聯絡我們 /contact
`;

const sections = [header];

sections.push(`## 最新消息（/news）\n${await collectNews()}`);

for (const page of PAGES) {
  try {
    const html = await readFile(join(OUT_DIR, page.path), "utf8");
    const text = htmlToText(html).slice(0, page.budget);
    sections.push(`## ${page.label}\n${text}`);
  } catch {
    console.warn(`[knowledge] 讀不到 ${page.path}，略過`);
  }
}

// 可帶路的地標清單（供互動問答的 [[goto:id]] 指令使用）
try {
  const lms = JSON.parse(
    await readFile(join(ROOT, "app/utils/guide-landmarks.json"), "utf8"),
  );
  const lines = lms.map((l) => `- ${l.id}｜${l.zh} / ${l.en}：${l.desc}`).join("\n");
  sections.push(
    `## 可帶路的頁面地標（NAVIGATION LANDMARKS）\n${lines}\n- 特定一則消息：以該消息的「路徑」（/news/ 開頭）作為 goto 目標，可直接帶使用者到那一頁`,
  );
} catch {
  console.warn("[knowledge] 讀不到 guide-landmarks.json，略過地標清單");
}

const out = sections.join("\n\n");
await writeFile(join(OUT_DIR, "knowledge.txt"), out, "utf8");
console.log(`[knowledge] 已生成 knowledge.txt（${out.length} 字元）`);
