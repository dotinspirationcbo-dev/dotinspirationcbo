export interface GalleryImage {
  id: number;
  title: string | null;
  caption: string | null;
  image_url: string;
  category: string;
  sort_order: number;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGalleryImageDto {
  title?: string | null;
  caption?: string | null;
  image_url: string;
  category?: string;
  sort_order?: number;
  is_published?: boolean;
}

export type UpdateGalleryImageDto = Partial<CreateGalleryImageDto>;

export const GALLERY_ALLOWED_COLUMNS = new Set<string>([
  "title",
  "caption",
  "image_url",
  "category",
  "sort_order",
  "is_published",
]);
