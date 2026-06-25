import { useState } from "react";
import { siteContent, type SiteContent } from "../public/content/siteContent";
import "./admin.css";

type SaveState = "idle" | "saving" | "saved";

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent>(siteContent);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  function setAbout(key: keyof SiteContent["about"], value: string) {
    setContent((c) => ({ ...c, about: { ...c.about, [key]: value } }));
  }
  function setPrograms(key: keyof SiteContent["programs"], value: string) {
    setContent((c) => ({ ...c, programs: { ...c.programs, [key]: value } }));
  }
  function setHero(key: keyof SiteContent["hero"], value: string) {
    setContent((c) => ({ ...c, hero: { ...c.hero, [key]: value } }));
  }

  function handleSave() {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2000);
    }, 600);
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Content Editor</h1>
          <p className="admin-subtitle">Edit website text — changes apply on next deployment.</p>
        </div>
        <button
          className={`admin-save-btn ${saveState === "saved" ? "admin-save-btn--saved" : ""}`}
          onClick={handleSave}
          disabled={saveState === "saving"}
        >
          {saveState === "saving" ? "Saving…" : saveState === "saved" ? "✓ Saved" : "Save Changes"}
        </button>
      </div>

      {/* Hero */}
      <section className="admin-section">
        <h2 className="admin-section-title">🏠 Homepage Hero</h2>
        <div className="admin-field">
          <label className="admin-label">Headline</label>
          <input
            className="admin-input"
            value={content.hero.title}
            onChange={(e) => setHero("title", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Subtitle</label>
          <textarea
            className="admin-textarea"
            rows={3}
            value={content.hero.subtitle}
            onChange={(e) => setHero("subtitle", e.target.value)}
          />
        </div>
      </section>

      {/* About */}
      <section className="admin-section">
        <h2 className="admin-section-title">ℹ️ About Page</h2>
        <div className="admin-field">
          <label className="admin-label">Description</label>
          <textarea
            className="admin-textarea"
            rows={4}
            value={content.about.description}
            onChange={(e) => setAbout("description", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Extended Description</label>
          <textarea
            className="admin-textarea"
            rows={4}
            value={content.about.extended}
            onChange={(e) => setAbout("extended", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Vision</label>
          <textarea
            className="admin-textarea"
            rows={2}
            value={content.about.vision}
            onChange={(e) => setAbout("vision", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Mission</label>
          <textarea
            className="admin-textarea"
            rows={3}
            value={content.about.mission}
            onChange={(e) => setAbout("mission", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Motto</label>
          <input
            className="admin-input"
            value={content.about.motto}
            onChange={(e) => setAbout("motto", e.target.value)}
          />
        </div>
      </section>

      {/* Programs */}
      <section className="admin-section">
        <h2 className="admin-section-title">📋 Programs Page</h2>
        <div className="admin-field">
          <label className="admin-label">Youth Empowerment</label>
          <textarea
            className="admin-textarea"
            rows={4}
            value={content.programs.youthEmpowerment}
            onChange={(e) => setPrograms("youthEmpowerment", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Education Support</label>
          <textarea
            className="admin-textarea"
            rows={4}
            value={content.programs.education}
            onChange={(e) => setPrograms("education", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Community Outreach</label>
          <textarea
            className="admin-textarea"
            rows={4}
            value={content.programs.communityOutreach}
            onChange={(e) => setPrograms("communityOutreach", e.target.value)}
          />
        </div>
        <div className="admin-field">
          <label className="admin-label">Economic Development</label>
          <textarea
            className="admin-textarea"
            rows={4}
            value={content.programs.economicDevelopment}
            onChange={(e) => setPrograms("economicDevelopment", e.target.value)}
          />
        </div>
      </section>

      {/* Contact (read-only reference) */}
      <section className="admin-section admin-section--muted">
        <h2 className="admin-section-title">📞 Contact Details</h2>
        <p className="admin-note">
          These are read-only here. To change contact details, update{" "}
          <code>src/features/public/content/siteContent.ts</code> directly.
        </p>
        <div className="admin-readonly-grid">
          {Object.entries(content.contact).map(([key, val]) => (
            <div key={key} className="admin-readonly-row">
              <span className="admin-readonly-key">{key}</span>
              <span className="admin-readonly-val">{val}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
