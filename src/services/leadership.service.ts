export interface LeadershipMember {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateLeadershipMemberDto = {
  name: string;
  role: string;
  bio?: string | null;
  photo_url?: string | null;
  sort_order?: number;
  is_published?: boolean;
};

export type UpdateLeadershipMemberDto = Partial<CreateLeadershipMemberDto>;

const BASE = "/api/leadership";

async function req<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (res.status === 204) return undefined as T;
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `Request failed: ${res.status}`);
  return json;
}

export async function getLeadershipMembers(
  publishedOnly = false
): Promise<LeadershipMember[]> {
  const url = new URL(BASE, window.location.origin);
  if (publishedOnly) url.searchParams.set("published", "true");
  const json = await req<{ data: LeadershipMember[] }>(url.toString());
  return json.data;
}

export async function createLeadershipMember(
  dto: CreateLeadershipMemberDto
): Promise<LeadershipMember> {
  const json = await req<{ data: LeadershipMember }>(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return json.data;
}

export async function updateLeadershipMember(
  id: number,
  dto: UpdateLeadershipMemberDto
): Promise<LeadershipMember> {
  const json = await req<{ data: LeadershipMember }>(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return json.data;
}

export async function deleteLeadershipMember(id: number): Promise<void> {
  await req<undefined>(`${BASE}/${id}`, { method: "DELETE" });
}

export async function reorderLeadershipMember(
  id: number,
  direction: "up" | "down"
): Promise<void> {
  await req<{ success: boolean }>(`${BASE}/${id}/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ direction }),
  });
}
