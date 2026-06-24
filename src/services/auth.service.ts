import type { AuthUser, AuthState, UserRole } from "../types/auth.types";

/**
 * Auth service — provider-agnostic interface.
 * All methods operate against a nullable AuthUser.
 * Replace the stub implementations with real provider calls (e.g. Clerk) in the next step.
 */

let _currentUser: AuthUser | null = null;

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

/**
 * Internal — called by the auth provider once a real session is resolved.
 * Not exposed to feature modules directly.
 */
export function _setCurrentUser(user: AuthUser | null): void {
  _currentUser = user;
}
