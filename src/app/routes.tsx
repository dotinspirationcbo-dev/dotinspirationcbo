import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";

/**
 * Central route registry for Dot Inspiration CBO.
 *
 * Route namespaces:
 *   /public/*  → always accessible (unauthenticated)
 *   /member/*  → any authenticated user
 *   /admin/*   → admin role only
 *
 * Actual page components (MemberLayout, AdminLayout, etc.)
 * will be added here as features are built.
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/public" replace />} />

      {/* Public — no auth required */}
      <Route path="/public" element={<div>Public — Dot Inspiration CBO</div>} />

      {/* Member area — authenticated users only */}
      <Route
        path="/member/*"
        element={
          <ProtectedRoute>
            <div>Member area — authenticated</div>
          </ProtectedRoute>
        }
      />

      {/* Admin area — admin role only */}
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
