import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMember } from "../../services/members.service";
import type { UpdateMemberData } from "../../types/member.types";

/**
 * useUpdateMember — React Query mutation for updating an existing member.
 * On success, invalidates the ["members"] query so the list refreshes automatically.
 */
export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMemberData) => updateMember(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}
