import { pool } from "../../db";
import {
  Partner,
  CreatePartnerDto,
  UpdatePartnerDto,
  PARTNER_ALLOWED_COLUMNS,
} from "./partner.model";

export async function getAllPartners(activeOnly = false): Promise<Partner[]> {
  const where = activeOnly ? "WHERE is_active = TRUE" : "";
  const { rows } = await pool.query<Partner>(
    `SELECT * FROM partners ${where} ORDER BY sort_order ASC, name ASC`
  );
  return rows;
}

export async function getPartnerById(id: number): Promise<Partner | null> {
  const { rows } = await pool.query<Partner>(
    "SELECT * FROM partners WHERE id = $1",
    [id]
  );
  return rows[0] ?? null;
}

export async function createPartner(dto: CreatePartnerDto): Promise<Partner> {
  const { rows } = await pool.query<Partner>(
    `INSERT INTO partners (name, description, category, logo_url, website_url, sort_order, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      dto.name,
      dto.description ?? null,
      dto.category ?? "other",
      dto.logo_url ?? null,
      dto.website_url ?? null,
      dto.sort_order ?? 0,
      dto.is_active ?? true,
    ]
  );
  return rows[0];
}

export async function updatePartner(
  id: number,
  dto: UpdatePartnerDto
): Promise<Partner | null> {
  const entries = Object.entries(dto).filter(
    ([col, val]) => PARTNER_ALLOWED_COLUMNS.has(col) && val !== undefined
  );
  if (!entries.length) return getPartnerById(id);

  const setClauses = entries.map(([col], i) => `${col} = $${i + 2}`).join(", ");
  const values = entries.map(([, val]) => val);

  const { rows } = await pool.query<Partner>(
    `UPDATE partners SET ${setClauses} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] ?? null;
}

export async function deletePartner(id: number): Promise<boolean> {
  const { rowCount } = await pool.query("DELETE FROM partners WHERE id = $1", [id]);
  return (rowCount ?? 0) > 0;
}
