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

export type MemberEditableFields = Pick<Member, "fullName" | "email" | "role" | "status">;

export type CreateMemberData = Omit<Member, "id" | "createdAt">;

export type UpdateMemberData = {
  id: string;
  fullName?: string;
  email?: string;
  role?: MemberRole;
  status?: MemberStatus;
};
