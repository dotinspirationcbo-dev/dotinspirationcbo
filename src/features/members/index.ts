/**
 * Members feature module — Dot Inspiration CBO.
 *
 * Public surface for this feature:
 *   Types   → src/types/member.types.ts
 *   Service → src/services/members.service.ts
 *   Hooks   → src/features/members/useMembers.ts
 *             src/features/members/useCreateMember.ts
 *   UI      → src/features/members/MembersPage.tsx
 *             src/features/members/CreateMemberForm.tsx
 */

export type { Member, MemberRole, MemberStatus, MemberEditableFields, CreateMemberData, UpdateMemberData } from "../../types/member.types";
export { getMembers, getMemberById, createMember, updateMember } from "../../services/members.service";
export { useMembers } from "./useMembers";
export { useCreateMember } from "./useCreateMember";
export { useUpdateMember } from "./useUpdateMember";
export { MembersPage } from "./MembersPage";
export { CreateMemberForm } from "./CreateMemberForm";
