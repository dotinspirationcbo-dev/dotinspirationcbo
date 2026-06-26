import { useQuery } from "@tanstack/react-query";
import { getGalleryImages } from "../../services/gallery.service";
import { getOpportunities } from "../../services/opportunities.service";
import { getContactMessages } from "../../services/contactMessages.service";
import { getLeadershipMembers } from "../../services/leadership.service";
import { getMembers } from "../../services/members.service";

interface StatCardProps {
  icon: string;
  value: number | string;
  label: string;
  loading?: boolean;
}

function StatCard({ icon, value, label, loading }: StatCardProps) {
  return (
    <div className="dash-stat-card">
      <span className="dash-stat-icon">{icon}</span>
      <div className="dash-stat-value">{loading ? "—" : value}</div>
      <div className="dash-stat-label">{label}</div>
    </div>
  );
}

export function AdminOverview() {
  const gallery = useQuery({ queryKey: ["gallery-all"], queryFn: () => getGalleryImages({ all: true }) });
  const opps    = useQuery({ queryKey: ["opportunities-all"], queryFn: () => getOpportunities() });
  const msgs    = useQuery({ queryKey: ["contact-messages-all"], queryFn: () => getContactMessages() });
  const leaders = useQuery({ queryKey: ["leadership-all"], queryFn: () => getLeadershipMembers() });
  const members = useQuery({ queryKey: ["members"], queryFn: getMembers });

  const newMsgs = msgs.data?.filter((m) => m.status === "new").length ?? 0;
  const openOpps = opps.data?.filter((o) => o.status === "open").length ?? 0;

  return (
    <>
      <div className="dash-page-header">
        <h1 className="dash-page-title">Dashboard Overview</h1>
        <p className="dash-page-sub">
          Dot Inspiration CBO — Mukono District, Uganda
        </p>
      </div>

      <div className="dash-stats-grid">
        <StatCard icon="🖼️" value={gallery.data?.length ?? 0}   label="Gallery Images"    loading={gallery.isLoading} />
        <StatCard icon="💼" value={openOpps}                    label="Open Opportunities" loading={opps.isLoading} />
        <StatCard icon="✉️" value={newMsgs}                     label="New Messages"       loading={msgs.isLoading} />
        <StatCard icon="👥" value={leaders.data?.length ?? 0}   label="Leadership Members" loading={leaders.isLoading} />
        <StatCard icon="🗂️" value={members.data?.length ?? 0}   label="System Members"     loading={members.isLoading} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Recent Messages */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3 className="dash-card-title">✉️ Recent Messages</h3>
            <a href="/admin/messages" className="dash-btn dash-btn--ghost dash-btn--sm">View all</a>
          </div>
          {msgs.isLoading && <div className="dash-loading">Loading…</div>}
          {msgs.data?.length === 0 && <div className="dash-empty"><span className="dash-empty-icon">✉️</span>No messages yet.</div>}
          {msgs.data?.slice(0, 5).map((m) => (
            <div key={m.id} className="dash-msg-row" style={{ cursor: "default" }}>
              <div>
                <div className="dash-msg-sender">{m.name}</div>
                <div className="dash-msg-preview">{m.message}</div>
              </div>
              <span className={`dash-badge dash-badge--${m.status}`}>{m.status}</span>
            </div>
          ))}
        </div>

        {/* Open Opportunities */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3 className="dash-card-title">💼 Open Opportunities</h3>
            <a href="/admin/opportunities" className="dash-btn dash-btn--ghost dash-btn--sm">View all</a>
          </div>
          {opps.isLoading && <div className="dash-loading">Loading…</div>}
          {opps.data?.filter(o => o.status === "open").length === 0 && (
            <div className="dash-empty"><span className="dash-empty-icon">💼</span>No open opportunities.</div>
          )}
          <div className="dash-table-wrap">
            <table className="dash-table">
              <tbody>
                {opps.data?.filter(o => o.status === "open").slice(0, 5).map((o) => (
                  <tr key={o.id}>
                    <td><span style={{ fontWeight: 600 }}>{o.title}</span></td>
                    <td><span className={`dash-badge dash-badge--${o.type}`}>{o.type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
