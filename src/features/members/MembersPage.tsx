import { useAuth } from "../../hooks/useAuth";
import { canManageMembers } from "../../app/permissions/permissions";
import { useMembers } from "./useMembers";
import { CreateMemberForm } from "./CreateMemberForm";
import type { Member } from "../../types/member.types";

/**
 * MembersPage — admin-only view of all NGO members.
 * Access is double-checked here (in addition to ProtectedRoute) so the
 * permission layer is enforced at the component level too.
 */
export function MembersPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useMembers();

  if (!user?.role || !canManageMembers(user.role)) {
    return <div>Access denied.</div>;
  }

  if (isLoading) return <div>Loading members…</div>;
  if (error) return <div>Failed to load members.</div>;

  return (
    <div>
      <h1>Members</h1>

      <CreateMemberForm />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((m: Member) => (
            <tr key={m.id}>
              <td>{m.fullName}</td>
              <td>{m.email}</td>
              <td>{m.role}</td>
              <td>{m.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
