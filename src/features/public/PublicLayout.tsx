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
            Dot Inspiration CBO · Empowering Communities Across Mukono District Since 2026
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
              Get Involved
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

      {/* ── Footer ── */}
      <footer className="pub-footer">
        <div className="pub-footer__grid">
          {/* Brand */}
          <div className="pub-footer__brand">
            <img src="/logo.png" alt="Dot Inspiration CBO" className="pub-footer__logo" />
            <p>
              Dot Inspiration Community Based Organization is a registered non-profit
              serving Mukono District and surrounding communities since 2026 through
              education, youth empowerment, health, and sustainable development.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social__link" title="Facebook" aria-label="Facebook">f</a>
              <a href="#" className="footer-social__link" title="Twitter / X" aria-label="X">𝕏</a>
              <a href="#" className="footer-social__link" title="Instagram" aria-label="Instagram">▣</a>
              <a href="#" className="footer-social__link" title="LinkedIn" aria-label="LinkedIn">in</a>
              <a href="#" className="footer-social__link" title="YouTube" aria-label="YouTube">▶</a>
            </div>
            <div className="footer-reg">
              Registered CBO · Uganda · Non-Profit · Non-Political · Non-Sectarian<br />
              Office Hours: Mon – Fri 8:00 AM – 5:00 PM · Sat 9:00 AM – 1:00 PM (EAT)
            </div>
          </div>

          {/* Quick Links */}
          <div className="pub-footer__col">
            <h4>Explore</h4>
            <ul>
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
              <li><Link to="/public/support">Support Us</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="pub-footer__col">
            <h4>Programs</h4>
            <ul>
              <li><Link to="/public/programs">Youth Empowerment</Link></li>
              <li><Link to="/public/programs">Education Support</Link></li>
              <li><Link to="/public/programs">Community Outreach</Link></li>
              <li><Link to="/public/programs">Economic Development</Link></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="pub-footer__col">
            <h4>Contact Us</h4>
            <p style={{ marginBottom: 12 }}>
              Nantabulirwa, Goma Division<br />
              Mukono District, Uganda
            </p>
            <p>
              <a href="tel:+256794722080">+256 794 722 080</a><br />
              <a href="mailto:info@dotinspirationcbo.org">
                info@dotinspirationcbo.org
              </a>
            </p>

            <div className="footer-newsletter">
              <span className="footer-newsletter__label">Stay Updated</span>
              <div className="footer-newsletter__form">
                <input
                  className="footer-newsletter__input"
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email for newsletter"
                />
                <button className="footer-newsletter__btn" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pub-footer__bottom">
          <span>
            &copy; {new Date().getFullYear()} Dot Inspiration CBO. All rights reserved.
          </span>
          <span className="pub-footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <span>Registered CBO · Mukono District · Uganda</span>
          </span>
        </div>
      </footer>
    </>
  );
}
