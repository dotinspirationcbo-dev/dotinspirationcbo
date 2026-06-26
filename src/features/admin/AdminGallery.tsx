import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  type GalleryImage,
  type CreateGalleryImageDto,
} from "../../services/gallery.service";

const EMPTY_FORM: CreateGalleryImageDto = {
  image_url: "",
  title: "",
  caption: "",
  category: "general",
  is_published: true,
};

const CATEGORIES = ["general", "community", "events", "programmes", "team"];

export function AdminGallery() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery-all"],
    queryFn: () => getGalleryImages({ all: true }),
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateGalleryImageDto>(EMPTY_FORM);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [alert, setAlert] = useState("");

  const invalidate = () => qc.invalidateQueries({ queryKey: ["gallery-all"] });

  const createMut = useMutation({
    mutationFn: createGalleryImage,
    onSuccess: () => { invalidate(); setForm(EMPTY_FORM); setShowForm(false); setAlert("Image added."); },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: CreateGalleryImageDto }) =>
      updateGalleryImage(id, dto),
    onSuccess: () => { invalidate(); setEditing(null); setAlert("Image updated."); },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  const deleteMut = useMutation({
    mutationFn: deleteGalleryImage,
    onSuccess: () => { invalidate(); setAlert("Image deleted."); },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  function field(key: keyof CreateGalleryImageDto) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
      setForm((f) => ({ ...f, [key]: value }));
    };
  }

  function openEdit(img: GalleryImage) {
    setEditing(img);
    setForm({
      image_url: img.image_url,
      title: img.title ?? "",
      caption: img.caption ?? "",
      category: img.category,
      is_published: img.is_published,
    });
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image_url?.trim()) return;
    if (editing) {
      updateMut.mutate({ id: editing.id, dto: form });
    } else {
      createMut.mutate(form);
    }
  }

  function handleCancel() {
    setShowForm(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  }

  const isPending = createMut.isPending || updateMut.isPending;

  return (
    <>
      <div className="dash-page-header">
        <h1 className="dash-page-title">Gallery Manager</h1>
        <p className="dash-page-sub">Upload and manage site gallery images.</p>
      </div>

      {alert && (
        <div
          className={`dash-alert ${alert.startsWith("Error") ? "dash-alert--error" : "dash-alert--success"}`}
          onClick={() => setAlert("")}
        >
          {alert} <span style={{ cursor: "pointer", marginLeft: 8 }}>×</span>
        </div>
      )}

      {!showForm && (
        <div style={{ marginBottom: 20 }}>
          <button className="dash-btn dash-btn--primary" onClick={() => setShowForm(true)}>
            + Add Image
          </button>
        </div>
      )}

      {showForm && (
        <div className="dash-card" style={{ marginBottom: 20 }}>
          <div className="dash-card-header">
            <h3 className="dash-card-title">{editing ? "Edit Image" : "Add New Image"}</h3>
          </div>
          <form className="dash-card-body" onSubmit={handleSubmit}>
            <div className="dash-form-grid">
              <div className="dash-field dash-form-grid--full">
                <label className="dash-label">Image URL *</label>
                <input className="dash-input" required value={form.image_url ?? ""} onChange={field("image_url")} placeholder="https://…" />
              </div>
              <div className="dash-field">
                <label className="dash-label">Title</label>
                <input className="dash-input" value={form.title ?? ""} onChange={field("title")} placeholder="Optional title" />
              </div>
              <div className="dash-field">
                <label className="dash-label">Category</label>
                <select className="dash-select" value={form.category ?? "general"} onChange={field("category")}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="dash-field dash-form-grid--full">
                <label className="dash-label">Caption</label>
                <textarea className="dash-textarea" rows={2} value={form.caption ?? ""} onChange={field("caption")} placeholder="Describe this image…" />
              </div>
              <div className="dash-field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <input type="checkbox" id="published" checked={form.is_published ?? true} onChange={field("is_published")} />
                <label htmlFor="published" className="dash-label" style={{ textTransform: "none", marginBottom: 0 }}>Published</label>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button type="submit" className="dash-btn dash-btn--primary" disabled={isPending}>
                {isPending ? "Saving…" : editing ? "Update Image" : "Add Image"}
              </button>
              <button type="button" className="dash-btn dash-btn--ghost" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {error && <div className="dash-error">Failed to load images. Check API server.</div>}
      {isLoading && <div className="dash-loading">Loading gallery…</div>}

      {!isLoading && data?.length === 0 && (
        <div className="dash-card">
          <div className="dash-empty">
            <span className="dash-empty-icon">🖼️</span>
            No images yet. Click "Add Image" to upload your first one.
          </div>
        </div>
      )}

      {!isLoading && (data?.length ?? 0) > 0 && (
        <div className="dash-gallery-grid">
          {data?.map((img) => (
            <div key={img.id} className="dash-gallery-item">
              <div className="dash-gallery-thumb">
                {img.image_url ? (
                  <img src={img.image_url} alt={img.caption ?? img.title ?? "Gallery image"} loading="lazy" />
                ) : (
                  <div className="dash-gallery-thumb-placeholder">🖼️</div>
                )}
              </div>
              <div className="dash-gallery-info">
                <div className="dash-gallery-caption">{img.caption ?? img.title ?? "(no caption)"}</div>
                <div className="dash-gallery-cat">
                  {img.category} · <span className={`dash-badge ${img.is_published ? "dash-badge--published" : "dash-badge--hidden"}`} style={{ fontSize: "0.6rem", padding: "1px 6px" }}>{img.is_published ? "live" : "hidden"}</span>
                </div>
              </div>
              <div className="dash-gallery-actions">
                <button className="dash-btn dash-btn--ghost dash-btn--sm" onClick={() => openEdit(img)}>Edit</button>
                <button
                  className="dash-btn dash-btn--danger dash-btn--sm"
                  disabled={deleteMut.isPending}
                  onClick={() => { if (confirm("Delete this image?")) deleteMut.mutate(img.id); }}
                >
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
