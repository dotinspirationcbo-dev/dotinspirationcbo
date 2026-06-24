import type { MemberRole } from "../../types/member.types";
import { ROLES } from "./roles";

/**
 * Permission rules engine — centralized access control for Dot Inspiration CBO.
 *
 * Each function is a pure predicate: given a role, return a boolean.
 * No side effects, no async, no UI coupling.
 * Consume these in ProtectedRoute, hooks, and service guards.
 */

/** Can access the admin panel and all admin routes. */
export function canViewAdmin(role: MemberRole): boolean {
  return role === ROLES.ADMIN;
}

/** Can view the full members list and member details. */
export function canViewMembers(role: MemberRole): boolean {
  return role === ROLES.ADMIN || role === ROLES.MEMBER;
}

/** Can create, edit, and deactivate member records. */
export function canManageMembers(role: MemberRole): boolean {
  return role === ROLES.ADMIN;
}

/** Can create new member records. */
export function canCreateMembers(role: MemberRole): boolean {
  return role === ROLES.ADMIN;
}

/** Can edit existing member records. */
export function canEditMembers(role: MemberRole): boolean {
  return role === ROLES.ADMIN;
}

/** Can view projects and project reports. */
export function canViewProjects(role: MemberRole): boolean {
  return role === ROLES.ADMIN || role === ROLES.MEMBER || role === ROLES.VOLUNTEER;
}

/** Can manage (create/edit) donation records. */
export function canManageDonations(role: MemberRole): boolean {
  return role === ROLES.ADMIN;
}
