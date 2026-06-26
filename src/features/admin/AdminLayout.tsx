import { NavLink, Outlet, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import "./admin.css";

const NAV_ITEMS = [
  { to: "/admin",              label: "Overview",        icon: "◈",  end: true },
  { to: "/admin/gallery",      label: "Gallery",         icon: "🖼️"  },
  { to: "/admin/opportunities",label: "Opportunities",   icon: "💼"  },
  { to: "/admin/messages",     label: "Messages",        icon: "✉️"  },
  { to: "/admin/leadership",   label: "Leadership",      icon: "👥"  },
  { to: "/admin/site-content", label: "Site Content",    icon: "✏️"  },
  { to: "/admin/members",      label: "Members",         icon: "🗂️"  },
];

const PAGE_TITLES: Record<string, string> = {
  "/admin":               "Overview",
  "/admin/gallery":       "Gallery Manager",
  "/admin/opportunities": "Opportunities",
  "/admin/messages":      "Contact Messages",
  "/admin/leadership":    "Leadership",
  "/admin/site-content":  "Site Content",
  "/admin/members":       "Members",
  "/admin/donations":     "Donations",
};

export function AdminLayout() {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] ?? "Admin";

  return (
    <div className="dash-layout">
      {/* ── Sidebar ── */}
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <div className="dash-brand-dot">D</div>
          <div>
            <div className="dash-brand-name">Dot Inspiration</div>
            <div className="dash-brand-sub">CBO Admin Portal</div>
          </div>
        </div>

        <nav className="dash-nav">
          <span className="dash-nav-section">Main</span>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `dash-nav-link${isActive ? " active" : ""}`
              }
            >
              <span className="dash-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <a href="/public" className="dash-nav-link">
            <span className="dash-nav-icon">←</span>
            Public Site
          </a>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="dash-main">
        <header className="dash-topbar">
          <span className="dash-topbar-title">{title}</span>
          <div className="dash-topbar-right">
            <a href="/public" className="dash-topbar-site-link">
              ↗ View Site
            </a>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </header>

        <main className="dash-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
