export interface NewsState {
  status?: string | null;
  registrationStatus?: string | null;
  externalLink?: string | null;
  externalLinkType?: string | null;
  featured?: boolean | null;
  date?: string | null;
  updatedAt?: string | null;
}
export const NEWS_FILTERS: readonly ["all", "registration", "active", "recap"];
export function isRegistrationOpen(item: NewsState): boolean;
export function registrationState(item: NewsState): string | null | undefined;
export function matchesNewsFilter(item: NewsState, filter: string): boolean;
export function showNewsExternalLink(item: NewsState): boolean;
export function sortNews<T extends NewsState>(items: T[]): T[];
