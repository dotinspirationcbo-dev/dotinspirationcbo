import { getAuthState } from "../services/auth.service";
import type { AuthState } from "../types/auth.types";

/**
 * useAuth — thin hook over the auth service.
 * Will be wired to a real provider (e.g. Clerk) in the next step.
 * Feature modules import this hook — never the service directly.
 */
export function useAuth(): AuthState {
  return getAuthState();
}
