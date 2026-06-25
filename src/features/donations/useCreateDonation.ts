import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDonation } from "../../services/donations.service";
import type { CreateDonationData } from "../../types/donation.types";

/**
 * useCreateDonation — React Query mutation for recording a new donation.
 * On success, invalidates the ["donations"] query so the list refreshes automatically.
 */
export function useCreateDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDonationData) => createDonation(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}
