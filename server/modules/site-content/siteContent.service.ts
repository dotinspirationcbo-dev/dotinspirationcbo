import { pool } from "../../db";
import { SiteContentEntry, UpsertSiteContentDto } from "./siteContent.model";

export async function getAllEntries(): Promise<SiteContentEntry[]> {
  const { rows } = await pool.query<SiteContentEntry>(
    "SELECT * FROM site_content ORDER BY key ASC"
  );
  return rows;
}

export async function getEntry(key: string): Promise<SiteContentEntry | null> {
  const { rows } = await pool.query<SiteContentEntry>(
    "SELECT * FROM site_content WHERE key = $1",
    [key]
  );
  return rows[0] ?? null;
}

export async function upsertEntry(dto: UpsertSiteContentDto): Promise<SiteContentEntry> {
  const { rows } = await pool.query<SiteContentEntry>(
    `INSERT INTO site_content (key, value)
     VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
     RETURNING *`,
    [dto.key, dto.value]
  );
  return rows[0];
}

export async function bulkUpsert(entries: UpsertSiteContentDto[]): Promise<void> {
  for (const entry of entries) {
    await upsertEntry(entry);
  }
}
