import { Link } from "react-router-dom";

export function SupportPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">Support Our Work</h1>
        <p className="page-hero__subtitle">
          Your generosity directly funds education, health, livelihoods, and
          environmental programmes for communities across Uganda.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="section-label">How to Donate</span>
            <h2 className="section-title">Every Contribution Makes a Difference</h2>
            <p className="section-subtitle">
              We accept donations by bank transfer, mobile money, and cash. All
              contributions are acknowledged and reported transparently.
            </p>
          </div>

          <div className="support-grid">
            {/* Bank Details */}
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: "1.1rem" }}>
                🏦 Bank Transfer
              </h3>
              <div className="bank-details">
                <div className="bank-details__header">Banking Details — Dot Inspiration CBO</div>
                {[
                  ["Bank",           "Exim Bank Uganda"],
                  ["Account Name",   "Othieno Constant"],
                  ["Account Number", "0071013100"],
                  ["Currency",       "UGX (Ugandan Shillings)"],
                  ["Reference",      "Donation — [Your Name]"],
                ].map(([key, val]) => (
                  <div key={key} className="bank-details__row">
                    <span className="bank-details__key">{key}</span>
                    <span className="bank-details__val">{val}</span>
                  </div>
                ))}
                <div className="bank-details__note">
                  <strong>Transparency note:</strong> This account is temporarily used to receive
                  support for Dot Inspiration CBO while organisational financial systems are being
                  strengthened. All funds are fully accounted for and reported to donors on request.
                </div>
              </div>

              {/* Other methods */}
              <h3 style={{ fontWeight: 700, margin: "32px 0 16px", fontSize: "1.1rem" }}>
                📱 Mobile Money
              </h3>
              <div className="contact-item" style={{ marginBottom: 12 }}>
                <div className="contact-item__icon">📞</div>
                <div>
                  <div className="contact-item__label">Mobile Money / WhatsApp</div>
                  <div className="contact-item__value">
                    <a href="tel:+256794722080">+256 794 722 080</a>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: 4 }}>
                    Contact us via WhatsApp to arrange a mobile money donation.
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Why Support */}
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 20, fontSize: "1.1rem" }}>
                📬 Donation Enquiries
              </h3>
              <div className="contact-box">
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
                  <div className="contact-item__icon">📞</div>
                  <div>
                    <div className="contact-item__label">Phone / WhatsApp</div>
                    <div className="contact-item__value">
                      <a href="tel:+256794722080">+256 794 722 080</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why your donation matters */}
              <div style={{
                background: "var(--green-50)", border: "1px solid var(--green-100)",
                borderRadius: 12, padding: 28, marginTop: 28,
              }}>
                <h4 style={{ fontWeight: 700, marginBottom: 16, color: "var(--green-900)" }}>
                  What your donation funds:
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "School materials for a vulnerable child for a full year",
                    "A community health outreach reaching 50+ families",
                    "Vocational training for a young woman",
                    "100 trees planted in a degraded watershed",
                    "A month of adult literacy classes for 20 learners",
                  ].map((item) => (
                    <li key={item} style={{
                      display: "flex", gap: 10,
                      fontSize: "0.88rem", color: "var(--text)", lineHeight: 1.5,
                    }}>
                      <span style={{ color: "var(--green-600)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other ways to help */}
      <section className="section section--alt">
        <div className="container">
          <div className="text-center">
            <span className="section-label">More Ways to Help</span>
            <h2 className="section-title">Beyond Financial Donations</h2>
            <p className="section-subtitle">
              Money is not the only way to support our mission. Your time,
              skills, and networks matter just as much.
            </p>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24, marginTop: 40,
          }}>
            {[
              ["🙋", "Volunteer",  "Join us in the community. We need health workers, teachers, and many other skilled volunteers."],
              ["📢", "Spread the Word", "Share our work with your network. Awareness creates partnerships and opens doors."],
              ["🤝", "Partner",    "Organisations and businesses can partner with us to co-fund or co-deliver programmes."],
            ].map(([icon, title, text]) => (
              <div key={title} style={{
                background: "var(--white)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "28px 24px", textAlign: "center",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: 14 }}>{icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>{title}</div>
                <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.65 }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/public/contact" className="btn btn-outline-green">
              Contact Us to Get Involved →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
