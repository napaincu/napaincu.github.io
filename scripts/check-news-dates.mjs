import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Taipei",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
let warnings = 0,
  errors = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }
    if (!entry.name.endsWith(".md")) continue;
    const text = await readFile(path, "utf8");
    const meta = Object.fromEntries(
      [...text.split("---")[1].matchAll(/^([A-Za-z]+):[ \t]*(.*)$/gm)].map(
        (m) => [m[1], m[2].trim().replace(/^['"]|['"]$/g, "")],
      ),
    );
    for (const key of ["eventStart", "eventEnd", "registrationDeadline"]) {
      const value = meta[key];
      if (!value) continue;
      const validShape =
        key === "registrationDeadline"
          ? /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}\+08:00)?$/.test(value)
          : /^\d{4}-\d{2}-\d{2}$/.test(value);
      const day = value.slice(0, 10),
        parsed = new Date(day + "T00:00:00Z");
      if (
        !validShape ||
        Number.isNaN(Date.parse(value)) ||
        Number.isNaN(parsed.getTime()) ||
        parsed.toISOString().slice(0, 10) !== day
      ) {
        console.error(`Invalid ${key}: ${path}`);
        errors++;
      }
    }
    if (meta.eventEnd && meta.eventStart && meta.eventEnd < meta.eventStart) {
      console.error(`Reversed event dates: ${path}`);
      errors++;
    }
    if (meta.status === "past" && meta.registrationStatus === "open") {
      console.error(`Past event marked open: ${path}`);
      errors++;
    }
    if (
      (meta.eventEnd && meta.eventEnd < today && meta.status !== "past") ||
      (meta.registrationStatus === "open" &&
        meta.registrationDeadline &&
        (meta.registrationDeadline.includes("T")
          ? Date.parse(meta.registrationDeadline) < Date.now()
          : meta.registrationDeadline < today))
    ) {
      console.warn(`Review editorial status: ${path}`);
      warnings++;
    }
  }
}
await walk(fileURLToPath(new URL("../content/news/", import.meta.url)));
console.log(
  `News dates: ${errors} errors, ${warnings} reminders (Taipei ${today}).`,
);
process.exitCode = errors ? 1 : 0;
