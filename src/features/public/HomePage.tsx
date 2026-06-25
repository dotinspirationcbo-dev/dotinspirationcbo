import { Link } from "react-router-dom";

const STATS = [
  { number: "1,200+", label: "Beneficiaries Reached" },
  { number: "4",      label: "Active Programs" },
  { number: "5",      label: "Districts Covered" },
  { number: "3+",     label: "Years of Service" },
];

const PROGRAMS_PREVIEW = [
  {
    icon: "📚",
    title: "Education & Literacy",
    desc: "Improving access to quality education and literacy for children and youth in underserved communities.",
  },
  {
    icon: "🏥",
    title: "Community Health",
    desc: "Promoting health awareness, sanitation, and access to essential healthcare services.",
  },
  {
    icon: "💡",
    title: "Economic Empowerment",
    desc: "Skills training, microfinance support, and entrepreneurship programs to create sustainable livelihoods.",
  },
  {
    icon: "🌱",
    title: "Environmental Sustainability",
    desc: "Tree planting, clean energy awareness, and environmental education for a greener Uganda.",
  },
];

export function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__badge">Registered CBO · Uganda</div>
          <h1 className="hero__title">
            Inspiring Communities,<br />
            <em>Transforming Lives</em>
          </h1>
          <p className="hero__subtitle">
            Dot Inspiration CBO empowers individuals and communities through education,
            health, economic opportunity, and environmental action across Uganda.
          </p>
          <div className="hero__ctas">
            <Link to="/public/support" className="btn btn-primary">
              ❤️ Support Our Work
            </Link>
            <Link to="/public/programs" className="btn btn-secondary">
              Our Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div className="stats-strip">
        <div className="stats-strip__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stats-strip__item">
              <div className="stats-strip__number">{s.number}</div>
              <div className="stats-strip__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Programs Section ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Our Program Areas</h2>
            <p className="section-subtitle">
              We work across four interconnected areas to create lasting change
              in communities throughout Uganda.
            </p>
          </div>
          <div className="programs-grid">
            {PROGRAMS_PREVIEW.map((p) => (
              <div key={p.title} className="program-card">
                <div className="program-card__icon">{p.icon}</div>
                <div className="program-card__title">{p.title}</div>
                <p className="program-card__desc">{p.desc}</p>
                <Link to="/public/programs" className="program-card__tag">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Section ── */}
      <section className="section section--dark">
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">Our Impact</span>
            <h2 className="section-title">Making a Measurable Difference</h2>
            <p className="section-subtitle">
              Every programme we run is designed to achieve real, measurable
              outcomes for the people we serve.
            </p>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-card__number">1,200+</div>
              <div className="impact-card__label">Individuals directly supported</div>
            </div>
            <div className="impact-card">
              <div className="impact-card__number">200+</div>
              <div className="impact-card__label">Children supported in education</div>
            </div>
            <div className="impact-card">
              <div className="impact-card__number">150+</div>
              <div className="impact-card__label">Women economically empowered</div>
            </div>
            <div className="impact-card">
              <div className="impact-card__number">5,000+</div>
              <div className="impact-card__label">Trees planted for the environment</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="section">
        <div className="container text-center">
          <span className="section-label">Get Involved</span>
          <h2 className="section-title">Join Us in Creating Change</h2>
          <p className="section-subtitle">
            Whether you donate, volunteer, or partner with us — your involvement
            matters and creates a direct impact in our communities.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
            <Link to="/public/support" className="btn btn-primary">
              ❤️ Donate Now
            </Link>
            <Link to="/public/contact" className="btn btn-outline-green">
              Volunteer With Us
            </Link>
            <Link to="/public/contact" className="btn btn-outline-green">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
