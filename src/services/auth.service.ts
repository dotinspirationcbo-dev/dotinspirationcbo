import type { AuthUser, AuthState, UserRole } from "../types/auth.types";
import { mapClerkRole } from "../app/permissions/mapClerkRole";

/**
 * Minimal structural interface for a Clerk user object.
 * Avoids a direct import of Clerk internals — keeps the service provider-agnostic.
 */
interface ClerkUserLike {
  id: string;
  primaryEmailAddress?: { emailAddress: string } | null;
  fullName?: string | null;
  username?: string | null;
  publicMetadata?: Record<string, unknown>;
  unsafeMetadata?: Record<string, unknown>;
}

/**
 * Auth service — provider-agnostic interface.
 *
 * Clerk is the current implementation detail. All feature modules depend
 * only on the types in auth.types.ts and the hook in useAuth.ts.
 * Swapping providers means touching ONLY this file and Providers.tsx.
 */

let _currentUser: AuthUser | null = null;

// ---------------------------------------------------------------------------
// Clerk → AuthUser mapping
// ---------------------------------------------------------------------------

/**
 * Maps a Clerk UserResource to our internal AuthUser shape.
 * Role is read from publicMetadata.role (set via Clerk Dashboard or API).
 * Defaults to "member" when no role metadata is present.
 */
export function mapClerkUser(clerkUser: ClerkUserLike): AuthUser {
  const role: UserRole = mapClerkRole(clerkUser);

  return {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
    displayName: clerkUser.fullName ?? clerkUser.username ?? "Member",
    role,
  };
}

// ---------------------------------------------------------------------------
// Module-level state (kept in sync by useAuth hook)
// ---------------------------------------------------------------------------

/** Internal — called only from useAuth to keep module state current. */
export function _setCurrentUser(user: AuthUser | null): void {
  _currentUser = user;
}

// ---------------------------------------------------------------------------
// Public API — consumed by feature modules via useAuth hook
// ---------------------------------------------------------------------------

export function getCurrentUser(): AuthUser | null {
  return _currentUser;
}

export function getUserRole(): UserRole | null {
  return _currentUser?.role ?? null;
}

export function isAdmin(): boolean {
  return _currentUser?.role === "admin";
}

export function isMember(): boolean {
  return _currentUser?.role === "member";
}

export function isVolunteer(): boolean {
  return _currentUser?.role === "volunteer";
}

export function isAuthenticated(): boolean {
  return _currentUser !== null;
}

export function getAuthState(): AuthState {
  return {
    user: _currentUser,
    isAuthenticated: _currentUser !== null,
    isLoading: false,
  };
}
