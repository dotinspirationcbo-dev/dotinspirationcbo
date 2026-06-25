import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDonation } from "../../services/donations.service";
import type { UpdateDonationData } from "../../types/donation.types";

/**
 * useUpdateDonation — React Query mutation for updating a donation record.
 * On success, invalidates the ["donations"] query so the list refreshes automatically.
 */
export function useUpdateDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDonationData) => updateDonation(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}
