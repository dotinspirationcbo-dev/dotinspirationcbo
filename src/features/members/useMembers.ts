import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../../services/members.service";
import type { Member } from "../../types/member.types";

/**
 * useMembers — React Query hook for the members list.
 * Backed by the in-memory service now; swap getMembers() for a fetch()
 * call to /api/members once the backend is ready.
 */
export function useMembers() {
  return useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: getMembers,
  });
}
