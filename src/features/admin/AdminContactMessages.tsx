import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
  type ContactMessage,
  type MessageStatus,
} from "../../services/contactMessages.service";

const STATUS_FILTERS: Array<MessageStatus | "all"> = ["all", "new", "read", "resolved"];

function fmt(d: string) {
  return new Date(d).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export function AdminContactMessages() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<MessageStatus | "all">("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["contact-messages", filter],
    queryFn: () => getContactMessages(filter === "all" ? undefined : filter),
  });

  const [alert, setAlert] = useState("");
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["contact-messages"] });
    qc.invalidateQueries({ queryKey: ["contact-messages-all"] });
  };

  const statusMut = useMutation({
    mutationFn: ({ id, status }: { id: number; status: MessageStatus }) =>
      updateMessageStatus(id, status),
    onSuccess: () => invalidate(),
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  const deleteMut = useMutation({
    mutationFn: deleteContactMessage,
    onSuccess: () => { invalidate(); setExpanded(null); },
    onError: (e: Error) => setAlert(`Error: ${e.message}`),
  });

  const newCount = data?.filter((m) => m.status === "new").length ?? 0;

  return (
    <>
      <div className="dash-page-header">
        <h1 className="dash-page-title">
          Contact Messages
          {newCount > 0 && (
            <span className="dash-badge dash-badge--new" style={{ marginLeft: 10, fontSize: "0.7rem" }}>
              {newCount} new
            </span>
          )}
        </h1>
        <p className="dash-page-sub">Inbox for public contact form submissions.</p>
      </div>

      {alert && (
        <div className="dash-alert dash-alert--error" onClick={() => setAlert("")}>
          {alert} <span style={{ cursor: "pointer", marginLeft: 8 }}>×</span>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`dash-btn ${filter === f ? "dash-btn--primary" : "dash-btn--ghost"} dash-btn--sm`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {error && <div className="dash-error">Failed to load messages. Check API server.</div>}
      {isLoading && <div className="dash-loading">Loading messages…</div>}

      {!isLoading && (
        <div className="dash-card">
          {(data?.length ?? 0) === 0 ? (
            <div className="dash-empty">
              <span className="dash-empty-icon">✉️</span>
              No messages {filter !== "all" ? `with status "${filter}"` : "yet"}.
            </div>
          ) : (
            data?.map((msg: ContactMessage) => (
              <div key={msg.id}>
                <div
                  className={`dash-msg-row${msg.status === "new" ? " dash-msg-row--new" : ""}`}
                  onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
                >
                  <div>
                    <div className="dash-msg-sender">
                      {msg.name}
                      {msg.subject && <span style={{ color: "var(--dash-muted)", fontWeight: 400 }}> — {msg.subject}</span>}
                    </div>
                    <div className="dash-msg-meta">
                      {msg.email}{msg.phone ? ` · ${msg.phone}` : ""} · {fmt(msg.created_at)}
                    </div>
                    <div className="dash-msg-preview">{msg.message}</div>
                    {expanded === msg.id && (
                      <div className="dash-msg-body">{msg.message}</div>
                    )}
                  </div>
                  <div className="dash-msg-actions" onClick={(e) => e.stopPropagation()}>
                    <span className={`dash-badge dash-badge--${msg.status}`}>{msg.status}</span>
                    {msg.status === "new" && (
                      <button
                        className="dash-btn dash-btn--ghost dash-btn--sm"
                        disabled={statusMut.isPending}
                        onClick={() => statusMut.mutate({ id: msg.id, status: "read" })}
                      >
                        Mark Read
                      </button>
                    )}
                    {msg.status !== "resolved" && (
                      <button
                        className="dash-btn dash-btn--primary dash-btn--sm"
                        disabled={statusMut.isPending}
                        onClick={() => statusMut.mutate({ id: msg.id, status: "resolved" })}
                      >
                        Resolve
                      </button>
                    )}
                    <button
                      className="dash-btn dash-btn--danger dash-btn--sm dash-btn--icon"
                      disabled={deleteMut.isPending}
                      onClick={() => { if (confirm("Delete this message?")) deleteMut.mutate(msg.id); }}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
