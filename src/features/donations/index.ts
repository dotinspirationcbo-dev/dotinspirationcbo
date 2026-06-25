/**
 * Donations feature module — Dot Inspiration CBO.
 *
 * Public surface for this feature:
 *   Types   → src/types/donation.types.ts
 *   Service → src/services/donations.service.ts
 *   Hooks   → src/features/donations/useDonations.ts
 *             src/features/donations/useCreateDonation.ts
 *             src/features/donations/useUpdateDonation.ts
 *   UI      → src/features/donations/DonationsPage.tsx
 */

export type { Donation, DonationStatus, DonationMethod, CreateDonationData, UpdateDonationData } from "../../types/donation.types";
export { getDonations, getDonationById, createDonation, updateDonation } from "../../services/donations.service";
export { useDonations } from "./useDonations";
export { useCreateDonation } from "./useCreateDonation";
export { useUpdateDonation } from "./useUpdateDonation";
export { DonationsPage } from "./DonationsPage";
