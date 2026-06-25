const PROGRAMS = [
  {
    icon: "📚",
    color: "#dcfce7",
    tag: "Education",
    title: "Education & Literacy",
    beneficiaries: "Out-of-school children, adult learners, and secondary school students from low-income families in Mukono District.",
    impact: "Improved literacy rates, increased school retention, and greater youth confidence and career readiness.",
    desc: "Quality education is the foundation of every life. We run adult literacy classes, provide school supplies and scholastic materials to children from low-income families, facilitate scholarship support for secondary and tertiary students, and conduct mentorship programmes connecting youth to role models.",
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
    beneficiaries: "Families, pregnant mothers, children under five, and communities with limited access to formal healthcare in Mukono District.",
    impact: "Increased health knowledge, earlier detection of illness, improved maternal and child health outcomes, and stronger community health systems.",
    desc: "We work to bridge critical gaps in healthcare access by running community health outreaches, training local health champions, promoting maternal and child health, and facilitating hygiene and sanitation campaigns. Good health is a right, not a privilege.",
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
    beneficiaries: "Women, unemployed youth, and small-scale entrepreneurs who lack access to formal economic opportunities or financial services.",
    impact: "Increased household income, stronger savings culture, new businesses launched, and greater financial independence — particularly for women.",
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
    beneficiaries: "Farming communities, households dependent on natural resources, and future generations across Mukono District.",
    impact: "Improved land productivity, reduced deforestation, cleaner cooking environments, and greater community capacity to adapt to climate change.",
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

function ProgramTextBlock({ p }: { p: typeof PROGRAMS[0] }) {
  return (
    <div>
      <span className="section-label">{p.tag}</span>
      <h2 className="section-title">{p.title}</h2>
      <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 20, fontSize: "0.95rem" }}>
        {p.desc}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        <div style={{ fontSize: "0.85rem" }}>
          <span style={{ fontWeight: 700, color: "var(--green-900)" }}>Who benefits: </span>
          <span style={{ color: "var(--muted)" }}>{p.beneficiaries}</span>
        </div>
        <div style={{ fontSize: "0.85rem" }}>
          <span style={{ fontWeight: 700, color: "var(--green-900)" }}>Impact: </span>
          <span style={{ color: "var(--muted)" }}>{p.impact}</span>
        </div>
      </div>

      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "var(--green-50)", borderRadius: 8, padding: "8px 16px",
        fontSize: "0.85rem", fontWeight: 600, color: "var(--green-700)",
      }}>
        📍 Reach: {p.reach}
      </div>
    </div>
  );
}

export function ProgramsPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">Our Programs</h1>
        <p className="page-hero__subtitle">
          Four interconnected areas of work, serving Mukono District since 2018 —
          each designed with communities, for communities.
        </p>
      </div>

      <section className="section">
        <div className="container">
          {PROGRAMS.map((p, i) => (
            <div
              key={p.title}
              className={`prog-row ${i % 2 === 0 ? "prog-row--even" : "prog-row--odd"}`}
              style={{
                marginBottom: i < PROGRAMS.length - 1 ? 72 : 0,
                paddingBottom: i < PROGRAMS.length - 1 ? 72 : 0,
                borderBottom: i < PROGRAMS.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              {i % 2 !== 0 && <ProgramTextBlock p={p} />}

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

              {i % 2 === 0 && <ProgramTextBlock p={p} />}
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
            corporate organisations committed to lasting community development.
          </p>
          <a href="mailto:info@dotinspirationcbo.org" className="btn btn-primary" style={{ marginTop: 32 }}>
            Contact Us to Partner →
          </a>
        </div>
      </section>
    </>
  );
}
