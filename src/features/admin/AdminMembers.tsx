import { useMembers } from "../members/useMembers";
import { CreateMemberForm } from "../members/CreateMemberForm";
import { MemberRowEditor } from "../members/MemberRowEditor";
import { useAuth } from "../../hooks/useAuth";
import { canManageMembers } from "../../app/permissions/permissions";

export function AdminMembers() {
  const { user } = useAuth();
  const { data, isLoading, error } = useMembers();

  if (!user?.role || !canManageMembers(user.role)) {
    return <div className="dash-error">Access denied. Admin role required.</div>;
  }

  return (
    <>
      <div className="dash-page-header">
        <h1 className="dash-page-title">Members</h1>
        <p className="dash-page-sub">Manage NGO system members and their roles.</p>
      </div>

      <div className="dash-card" style={{ marginBottom: 20 }}>
        <div className="dash-card-header">
          <h3 className="dash-card-title">Add New Member</h3>
        </div>
        <div className="dash-card-body">
          <CreateMemberForm />
        </div>
      </div>

      {isLoading && <div className="dash-loading">Loading members…</div>}
      {error && <div className="dash-error">Failed to load members.</div>}

      {!isLoading && (
        <div className="dash-card">
          {(data?.length ?? 0) === 0 ? (
            <div className="dash-empty">
              <span className="dash-empty-icon">🗂️</span>No members yet.
            </div>
          ) : (
            <div className="dash-table-wrap">
              <table className="dash-table">
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
                    <MemberRowEditor key={m.id} member={m} canEdit={canManageMembers(user.role)} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}
