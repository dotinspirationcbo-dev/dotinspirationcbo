export type PartnerCategory =
  | "government"
  | "school"
  | "health"
  | "community"
  | "private"
  | "international"
  | "other";

export interface Partner {
  id: number;
  name: string;
  description: string | null;
  category: PartnerCategory;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreatePartnerDto {
  name: string;
  description?: string | null;
  category?: PartnerCategory;
  logo_url?: string | null;
  website_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
}

export type UpdatePartnerDto = Partial<CreatePartnerDto>;

export const VALID_PARTNER_CATEGORIES: PartnerCategory[] = [
  "government",
  "school",
  "health",
  "community",
  "private",
  "international",
  "other",
];

export const PARTNER_ALLOWED_COLUMNS = new Set<string>([
  "name",
  "description",
  "category",
  "logo_url",
  "website_url",
  "sort_order",
  "is_active",
]);
