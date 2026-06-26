export type MessageStatus = "new" | "read" | "resolved";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: MessageStatus;
  created_at: string;
  updated_at: string;
}

export type CreateContactMessageDto = {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
};

const BASE = "/api/contact-messages";

async function req<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (res.status === 204) return undefined as T;
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `Request failed: ${res.status}`);
  return json;
}

export async function getContactMessages(status?: MessageStatus): Promise<ContactMessage[]> {
  const url = new URL(BASE, window.location.origin);
  if (status) url.searchParams.set("status", status);
  const json = await req<{ data: ContactMessage[] }>(url.toString());
  return json.data;
}

export async function createContactMessage(
  dto: CreateContactMessageDto
): Promise<ContactMessage> {
  const json = await req<{ data: ContactMessage }>(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return json.data;
}

export async function updateMessageStatus(
  id: number,
  status: MessageStatus
): Promise<ContactMessage> {
  const json = await req<{ data: ContactMessage }>(`${BASE}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return json.data;
}

export async function deleteContactMessage(id: number): Promise<void> {
  await req<undefined>(`${BASE}/${id}`, { method: "DELETE" });
}
