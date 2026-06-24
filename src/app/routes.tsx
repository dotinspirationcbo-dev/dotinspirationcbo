import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { MembersPage } from "../features/members/MembersPage";

/**
 * Central route registry for Dot Inspiration CBO.
 *
 * Route namespaces:
 *   /public/*        → always accessible (unauthenticated)
 *   /member/*        → any authenticated user
 *   /admin/*         → admin role only
 *   /admin/members   → Members management page
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/public" replace />} />

      {/* Public — no auth required */}
      <Route path="/public" element={<div>Public — Dot Inspiration CBO</div>} />

      {/* Clerk auth UI routes */}
      <Route
        path="/sign-in/*"
        element={<SignIn routing="path" path="/sign-in" />}
      />
      <Route
        path="/sign-up/*"
        element={<SignUp routing="path" path="/sign-up" />}
      />

      {/* Member area — any authenticated user */}
      <Route
        path="/member/*"
        element={
          <ProtectedRoute>
            <div>Member area — authenticated</div>
          </ProtectedRoute>
        }
      />

      {/* Admin: Members management */}
      <Route
        path="/admin/members"
        element={
          <ProtectedRoute requiredRole="admin">
            <MembersPage />
          </ProtectedRoute>
        }
      />

      {/* Admin: catch-all (future admin pages land here until routed) */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="admin">
            <div>Admin area — admin role required</div>
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/public" replace />} />
    </Routes>
  );
}
