/**
 * Members feature module — Dot Inspiration CBO.
 *
 * Public surface for this feature:
 *   Types   → src/types/member.types.ts
 *   Service → src/services/members.service.ts
 *   Hook    → src/hooks/useMembers.ts
 *
 * UI components and pages will be added here in the next step.
 */

export type { Member, MemberRole, MemberStatus, CreateMemberData, UpdateMemberData } from "../../types/member.types";
export { getMembers, getMemberById, createMember, updateMember } from "../../services/members.service";
export { useMembers } from "../../hooks/useMembers";
