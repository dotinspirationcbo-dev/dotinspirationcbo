/**
 * SupportPage — public-facing "Support Our Work" page for Dot Inspiration CBO.
 * No authentication required.
 */
export function SupportPage() {
  return (
    <div>
      <h1>Support Our Work</h1>
      <p>
        Dot Inspiration CBO is committed to empowering communities through education,
        advocacy, and sustainable development. Your support makes our work possible.
      </p>

      <h2>How to Donate</h2>

      <section>
        <h3>Bank Transfer</h3>
        <table>
          <tbody>
            <tr>
              <td><strong>Bank</strong></td>
              <td>Exim Bank Uganda</td>
            </tr>
            <tr>
              <td><strong>Account Name</strong></td>
              <td>Othieno Constant</td>
            </tr>
            <tr>
              <td><strong>Account Number</strong></td>
              <td>0071013100</td>
            </tr>
          </tbody>
        </table>
        <p>
          <em>
            Transparency note: This account is temporarily used to receive support for
            Dot Inspiration CBO while organizational financial systems are being strengthened.
          </em>
        </p>
      </section>

      <section>
        <h3>Contact Us</h3>
        <p>
          For donation enquiries, partnership opportunities, or more information about
          our programmes:
        </p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:info@dotinspirationcbo.org">
              info@dotinspirationcbo.org
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href="tel:+256794722080">+256 794 722 080</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
