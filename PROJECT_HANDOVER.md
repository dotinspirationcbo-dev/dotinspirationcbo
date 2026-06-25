# Project Handover — Dot Inspiration CBO

## 1. Project Overview

- **Organisation:** Dot Inspiration CBO
- **Purpose:** Public-facing NGO website for Mukono District, Uganda + admin management system
- **Stack:** React 19 + TypeScript + Vite 8 + React Router v7 + React Query + Clerk Auth
- **Dev server:** Port 5000 — workflow "Start application" (`npm run dev`)

---

## 2. Current Production Status

| Area | Status |
|---|---|
| Public website (6 pages) | ✅ Fully complete and polished |
| Design system (`public.css`) | ✅ Complete |
| Members admin (Create, Read, Update) | ✅ Fully implemented |
| Role-based access control (RBAC) | ✅ Fully implemented |
| React Query integration | ✅ Integrated and stable |
| Donations system | ❌ NOT implemented — UI support page only |
| Admin dashboard homepage | ❌ Not built |
| Leadership CMS | ❌ Not built |
| Programs CMS | ❌ Not built |
| Impact metrics admin editing | ❌ Not built |
| Mobile hamburger navigation | ❌ Not built |

---

## 3. Architecture Summary

```
src/
  app/
    main.tsx              # Entry point
    App.tsx               # Root component
    Providers.tsx         # React Query + Clerk providers
    routes.tsx            # All route definitions (public + admin)
    permissions/
      roles.ts            # MemberRole enum — single source of truth
      permissions.ts      # Permission matrix per role
      mapClerkRole.ts     # Maps Clerk session role → MemberRole
  components/
    ProtectedRoute.tsx    # Guards admin routes by role
  features/
    public/               # All public NGO website pages + layout
    members/              # Members admin CRUD
    donations/            # Donations (hooks/service exist, UI only)
    projects/             # Not yet started
  services/
    members.service.ts    # Members API calls
    donations.service.ts  # Donations API calls
    auth.service.ts       # Auth helpers
  hooks/
    useAuth.ts            # Auth state hook
    useMembers.ts         # Members hook (root-level alias)
  types/
    member.types.ts       # Member + MemberRole types
    donation.types.ts     # Donation types
    auth.types.ts         # Auth types
```

**Routing separation:**
- `/public/*` — public NGO website (no auth required)
- `/admin/*` — protected admin system (Clerk auth + role check)

---

## 4. Completed Features

### Public Website (`src/features/public/`)

Six pages, all using `PublicLayout` (sticky nav + footer):

| Route | Component | Notes |
|---|---|---|
| `/public` | `HomePage.tsx` | Hero, trust signals, program previews, impact stats |
| `/public/about` | `AboutPage.tsx` | Mission, vision, values, approach |
| `/public/programs` | `ProgramsPage.tsx` | 4 programs — Education, Health, Livelihoods, Environment |
| `/public/leadership` | `LeadershipPage.tsx` | Team bios, governance section |
| `/public/contact` | `ContactPage.tsx` | Contact form, office details |
| `/public/support` | `SupportPage.tsx` | Bank details, mobile money, donation impact amounts |

Design system lives in `src/features/public/public.css` — green/amber theme, CSS custom properties, all layout classes defined there.

### Members Admin (`src/features/members/`)

- `MembersPage.tsx` — list view, inline row editing
- `CreateMemberForm.tsx` — create new member form
- `MemberRowEditor.tsx` — inline edit component
- `useMembers.ts` — React Query list hook
- `useCreateMember.ts` — React Query mutation
- `useUpdateMember.ts` — React Query mutation

### RBAC (`src/app/permissions/`)

- `roles.ts` — `MemberRole` enum (`ADMIN`, `STAFF`, `VIEWER`)
- `permissions.ts` — permission matrix (what each role can do)
- `mapClerkRole.ts` — maps Clerk `publicMetadata.role` → `MemberRole`
- `ProtectedRoute.tsx` — wraps any route requiring a minimum role

---

## 5. Partially Completed / Future Work

### Donations (skeleton only)

Files exist but the system is not functional:

- `src/types/donation.types.ts` — Donation type definitions
- `src/services/donations.service.ts` — API service (stub)
- `src/features/donations/useDonations.ts` — React Query list hook
- `src/features/donations/useCreateDonation.ts` — mutation hook
- `src/features/donations/useUpdateDonation.ts` — mutation hook
- `src/features/donations/DonationsPage.tsx` — admin list page (UI only, no backend)

The public `/public/support` page shows bank transfer and mobile money instructions for donors — this is static content only, not connected to any donation recording system.

### Remaining Work (priority order suggested)

1. **Donations module** — connect `DonationsPage` to a real data source, add `CreateDonationForm`, wire to backend
2. **Admin dashboard** — homepage at `/admin` with summary metrics
3. **Mobile hamburger nav** — nav links hidden at <600px, need a toggle
4. **Leadership CMS** — allow admin to manage team bios
5. **Programs CMS** — allow admin to edit programme content
6. **Impact metrics editing** — editable impact numbers shown on homepage

---

## 6. Key Files Reference

| File | Purpose |
|---|---|
| `src/types/member.types.ts` | `Member` interface + `MemberRole` enum — **do not duplicate** |
| `src/types/donation.types.ts` | `Donation` interface |
| `src/types/auth.types.ts` | Auth-related types |
| `src/services/members.service.ts` | All Members API calls (getAll, create, update) |
| `src/services/donations.service.ts` | Donations API stub — needs implementation |
| `src/app/permissions/roles.ts` | `MemberRole` enum — **single source of truth** |
| `src/app/permissions/permissions.ts` | Permission matrix keyed on `MemberRole` |
| `src/app/permissions/mapClerkRole.ts` | Clerk session → `MemberRole` mapping |
| `src/components/ProtectedRoute.tsx` | Route guard component — wraps admin routes |
| `src/app/routes.tsx` | All route definitions — public and admin |
| `src/features/public/public.css` | Full public design system — do not split |
| `src/features/public/PublicLayout.tsx` | Shared nav + footer for all public pages |

---

## 7. How to Continue in a New Replit Account

1. **Import the project** — from GitHub or uploaded zip source
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Set environment secret:**
   - Key: `VITE_CLERK_PUBLISHABLE_KEY`
   - Value: your Clerk publishable key (from clerk.com dashboard)
   - In Replit: Secrets tab → add the key
4. **Start the dev server:**
   - Use the "Start application" workflow (runs `npm run dev` on port 5000)
5. **Verify public routes:** Navigate to `/public` — all six pages should load without authentication
6. **Verify admin routes:** Navigate to `/admin` — should redirect to Clerk sign-in, then load after authentication
7. **Confirm Clerk auth:** Ensure your Clerk application has the correct redirect URLs set for the new Replit domain

### Where to continue

**Option A — Donations module** (recommended next step):
- Connect `DonationsPage.tsx` to a real data source
- Build `CreateDonationForm.tsx` following the same pattern as `CreateMemberForm.tsx`
- Use the existing hooks in `src/features/donations/`

**Option B — Admin dashboard:**
- Add a dashboard homepage at `/admin` (currently redirects to `/admin/members`)
- Show summary stats: total members, total donations, programme count

**Option C — Mobile navigation:**
- Add hamburger toggle to `PublicLayout.tsx`
- Nav links hidden below 600px — need a slide-in or dropdown menu

---

## 8. Critical Notes

- **Do NOT change the architecture** — feature-based folder structure is deliberate
- **Do NOT duplicate types or services** — always import from `src/types/` and `src/services/`
- **`MemberRole`** in `src/app/permissions/roles.ts` is the single source of truth for roles — do not redefine it elsewhere
- **React Query pattern:** all data fetching uses `useQuery` / `useMutation` from `@tanstack/react-query` — do not mix with raw `useEffect` fetching
- **CSS:** all public page styling lives in `public.css` — use class names, not inline styles, for layout
- **TypeScript:** the project must compile with zero errors (`npx tsc --noEmit`) before any commit
- **Clerk:** role is stored in Clerk `publicMetadata.role` and mapped via `mapClerkRole.ts` — do not change this mapping without updating all permission checks
