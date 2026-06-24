import type { MemberRole } from "./member.types";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  role: MemberRole;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
