import { Link } from "react-router-dom";

const TRUST_SIGNALS = [
  "Registered Community Based Organisation",
  "Serving Mukono District since 2026",
  "Transparent Operations",
  "Community-Led Programmes",
];

const STATS = [
  { number: "1,200+", label: "Beneficiaries Reached" },
  { number: "4",      label: "Active Programs" },
  { number: "5",      label: "Districts Covered" },
  { number: "8+",     label: "Years of Service" },
];

const PROGRAMS_PREVIEW = [
  {
    icon: "📚",
    title: "Education & Literacy",
    for: "Children, youth & adult learners",
    impact: "400+ learners reached per year",
    desc: "Breaking cycles of poverty by expanding access to quality education, literacy, and mentorship for Uganda's most underserved learners.",
  },
  {
    icon: "🏥",
    title: "Community Health",
    for: "Families & community members",
    impact: "500+ people reached per outreach",
    desc: "Bridging critical gaps in healthcare through community outreaches, maternal health support, and training local health champions.",
  },
  {
    icon: "💡",
    title: "Economic Empowerment",
    for: "Women, youth & small entrepreneurs",
    impact: "150+ women economically empowered",
    desc: "Equipping individuals with the skills, savings groups, and business networks to build sustainable, self-reliant livelihoods.",
  },
  {
    icon: "🌱",
    title: "Environmental Sustainability",
    for: "Farming communities & future generations",
    impact: "5,000+ trees planted to date",
    desc: "Protecting ecosystems and climate resilience through reforestation, clean energy promotion, and sustainable agriculture training.",
  },
];

export function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__badge">Registered CBO · Mukono District, Uganda</div>
          <h1 className="hero__title">
            Inspiring Communities,<br />
            <em>Transforming Lives</em>
          </h1>
          <p className="hero__subtitle">
            Since 2026, we have been walking alongside the most vulnerable families
            in Mukono District and beyond — building futures through education, health,
            economic opportunity, and environmental action.
          </p>
          <div className="hero__ctas">
            <Link to="/public/support" className="btn btn-primary">
              ❤️ Donate Now
            </Link>
            <Link to="/public/contact" className="btn btn-secondary">
              Volunteer With Us
            </Link>
          </div>
          <div className="trust-strip">
            {TRUST_SIGNALS.map((t) => (
              <span key={t} className="trust-badge">{t}</span>
            ))}
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
            <h2 className="section-title">Our Four Program Areas</h2>
            <p className="section-subtitle">
              Every programme is community-designed, locally delivered, and measured
              for real impact in Mukono District and surrounding communities.
            </p>
          </div>
          <div className="programs-grid">
            {PROGRAMS_PREVIEW.map((p) => (
              <div key={p.title} className="program-card">
                <div className="program-card__icon">{p.icon}</div>
                <div className="program-card__title">{p.title}</div>
                <div className="program-card__meta">For: {p.for}</div>
                <p className="program-card__desc">{p.desc}</p>
                <div className="program-card__impact">📍 {p.impact}</div>
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
            <span className="section-label">Our Impact Since 2026</span>
            <h2 className="section-title">Real People. Real Change.</h2>
            <p className="section-subtitle">
              Eight years of community-led programmes delivering measurable,
              lasting outcomes for the people who need it most.
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
              <div className="impact-card__label">Trees planted across the region</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="section">
        <div className="container text-center">
          <span className="section-label">Get Involved</span>
          <h2 className="section-title">Your Support Changes Lives</h2>
          <p className="section-subtitle">
            A donation funds a child's education. Volunteering transforms a community.
            A partnership scales our reach. Every form of support matters.
          </p>
          <div className="cta-group">
            <Link to="/public/support" className="btn btn-primary">
              ❤️ Donate Now
            </Link>
            <Link to="/public/contact" className="btn btn-outline-green">
              Volunteer With Us
            </Link>
            <Link to="/public/contact" className="btn btn-outline-green">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
