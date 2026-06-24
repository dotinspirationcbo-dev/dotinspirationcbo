import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { mapClerkUser, _setCurrentUser } from "../services/auth.service";
import type { AuthState } from "../types/auth.types";

/**
 * useAuth — reactive auth hook for all feature modules.
 *
 * Sources truth from Clerk, maps it through auth.service,
 * and keeps the module-level state in sync for non-React callers.
 * The public API shape (AuthState) is stable — provider changes
 * are isolated to this hook and auth.service.ts.
 */
export function useAuth(): AuthState {
  const { user, isLoaded, isSignedIn } = useUser();

  const authUser = isLoaded && isSignedIn && user
    ? mapClerkUser(user)
    : null;

  useEffect(() => {
    _setCurrentUser(authUser);
  }, [authUser?.id, authUser?.role]);

  return {
    user: authUser,
    isAuthenticated: !!isSignedIn,
    isLoading: !isLoaded,
  };
}
