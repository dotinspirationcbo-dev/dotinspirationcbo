import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { MemberRole } from "../types/auth.types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If provided, user must have this exact role. */
  requiredRole?: MemberRole;
  /** Redirect destination when access is denied. Defaults to /public. */
  redirectTo?: string;
}

/**
 * ProtectedRoute — wraps a route subtree with auth + role enforcement.
 *
 * Usage in routes.tsx:
 *   <Route path="/admin/*" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>} />
 *   <Route path="/member/*" element={<ProtectedRoute><MemberLayout /></ProtectedRoute>} />
 */
export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/public",
}: ProtectedRouteProps) {
  const { isLoading, isAuthenticated, user } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
