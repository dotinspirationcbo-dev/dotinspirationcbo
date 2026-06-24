/**
 * Members feature module — Dot Inspiration CBO.
 *
 * Public surface for this feature:
 *   Types   → src/types/member.types.ts
 *   Service → src/services/members.service.ts
 *   Hook    → src/features/members/useMembers.ts  (React Query)
 *   Page    → src/features/members/MembersPage.tsx
 */

export type { Member, MemberRole, MemberStatus, CreateMemberData, UpdateMemberData } from "../../types/member.types";
export { getMembers, getMemberById, createMember, updateMember } from "../../services/members.service";
export { useMembers } from "./useMembers";
export { MembersPage } from "./MembersPage";
