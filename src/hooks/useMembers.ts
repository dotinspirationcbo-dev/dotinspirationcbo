import { useState, useEffect, useCallback } from "react";
import { getMembers } from "../services/members.service";
import type { Member } from "../types/member.types";

interface UseMembersResult {
  members: Member[];
  isLoading: boolean;
  refresh: () => void;
}

/**
 * useMembers — reactive hook over the members service.
 * Feature modules import this hook; they never call the service directly.
 */
export function useMembers(): UseMembersResult {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getMembers();
      setMembers(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { members, isLoading, refresh: load };
}
