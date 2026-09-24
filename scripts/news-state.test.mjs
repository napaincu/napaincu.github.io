import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import {
  NEWS_FILTERS,
  matchesNewsFilter,
  isRegistrationOpen,
  registrationState,
  showNewsExternalLink,
  sortNews,
} from "../app/utils/news-state.mjs";

test("registration and event lifecycle are independent", () => {
  const upcoming = { status: "upcoming", registrationStatus: "closed" };
  assert.equal(matchesNewsFilter(upcoming, "active"), true);
  assert.equal(matchesNewsFilter(upcoming, "registration"), false);
  assert.equal(
    isRegistrationOpen({ status: "ongoing", registrationStatus: "open" }),
    true,
  );
  assert.equal(isRegistrationOpen({ status: "upcoming" }), false);
  assert.equal(
    isRegistrationOpen({ status: "ongoing", registrationStatus: "unknown" }),
    false,
  );
});
test("recaps need no video; stale registration cannot reopen a past event", () => {
  const past = { status: "past", registrationStatus: "open" };
  assert.equal(matchesNewsFilter(past, "recap"), true);
  assert.equal(matchesNewsFilter(past, "registration"), false);
  assert.equal(registrationState(past), "closed");
  assert.equal(matchesNewsFilter({ videos: ["video"] }, "recap"), false);
});
test("unclassified announcements are retained, and series dates do not imply automatic transitions", () => {
  assert.deepEqual(
    NEWS_FILTERS.filter((f) => matchesNewsFilter({}, f)),
    ["all"],
  );
  assert.equal(
    matchesNewsFilter(
      { status: "ongoing", eventStart: "2026-04-01" },
      "active",
    ),
    true,
  );
});
test("registration links close, information links remain information", () => {
  const link = {
    externalLink: "https://example.com",
    status: "past",
    registrationStatus: "closed",
  };
  assert.equal(
    showNewsExternalLink({ ...link, externalLinkType: "registration" }),
    false,
  );
  assert.equal(
    showNewsExternalLink({ ...link, externalLinkType: "information" }),
    true,
  );
  assert.equal(
    showNewsExternalLink({
      ...link,
      status: "upcoming",
      registrationStatus: "open",
      externalLinkType: "registration",
    }),
    true,
  );
  assert.equal(showNewsExternalLink({ externalLink: " " }), false);
});
test("featured order and update-date fallback survive filtering without mutation", () => {
  const items = [
    { id: 1, date: "2026-09-01", updatedAt: "" },
    { id: 2, date: "2026-01-01", featured: true },
    { id: 3, date: "2026-02-01", updatedAt: "2026-09-20" },
  ];
  assert.deepEqual(
    sortNews(items).map((x) => x.id),
    [2, 3, 1],
  );
  assert.deepEqual(
    items.map((x) => x.id),
    [1, 2, 3],
  );
});
const newsRoot = new URL("../content/news/", import.meta.url);
const scalar = (text) =>
  Object.fromEntries(
    [...text.split("---")[1].matchAll(/^([A-Za-z]+):[ \t]*(.*)$/gm)].map(
      (m) => [m[1], m[2].trim().replace(/^['"]|['"]$/g, "")],
    ),
  );
async function files(dir) {
  const found = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) found.push(...(await files(p)));
    else if (e.name.endsWith(".md")) found.push(p);
  }
  return found;
}
test("all news pairs agree on editorial states, dates and link purpose", async () => {
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(newsRoot);
  for (const file of await files(join(root, "zh"))) {
    const zh = scalar(await readFile(file, "utf8"));
    const en = scalar(
      await readFile(file.replace(join(root, "zh"), join(root, "en")), "utf8"),
    );
    for (const key of [
      "status",
      "registrationStatus",
      "eventStart",
      "eventEnd",
      "registrationDeadline",
      "externalLinkType",
    ])
      assert.equal(zh[key], en[key], `${file}: ${key}`);
    assert.ok(
      !(zh.status === "past" && zh.registrationStatus === "open"),
      file,
    );
    if (zh.eventEnd && zh.eventStart)
      assert.ok(zh.eventEnd >= zh.eventStart, file);
  }
});
