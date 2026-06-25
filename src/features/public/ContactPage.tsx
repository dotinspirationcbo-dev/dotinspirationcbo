const CONTACT_DETAILS = [
  {
    icon: "📞",
    label: "Phone / WhatsApp",
    value: <a href="tel:+256794722080">+256 794 722 080</a>,
  },
  {
    icon: "📧",
    label: "Email",
    value: <a href="mailto:info@dotinspirationcbo.org">info@dotinspirationcbo.org</a>,
  },
  {
    icon: "📍",
    label: "Location",
    value: "Uganda, East Africa",
  },
  {
    icon: "🕐",
    label: "Office Hours",
    value: "Mon – Fri, 8:00 AM – 5:00 PM (EAT)",
  },
];

const CONTACT_PURPOSES = [
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
];

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
