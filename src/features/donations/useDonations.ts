import { useQuery } from "@tanstack/react-query";
import { getDonations } from "../../services/donations.service";
import type { Donation } from "../../types/donation.types";

/**
 * useDonations — React Query hook for the donations list.
 * Backed by the in-memory service now; swap getDonations() for a
 * fetch() call to /api/donations once the backend is ready.
 */
export function useDonations() {
  return useQuery<Donation[]>({
    queryKey: ["donations"],
    queryFn: getDonations,
  });
}
