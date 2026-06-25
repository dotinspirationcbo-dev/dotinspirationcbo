const TEAM = [
  {
    initials: "OC",
    name: "Othieno Constant",
    role: "Executive Director & Founder",
    bio: "Othieno Constant founded Dot Inspiration CBO with a vision of empowering marginalised communities across Uganda. He drives the organisation's strategic direction and oversees all programme delivery, partnerships, and community engagement.",
  },
  {
    initials: "AN",
    name: "Akello Namukwaya",
    role: "Director of Programmes",
    bio: "Akello leads programme design and implementation, ensuring all activities are community-led, impact-focused, and aligned with the organisation's mission. She has over eight years of experience in community development across East Africa.",
  },
  {
    initials: "BM",
    name: "Byaruhanga Moses",
    role: "Finance & Administration Officer",
    bio: "Moses oversees financial management, organisational compliance, and administrative operations. He ensures transparent stewardship of donor resources and maintains the organisation's accountability standards.",
  },
  {
    initials: "FR",
    name: "Fortunate Rwamwojo",
    role: "Community Mobilisation Officer",
    bio: "Fortunate is the bridge between the organisation and the communities we serve. She conducts needs assessments, coordinates community outreaches, and ensures that beneficiaries remain at the centre of all our work.",
  },
  {
    initials: "JO",
    name: "James Okello",
    role: "Monitoring & Evaluation Officer",
    bio: "James designs and manages the organisation's M&E framework, tracking programme outcomes and ensuring that Dot Inspiration CBO continues to learn, adapt, and demonstrate measurable impact to stakeholders.",
  },
  {
    initials: "GN",
    name: "Grace Nalwoga",
    role: "Partnerships & Communications Officer",
    bio: "Grace manages donor relations, strategic partnerships, and the organisation's public communications. She works to grow Dot Inspiration CBO's visibility and resource base to expand programme reach.",
  },
];

export function LeadershipPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">Our Leadership Team</h1>
        <p className="page-hero__subtitle">
          Dedicated professionals committed to delivering transparent,
          community-centred development across Uganda.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">The People Behind the Mission</span>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Our team brings together expertise in community development, health,
              education, finance, and communications.
            </p>
          </div>

          <div className="leadership-grid">
            {TEAM.map((member) => (
              <div key={member.name} className="leader-card">
                <div className="leader-card__avatar">{member.initials}</div>
                <div className="leader-card__name">{member.name}</div>
                <div className="leader-card__role">{member.role}</div>
                <p className="leader-card__bio">{member.bio}</p>
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
              <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 16, fontSize: "0.95rem" }}>
                Dot Inspiration CBO is registered under Ugandan law and operates
                under the governance of an independent Board of Directors. The Board
                provides strategic oversight, fiduciary accountability, and ensures
                the organisation remains true to its mission.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                We are committed to full transparency: financial reports are
                prepared annually and are available to all donors and partners on
                request.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                ["📋", "Registered CBO",     "Legally registered Community Based Organisation under Ugandan law."],
                ["🔍", "Independent Audit",   "Annual financial statements independently reviewed."],
                ["📊", "Donor Reporting",     "Quarterly programme reports shared with all funders."],
                ["🤝", "Community Oversight", "Community representatives participate in programme governance."],
              ].map(([icon, title, text]) => (
                <div key={title} style={{
                  display: "flex", gap: 16,
                  background: "var(--white)", border: "1px solid var(--border)",
                  borderRadius: 10, padding: "18px 22px",
                }}>
                  <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: "0.84rem", color: "var(--muted)" }}>{text}</div>
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
          <span className="section-label">Volunteer</span>
          <h2 className="section-title">Join Our Team</h2>
          <p className="section-subtitle">
            We are always looking for passionate individuals who want to make a
            difference. Whether as a volunteer, intern, or long-term team member —
            there is a place for you here.
          </p>
          <a
            href="mailto:info@dotinspirationcbo.org"
            className="btn btn-primary"
            style={{ marginTop: 32 }}
          >
            Get In Touch →
          </a>
        </div>
      </section>
    </>
  );
}
