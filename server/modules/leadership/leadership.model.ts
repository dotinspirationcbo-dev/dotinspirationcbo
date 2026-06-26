export interface LeadershipMember {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLeadershipMemberDto {
  name: string;
  role: string;
  bio?: string | null;
  photo_url?: string | null;
  sort_order?: number;
  is_published?: boolean;
}

export type UpdateLeadershipMemberDto = Partial<CreateLeadershipMemberDto>;

export const LEADERSHIP_ALLOWED_COLUMNS = new Set<string>([
  "name",
  "role",
  "bio",
  "photo_url",
  "sort_order",
  "is_published",
]);
