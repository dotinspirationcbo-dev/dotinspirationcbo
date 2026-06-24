export type MemberRole = "admin" | "member" | "volunteer";

export type MemberStatus = "active" | "inactive";

export interface Member {
  id: string;
  fullName: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  createdAt: string;
}

export type CreateMemberData = Omit<Member, "id" | "createdAt">;

export type UpdateMemberData = Partial<CreateMemberData>;
