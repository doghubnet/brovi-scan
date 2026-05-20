const isClient = typeof window !== "undefined";

export function loadJSON<T>(key: string, fallback: T): T {
  if (!isClient) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function saveJSON(key: string, value: unknown) {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
export function clearAllPreviewData() {
  if (!isClient) return;
  Object.keys(STORAGE_KEYS).forEach((k) => localStorage.removeItem(STORAGE_KEYS[k as keyof typeof STORAGE_KEYS]));
}
export const STORAGE_KEYS = {
  profile: "brovi.profile",
  program: "brovi.scan.program",
  document: "brovi.scan.document",
  financial: "brovi.scan.financial",
  interview: "brovi.scan.interview",
  report: "brovi.report",
  consultant: "brovi.consultant",
  theme: "brovi.theme",
} as const;