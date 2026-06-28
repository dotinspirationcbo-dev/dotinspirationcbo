import { pool } from "../../db";
import {
  Resource,
  CreateResourceDto,
  UpdateResourceDto,
  RESOURCE_ALLOWED_COLUMNS,
} from "./resource.model";

export async function getAllResources(publishedOnly = false): Promise<Resource[]> {
  const where = publishedOnly ? "WHERE is_published = TRUE" : "";
  const { rows } = await pool.query<Resource>(
    `SELECT * FROM resources ${where} ORDER BY sort_order ASC, year DESC NULLS LAST, created_at DESC`
  );
  return rows;
}

export async function getResourceById(id: number): Promise<Resource | null> {
  const { rows } = await pool.query<Resource>(
    "SELECT * FROM resources WHERE id = $1",
    [id]
  );
  return rows[0] ?? null;
}

export async function createResource(dto: CreateResourceDto): Promise<Resource> {
  const { rows } = await pool.query<Resource>(
    `INSERT INTO resources (title, category, description, file_url, file_name, year, is_published, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      dto.title,
      dto.category ?? "other",
      dto.description ?? null,
      dto.file_url ?? null,
      dto.file_name ?? null,
      dto.year ?? null,
      dto.is_published ?? true,
      dto.sort_order ?? 0,
    ]
  );
  return rows[0];
}

export async function updateResource(
  id: number,
  dto: UpdateResourceDto
): Promise<Resource | null> {
  const entries = Object.entries(dto).filter(
    ([col, val]) => RESOURCE_ALLOWED_COLUMNS.has(col) && val !== undefined
  );
  if (!entries.length) return getResourceById(id);

  const setClauses = entries.map(([col], i) => `${col} = $${i + 2}`).join(", ");
  const values = entries.map(([, val]) => val);

  const { rows } = await pool.query<Resource>(
    `UPDATE resources SET ${setClauses} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] ?? null;
}

export async function deleteResource(id: number): Promise<boolean> {
  const { rowCount } = await pool.query("DELETE FROM resources WHERE id = $1", [id]);
  return (rowCount ?? 0) > 0;
}
