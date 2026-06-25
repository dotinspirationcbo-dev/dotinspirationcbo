const CONTACT_DETAILS = [
  {
    icon: "📧",
    label: "Email Us",
    value: <a href="mailto:info@dotinspirationcbo.org">info@dotinspirationcbo.org</a>,
    note: "We respond within 24–48 hours",
  },
  {
    icon: "📞",
    label: "Call Us",
    value: <a href="tel:+256794722080">+256 794 722 080</a>,
    note: "Mon – Fri, 8 AM – 5 PM EAT",
  },
  {
    icon: "📍",
    label: "Find Us",
    value: "Nantabulirwa, Goma Division, Mukono District — Uganda",
    note: "East Africa Operations Hub",
  },
  {
    icon: "🕐",
    label: "Office Hours",
    value: "Mon – Fri, 8:00 AM – 5:00 PM (EAT)",
    note: "Saturday 9:00 AM – 1:00 PM",
  },
];

const CONTACT_PURPOSES = [
  {
    icon: "🤝",
    title: "Partner With Us",
    text: "Strategic partnerships that multiply community impact across Mukono District. We welcome NGOs, government bodies, schools, businesses, and international organisations.",
    action: "Get in touch →",
    href: "mailto:info@dotinspirationcbo.org",
  },
  {
    icon: "🙋",
    title: "Volunteer Today",
    text: "Share your skills and time with communities that need you most. We welcome volunteers in education, health, community work, administration, and digital skills.",
    action: "Become a volunteer →",
    href: "mailto:info@dotinspirationcbo.org",
  },
  {
    icon: "❤️",
    title: "Donate & Support",
    text: "Fund education, health and empowerment projects that change lives. Every contribution — big or small — creates lasting impact across Mukono District.",
    action: "View banking details →",
    href: "/public/support",
  },
  {
    icon: "📰",
    title: "Media & Press",
    text: "For media enquiries, interview requests, or programme information, please reach us by email. We are happy to share our story and impact evidence.",
    action: "Email media enquiries →",
    href: "mailto:info@dotinspirationcbo.org",
  },
];

export function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">Get In Touch</h1>
        <p className="page-hero__subtitle">
          We'd love to hear from you — whether you want to partner, volunteer,
          donate, or simply learn more about our work in Mukono District.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-page-grid">
            {/* Contact Details */}
            <div>
              <span className="section-label">Contact Us</span>
              <h2 className="section-title">Reach Out to Us</h2>
              <p className="prose-text" style={{ marginBottom: 32 }}>
                Our team is available Monday to Friday, 8:00 AM to 5:00 PM (EAT).
                For urgent donation enquiries, please call or WhatsApp us directly.
              </p>

              <div className="contact-details-list">
                {CONTACT_DETAILS.map((item) => (
                  <div key={item.label} className="contact-item">
                    <div className="contact-item__icon">{item.icon}</div>
                    <div>
                      <div className="contact-item__label">{item.label}</div>
                      <div className="contact-item__value">{item.value}</div>
                      {item.note && (
                        <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 2 }}>
                          {item.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Purposes */}
            <div className="info-card-list">
              {CONTACT_PURPOSES.map((item) => (
                <div key={item.title} className="contact-purpose-card">
                  <div className="contact-purpose-card__icon">{item.icon}</div>
                  <div className="contact-purpose-card__title">{item.title}</div>
                  <p className="contact-purpose-card__text">{item.text}</p>
                  <a href={item.href} className="contact-purpose-card__link">
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
