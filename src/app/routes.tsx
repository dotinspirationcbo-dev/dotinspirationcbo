import { Routes, Route, Navigate } from "react-router-dom";

/**
 * Central route registry for Dot Inspiration CBO.
 *
 * Route namespaces:
 *   /              → public landing
 *   /public/*      → unauthenticated-accessible pages
 *   /member/*      → authenticated members (any role)
 *   /admin/*       → admin-only pages
 *
 * ProtectedRoute and RoleGuard components will be added here
 * once the auth provider is integrated.
 */

export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/public" replace />} />
      <Route path="/public" element={<div>Public — Dot Inspiration CBO</div>} />

      {/* Member area — guarded in next step */}
      <Route path="/member/*" element={<div>Member area (protected — coming soon)</div>} />

      {/* Admin area — guarded in next step */}
      <Route path="/admin/*" element={<div>Admin area (protected — coming soon)</div>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/public" replace />} />
    </Routes>
  );
}
