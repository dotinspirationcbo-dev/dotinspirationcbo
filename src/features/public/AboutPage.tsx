const VALUES = [
  {
    icon: "🤝",
    title: "Community First",
    text: "We place the needs and voices of communities at the centre of everything we do.",
  },
  {
    icon: "🔍",
    title: "Transparency",
    text: "We operate with full accountability to our donors, partners, and beneficiaries.",
  },
  {
    icon: "⚡",
    title: "Empowerment",
    text: "We build capacity so individuals and communities can drive their own development.",
  },
  {
    icon: "🌿",
    title: "Sustainability",
    text: "We design programmes that create lasting change long after our direct involvement ends.",
  },
  {
    icon: "🤲",
    title: "Inclusivity",
    text: "We prioritise the most marginalised — women, youth, and persons with disabilities.",
  },
  {
    icon: "📊",
    title: "Impact-Driven",
    text: "Every initiative is measured against real, tangible outcomes for people we serve.",
  },
];

const APPROACH_STEPS = [
  ["01", "Community Assessment", "We listen before we act — understanding real needs through structured community engagement."],
  ["02", "Co-Design",            "Communities help design programmes so solutions are relevant and locally owned."],
  ["03", "Implementation",       "Trained local facilitators deliver programmes with ongoing support and supervision."],
  ["04", "Evaluation",           "We measure outcomes honestly and share results with all stakeholders."],
];

export function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">About Dot Inspiration CBO</h1>
        <p className="page-hero__subtitle">
          A registered Community Based Organisation serving Mukono District
          and surrounding communities since 2026.
        </p>
      </div>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <span className="section-label">Who We Are</span>
          <h2 className="section-title">Our Story</h2>
          <p className="prose-text" style={{ maxWidth: 720 }}>
            Dot Inspiration CBO was founded with a simple but powerful belief: that
            every person, regardless of their background or circumstances, deserves
            the opportunity to live a dignified, fulfilling life.
          </p>
          <p className="prose-text" style={{ maxWidth: 720, marginBottom: 0 }}>
            We work in some of Uganda's most underserved communities, delivering
            programmes in education, health, economic empowerment, and environmental
            sustainability. Our approach is rooted in listening first — understanding
            community needs before designing solutions.
          </p>

          <div className="mission-vision">
            <div className="mv-card mv-card--mission">
              <div className="mv-card__label">Our Mission</div>
              <p className="mv-card__text">
                To inspire, empower, and transform communities through sustainable
                development programmes that address education, health, economic
                opportunity, and environmental stewardship.
              </p>
            </div>
            <div className="mv-card mv-card--vision">
              <div className="mv-card__label">Our Vision</div>
              <p className="mv-card__text">
                A Uganda where every individual has the knowledge, resources, and
                opportunity to reach their full potential and contribute meaningfully
                to their community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--alt">
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              These principles guide every decision, programme, and partnership
              we enter into.
            </p>
          </div>
          <div className="values-grid">
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
                align with national development goals.
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
