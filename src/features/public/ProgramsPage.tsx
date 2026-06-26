import { siteContent } from "./content/siteContent";

const PROGRAMS = [
  {
    icon: "🌟",
    color: "#eff6ff",
    tag: "Youth Empowerment",
    title: "Youth Empowerment",
    photo: "/Images/meeting pics (14).png",
    beneficiaries: "Young people aged 12–25 from Mukono District and surrounding areas.",
    impact: "Graduates leave with confidence, direction, and a professional network to drive their own futures.",
    desc: siteContent.programs.youthEmpowerment,
    activities: [
      "Monthly leadership workshops",
      "1-on-1 mentorship matching",
      "Career guidance sessions",
      "Youth-led community projects",
      "Life skills and confidence training",
    ],
    reach: "3,500+ youth trained in skills & leadership",
  },
  {
    icon: "📚",
    color: "#dcfce7",
    tag: "Education Support",
    title: "Education Support",
    photo: "/Images/meeting pics (11).png",
    beneficiaries: "Out-of-school children, students from low-income families, and adult learners in Mukono District.",
    impact: "Improved literacy rates, increased school retention, greater youth confidence and career readiness.",
    desc: siteContent.programs.education,
    activities: [
      "Free after-school tutoring",
      "School supplies distribution",
      "Scholarship facilitation",
      "Digital literacy training",
      "Teacher partnership programmes",
    ],
    reach: "400+ learners supported per year",
  },
  {
    icon: "🏥",
    color: "#fef9c3",
    tag: "Community Outreach",
    title: "Community Outreach",
    photo: "/Images/meeting pics (1).jpg",
    beneficiaries: "Vulnerable families, elderly community members, and women across Nantabulirwa and Goma Division.",
    impact: "Improved household wellbeing, food security, maternal health outcomes, and stronger community social networks.",
    desc: siteContent.programs.communityOutreach,
    activities: [
      "Health awareness campaigns",
      "Food drive distributions",
      "Elderly care visits",
      "Women empowerment circles",
      "Hygiene and sanitation campaigns",
    ],
    reach: "500+ community members reached per outreach",
  },
  {
    icon: "💡",
    color: "#dcfce7",
    tag: "Economic Development",
    title: "Economic Development",
    photo: "/Images/meeting pics (13).png",
    beneficiaries: "Youth, women, and small-scale entrepreneurs lacking access to formal economic opportunities in Mukono District.",
    impact: "Increased household income, new businesses launched, stronger savings culture, and greater financial independence.",
    desc: siteContent.programs.economicDevelopment,
    activities: [
      "Entrepreneurship bootcamps",
      "Microfinance referral network",
      "Job placement partnerships",
      "Small business incubation",
      "Financial literacy education",
    ],
    reach: "200+ participants per year",
  },
];

function ProgramTextBlock({ p }: { p: typeof PROGRAMS[0] }) {
  return (
    <div>
      <span className="section-label">{p.tag}</span>
      <h2 className="section-title">{p.title}</h2>
      <p className="prose-text" style={{ marginBottom: 20 }}>{p.desc}</p>

      <div className="program-detail-meta">
        <div className="program-detail-meta__row">
          <span className="program-detail-meta__key">Who benefits: </span>
          <span className="program-detail-meta__val">{p.beneficiaries}</span>
        </div>
        <div className="program-detail-meta__row">
          <span className="program-detail-meta__key">Impact: </span>
          <span className="program-detail-meta__val">{p.impact}</span>
        </div>
      </div>

      <div className="reach-badge">📍 Reach: {p.reach}</div>
    </div>
  );
}

function ProgramHighlight({ p }: { p: typeof PROGRAMS[0] }) {
  return (
    <div className="program-highlight" style={{ background: p.color }}>
      {p.photo && (
        <div className="program-highlight__photo">
          <img
            src={p.photo}
            alt={`${p.title} programme activity`}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <h3 className="program-highlight__heading">Key Activities</h3>
      <ul className="program-highlight__list">
        {p.activities.map((a) => (
          <li key={a} className="program-highlight__item">
            <span className="program-highlight__check">✓</span>
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProgramsPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">Our Programs & Projects</h1>
        <p className="page-hero__subtitle">
          All programmes are community-led, evidence-based, and designed for lasting
          impact in Mukono District and surrounding areas since 2026.
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
              <ProgramHighlight p={p} />
              {i % 2 === 0 && <ProgramTextBlock p={p} />}
            </div>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container text-center">
          <span className="section-label">Partner With Us</span>
          <h2 className="section-title">Scale Our Impact Together</h2>
          <p className="section-subtitle">
            We welcome partnerships with NGOs, government bodies, schools, businesses,
            and international organisations committed to community development in
            Mukono District.
          </p>
          <div className="cta-group">
            <a href="mailto:info@dotinspirationcbo.org" className="btn btn-primary">
              Contact Us to Partner →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
