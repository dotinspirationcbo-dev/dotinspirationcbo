import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { PublicLayout } from "../features/public/PublicLayout";
import { HomePage } from "../features/public/HomePage";
import { AboutPage } from "../features/public/AboutPage";
import { ProgramsPage } from "../features/public/ProgramsPage";
import { LeadershipPage } from "../features/public/LeadershipPage";
import { ContactPage } from "../features/public/ContactPage";
import { SupportPage } from "../features/public/SupportPage";
import { AdminLayout } from "../features/admin/AdminLayout";
import { AdminOverview } from "../features/admin/AdminOverview";
import { AdminGallery } from "../features/admin/AdminGallery";
import { AdminOpportunities } from "../features/admin/AdminOpportunities";
import { AdminContactMessages } from "../features/admin/AdminContactMessages";
import { AdminLeadership } from "../features/admin/AdminLeadership";
import { AdminSiteContent } from "../features/admin/AdminSiteContent";
import { AdminMembers } from "../features/admin/AdminMembers";

/**
 * Central route registry for Dot Inspiration CBO.
 *
 * Route namespaces:
 *   /public/*    → always accessible (unauthenticated)
 *   /admin/*     → all admin pages share AdminLayout (sidebar + topbar)
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

      {/* Admin dashboard — all routes share AdminLayout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index              element={<AdminOverview />} />
        <Route path="gallery"      element={<AdminGallery />} />
        <Route path="opportunities" element={<AdminOpportunities />} />
        <Route path="messages"     element={<AdminContactMessages />} />
        <Route path="leadership"   element={<AdminLeadership />} />
        <Route path="site-content" element={<AdminSiteContent />} />
        <Route path="members"      element={<AdminMembers />} />
        {/* Legacy content route — redirect to unified editor */}
        <Route path="content"      element={<Navigate to="/admin/site-content" replace />} />
        {/* Legacy donations route — placeholder until donations page is wrapped */}
        <Route path="donations"    element={<Navigate to="/admin" replace />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/public" replace />} />
    </Routes>
  );
}
