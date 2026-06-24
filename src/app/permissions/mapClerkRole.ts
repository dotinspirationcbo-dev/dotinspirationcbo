import type { MemberRole } from "../../types/member.types";
import { ROLES } from "./roles";

/**
 * Minimal structural interface for a Clerk user object.
 * Mirrors the one in auth.service.ts — kept local so the permissions
 * layer has no dependency on the service layer.
 */
interface ClerkUserLike {
  publicMetadata?: Record<string, unknown>;
  unsafeMetadata?: Record<string, unknown>;
}

const VALID_ROLES = new Set<MemberRole>([
  ROLES.ADMIN,
  ROLES.MEMBER,
  ROLES.VOLUNTEER,
]);

function isValidRole(value: unknown): value is MemberRole {
  return typeof value === "string" && VALID_ROLES.has(value as MemberRole);
}

/**
 * mapClerkRole — converts a Clerk user's metadata into a typed MemberRole.
 *
 * Resolution order:
 *   1. publicMetadata.role   (set server-side via Clerk Dashboard / Backend API — trusted)
 *   2. unsafeMetadata.role   (set client-side — lower trust, fallback only)
 *   3. "member"              (safe default for any authenticated user)
 *
 * To assign admin access: set `publicMetadata.role = "admin"` via the
 * Clerk Dashboard or your backend using the Clerk Backend SDK.
 */
export function mapClerkRole(clerkUser: ClerkUserLike): MemberRole {
  const fromPublic = clerkUser.publicMetadata?.role;
  if (isValidRole(fromPublic)) return fromPublic;

  const fromUnsafe = clerkUser.unsafeMetadata?.role;
  if (isValidRole(fromUnsafe)) return fromUnsafe;

  return ROLES.MEMBER;
}
