import { useAuth } from "../../hooks/useAuth";
import { canManageMembers } from "../../app/permissions/permissions";
import { useMembers } from "./useMembers";
import { CreateMemberForm } from "./CreateMemberForm";
import { MemberRowEditor } from "./MemberRowEditor";

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

  const canEdit = canManageMembers(user.role);

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((m) => (
            <MemberRowEditor key={m.id} member={m} canEdit={canEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
