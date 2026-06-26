import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSiteContent,
  upsertSiteContentKey,
  bulkUpsertSiteContent,
} from "../../services/siteContent.service";
import { siteContent } from "../public/content/siteContent";

const CONTENT_GROUPS = [
  {
    label: "Homepage Hero",
    keys: ["hero.title", "hero.subtitle"],
    rows: { "hero.title": 1, "hero.subtitle": 3 } as Record<string, number>,
  },
  {
    label: "About Page",
    keys: ["about.description", "about.extended", "about.vision", "about.mission", "about.motto"],
    rows: {
      "about.description": 3,
      "about.extended": 4,
      "about.vision": 2,
      "about.mission": 3,
      "about.motto": 1,
    } as Record<string, number>,
  },
  {
    label: "Programs Page",
    keys: [
      "programs.youthEmpowerment",
      "programs.education",
      "programs.communityOutreach",
      "programs.economicDevelopment",
    ],
    rows: {} as Record<string, number>,
  },
];

function friendlyLabel(key: string) {
  const [, field] = key.split(".");
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());
}

const DEFAULTS: Record<string, string> = {
  "hero.title": siteContent.hero.title,
  "hero.subtitle": siteContent.hero.subtitle,
  "about.description": siteContent.about.description,
  "about.extended": siteContent.about.extended,
  "about.vision": siteContent.about.vision,
  "about.mission": siteContent.about.mission,
  "about.motto": siteContent.about.motto,
  "programs.youthEmpowerment": siteContent.programs.youthEmpowerment,
  "programs.education": siteContent.programs.education,
  "programs.communityOutreach": siteContent.programs.communityOutreach,
  "programs.economicDevelopment": siteContent.programs.economicDevelopment,
};

export function AdminSiteContent() {
  const qc = useQueryClient();
  const { data: remote, isLoading } = useQuery({
    queryKey: ["site-content"],
    queryFn: getSiteContent,
  });

  const [values, setValues] = useState<Record<string, string>>(DEFAULTS);
  const [alert, setAlert] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (remote) {
      setValues((prev) => ({ ...prev, ...remote }));
    }
  }, [remote]);

  const saveMut = useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) =>
      upsertSiteContentKey(key, value),
    onSuccess: (_, { key }) => {
      qc.invalidateQueries({ queryKey: ["site-content"] });
      setSaving(null);
      setAlert(`Saved "${friendlyLabel(key)}".`);
    },
    onError: (e: Error) => { setSaving(null); setAlert(`Error: ${e.message}`); },
  });

  const saveAllMut = useMutation({
    mutationFn: () =>
      bulkUpsertSiteContent(
        Object.entries(values).map(([key, value]) => ({ key, value }))
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site-content"] });
      setAlert("All changes saved.");
    },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  function handleSaveKey(key: string) {
    setSaving(key);
    saveMut.mutate({ key, value: values[key] ?? "" });
  }

  return (
    <>
      <div className="dash-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div>
          <h1 className="dash-page-title">Site Content Editor</h1>
          <p className="dash-page-sub">Edit website text. Changes are saved to the database.</p>
        </div>
        <button
          className="dash-btn dash-btn--primary"
          onClick={() => saveAllMut.mutate()}
          disabled={saveAllMut.isPending}
          style={{ flexShrink: 0 }}
        >
          {saveAllMut.isPending ? "Saving All…" : "Save All"}
        </button>
      </div>

      {alert && (
        <div
          className={`dash-alert ${alert.startsWith("Error") ? "dash-alert--error" : "dash-alert--success"}`}
          onClick={() => setAlert("")}
        >
          {alert} <span style={{ cursor: "pointer", marginLeft: 8 }}>×</span>
        </div>
      )}

      {isLoading && <div className="dash-loading">Loading content…</div>}

      {CONTENT_GROUPS.map((group) => (
        <div key={group.label} className="dash-content-group">
          <div className="dash-content-group-header">{group.label}</div>
          <div className="dash-content-group-body">
            {group.keys.map((key) => (
              <div key={key} className="dash-field">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <label className="dash-label" style={{ marginBottom: 0 }}>{friendlyLabel(key)}</label>
                  <button
                    className="dash-btn dash-btn--ghost dash-btn--sm"
                    onClick={() => handleSaveKey(key)}
                    disabled={saving === key || saveMut.isPending}
                  >
                    {saving === key ? "Saving…" : "Save"}
                  </button>
                </div>
                <textarea
                  className="dash-textarea"
                  rows={group.rows[key] ?? 3}
                  value={values[key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
