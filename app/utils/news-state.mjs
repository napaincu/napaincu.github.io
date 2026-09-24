// Editorial states are intentional: dates do not silently change static pages.
export const NEWS_FILTERS = ["all", "registration", "active", "recap"];
export function isRegistrationOpen(item) {
  return item.status !== "past" && item.registrationStatus === "open";
}
export function matchesNewsFilter(item, filter) {
  if (filter === "registration") return isRegistrationOpen(item);
  if (filter === "active") return ["upcoming", "ongoing"].includes(item.status);
  if (filter === "recap") return item.status === "past";
  return true;
}
export function registrationState(item) {
  return item.status === "past" && item.registrationStatus === "open"
    ? "closed"
    : item.registrationStatus;
}
export function showNewsExternalLink(item) {
  return (
    Boolean(item.externalLink?.trim()) &&
    (item.externalLinkType !== "registration" || isRegistrationOpen(item))
  );
}
export function sortNews(items) {
  const date = (item) => item.updatedAt?.trim() || item.date || "";
  return [...items].sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      date(b).localeCompare(date(a)),
  );
}
