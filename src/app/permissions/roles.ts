import type { MemberRole } from "../../types/member.types";

/**
 * System role constants — single source of truth for all role identifiers.
 * Use these everywhere instead of raw strings to prevent typos and enable
 * refactoring with TypeScript assistance.
 */
export const ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
  VOLUNTEER: "volunteer",
} as const satisfies Record<string, MemberRole>;
