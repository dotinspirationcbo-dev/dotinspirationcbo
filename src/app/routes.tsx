import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { ProtectedRoute } from "../components/ProtectedRoute";

/**
 * Central route registry for Dot Inspiration CBO.
 *
 * Route namespaces:
 *   /public/*  → always accessible (unauthenticated)
 *   /member/*  → any authenticated user
 *   /admin/*   → admin role only
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/public" replace />} />

      {/* Public — no auth required */}
      <Route path="/public" element={<div>Public — Dot Inspiration CBO</div>} />

      {/* AUTH ROUTES (IMPORTANT) */}
      <Route
        path="/sign-in/*"
        element={<SignIn routing="path" path="/sign-in" />}
      />
      <Route
        path="/sign-up/*"
        element={<SignUp routing="path" path="/sign-up" />}
      />

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
