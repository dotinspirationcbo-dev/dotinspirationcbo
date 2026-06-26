export interface SiteContentEntry {
  id: number;
  key: string;
  value: string;
  updated_at: string;
}

const BASE = "/api/site-content";

async function req<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `Request failed: ${res.status}`);
  return json;
}

export async function getSiteContent(): Promise<Record<string, string>> {
  const json = await req<{ map: Record<string, string> }>(BASE);
  return json.map;
}

export async function getSiteContentEntries(): Promise<SiteContentEntry[]> {
  const json = await req<{ data: SiteContentEntry[] }>(BASE);
  return json.data;
}

export async function upsertSiteContentKey(
  key: string,
  value: string
): Promise<SiteContentEntry> {
  const json = await req<{ data: SiteContentEntry }>(`${BASE}/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
  });
  return json.data;
}

export async function bulkUpsertSiteContent(
  entries: { key: string; value: string }[]
): Promise<void> {
  await req<{ success: boolean }>(`${BASE}/bulk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entries),
  });
}
