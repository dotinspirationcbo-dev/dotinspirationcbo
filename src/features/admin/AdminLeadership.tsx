import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLeadershipMembers,
  createLeadershipMember,
  updateLeadershipMember,
  deleteLeadershipMember,
  reorderLeadershipMember,
  type LeadershipMember,
  type CreateLeadershipMemberDto,
} from "../../services/leadership.service";

const EMPTY_FORM: CreateLeadershipMemberDto = {
  name: "",
  role: "",
  bio: "",
  photo_url: "",
  sort_order: 0,
  is_published: true,
};

export function AdminLeadership() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["leadership-all"],
    queryFn: () => getLeadershipMembers(),
  });

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<LeadershipMember | null>(null);
  const [form, setForm] = useState<CreateLeadershipMemberDto>(EMPTY_FORM);
  const [alert, setAlert] = useState("");

  const invalidate = () => qc.invalidateQueries({ queryKey: ["leadership-all"] });

  const createMut = useMutation({
    mutationFn: createLeadershipMember,
    onSuccess: () => { invalidate(); setForm(EMPTY_FORM); setShowForm(false); setAlert("Member added."); },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreateLeadershipMemberDto }) =>
      updateLeadershipMember(id, dto),
    onSuccess: () => { invalidate(); setEditing(null); setShowForm(false); setAlert("Member updated."); },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  const deleteMut = useMutation({
    mutationFn: deleteLeadershipMember,
    onSuccess: () => { invalidate(); setAlert("Member deleted."); },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  const reorderMut = useMutation({
    mutationFn: ({ id, direction }: { id: number; direction: "up" | "down" }) =>
      reorderLeadershipMember(id, direction),
    onSuccess: () => invalidate(),
  });

  const visibilityMut = useMutation({
    mutationFn: ({ id, is_published }: { id: number; is_published: boolean }) =>
      updateLeadershipMember(id, { is_published }),
    onSuccess: () => invalidate(),
  });

  function field(key: keyof CreateLeadershipMemberDto) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.type === "number"
        ? Number(e.target.value)
        : e.target.value;
      setForm((f) => ({ ...f, [key]: value }));
    };
  }

  function openEdit(m: LeadershipMember) {
    setEditing(m);
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio ?? "",
      photo_url: m.photo_url ?? "",
      sort_order: m.sort_order,
      is_published: m.is_published,
    });
    setShowForm(true);
  }

  function handleCancel() { setShowForm(false); setEditing(null); setForm(EMPTY_FORM); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dto = { ...form, bio: form.bio || null, photo_url: form.photo_url || null };
    if (editing) {
      updateMut.mutate({ id: editing.id, dto });
    } else {
      createMut.mutate(dto);
    }
  }

  const isPending = createMut.isPending || updateMut.isPending;

  return (
    <>
      <div className="dash-page-header">
        <h1 className="dash-page-title">Leadership Manager</h1>
        <p className="dash-page-sub">Add, edit, and reorder leadership team members.</p>
      </div>

      {alert && (
        <div className={`dash-alert ${alert.startsWith("Error") ? "dash-alert--error" : "dash-alert--success"}`} onClick={() => setAlert("")}>
          {alert} <span style={{ cursor: "pointer", marginLeft: 8 }}>×</span>
        </div>
      )}

      {!showForm && (
        <div style={{ marginBottom: 20 }}>
          <button className="dash-btn dash-btn--primary" onClick={() => setShowForm(true)}>+ Add Member</button>
        </div>
      )}

      {showForm && (
        <div className="dash-card" style={{ marginBottom: 20 }}>
          <div className="dash-card-header">
            <h3 className="dash-card-title">{editing ? "Edit Member" : "Add New Member"}</h3>
          </div>
          <form className="dash-card-body" onSubmit={handleSubmit}>
            <div className="dash-form-grid">
              <div className="dash-field">
                <label className="dash-label">Full Name *</label>
                <input className="dash-input" required value={form.name} onChange={field("name")} placeholder="e.g. Mutebi Julius" />
              </div>
              <div className="dash-field">
                <label className="dash-label">Role / Title *</label>
                <input className="dash-input" required value={form.role} onChange={field("role")} placeholder="e.g. Executive Director" />
              </div>
              <div className="dash-field dash-form-grid--full">
                <label className="dash-label">Photo URL</label>
                <input className="dash-input" value={form.photo_url ?? ""} onChange={field("photo_url")} placeholder="https://… or /Images/photo.jpg" />
              </div>
              <div className="dash-field dash-form-grid--full">
                <label className="dash-label">Bio</label>
                <textarea className="dash-textarea" rows={3} value={form.bio ?? ""} onChange={field("bio")} placeholder="Brief biography…" />
              </div>
              <div className="dash-field">
                <label className="dash-label">Sort Order</label>
                <input className="dash-input" type="number" value={form.sort_order ?? 0} onChange={field("sort_order")} />
              </div>
              <div className="dash-field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <input type="checkbox" id="leader-pub" checked={form.is_published ?? true} onChange={field("is_published")} />
                <label htmlFor="leader-pub" className="dash-label" style={{ textTransform: "none", marginBottom: 0 }}>Published</label>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button type="submit" className="dash-btn dash-btn--primary" disabled={isPending}>
                {isPending ? "Saving…" : editing ? "Update Member" : "Add Member"}
              </button>
              <button type="button" className="dash-btn dash-btn--ghost" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {error && <div className="dash-error">Failed to load leadership. Check API server.</div>}
      {isLoading && <div className="dash-loading">Loading…</div>}

      {!isLoading && (
        <div className="dash-card">
          {(data?.length ?? 0) === 0 ? (
            <div className="dash-empty">
              <span className="dash-empty-icon">👥</span>
              No leadership members yet.
            </div>
          ) : (
            data?.map((m, idx) => (
              <div key={m.id} className="dash-leader-row">
                {/* Avatar */}
                {m.photo_url ? (
                  <img className="dash-leader-avatar" src={m.photo_url} alt={m.name} loading="lazy" />
                ) : (
                  <div className="dash-leader-avatar-placeholder">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Info */}
                <div>
                  <div className="dash-leader-name">{m.name}</div>
                  <div className="dash-leader-role">{m.role}</div>
                  {m.bio && <div style={{ fontSize: "0.74rem", color: "var(--dash-muted)", marginTop: 2 }}>{m.bio.slice(0, 80)}{m.bio.length > 80 ? "…" : ""}</div>}
                </div>
                {/* Actions */}
                <div className="dash-leader-actions">
                  <span className={`dash-badge ${m.is_published ? "dash-badge--published" : "dash-badge--hidden"}`}>
                    {m.is_published ? "Live" : "Hidden"}
                  </span>
                  <button
                    className="dash-btn dash-btn--ghost dash-btn--sm dash-btn--icon"
                    title="Move up"
                    disabled={idx === 0 || reorderMut.isPending}
                    onClick={() => reorderMut.mutate({ id: m.id, direction: "up" })}
                  >↑</button>
                  <button
                    className="dash-btn dash-btn--ghost dash-btn--sm dash-btn--icon"
                    title="Move down"
                    disabled={idx === (data?.length ?? 0) - 1 || reorderMut.isPending}
                    onClick={() => reorderMut.mutate({ id: m.id, direction: "down" })}
                  >↓</button>
                  <button
                    className="dash-btn dash-btn--ghost dash-btn--sm"
                    onClick={() => visibilityMut.mutate({ id: m.id, is_published: !m.is_published })}
                    disabled={visibilityMut.isPending}
                  >
                    {m.is_published ? "Hide" : "Show"}
                  </button>
                  <button className="dash-btn dash-btn--ghost dash-btn--sm" onClick={() => openEdit(m)}>Edit</button>
                  <button
                    className="dash-btn dash-btn--danger dash-btn--sm"
                    disabled={deleteMut.isPending}
                    onClick={() => { if (confirm(`Delete ${m.name}?`)) deleteMut.mutate(m.id); }}
                  >Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
