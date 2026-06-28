export type ResourceCategory =
  | "annual_report"
  | "strategic_plan"
  | "financial_report"
  | "policy"
  | "download"
  | "other";

export interface Resource {
  id: number;
  title: string;
  category: ResourceCategory;
  description: string | null;
  file_url: string | null;
  file_name: string | null;
  year: number | null;
  is_published: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateResourceDto {
  title: string;
  category?: ResourceCategory;
  description?: string | null;
  file_url?: string | null;
  file_name?: string | null;
  year?: number | null;
  is_published?: boolean;
  sort_order?: number;
}

export type UpdateResourceDto = Partial<CreateResourceDto>;

export const VALID_RESOURCE_CATEGORIES: ResourceCategory[] = [
  "annual_report",
  "strategic_plan",
  "financial_report",
  "policy",
  "download",
  "other",
];

export const RESOURCE_ALLOWED_COLUMNS = new Set<string>([
  "title",
  "category",
  "description",
  "file_url",
  "file_name",
  "year",
  "is_published",
  "sort_order",
]);
