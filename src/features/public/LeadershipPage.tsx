const GOVERNANCE_CARDS = [
  ["📋", "Registered CBO",         "Legally registered Community Based Organisation under Ugandan law since 2026."],
  ["🔍", "Independent Oversight",  "Annual financial statements independently reviewed by qualified auditors."],
  ["📊", "Donor Reporting",         "Quarterly programme reports shared with all funders and partners."],
  ["🤝", "Community Governance",   "Beneficiary representatives actively participate in programme decisions."],
];

const STATS = [
  { number: "5",      label: "Strategic Program Areas" },
  { number: "3-Year", label: "Development Plan" },
  { number: "15",     label: "Villages Covered" },
  { number: "2026",   label: "Community-Based Org." },
];

export function LeadershipPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">Executive Leadership</h1>
        <p className="page-hero__subtitle">
          Dedicated professionals and community leaders committed to empowering
          communities and driving sustainable development across Mukono District and beyond.
        </p>
      </div>

      {/* Leadership placeholder */}
      <section className="section">
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">The People Behind the Mission</span>
            <h2 className="section-title">Meet Our Leadership Team</h2>
            <p className="section-subtitle">
              Our team brings together deep expertise in community development,
              health, education, finance, and communications — united by one purpose.
            </p>
          </div>

          {/* Leadership stats strip */}
          <div className="stats-strip" style={{ borderRadius: 12, overflow: "hidden", marginBottom: 48 }}>
            <div className="stats-strip__grid">
              {STATS.map((s) => (
                <div key={s.label} className="stats-strip__item">
                  <div className="stats-strip__number">{s.number}</div>
                  <div className="stats-strip__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center" style={{ padding: "48px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>👥</div>
            <h3 style={{ fontWeight: 700, color: "var(--green-900)", marginBottom: 12 }}>
              Leadership details coming soon
            </h3>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              We are finalising our leadership profiles. Please check back soon or
              reach out directly to learn more about the team driving our mission.
            </p>
            <div className="cta-group">
              <a href="mailto:info@dotinspirationcbo.org" className="btn btn-primary">
                Get In Touch →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="section section--alt">
        <div className="container">
          <div className="governance-grid">
            <div>
              <span className="section-label">Governance</span>
              <h2 className="section-title">How We Are Governed</h2>
              <p className="prose-text">
                Dot Inspiration CBO has operated in Mukono District since 2026,
                registered under Ugandan law and governed by an independent Board
                of Directors. The Board provides strategic oversight, fiduciary
                accountability, and ensures the organisation remains true to its mission.
              </p>
              <p className="prose-text">
                We are committed to full transparency. Financial reports are prepared
                annually and are available to all donors and partners on request.
                We report quarterly to funders on programme progress and outcomes.
              </p>
            </div>
            <div className="info-card-list">
              {GOVERNANCE_CARDS.map(([icon, title, text]) => (
                <div key={String(title)} className="info-card">
                  <span className="info-card__icon">{icon}</span>
                  <div>
                    <div className="info-card__title">{title}</div>
                    <div className="info-card__text">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join the team */}
      <section className="section">
        <div className="container text-center">
          <span className="section-label">Join Us</span>
          <h2 className="section-title">Work With Us</h2>
          <p className="section-subtitle">
            We are always looking for passionate, skilled individuals who want to
            make a tangible difference. Whether as a volunteer, intern, or
            long-term team member — there is a place for you here.
          </p>
          <div className="cta-group">
            <a href="mailto:info@dotinspirationcbo.org" className="btn btn-primary">
              Get In Touch →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
