import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { MembersPage } from "../features/members/MembersPage";
import { DonationsPage } from "../features/donations/DonationsPage";
import { PublicLayout } from "../features/public/PublicLayout";
import { HomePage } from "../features/public/HomePage";
import { AboutPage } from "../features/public/AboutPage";
import { ProgramsPage } from "../features/public/ProgramsPage";
import { LeadershipPage } from "../features/public/LeadershipPage";
import { ContactPage } from "../features/public/ContactPage";
import { SupportPage } from "../features/public/SupportPage";

/**
 * Central route registry for Dot Inspiration CBO.
 *
 * Route namespaces:
 *   /public/*          → always accessible (unauthenticated)
 *   /member/*          → any authenticated user
 *   /admin/members     → Members management (admin only)
 *   /admin/donations   → Donations management (admin only)
 *   /admin/*           → Admin catch-all
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/public" replace />} />

      {/* Public website — no auth required */}
      <Route path="/public" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about"      element={<AboutPage />} />
        <Route path="programs"   element={<ProgramsPage />} />
        <Route path="leadership" element={<LeadershipPage />} />
        <Route path="contact"    element={<ContactPage />} />
        <Route path="support"    element={<SupportPage />} />
      </Route>

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

      {/* Admin: Donations management */}
      <Route
        path="/admin/donations"
        element={
          <ProtectedRoute requiredRole="admin">
            <DonationsPage />
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
