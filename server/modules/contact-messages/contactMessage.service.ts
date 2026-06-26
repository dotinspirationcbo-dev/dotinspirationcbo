import { pool } from "../../db";
import {
  ContactMessage,
  CreateContactMessageDto,
  MessageStatus,
} from "./contactMessage.model";

export async function getAllMessages(status?: MessageStatus): Promise<ContactMessage[]> {
  const params: unknown[] = [];
  let where = "";
  if (status) {
    params.push(status);
    where = "WHERE status = $1";
  }
  const { rows } = await pool.query<ContactMessage>(
    `SELECT * FROM contact_messages ${where} ORDER BY created_at DESC`,
    params
  );
  return rows;
}

export async function getMessageById(id: number): Promise<ContactMessage | null> {
  const { rows } = await pool.query<ContactMessage>(
    "SELECT * FROM contact_messages WHERE id = $1",
    [id]
  );
  return rows[0] ?? null;
}

export async function createMessage(dto: CreateContactMessageDto): Promise<ContactMessage> {
  const { rows } = await pool.query<ContactMessage>(
    `INSERT INTO contact_messages (name, email, phone, subject, message)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      dto.name,
      dto.email,
      dto.phone ?? null,
      dto.subject ?? null,
      dto.message,
    ]
  );
  return rows[0];
}

export async function updateStatus(
  id: number,
  status: MessageStatus
): Promise<ContactMessage | null> {
  const { rows } = await pool.query<ContactMessage>(
    "UPDATE contact_messages SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return rows[0] ?? null;
}

export async function deleteMessage(id: number): Promise<boolean> {
  const { rowCount } = await pool.query(
    "DELETE FROM contact_messages WHERE id = $1",
    [id]
  );
  return (rowCount ?? 0) > 0;
}
