const VALUES = [
  {
    icon: "🏅",
    title: "Integrity",
    text: "We uphold the highest ethical standards in all our operations, maintaining honesty and moral principles in every interaction.",
  },
  {
    icon: "✅",
    title: "Accountability",
    text: "We take full responsibility for our actions, decisions and use of resources — answering to our communities, partners and donors.",
  },
  {
    icon: "🔍",
    title: "Transparency",
    text: "We operate openly, sharing information about our programmes, finances and governance so stakeholders can hold us accountable.",
  },
  {
    icon: "🤝",
    title: "Teamwork",
    text: "We believe in the power of collaboration — working together across teams, communities and partner organisations to achieve shared goals.",
  },
  {
    icon: "💡",
    title: "Innovation",
    text: "We embrace creative, evidence-based solutions to community challenges, constantly adapting our approach to meet evolving needs.",
  },
  {
    icon: "🤲",
    title: "Inclusiveness",
    text: "We welcome everyone regardless of gender, age, religion or background — because diversity and inclusion strengthen our collective impact.",
  },
  {
    icon: "⭐",
    title: "Professionalism",
    text: "We deliver our programmes and services with competence, dedication and respect — meeting the standards expected of international NGOs.",
  },
  {
    icon: "🌍",
    title: "Community Service",
    text: "We are rooted in the communities we serve, placing their needs, voices and aspirations at the centre of everything we do.",
  },
];

const APPROACH_STEPS = [
  ["01", "Community Assessment", "We listen before we act — understanding real needs through structured community engagement and needs assessments."],
  ["02", "Co-Design",            "Communities help design programmes so solutions are relevant, locally owned and culturally appropriate."],
  ["03", "Implementation",       "Trained local facilitators deliver programmes with ongoing support, supervision and quality assurance."],
  ["04", "Evaluation",           "We measure outcomes honestly and share results with all stakeholders to drive continuous improvement."],
];

export function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">About Dot Inspiration CBO</h1>
        <p className="page-hero__subtitle">
          A registered non-profit, non-political and non-sectarian Community Based
          Organisation serving Mukono District and surrounding communities since 2026.
        </p>
      </div>

      {/* Who We Are */}
      <section className="section">
        <div className="container">
          <span className="section-label">Who We Are</span>
          <h2 className="section-title">Our Story</h2>
          <p className="prose-text" style={{ maxWidth: 720 }}>
            Dot Inspiration Community Based Organization (DOT INSPIRATION CBO) is a
            non-profit, non-political and non-sectarian organisation established to
            empower communities through sustainable development initiatives.
          </p>
          <p className="prose-text" style={{ maxWidth: 720, marginBottom: 0 }}>
            The organisation focuses on youth empowerment, education support, health
            promotion, environmental conservation, community mobilisation and economic
            empowerment — inspiring positive change and creating opportunities that
            improve the quality of life for vulnerable and underserved communities
            across Mukono District, Uganda.
          </p>

          <div className="mission-vision">
            <div className="mv-card mv-card--mission">
              <div className="mv-card__label">Our Vision</div>
              <p className="mv-card__text">
                To create empowered, informed, self-reliant and prosperous communities
                through sustainable development initiatives.
              </p>
            </div>
            <div className="mv-card mv-card--vision">
              <div className="mv-card__label">Our Mission</div>
              <p className="mv-card__text">
                To inspire and empower communities through education, skills development,
                environmental conservation, health promotion, economic empowerment and
                social support programmes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--alt">
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">What Guides Us</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              These eight principles are not just words — they are the foundation on
              which Dot Inspiration CBO is built. They guide how we serve, lead, and
              grow every single day.
            </p>
          </div>
          <div className="values-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {VALUES.map((v) => (
              <div key={v.title} className="value-card">
                <div className="value-card__icon">{v.icon}</div>
                <div className="value-card__title">{v.title}</div>
                <p className="value-card__text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section">
        <div className="container">
          <div className="approach-grid">
            <div>
              <span className="section-label">How We Work</span>
              <h2 className="section-title">Our Approach</h2>
              <p className="prose-text">
                We believe sustainable development comes from within communities
                themselves. That is why we start every programme with a community
                needs assessment, ensuring our interventions are relevant, welcomed,
                and locally owned.
              </p>
              <p className="prose-text">
                We partner with local leaders, schools, health facilities, and
                government agencies to amplify our reach and ensure our programmes
                align with national development goals across Mukono District.
              </p>
            </div>
            <div className="step-list">
              {APPROACH_STEPS.map(([num, title, text]) => (
                <div key={num} className="step-item">
                  <div className="step-item__num">{num}</div>
                  <div>
                    <div className="step-item__title">{title}</div>
                    <div className="step-item__text">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
