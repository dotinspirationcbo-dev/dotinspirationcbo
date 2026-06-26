import { pool } from "../../db";
import {
  LeadershipMember,
  CreateLeadershipMemberDto,
  UpdateLeadershipMemberDto,
  LEADERSHIP_ALLOWED_COLUMNS,
} from "./leadership.model";

export async function getAllMembers(publishedOnly = false): Promise<LeadershipMember[]> {
  const where = publishedOnly ? "WHERE is_published = true" : "";
  const { rows } = await pool.query<LeadershipMember>(
    `SELECT * FROM leadership ${where} ORDER BY sort_order ASC, created_at ASC`
  );
  return rows;
}

export async function getMemberById(id: number): Promise<LeadershipMember | null> {
  const { rows } = await pool.query<LeadershipMember>(
    "SELECT * FROM leadership WHERE id = $1",
    [id]
  );
  return rows[0] ?? null;
}

export async function createMember(dto: CreateLeadershipMemberDto): Promise<LeadershipMember> {
  const { rows } = await pool.query<LeadershipMember>(
    `INSERT INTO leadership (name, role, bio, photo_url, sort_order, is_published)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      dto.name,
      dto.role,
      dto.bio ?? null,
      dto.photo_url ?? null,
      dto.sort_order ?? 0,
      dto.is_published ?? true,
    ]
  );
  return rows[0];
}

export async function updateMember(
  id: number,
  dto: UpdateLeadershipMemberDto
): Promise<LeadershipMember | null> {
  const entries = Object.entries(dto).filter(
    ([col, val]) => LEADERSHIP_ALLOWED_COLUMNS.has(col) && val !== undefined
  );
  if (!entries.length) return getMemberById(id);

  const setClauses = entries.map(([col], i) => `${col} = $${i + 2}`).join(", ");
  const values = entries.map(([, val]) => val);

  const { rows } = await pool.query<LeadershipMember>(
    `UPDATE leadership SET ${setClauses} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] ?? null;
}

export async function deleteMember(id: number): Promise<boolean> {
  const { rowCount } = await pool.query("DELETE FROM leadership WHERE id = $1", [id]);
  return (rowCount ?? 0) > 0;
}

export async function reorderMember(id: number, direction: "up" | "down"): Promise<void> {
  const member = await getMemberById(id);
  if (!member) return;
  const delta = direction === "up" ? -1 : 1;
  await pool.query("UPDATE leadership SET sort_order = $1 WHERE id = $2", [
    member.sort_order + delta,
    id,
  ]);
}
