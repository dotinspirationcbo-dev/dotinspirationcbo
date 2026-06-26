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

const LEADERS = [
  {
    name: "Mutebi Julius",
    role: "Chairman",
    bio: "Providing strategic direction and board oversight for Dot Inspiration CBO. A passionate community leader committed to sustainable development across Mukono District.",
    photo: "/Images/Mutebi Julius-Chairman-png.png",
  },
  {
    name: "Othieno Constant",
    role: "Executive Director",
    bio: "Leading the day-to-day operations and programme delivery of Dot Inspiration CBO. Dedicated to transforming lives through education, youth empowerment, and community-driven development.",
    photo: "/Images/Othieno Constant-Executive Director-Png (1).png",
  },
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

      {/* Leadership Team */}
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
          <div className="stats-strip" style={{ borderRadius: 12, overflow: "hidden", marginBottom: 56 }}>
            <div className="stats-strip__grid">
              {STATS.map((s) => (
                <div key={s.label} className="stats-strip__item">
                  <div className="stats-strip__number">{s.number}</div>
                  <div className="stats-strip__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Leader Cards */}
          <div className="leader-cards-grid">
            {LEADERS.map((leader) => (
              <div key={leader.name} className="leader-profile-card">
                <div className="leader-profile-card__photo-wrap">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="leader-profile-card__photo"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="leader-profile-card__body">
                  <div className="leader-profile-card__name">{leader.name}</div>
                  <div className="leader-profile-card__role">{leader.role}</div>
                  <p className="leader-profile-card__bio">{leader.bio}</p>
                </div>
              </div>
            ))}
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
