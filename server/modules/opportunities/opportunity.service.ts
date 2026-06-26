import { pool } from "../../db";
import {
  Opportunity,
  CreateOpportunityDto,
  UpdateOpportunityDto,
  OpportunityType,
  OpportunityStatus,
  OPPORTUNITY_ALLOWED_COLUMNS,
} from "./opportunity.model";

export async function getAllOpportunities(
  type?: OpportunityType,
  status?: OpportunityStatus
): Promise<Opportunity[]> {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (type) {
    params.push(type);
    conditions.push(`type = $${params.length}`);
  }
  if (status) {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `SELECT * FROM opportunities ${where} ORDER BY deadline ASC NULLS LAST, created_at DESC`;
  const { rows } = await pool.query<Opportunity>(sql, params);
  return rows;
}

export async function getOpportunityById(id: number): Promise<Opportunity | null> {
  const { rows } = await pool.query<Opportunity>(
    "SELECT * FROM opportunities WHERE id = $1",
    [id]
  );
  return rows[0] ?? null;
}

export async function createOpportunity(dto: CreateOpportunityDto): Promise<Opportunity> {
  const { rows } = await pool.query<Opportunity>(
    `INSERT INTO opportunities (title, type, description, requirements, location, deadline, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      dto.title,
      dto.type,
      dto.description ?? null,
      dto.requirements ?? null,
      dto.location ?? null,
      dto.deadline ?? null,
      dto.status ?? "open",
    ]
  );
  return rows[0];
}

export async function updateOpportunity(
  id: number,
  dto: UpdateOpportunityDto
): Promise<Opportunity | null> {
  const entries = Object.entries(dto).filter(
    ([col, val]) => OPPORTUNITY_ALLOWED_COLUMNS.has(col) && val !== undefined
  );
  if (!entries.length) return getOpportunityById(id);

  const setClauses = entries.map(([col], i) => `${col} = $${i + 2}`).join(", ");
  const values = entries.map(([, val]) => val);

  const { rows } = await pool.query<Opportunity>(
    `UPDATE opportunities SET ${setClauses} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] ?? null;
}

export async function deleteOpportunity(id: number): Promise<boolean> {
  const { rowCount } = await pool.query(
    "DELETE FROM opportunities WHERE id = $1",
    [id]
  );
  return (rowCount ?? 0) > 0;
}
