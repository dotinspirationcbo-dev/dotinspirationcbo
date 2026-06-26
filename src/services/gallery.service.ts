export interface GalleryImage {
  id: number;
  title: string | null;
  caption: string | null;
  image_url: string;
  category: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateGalleryImageDto = {
  image_url: string;
  title?: string | null;
  caption?: string | null;
  category?: string;
  sort_order?: number;
  is_published?: boolean;
};

export type UpdateGalleryImageDto = Partial<CreateGalleryImageDto>;

const BASE = "/api/gallery";

async function req<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (res.status === 204) return undefined as T;
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `Request failed: ${res.status}`);
  return json;
}

export async function getGalleryImages(params?: {
  category?: string;
  all?: boolean;
}): Promise<GalleryImage[]> {
  const url = new URL(BASE, window.location.origin);
  if (params?.category) url.searchParams.set("category", params.category);
  if (params?.all) url.searchParams.set("all", "true");
  const json = await req<{ data: GalleryImage[] }>(url.toString());
  return json.data;
}

export async function createGalleryImage(dto: CreateGalleryImageDto): Promise<GalleryImage> {
  const json = await req<{ data: GalleryImage }>(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return json.data;
}

export async function updateGalleryImage(
  id: number,
  dto: UpdateGalleryImageDto
): Promise<GalleryImage> {
  const json = await req<{ data: GalleryImage }>(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return json.data;
}

export async function deleteGalleryImage(id: number): Promise<void> {
  await req<undefined>(`${BASE}/${id}`, { method: "DELETE" });
}
