import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page =
  | "dashboard"
  | "calendar"
  | "subscriptions"
  | "finance"
  | "groups"
  | "analytics"
  | "profile"
  | "login";

type Role = "athlete" | "coach" | "admin";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  role: Role;
  onRoleChange: (role: Role) => void;
}

const navItems: { id: Page; label: string; icon: string; roles: Role[] }[] = [
  { id: "dashboard", label: "Дашборд", icon: "LayoutDashboard", roles: ["athlete", "coach", "admin"] },
  { id: "calendar", label: "Календарь", icon: "CalendarDays", roles: ["athlete", "coach", "admin"] },
  { id: "subscriptions", label: "Абонементы", icon: "CreditCard", roles: ["athlete", "coach", "admin"] },
  { id: "groups", label: "Группы", icon: "Users", roles: ["coach", "admin"] },
  { id: "analytics", label: "Аналитика", icon: "BarChart3", roles: ["athlete", "coach", "admin"] },
  { id: "finance", label: "Финансы", icon: "TrendingUp", roles: ["admin"] },
  { id: "profile", label: "Профиль", icon: "UserCircle", roles: ["athlete", "coach", "admin"] },
];

const roleLabels: Record<Role, string> = {
  athlete: "Спортсмен",
  coach: "Тренер",
  admin: "Администратор",
};

const roleColors: Record<Role, string> = {
  athlete: "text-sky-400",
  coach: "text-emerald-400",
  admin: "text-amber-400",
};

export default function Layout({ children, currentPage, onNavigate, role, onRoleChange }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const filteredNav = navItems.filter((item) => item.roles.includes(role));
  // На мобайле показываем максимум 5 пунктов в нижней панели
  const mobileNav = filteredNav.slice(0, 5);

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden md:flex flex-col border-r border-border transition-all duration-300 bg-card shrink-0"
        style={{ width: collapsed ? "64px" : "220px" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-border shrink-0">
          <div className="w-7 h-7 rounded-lg bg-aqua flex items-center justify-center shrink-0">
            <span className="text-background font-display font-bold text-xs">AT</span>
          </div>
          {!collapsed && (
            <span className="font-display font-semibold text-sm tracking-wide text-foreground">
              AquaTrack
            </span>
          )}
          <button
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={15} />
          </button>
        </div>

        {/* Role badge */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs text-dim mb-1">Роль</p>
            <div className="flex gap-1">
              {(["athlete", "coach", "admin"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => onRoleChange(r)}
                  className={`text-xs px-2 py-1 rounded transition-all ${
                    role === r
                      ? "bg-secondary " + roleColors[r]
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r === "athlete" ? "СП" : r === "coach" ? "ТР" : "АД"}
                </button>
              ))}
            </div>
            <p className={`text-xs font-medium mt-1 ${roleColors[role]}`}>{roleLabels[role]}</p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {filteredNav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-item w-full ${currentPage === item.id ? "active" : "text-muted-foreground"} ${collapsed ? "justify-center px-0" : ""}`}
              title={collapsed ? item.label : ""}
            >
              <Icon name={item.icon} size={17} fallback="Circle" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-3 border-t border-border pt-3">
          <button
            onClick={() => onNavigate("login")}
            className={`nav-item w-full text-muted-foreground ${collapsed ? "justify-center px-0" : ""}`}
          >
            <Icon name="LogOut" size={17} />
            {!collapsed && <span>Выйти</span>}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top header */}
        <header className="md:hidden flex items-center justify-between px-4 h-12 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-aqua flex items-center justify-center">
              <span className="text-background font-display font-bold text-xs">AT</span>
            </div>
            <span className="font-display font-semibold text-sm tracking-wide">AquaTrack</span>
          </div>
          <div className="flex gap-1">
            {(["athlete", "coach", "admin"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => onRoleChange(r)}
                className={`text-xs px-2 py-1 rounded transition-all ${
                  role === r
                    ? "bg-secondary " + roleColors[r]
                    : "text-muted-foreground"
                }`}
              >
                {r === "athlete" ? "СП" : r === "coach" ? "ТР" : "АД"}
              </button>
            ))}
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 flex">
          {mobileNav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
                currentPage === item.id ? "text-aqua" : "text-muted-foreground"
              }`}
            >
              <Icon name={item.icon} size={20} fallback="Circle" />
              <span className="text-[10px] leading-none">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
