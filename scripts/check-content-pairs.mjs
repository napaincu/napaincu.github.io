/**
 * 檢查中英內容是否成對。
 *
 * 網站以「相同的相對路徑」配對中英文章（content/news/zh/A.md ↔ content/news/en/A.md），
 * 路徑對不上時英文站就會少一篇。編輯後台讓非工程師自行發布後，
 * 這類漏發或代稱打錯的情況會變常見，因此在 CI 獨立跑一個檢查：
 * 不擋部署（網站照常更新），但有問題時 GitHub 會顯示紅色叉並寄通知。
 *
 * 用法：node scripts/check-content-pairs.mjs
 */
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

const PAIRS = [
  { label: "最新消息", zh: "content/news/zh", en: "content/news/en" },
  { label: "合作夥伴", zh: "content/partners", en: "content/en/partners" },
];

async function collect(dir) {
  const out = new Set();
  async function walk(current) {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return; // 目錄不存在就當作空的
    }
    for (const e of entries) {
      const p = join(current, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name.endsWith(".md")) {
        out.add(relative(dir, p).replace(/\\/g, "/"));
      }
    }
  }
  await walk(dir);
  return out;
}

let problems = 0;

for (const { label, zh, en } of PAIRS) {
  const zhFiles = await collect(join(ROOT, zh));
  const enFiles = await collect(join(ROOT, en));

  const missingEn = [...zhFiles].filter((f) => !enFiles.has(f)).sort();
  const missingZh = [...enFiles].filter((f) => !zhFiles.has(f)).sort();

  console.log(`\n[${label}] 中文 ${zhFiles.size} 篇 / 英文 ${enFiles.size} 篇`);
  for (const f of missingEn) {
    console.error(`  ✖ 缺英文版：${en}/${f}（中文版已存在）`);
    problems++;
  }
  for (const f of missingZh) {
    console.error(`  ✖ 缺中文版：${zh}/${f}（英文版已存在）`);
    problems++;
  }
  if (!missingEn.length && !missingZh.length) console.log("  ✔ 全部成對");
}

if (problems) {
  console.error(
    `\n共 ${problems} 個配對問題。` +
      `\n通常是發布時「網址代稱」或「發布日期」兩邊不一致所致——` +
      `\n請到 /admin/ 確認兩個語言版本的代稱與年月完全相同。`,
  );
  process.exit(1);
}

console.log("\n中英內容全部成對。");
