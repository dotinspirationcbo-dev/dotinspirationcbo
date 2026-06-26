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
}

export type UpdateOpportunityDto = Partial<CreateOpportunityDto>;

export const VALID_TYPES: OpportunityType[] = ["job", "volunteer", "internship"];
export const VALID_STATUSES: OpportunityStatus[] = ["open", "closed", "draft"];

export const OPPORTUNITY_ALLOWED_COLUMNS = new Set<string>([
  "title",
  "type",
  "description",
  "requirements",
  "location",
  "deadline",
  "status",
]);
