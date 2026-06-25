import { Link } from "react-router-dom";
import { siteContent } from "./content/siteContent";

const TRUST_SIGNALS = [
  "Non-Profit Organisation",
  "Non-Political · Non-Sectarian",
  "Serving Mukono District since 2026",
  "Community-Led Programmes",
];

const STATS = [
  { number: "12,000+", label: "Community Members Reached" },
  { number: "3,500+",  label: "Youth Trained" },
  { number: "25+",     label: "Community Projects Delivered" },
  { number: "15",      label: "Villages Covered" },
];

const PROGRAMS_PREVIEW = [
  {
    icon: "🌟",
    title: "Youth Empowerment",
    for: "Young people aged 12–25",
    impact: "3,500+ youth trained in skills & leadership",
    desc: "Comprehensive mentoring, leadership workshops, and life skills training for young people. Our youth cohorts graduate with confidence, direction, and a professional network.",
  },
  {
    icon: "📚",
    title: "Education Support",
    for: "Children, students & adult learners",
    impact: "Free tutoring, supplies & scholarships",
    desc: "Removing barriers to quality education through free tutoring, school supply distribution, scholarship facilitation, and teacher training partnerships.",
  },
  {
    icon: "🏥",
    title: "Community Outreach",
    for: "Vulnerable families & elderly members",
    impact: "Health, food security & social support",
    desc: "Holistic welfare programmes addressing health, food security, and social support for vulnerable families and elderly community members across Mukono District.",
  },
  {
    icon: "💡",
    title: "Economic Development",
    for: "Youth, women & small entrepreneurs",
    impact: "Entrepreneurship, microfinance & job placement",
    desc: "Building economic resilience through entrepreneurship training, microfinance linkages, job placement partnerships, and small business incubation.",
  },
];

export function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__badge">Registered Community Based Organization</div>
          <h1 className="hero__title">{siteContent.hero.title}</h1>
          <p className="hero__subtitle">{siteContent.hero.subtitle}</p>
          <div className="hero__ctas">
            <Link to="/public/contact" className="btn btn-primary">
              Join Our Community
            </Link>
            <Link to="/public/programs" className="btn btn-secondary">
              Explore Our Programs
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
            <h2 className="section-title">Our Programs & Projects</h2>
            <p className="section-subtitle">
              All programmes are community-led, evidence-based, and designed for
              lasting impact in Mukono District and surrounding areas.
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
            <h2 className="section-title">Evidence of Our Work</h2>
            <p className="section-subtitle">
              Behind every number is a community member whose life has been touched
              by Dot Inspiration CBO across Mukono District and surrounding areas.
            </p>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-card__number">12,000+</div>
              <div className="impact-card__label">Community Members Reached</div>
            </div>
            <div className="impact-card">
              <div className="impact-card__number">3,500+</div>
              <div className="impact-card__label">Youth Trained in skills & leadership</div>
            </div>
            <div className="impact-card">
              <div className="impact-card__number">25+</div>
              <div className="impact-card__label">Community Projects Delivered</div>
            </div>
            <div className="impact-card">
              <div className="impact-card__number">15</div>
              <div className="impact-card__label">Villages Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="section">
        <div className="container text-center">
          <span className="section-label">Get Involved</span>
          <h2 className="section-title">Join Us in Transforming Communities</h2>
          <p className="section-subtitle">
            Be part of the change. Whether you join as a member, volunteer, or
            strategic partner — your involvement drives lasting impact across
            Mukono District and beyond.
          </p>
          <div className="cta-group">
            <Link to="/public/contact" className="btn btn-primary">
              Become a Member
            </Link>
            <Link to="/public/contact" className="btn btn-outline-green">
              Volunteer With Us
            </Link>
            <Link to="/public/support" className="btn btn-outline-green">
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
