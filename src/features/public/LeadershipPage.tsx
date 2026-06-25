const TEAM = [
  {
    initials: "OC",
    name: "Othieno Constant",
    role: "Executive Director & Founder",
    bio: "Othieno founded Dot Inspiration CBO in 2026 with a vision of empowering Mukono District's most marginalised communities. He sets the organisation's strategic direction, leads donor and government partnerships, and personally oversees programme delivery — ensuring every initiative stays true to its community-first mission.",
  },
  {
    initials: "AN",
    name: "Akello Namukwaya",
    role: "Director of Programmes",
    bio: "Akello oversees the design, implementation, and quality assurance of all four programme areas. With over eight years of community development experience across East Africa, she ensures every intervention is evidence-based, locally relevant, and measurable.",
  },
  {
    initials: "BM",
    name: "Byaruhanga Moses",
    role: "Finance & Administration Officer",
    bio: "Moses manages all financial operations, compliance, and administrative systems. He maintains rigorous standards of donor stewardship — every contribution is tracked, reported, and verifiable — and oversees the organisation's accountability to all stakeholders.",
  },
  {
    initials: "FR",
    name: "Fortunate Rwamwojo",
    role: "Community Mobilisation Officer",
    bio: "Fortunate is the face of Dot Inspiration CBO in the communities of Mukono District. She conducts needs assessments, leads community outreach, coordinates programme participants, and ensures the voices of beneficiaries shape every decision we make.",
  },
  {
    initials: "JO",
    name: "James Okello",
    role: "Monitoring & Evaluation Officer",
    bio: "James designs and manages the organisation's M&E framework — tracking indicators, collecting field data, and producing impact reports. His work ensures we learn from every programme and demonstrate credible, measurable outcomes to donors and partners.",
  },
  {
    initials: "GN",
    name: "Grace Nalwoga",
    role: "Partnerships & Communications Officer",
    bio: "Grace leads donor relations, strategic partnerships, and external communications. She grows the organisation's visibility and resource base, building relationships with funders, media, and partner organisations who share our commitment to community development.",
  },
];

export function LeadershipPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">Our Leadership Team</h1>
        <p className="page-hero__subtitle">
          Experienced professionals who have dedicated their careers to serving
          Mukono District and surrounding communities since 2026.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">The People Behind the Mission</span>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Our team brings together deep expertise in community development,
              health, education, finance, and communications — united by one purpose.
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
                Dot Inspiration CBO has operated in Mukono District since 2026,
                registered under Ugandan law and governed by an independent Board
                of Directors. The Board provides strategic oversight, fiduciary
                accountability, and ensures the organisation remains true to its mission.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                We are committed to full transparency. Financial reports are prepared
                annually and are available to all donors and partners on request.
                We report quarterly to funders on programme progress and outcomes.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                ["📋", "Registered CBO",       "Legally registered Community Based Organisation under Ugandan law."],
                ["🔍", "Independent Oversight", "Annual financial statements independently reviewed by qualified auditors."],
                ["📊", "Donor Reporting",       "Quarterly programme reports shared with all funders and partners."],
                ["🤝", "Community Governance",  "Beneficiary representatives actively participate in programme decisions."],
              ].map(([icon, title, text]) => (
                <div key={String(title)} style={{
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
          <span className="section-label">Join Us</span>
          <h2 className="section-title">Work With Us</h2>
          <p className="section-subtitle">
            We are always looking for passionate, skilled individuals who want to
            make a tangible difference. Whether as a volunteer, intern, or
            long-term team member — there is a place for you here.
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
