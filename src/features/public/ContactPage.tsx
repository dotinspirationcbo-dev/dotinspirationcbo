export function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">Contact Us</h1>
        <p className="page-hero__subtitle">
          We would love to hear from you — whether you want to donate, volunteer,
          partner, or simply learn more about our work.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-page-grid">
            {/* Contact Details */}
            <div>
              <span className="section-label">Get In Touch</span>
              <h2 className="section-title">Reach Out to Us</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 32, fontSize: "0.95rem" }}>
                Our team is available Monday to Friday, 8:00 AM to 5:00 PM (EAT).
                For urgent donation enquiries, please call or WhatsApp us directly.
              </p>

              <div className="contact-details-list">
                <div className="contact-item">
                  <div className="contact-item__icon">📞</div>
                  <div>
                    <div className="contact-item__label">Phone / WhatsApp</div>
                    <div className="contact-item__value">
                      <a href="tel:+256794722080">+256 794 722 080</a>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item__icon">📧</div>
                  <div>
                    <div className="contact-item__label">Email</div>
                    <div className="contact-item__value">
                      <a href="mailto:info@dotinspirationcbo.org">
                        info@dotinspirationcbo.org
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item__icon">📍</div>
                  <div>
                    <div className="contact-item__label">Location</div>
                    <div className="contact-item__value">Uganda, East Africa</div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item__icon">🕐</div>
                  <div>
                    <div className="contact-item__label">Office Hours</div>
                    <div className="contact-item__value">Mon – Fri, 8:00 AM – 5:00 PM (EAT)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Purposes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 60 }}>
              {[
                {
                  icon: "❤️",
                  title: "Make a Donation",
                  text: "Support our programmes financially. Bank transfer, mobile money, and cash donations are all welcome.",
                  action: "View banking details →",
                  href: "/public/support",
                },
                {
                  icon: "🙋",
                  title: "Volunteer With Us",
                  text: "Join us on the ground. We welcome volunteers with skills in health, education, finance, IT, and communications.",
                  action: "Email us to volunteer →",
                  href: "mailto:info@dotinspirationcbo.org",
                },
                {
                  icon: "🤝",
                  title: "Partner With Us",
                  text: "We welcome NGO, government, and corporate partnerships that align with our mission.",
                  action: "Contact us to partner →",
                  href: "mailto:info@dotinspirationcbo.org",
                },
                {
                  icon: "📰",
                  title: "Media & Press",
                  text: "For media enquiries, interview requests, or programme information, please reach us by email.",
                  action: "Email media enquiries →",
                  href: "mailto:info@dotinspirationcbo.org",
                },
              ].map((item) => (
                <div key={item.title} style={{
                  background: "var(--gray-50)", border: "1px solid var(--border)",
                  borderRadius: 10, padding: "22px 24px",
                }}>
                  <div style={{ fontSize: "1.4rem", marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 6 }}>{item.title}</div>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: 12 }}>
                    {item.text}
                  </p>
                  <a
                    href={item.href}
                    style={{
                      fontSize: "0.82rem", fontWeight: 700,
                      color: "var(--green-700)", textDecoration: "none",
                    }}
                  >
                    {item.action}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
