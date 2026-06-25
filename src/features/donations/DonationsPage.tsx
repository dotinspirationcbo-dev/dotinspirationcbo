import { useAuth } from "../../hooks/useAuth";
import { canManageDonations } from "../../app/permissions/permissions";
import { useDonations } from "./useDonations";
import type { Donation } from "../../types/donation.types";

function formatAmount(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString()}`;
}

/**
 * DonationsPage — admin-only view of all NGO donations.
 * Access is double-checked here (in addition to ProtectedRoute) so the
 * permission layer is enforced at the component level too.
 */
export function DonationsPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useDonations();

  if (!user?.role || !canManageDonations(user.role)) {
    return <div>Access denied.</div>;
  }

  if (isLoading) return <div>Loading donations…</div>;
  if (error) return <div>Failed to load donations.</div>;

  return (
    <div>
      <h1>Donations</h1>
      <p>
        For donation enquiries contact{" "}
        <a href="mailto:info@dotinspirationcbo.org">info@dotinspirationcbo.org</a>
        {" "}or call{" "}
        <a href="tel:+256794722080">+256 794 722 080</a>.
      </p>

      <table>
        <thead>
          <tr>
            <th>Donor</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Reference</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d: Donation) => (
            <tr key={d.id}>
              <td>{d.donorName}</td>
              <td>{d.email}</td>
              <td>{formatAmount(d.amount, d.currency)}</td>
              <td>{d.method.replace("_", " ")}</td>
              <td>{d.status}</td>
              <td>{d.reference ?? "—"}</td>
              <td>{new Date(d.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
