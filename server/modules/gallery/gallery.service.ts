import { pool } from "../../db";
import {
  GalleryImage,
  CreateGalleryImageDto,
  UpdateGalleryImageDto,
  GALLERY_ALLOWED_COLUMNS,
} from "./gallery.model";

export async function getAllImages(
  category?: string,
  publishedOnly = true
): Promise<GalleryImage[]> {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (publishedOnly) {
    params.push(true);
    conditions.push(`is_published = $${params.length}`);
  }
  if (category) {
    params.push(category);
    conditions.push(`category = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `SELECT * FROM gallery_images ${where} ORDER BY sort_order ASC, created_at DESC`;
  const { rows } = await pool.query<GalleryImage>(sql, params);
  return rows;
}

export async function getImageById(id: number): Promise<GalleryImage | null> {
  const { rows } = await pool.query<GalleryImage>(
    "SELECT * FROM gallery_images WHERE id = $1",
    [id]
  );
  return rows[0] ?? null;
}

export async function createImage(dto: CreateGalleryImageDto): Promise<GalleryImage> {
  const { rows } = await pool.query<GalleryImage>(
    `INSERT INTO gallery_images (title, caption, image_url, category, sort_order, is_published)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      dto.title ?? null,
      dto.caption ?? null,
      dto.image_url,
      dto.category ?? "general",
      dto.sort_order ?? 0,
      dto.is_published ?? true,
    ]
  );
  return rows[0];
}

export async function updateImage(
  id: number,
  dto: UpdateGalleryImageDto
): Promise<GalleryImage | null> {
  const entries = Object.entries(dto).filter(
    ([col, val]) => GALLERY_ALLOWED_COLUMNS.has(col) && val !== undefined
  );
  if (!entries.length) return getImageById(id);

  const setClauses = entries.map(([col], i) => `${col} = $${i + 2}`).join(", ");
  const values = entries.map(([, val]) => val);

  const { rows } = await pool.query<GalleryImage>(
    `UPDATE gallery_images SET ${setClauses} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] ?? null;
}

export async function deleteImage(id: number): Promise<boolean> {
  const { rowCount } = await pool.query(
    "DELETE FROM gallery_images WHERE id = $1",
    [id]
  );
  return (rowCount ?? 0) > 0;
}
