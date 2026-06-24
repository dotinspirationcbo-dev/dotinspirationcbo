import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMember } from "../../services/members.service";
import type { CreateMemberData } from "../../types/member.types";

/**
 * useCreateMember — React Query mutation for creating a new member.
 * On success, invalidates the ["members"] query so the list refreshes automatically.
 */
export function useCreateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMemberData) => createMember(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}
