import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// ──────────────────────────────────────────────────────────────
// Utility hooks
// ──────────────────────────────────────────────────────────────

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("hp-visible"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useCountUp(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        let v = 0;
        const steps = 70;
        const inc = target / steps;
        const timer = setInterval(() => {
          v += inc;
          if (v >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(v));
        }, duration / steps);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { count, ref };
}

// ──────────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────────

interface StatItem { target: number; suffix: string; label: string; icon: string; }

function StatCounter({ target, suffix, label, icon }: StatItem) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} className="stat-counter">
      <span className="stat-counter__icon">{icon}</span>
      <div className="stat-counter__number">
        {count.toLocaleString("en-US")}{suffix}
      </div>
      <div className="stat-counter__label">{label}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────

const TRUST_SIGNALS = [
  "Registered Community Based Organization",
  "Non-Profit",
  "Non-Political",
  "Non-Sectarian",
  "Community-Led",
  "Serving Mukono District",
  "Established 2026",
];

const STATS: StatItem[] = [
  { target: 12000, suffix: "+", label: "Community Members Reached", icon: "🏘️" },
  { target: 3500,  suffix: "+", label: "Youth Empowered",           icon: "🌟" },
  { target: 25,    suffix: "+", label: "Community Projects",         icon: "📋" },
  { target: 15,    suffix: "",  label: "Communities Served",          icon: "🗺️" },
];

const PROGRAMS = [
  {
    icon: "🌟",
    title: "Youth Empowerment",
    for: "Young people aged 12–25",
    image: "/Images/meeting pics (14).png",
    outcomes: ["Leadership & life skills training", "Professional mentorship network", "Career guidance & job placement"],
    desc: "Comprehensive mentoring, leadership workshops, and life skills training for young people. Our youth cohorts graduate with confidence, direction, and a professional network.",
  },
  {
    icon: "📚",
    title: "Education Support",
    for: "Children, students & adult learners",
    image: "/Images/meeting pics (11).png",
    outcomes: ["Free tutoring & school supplies", "Scholarship facilitation", "Teacher training partnerships"],
    desc: "Removing barriers to quality education through free tutoring, school supply distribution, scholarship facilitation, and teacher training partnerships.",
  },
  {
    icon: "🏥",
    title: "Community Outreach",
    for: "Vulnerable families & elderly members",
    image: "/Images/meeting pics (1).jpg",
    outcomes: ["Health promotion campaigns", "Food security programmes", "Social support for the elderly"],
    desc: "Holistic welfare programmes addressing health, food security, and social support for vulnerable families and elderly community members across Mukono District.",
  },
  {
    icon: "💡",
    title: "Economic Development",
    for: "Youth, women & small entrepreneurs",
    image: "/Images/meeting pics (13).png",
    outcomes: ["Entrepreneurship training", "Microfinance linkages", "Small business incubation"],
    desc: "Building economic resilience through entrepreneurship training, microfinance linkages, job placement partnerships, and small business incubation.",
  },
];

const HOW_STEPS = [
  { num: "01", icon: "🔍", title: "Community Needs Assessment", desc: "We listen first — engaging communities to understand their priorities and challenges." },
  { num: "02", icon: "🤝", title: "Community Engagement",       desc: "Building trust and ownership through participatory dialogue with local stakeholders." },
  { num: "03", icon: "📋", title: "Programme Design",           desc: "Co-designing solutions with communities to ensure local relevance and ownership." },
  { num: "04", icon: "⚙️", title: "Implementation",             desc: "Delivering programmes through trained community workers and local partnerships." },
  { num: "05", icon: "📊", title: "Monitoring & Evaluation",    desc: "Tracking progress and impact with communities as equal partners in learning." },
  { num: "06", icon: "🌱", title: "Community Ownership",        desc: "Transitioning leadership to communities for long-term programme sustainability." },
];

const STORIES = [
  {
    photo: "/Images/meeting pics (17).png",
    name: "Sarah Nakato",
    programme: "Youth Empowerment",
    story: "After completing our 6-month leadership programme, Sarah founded a youth savings group that now has 40 members. She credits the mentorship with giving her the confidence to lead.",
  },
  {
    photo: "/Images/meeting pics (18).png",
    name: "James Mulondo",
    programme: "Economic Development",
    story: "James received business training and microfinance linkage support. His small produce business has grown threefold, now employing two community members in Mukono.",
  },
  {
    photo: "/Images/meeting pics (19).png",
    name: "Grace Namutebi",
    programme: "Education Support",
    story: "Grace received scholarship facilitation that allowed her to complete secondary school. She now volunteers as a community health educator while pursuing a nursing diploma.",
  },
];

const PARTNER_CATEGORIES = [
  { label: "Government", count: 3 },
  { label: "Schools & Institutions", count: 4 },
  { label: "Health Centres", count: 3 },
  { label: "Community Organisations", count: 5 },
  { label: "Private Sector", count: 4 },
  { label: "International Partners", count: 2 },
];

const TRANSPARENCY_DOCS = [
  { icon: "📄", title: "Annual Reports" },
  { icon: "📋", title: "Strategic Plan" },
  { icon: "🏛️", title: "Governance Documents" },
  { icon: "📜", title: "Policies & Procedures" },
  { icon: "💰", title: "Financial Accountability" },
];

const GALLERY = [
  { src: "/Images/meeting pics (2).jpg",  alt: "Community meeting in session" },
  { src: "/Images/meeting pics (3).jpg",  alt: "Field engagement with community members" },
  { src: "/Images/meeting pics (4).jpg",  alt: "Programme activity on the ground" },
  { src: "/Images/meeting pics (5).png",  alt: "Community gathering and discussion" },
  { src: "/Images/meeting pics (6).png",  alt: "Youth programme session" },
  { src: "/Images/meeting pics (7).png",  alt: "Group engagement session" },
];

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────

export function HomePage() {
  const whyRef   = useFadeIn();
  const howRef   = useFadeIn();
  const storyRef = useFadeIn();
  const partRef  = useFadeIn();
  const transRef = useFadeIn();

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__badge">Registered Community Based Organization · Uganda</div>
          <h1 className="hero__title">
            Building Stronger Communities Through Youth Empowerment,{" "}
            <em>Education</em> and Sustainable Development
          </h1>
          <p className="hero__subtitle">
            Dot Inspiration Community Based Organization (DOT INSPIRATION CBO) is a
            registered non-profit working alongside communities in Mukono District,
            Uganda to improve education, livelihoods, youth empowerment, health and
            environmental sustainability through locally-led solutions.
          </p>
          <div className="hero__ctas">
            <Link to="/public/programs" className="btn btn-primary">
              Explore Our Programs
            </Link>
            <Link to="/public/contact" className="btn btn-secondary">
              Become a Partner
            </Link>
            <Link to="/public/support" className="btn btn-hero-donate">
              Donate ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Trust Bar ────────────────────────────────────── */}
      <div className="trust-section">
        <div className="trust-section__inner">
          {TRUST_SIGNALS.map((t) => (
            <span key={t} className="trust-pill">
              <span className="trust-pill__check">✓</span>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. Impact Stats ─────────────────────────────────── */}
      <section className="stats-section">
        <div className="container text-center" style={{ marginBottom: 48 }}>
          <span className="section-label" style={{ color: "rgba(255,255,255,.55)" }}>Our Impact Since 2026</span>
          <h2 className="section-title" style={{ color: "#fff" }}>Evidence of Our Work</h2>
          <p className="section-subtitle" style={{ color: "rgba(255,255,255,.7)", margin: "0 auto" }}>
            Behind every number is a community member whose life has been changed across
            Mukono District and surrounding areas.
          </p>
        </div>
        <div className="stats-grid container">
          {STATS.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ── 4. Why We Exist ─────────────────────────────────── */}
      <section className="section why-section">
        <div className="why-inner container" ref={whyRef}>
          <div className="hp-fade">
            <span className="section-label">Why We Exist</span>
            <h2 className="section-title">The Challenge We Are Solving</h2>
            <p className="prose-text">
              Many communities continue to face challenges including youth unemployment,
              limited educational opportunities, poverty, environmental degradation and
              unequal access to development opportunities.
            </p>
            <p className="prose-text" style={{ marginTop: 16 }}>
              Dot Inspiration CBO works hand in hand with local communities to develop
              sustainable, community-driven solutions that improve lives and create
              lasting impact — because we believe that communities hold the answers to
              their own challenges.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link to="/public/about" className="btn btn-outline-green">Learn About Us</Link>
              <Link to="/public/programs" className="btn btn-primary">Our Programs</Link>
            </div>
          </div>
          <div className="hp-fade why-image-wrap">
            <img
              src="/Images/meeting pics (15).png"
              alt="Community members engaged in a development meeting"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── 5. Programs ─────────────────────────────────────── */}
      <section className="section section--alt">
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Our Programs &amp; Projects</h2>
            <p className="section-subtitle">
              All programmes are community-led, evidence-based, and designed for
              lasting impact in Mukono District and surrounding areas.
            </p>
          </div>
          <div className="programs-grid">
            {PROGRAMS.map((p) => (
              <div key={p.title} className="program-card program-card--with-image">
                <div className="program-card__image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <div className="program-card__body">
                  <div className="program-card__icon">{p.icon}</div>
                  <div className="program-card__title">{p.title}</div>
                  <div className="program-card__meta">For: {p.for}</div>
                  <p className="program-card__desc">{p.desc}</p>
                  <ul className="program-card__outcomes">
                    {p.outcomes.map((o) => (
                      <li key={o} className="program-card__outcome">{o}</li>
                    ))}
                  </ul>
                  <Link to="/public/programs" className="program-card__tag">
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. How We Work ──────────────────────────────────── */}
      <section className="section how-work-section">
        <div className="container">
          <div className="text-center section-intro" ref={howRef}>
            <span className="section-label">Our Approach</span>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">
              Our model puts communities at the centre of every decision — from
              identifying needs to owning solutions.
            </p>
          </div>
          <div className="how-steps">
            {HOW_STEPS.map((s) => (
              <div key={s.num} className="how-step">
                <div className="how-step__bubble">
                  <span className="how-step__num">{s.num}</span>
                  <span className="how-step__icon">{s.icon}</span>
                </div>
                <div className="how-step__title">{s.title}</div>
                <div className="how-step__desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Photo Gallery — From the Field ──────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">From the Field</span>
            <h2 className="section-title">Our Work in Action</h2>
            <p className="section-subtitle">
              Real people. Real communities. Real change — happening across
              Mukono District every day.
            </p>
          </div>
          <div className="photo-gallery">
            {GALLERY.map((img) => (
              <div key={img.src} className="photo-gallery__item">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="photo-gallery__img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Impact Stories ───────────────────────────────── */}
      <section className="section section--alt">
        <div className="container">
          <div className="text-center section-intro" ref={storyRef}>
            <span className="section-label">Impact Stories</span>
            <h2 className="section-title">Lives Changed</h2>
            <p className="section-subtitle">
              Behind every statistic is a person. Here are some of the community
              members whose lives have been touched by our programmes.
            </p>
          </div>
          <div className="stories-grid">
            {STORIES.map((s) => (
              <div key={s.name} className="story-card hp-fade" ref={storyRef}>
                <div className="story-card__photo">
                  <img src={s.photo} alt={s.name} loading="lazy" />
                </div>
                <div className="story-card__body">
                  <span className="story-card__programme">{s.programme}</span>
                  <div className="story-card__name">{s.name}</div>
                  <p className="story-card__quote">"{s.story}"</p>
                  <span className="story-card__read">Read full story →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Partners ─────────────────────────────────────── */}
      <section className="section partners-section" ref={partRef}>
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">Our Partners</span>
            <h2 className="section-title">Working Together for Impact</h2>
            <p className="section-subtitle">
              We partner with government, schools, health centres, civil society,
              the private sector, and international organisations to amplify our reach.
            </p>
          </div>
          <div className="partner-categories">
            {PARTNER_CATEGORIES.map((cat) => (
              <div key={cat.label} className="partner-category hp-fade">
                <div className="partner-category__label">{cat.label}</div>
                <div className="partner-logos">
                  {Array.from({ length: cat.count }).map((_, i) => (
                    <div key={i} className="partner-logo-box">
                      Partner<br />Logo
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 40, fontSize: "0.82rem", color: "var(--muted)" }}>
            Interested in partnering with us?{" "}
            <Link to="/public/contact" style={{ color: "var(--green-700)", fontWeight: 600 }}>
              Get in touch →
            </Link>
          </p>
        </div>
      </section>

      {/* ── 10. Transparency ────────────────────────────────── */}
      <section className="section transparency-section" ref={transRef}>
        <div className="container">
          <div className="text-center section-intro">
            <span className="section-label">Accountability</span>
            <h2 className="section-title">Accountability &amp; Transparency</h2>
            <p className="section-subtitle">
              We are committed to the highest standards of transparency and
              accountability to our communities, donors, and partners.
            </p>
          </div>
          <div className="transparency-grid">
            {TRANSPARENCY_DOCS.map((d) => (
              <div key={d.title} className="transparency-card hp-fade">
                <span className="transparency-card__icon">{d.icon}</span>
                <div className="transparency-card__title">{d.title}</div>
                <span className="transparency-card__status">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CTA Band ────────────────────────────────────── */}
      <section className="cta-band">
        <div className="container">
          <span className="cta-band__label">Get Involved</span>
          <h2 className="cta-band__title">
            Together We Can Build Stronger Communities
          </h2>
          <p className="cta-band__text">
            Whether you volunteer, donate, partner or advocate for our mission,
            your support helps transform lives across Mukono District, Uganda.
          </p>
          <div className="cta-group">
            <Link to="/public/contact" className="btn btn-primary">Volunteer With Us</Link>
            <Link to="/public/contact" className="btn btn-secondary">Become a Partner</Link>
            <Link to="/public/support" className="btn btn-hero-donate">Donate Now ↗</Link>
          </div>
        </div>
      </section>
    </>
  );
}
