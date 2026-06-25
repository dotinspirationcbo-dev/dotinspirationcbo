import { Link } from "react-router-dom";

const TRUST_BAR = [
  {
    icon: "🏦",
    title: "Verified Banking",
    text: "Full bank details provided. Receipts issued on request.",
  },
  {
    icon: "📊",
    title: "Transparent Reporting",
    text: "All funds accounted for. Reports available to every donor.",
  },
  {
    icon: "🤝",
    title: "Community-Led",
    text: "Programmes designed with and for the communities we serve.",
  },
  {
    icon: "📋",
    title: "Registered CBO",
    text: "Legally registered under Ugandan law. Operating since 2026.",
  },
];

const BANK_ROWS = [
  ["Bank",           "Exim Bank Uganda"],
  ["Account Name",   "Othieno Constant"],
  ["Account Number", "0071013100"],
  ["Currency",       "UGX (Ugandan Shillings)"],
  ["Reference",      "Donation — [Your Name]"],
];

const DONATION_IMPACT = [
  ["UGX 30,000",  "School exercise books and stationery for one child"],
  ["UGX 50,000",  "A month of adult literacy classes for one learner"],
  ["UGX 100,000", "A community health screening reaching 20+ families"],
  ["UGX 200,000", "Vocational skills training for one young woman"],
  ["UGX 500,000", "50 trees planted in a degraded watershed area"],
];

const WAYS_TO_HELP = [
  ["🙋", "Volunteer With Us",  "Join us on the ground in Mukono District. We need health workers, educators, trainers, and many other skilled volunteers."],
  ["📢", "Spread the Word",    "Share our work with your network. Awareness reaches new donors, partners, and volunteers we would never find alone."],
  ["🤝", "Become a Partner",   "NGOs, government bodies, and businesses can partner with us to co-fund or co-deliver programmes at greater scale."],
];

export function SupportPage() {
  return (
    <>
      <div className="page-hero">
        <h1 className="page-hero__title">Support Our Work</h1>
        <p className="page-hero__subtitle">
          Since 2026, communities in Mukono District have counted on our programmes.
          Your generosity — however large or small — keeps that work going.
        </p>
      </div>

      <section className="section">
        <div className="container">

          {/* Trust bar */}
          <div className="trust-bar">
            {TRUST_BAR.map((t) => (
              <div key={t.title} className="trust-bar__item">
                <div className="trust-bar__icon">{t.icon}</div>
                <div className="trust-bar__title">{t.title}</div>
                <p className="trust-bar__text">{t.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center section-intro">
            <span className="section-label">How to Donate</span>
            <h2 className="section-title">Every Contribution Makes a Difference</h2>
            <p className="section-subtitle">
              We accept donations by bank transfer, mobile money, and cash.
              All contributions are personally acknowledged and transparently reported.
            </p>
          </div>

          <div className="support-grid">
            {/* Bank Details */}
            <div>
              <h3 className="section-subheading">🏦 Bank Transfer</h3>
              <div className="bank-details">
                <div className="bank-details__header">Official Banking Details — Dot Inspiration CBO</div>
                {BANK_ROWS.map(([key, val]) => (
                  <div key={key} className="bank-details__row">
                    <span className="bank-details__key">{key}</span>
                    <span className="bank-details__val">{val}</span>
                  </div>
                ))}
                <div className="bank-details__note">
                  <strong>Transparency note:</strong> This account is held by our Founder and Executive
                  Director while the organisation's dedicated financial infrastructure is being
                  established. All funds are fully accounted for and a donation receipt will be
                  provided to every donor on request.
                </div>
              </div>

              <h3 className="section-subheading" style={{ marginTop: 32 }}>📱 Mobile Money</h3>
              <div className="contact-item">
                <div className="contact-item__icon">📞</div>
                <div>
                  <div className="contact-item__label">Mobile Money / WhatsApp</div>
                  <div className="contact-item__value">
                    <a href="tel:+256794722080">+256 794 722 080</a>
                  </div>
                  <div className="prose-text" style={{ fontSize: "0.8rem", marginTop: 4 }}>
                    Send us a WhatsApp message to arrange your mobile money donation.
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div>
              <h3 className="section-subheading">📬 Donation Enquiries</h3>
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

              {/* What your donation funds */}
              <div className="donation-impact">
                <h4 className="donation-impact__title">What your donation funds</h4>
                <p className="donation-impact__subtitle">
                  Every contribution, whatever the amount, goes directly to our programmes.
                </p>
                <ul className="donation-impact__list">
                  {DONATION_IMPACT.map(([amount, desc]) => (
                    <li key={amount} className="donation-impact__item">
                      <span className="donation-impact__amount">{amount}</span>
                      {desc}
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
          <div className="text-center section-intro">
            <span className="section-label">More Ways to Help</span>
            <h2 className="section-title">Beyond Financial Donations</h2>
            <p className="section-subtitle">
              Money is not the only way to support our mission. Your time,
              skills, and networks matter just as much.
            </p>
          </div>
          <div className="ways-grid">
            {WAYS_TO_HELP.map(([icon, title, text]) => (
              <div key={String(title)} className="ways-card">
                <div className="ways-card__icon">{icon}</div>
                <div className="ways-card__title">{title}</div>
                <p className="ways-card__text">{text}</p>
              </div>
            ))}
          </div>
          <div className="cta-group">
            <Link to="/public/contact" className="btn btn-outline-green">
              Contact Us to Get Involved →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
