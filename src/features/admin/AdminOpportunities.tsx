import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  type Opportunity,
  type CreateOpportunityDto,
  type OpportunityType,
  type OpportunityStatus,
} from "../../services/opportunities.service";

const EMPTY_FORM: CreateOpportunityDto = {
  title: "",
  type: "volunteer",
  description: "",
  requirements: "",
  location: "",
  deadline: "",
  status: "open",
};

const TYPES: OpportunityType[] = ["job", "volunteer", "internship"];
const STATUSES: OpportunityStatus[] = ["open", "closed", "draft"];

function fmt(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function AdminOpportunities() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["opportunities-all"],
    queryFn: () => getOpportunities(),
  });

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);
  const [form, setForm] = useState<CreateOpportunityDto>(EMPTY_FORM);
  const [alert, setAlert] = useState("");

  const invalidate = () => qc.invalidateQueries({ queryKey: ["opportunities-all"] });

  const createMut = useMutation({
    mutationFn: createOpportunity,
    onSuccess: () => { invalidate(); setForm(EMPTY_FORM); setShowForm(false); setAlert("Opportunity created."); },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreateOpportunityDto }) => updateOpportunity(id, dto),
    onSuccess: () => { invalidate(); setEditing(null); setShowForm(false); setAlert("Opportunity updated."); },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  const deleteMut = useMutation({
    mutationFn: deleteOpportunity,
    onSuccess: () => { invalidate(); setAlert("Opportunity deleted."); },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  const quickStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OpportunityStatus }) =>
      updateOpportunity(id, { status }),
    onSuccess: () => invalidate(),
  });

  function field(key: keyof CreateOpportunityDto) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function openEdit(o: Opportunity) {
    setEditing(o);
    setForm({
      title: o.title,
      type: o.type,
      description: o.description ?? "",
      requirements: o.requirements ?? "",
      location: o.location ?? "",
      deadline: o.deadline ? o.deadline.split("T")[0] : "",
      status: o.status,
    });
    setShowForm(true);
  }

  function handleCancel() { setShowForm(false); setEditing(null); setForm(EMPTY_FORM); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dto = { ...form, deadline: form.deadline || null };
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
        <h1 className="dash-page-title">Opportunities</h1>
        <p className="dash-page-sub">Manage job postings, volunteer calls, and internships.</p>
      </div>

      {alert && (
        <div className={`dash-alert ${alert.startsWith("Error") ? "dash-alert--error" : "dash-alert--success"}`} onClick={() => setAlert("")}>
          {alert} <span style={{ cursor: "pointer", marginLeft: 8 }}>×</span>
        </div>
      )}

      {!showForm && (
        <div style={{ marginBottom: 20 }}>
          <button className="dash-btn dash-btn--primary" onClick={() => setShowForm(true)}>+ Add Opportunity</button>
        </div>
      )}

      {showForm && (
        <div className="dash-card" style={{ marginBottom: 20 }}>
          <div className="dash-card-header">
            <h3 className="dash-card-title">{editing ? "Edit Opportunity" : "New Opportunity"}</h3>
          </div>
          <form className="dash-card-body" onSubmit={handleSubmit}>
            <div className="dash-form-grid">
              <div className="dash-field dash-form-grid--full">
                <label className="dash-label">Title *</label>
                <input className="dash-input" required value={form.title} onChange={field("title")} placeholder="e.g. Community Health Volunteer" />
              </div>
              <div className="dash-field">
                <label className="dash-label">Type *</label>
                <select className="dash-select" value={form.type} onChange={field("type")}>
                  {TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div className="dash-field">
                <label className="dash-label">Status</label>
                <select className="dash-select" value={form.status} onChange={field("status")}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div className="dash-field">
                <label className="dash-label">Location</label>
                <input className="dash-input" value={form.location ?? ""} onChange={field("location")} placeholder="e.g. Mukono District" />
              </div>
              <div className="dash-field">
                <label className="dash-label">Deadline</label>
                <input className="dash-input" type="date" value={form.deadline ?? ""} onChange={field("deadline")} />
              </div>
              <div className="dash-field dash-form-grid--full">
                <label className="dash-label">Description</label>
                <textarea className="dash-textarea" rows={3} value={form.description ?? ""} onChange={field("description")} placeholder="Describe the opportunity…" />
              </div>
              <div className="dash-field dash-form-grid--full">
                <label className="dash-label">Requirements</label>
                <textarea className="dash-textarea" rows={2} value={form.requirements ?? ""} onChange={field("requirements")} placeholder="Skills, qualifications, etc." />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button type="submit" className="dash-btn dash-btn--primary" disabled={isPending}>
                {isPending ? "Saving…" : editing ? "Update" : "Create"}
              </button>
              <button type="button" className="dash-btn dash-btn--ghost" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {error && <div className="dash-error">Failed to load opportunities. Check API server.</div>}
      {isLoading && <div className="dash-loading">Loading…</div>}

      {!isLoading && (
        <div className="dash-card">
          {(data?.length ?? 0) === 0 ? (
            <div className="dash-empty">
              <span className="dash-empty-icon">💼</span>
              No opportunities yet. Add your first one above.
            </div>
          ) : (
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Deadline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((o) => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600 }}>{o.title}</td>
                      <td><span className={`dash-badge dash-badge--${o.type}`}>{o.type}</span></td>
                      <td>
                        <select
                          className="dash-select"
                          style={{ padding: "3px 6px", fontSize: "0.76rem", width: "auto" }}
                          value={o.status}
                          onChange={(e) => quickStatus.mutate({ id: o.id, status: e.target.value as OpportunityStatus })}
                        >
                          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td>{o.location ?? "—"}</td>
                      <td>{fmt(o.deadline)}</td>
                      <td>
                        <div className="dash-table-actions">
                          <button className="dash-btn dash-btn--ghost dash-btn--sm" onClick={() => openEdit(o)}>Edit</button>
                          <button
                            className="dash-btn dash-btn--danger dash-btn--sm"
                            disabled={deleteMut.isPending}
                            onClick={() => { if (confirm(`Delete "${o.title}"?`)) deleteMut.mutate(o.id); }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
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
