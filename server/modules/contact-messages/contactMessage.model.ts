export type MessageStatus = "new" | "read" | "resolved";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: MessageStatus;
  created_at: Date;
  updated_at: Date;
}

export interface CreateContactMessageDto {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}

export const VALID_MESSAGE_STATUSES: MessageStatus[] = ["new", "read", "resolved"];
