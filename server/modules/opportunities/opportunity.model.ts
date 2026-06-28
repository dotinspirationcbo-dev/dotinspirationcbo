export type OpportunityType =
  | "job"
  | "volunteer"
  | "internship"
  | "procurement"
  | "scholarship"
  | "community";

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
  employment_type: string | null;
  salary: string | null;
  is_featured: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateOpportunityDto {
  title: string;
  type: OpportunityType;
  description?: string | null;
  requirements?: string | null;
  location?: string | null;
  deadline?: string | null;
  status?: OpportunityStatus;
  employment_type?: string | null;
  salary?: string | null;
  is_featured?: boolean;
}

export type UpdateOpportunityDto = Partial<CreateOpportunityDto>;

export const VALID_TYPES: OpportunityType[] = [
  "job",
  "volunteer",
  "internship",
  "procurement",
  "scholarship",
  "community",
];
export const VALID_STATUSES: OpportunityStatus[] = ["open", "closed", "draft"];

export const OPPORTUNITY_ALLOWED_COLUMNS = new Set<string>([
  "title",
  "type",
  "description",
  "requirements",
  "location",
  "deadline",
  "status",
  "employment_type",
  "salary",
  "is_featured",
]);
