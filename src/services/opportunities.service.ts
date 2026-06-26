export type OpportunityType = "job" | "volunteer" | "internship";
export type OpportunityStatus = "open" | "closed" | "draft";

export interface Opportunity {
  id: number;
  title: string;
  type: OpportunityType;
  description: string | null;
  requirements: string | null;
  location: string | null;
  deadline: string | null;
  status: OpportunityStatus;
  created_at: string;
  updated_at: string;
}

export type CreateOpportunityDto = {
  title: string;
  type: OpportunityType;
  description?: string | null;
  requirements?: string | null;
  location?: string | null;
  deadline?: string | null;
  status?: OpportunityStatus;
};

export type UpdateOpportunityDto = Partial<CreateOpportunityDto>;

const BASE = "/api/opportunities";

async function req<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (res.status === 204) return undefined as T;
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `Request failed: ${res.status}`);
  return json;
}

export async function getOpportunities(params?: {
  type?: OpportunityType;
  status?: OpportunityStatus;
}): Promise<Opportunity[]> {
  const url = new URL(BASE, window.location.origin);
  if (params?.type) url.searchParams.set("type", params.type);
  if (params?.status) url.searchParams.set("status", params.status);
  const json = await req<{ data: Opportunity[] }>(url.toString());
  return json.data;
}

export async function createOpportunity(dto: CreateOpportunityDto): Promise<Opportunity> {
  const json = await req<{ data: Opportunity }>(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return json.data;
}

export async function updateOpportunity(
  id: number,
  dto: UpdateOpportunityDto
): Promise<Opportunity> {
  const json = await req<{ data: Opportunity }>(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return json.data;
}

export async function deleteOpportunity(id: number): Promise<void> {
  await req<undefined>(`${BASE}/${id}`, { method: "DELETE" });
}
