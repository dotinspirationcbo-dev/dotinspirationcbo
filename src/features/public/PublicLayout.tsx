import { NavLink, Outlet, Link } from "react-router-dom";
import "./public.css";

const NAV_LINKS = [
  { to: "/public",            label: "Home",       end: true },
  { to: "/public/about",      label: "About" },
  { to: "/public/programs",   label: "Programs" },
  { to: "/public/leadership", label: "Leadership" },
  { to: "/public/contact",    label: "Contact" },
];

export function PublicLayout() {
  return (
    <>
      {/* ── Top announcement bar ── */}
      <div className="top-bar">
        <div className="top-bar__inner">
          <span className="top-bar__tagline">
            Dot Inspiration CBO · Empowering Youth Across Africa Since 2026
          </span>
          <div className="top-bar__contact">
            <a href="mailto:info@dotinspirationcbo.org" className="top-bar__link">
              <span className="top-bar__icon">✉</span>
              info@dotinspirationcbo.org
            </a>
            <a href="tel:+256794722080" className="top-bar__link">
              <span className="top-bar__icon">📞</span>
              +256 794 722 080
            </a>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav className="pub-nav">
        <div className="pub-nav__inner">
          <Link to="/public" className="pub-nav__logo">
            <img
              src="/logo.png"
              alt="Dot Inspiration CBO"
              className="pub-nav__logo-img"
            />
          </Link>

          <ul className="pub-nav__links">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="pub-nav__cta">
            <Link to="/public/contact" className="btn btn-nav-outline">
              Join Us
            </Link>
            <Link to="/public/support" className="btn btn-primary">
              Donate
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="pub-footer">
        <div className="pub-footer__grid">
          <div className="pub-footer__brand">
            <img src="/logo.png" alt="Dot Inspiration CBO" className="pub-footer__logo" />
            <p>
              Serving Mukono District and surrounding communities since 2026.
              We deliver education, health, economic empowerment, and
              environmental programmes that create lasting change.
            </p>
          </div>

          <div className="pub-footer__col">
            <h4>Quick Links</h4>
            <ul>
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
              <li><Link to="/public/support">Support Us</Link></li>
            </ul>
          </div>

          <div className="pub-footer__col">
            <h4>Programs</h4>
            <ul>
              <li><Link to="/public/programs">Education &amp; Literacy</Link></li>
              <li><Link to="/public/programs">Community Health</Link></li>
              <li><Link to="/public/programs">Economic Empowerment</Link></li>
              <li><Link to="/public/programs">Environmental Sustainability</Link></li>
            </ul>
          </div>

          <div className="pub-footer__col">
            <h4>Contact</h4>
            <p>
              <a href="tel:+256794722080">+256 794 722 080</a><br />
              <a href="mailto:info@dotinspirationcbo.org">
                info@dotinspirationcbo.org
              </a>
            </p>
          </div>
        </div>

        <div className="pub-footer__bottom">
          <span>
            &copy; {new Date().getFullYear()} Dot Inspiration CBO. All rights reserved.
          </span>
          <span>Registered CBO · Serving Mukono District since 2026 · Uganda</span>
        </div>
      </footer>
    </>
  );
}
