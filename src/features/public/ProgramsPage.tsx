const PROGRAMS = [
  {
    icon: "📚",
    color: "#dcfce7",
    tag: "Education",
    title: "Education & Literacy",
    desc: "Quality education is the foundation of every life. We run adult literacy classes, provide school supplies and scholastic materials to children from low-income families, facilitate scholarship support for secondary and tertiary students, and conduct mentorship programmes connecting youth to role models and career guidance.",
    activities: [
      "Adult literacy and numeracy classes",
      "School materials support for vulnerable children",
      "Scholarship facilitation for secondary students",
      "Youth mentorship and career guidance",
      "Safe learning environment campaigns",
    ],
    reach: "400+ learners per year",
  },
  {
    icon: "🏥",
    color: "#dbeafe",
    tag: "Health",
    title: "Community Health & Wellbeing",
    desc: "We work to bridge gaps in healthcare access by running community health outreaches, training local health champions, promoting maternal and child health, and facilitating hygiene and sanitation campaigns. Good health is a right, not a privilege, and we fight to make it a reality for every community member we serve.",
    activities: [
      "Community health screenings and outreaches",
      "Maternal and child health awareness",
      "Sanitation and hygiene campaigns",
      "Training of village health teams",
      "Mental health awareness and support",
    ],
    reach: "500+ community members per year",
  },
  {
    icon: "💡",
    color: "#fef9c3",
    tag: "Livelihoods",
    title: "Economic Empowerment",
    desc: "We equip individuals — particularly women and youth — with the skills, networks, and resources to build sustainable livelihoods. Through vocational training, savings groups, entrepreneurship workshops, and business mentoring, we help people move from dependency to self-reliance.",
    activities: [
      "Vocational and skills training workshops",
      "Village Savings and Loan Associations (VSLAs)",
      "Entrepreneurship and business development",
      "Market linkage and trade facilitation",
      "Financial literacy education",
    ],
    reach: "200+ participants per year",
  },
  {
    icon: "🌱",
    color: "#dcfce7",
    tag: "Environment",
    title: "Environmental Sustainability",
    desc: "Climate change threatens Uganda's communities and livelihoods. We respond by running community tree planting drives, promoting clean cooking energy, educating on sustainable agriculture practices, and advocating for local environmental governance. A healthier environment means a healthier community.",
    activities: [
      "Community tree planting and reforestation",
      "Clean cooking energy promotion",
      "Sustainable agriculture training",
      "Waste management and recycling awareness",
      "Environmental policy advocacy",
    ],
    reach: "5,000+ trees planted to date",
  },
];

export function ProgramsPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">Our Programs</h1>
        <p className="page-hero__subtitle">
          Four interconnected areas of work, united by a single goal: lasting,
          community-driven transformation across Uganda.
        </p>
      </div>

      <section className="section">
        <div className="container">
          {PROGRAMS.map((p, i) => (
            <div
              key={p.title}
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1.6fr" : "1.6fr 1fr",
                gap: 48,
                alignItems: "start",
                marginBottom: i < PROGRAMS.length - 1 ? 72 : 0,
                paddingBottom: i < PROGRAMS.length - 1 ? 72 : 0,
                borderBottom: i < PROGRAMS.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              {i % 2 !== 0 && (
                <div>
                  <span className="section-label">{p.tag}</span>
                  <h2 className="section-title">{p.title}</h2>
                  <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 24, fontSize: "0.95rem" }}>
                    {p.desc}
                  </p>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "var(--green-50)", borderRadius: 8, padding: "8px 16px",
                    fontSize: "0.85rem", fontWeight: 600, color: "var(--green-700)",
                  }}>
                    📍 Reach: {p.reach}
                  </div>
                </div>
              )}

              <div style={{
                background: p.color,
                borderRadius: 16,
                padding: "36px 32px",
                border: "1px solid rgba(0,0,0,.06)",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: 20, color: "var(--green-900)" }}>
                  Key Activities
                </h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {p.activities.map((a) => (
                    <li key={a} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "0.88rem", color: "var(--text)" }}>
                      <span style={{ color: "var(--green-700)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {i % 2 === 0 && (
                <div>
                  <span className="section-label">{p.tag}</span>
                  <h2 className="section-title">{p.title}</h2>
                  <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 24, fontSize: "0.95rem" }}>
                    {p.desc}
                  </p>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "var(--green-50)", borderRadius: 8, padding: "8px 16px",
                    fontSize: "0.85rem", fontWeight: 600, color: "var(--green-700)",
                  }}>
                    📍 Reach: {p.reach}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Partner CTA */}
      <section className="section section--dark">
        <div className="container text-center">
          <span className="section-label">Partner With Us</span>
          <h2 className="section-title">Scale Our Impact Together</h2>
          <p className="section-subtitle">
            We welcome partnerships with donors, NGOs, government bodies, and
            corporate organisations who share our commitment to community development.
          </p>
          <a href="mailto:info@dotinspirationcbo.org" className="btn btn-primary" style={{ marginTop: 32 }}>
            Contact Us to Partner →
          </a>
        </div>
      </section>
    </>
  );
}
