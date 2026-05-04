import { useState } from "react";
import Icon from "@/components/ui/icon";

const subscriptions = [
  { id: 1, name: "Алексей Попов", plan: "Безлимит", status: "active", expires: "31.05.2026", visits: 18, maxVisits: null, paid: true },
  { id: 2, name: "Мария Кузнецова", plan: "10 занятий", status: "active", expires: "15.05.2026", visits: 7, maxVisits: 10, paid: true },
  { id: 3, name: "Дмитрий Орлов", plan: "20 занятий", status: "warning", expires: "08.05.2026", visits: 18, maxVisits: 20, paid: true },
  { id: 4, name: "Елена Смирнова", plan: "Безлимит", status: "expired", expires: "30.04.2026", visits: 22, maxVisits: null, paid: false },
  { id: 5, name: "Игорь Васильев", plan: "10 занятий", status: "active", expires: "20.05.2026", visits: 3, maxVisits: 10, paid: true },
  { id: 6, name: "Анна Федорова", plan: "20 занятий", status: "active", expires: "25.05.2026", visits: 12, maxVisits: 20, paid: true },
];

const plans = [
  { name: "Безлимит", price: "4 900 ₽", desc: "Неограниченные посещения", color: "border-aqua" },
  { name: "10 занятий", price: "2 800 ₽", desc: "10 посещений, без срока", color: "border-emerald-500" },
  { name: "20 занятий", price: "4 200 ₽", desc: "20 посещений, без срока", color: "border-violet-500" },
];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: "Активен", color: "text-emerald-400", dot: "bg-emerald-400" },
  warning: { label: "Заканчивается", color: "text-amber-400", dot: "bg-amber-400" },
  expired: { label: "Истёк", color: "text-red-400", dot: "bg-red-400" },
};

export default function Subscriptions() {
  const [filter, setFilter] = useState<"all" | "active" | "warning" | "expired">("all");

  const filtered = subscriptions.filter((s) => filter === "all" || s.status === filter);
  const activeCount = subscriptions.filter((s) => s.status === "active").length;
  const warningCount = subscriptions.filter((s) => s.status === "warning").length;
  const expiredCount = subscriptions.filter((s) => s.status === "expired").length;

  return (
    <div className="p-4 md:p-8 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dim text-xs mb-1">Управление</p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold">Абонементы</h1>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-aqua text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Icon name="Plus" size={15} />
          <span className="hidden sm:inline">Выдать</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="stat-card">
          <Icon name="CreditCard" size={16} className="text-dim" />
          <p className="font-display text-xl font-semibold mt-2">{subscriptions.length}</p>
          <p className="text-dim text-xs">Всего</p>
        </div>
        <div className="stat-card">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <p className="font-display text-xl font-semibold mt-2 text-emerald-400">{activeCount}</p>
          <p className="text-dim text-xs">Активных</p>
        </div>
        <div className="stat-card">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <p className="font-display text-xl font-semibold mt-2 text-amber-400">{warningCount}</p>
          <p className="text-dim text-xs">Заканчиваются</p>
        </div>
        <div className="stat-card">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <p className="font-display text-xl font-semibold mt-2 text-red-400">{expiredCount}</p>
          <p className="text-dim text-xs">Истекших</p>
        </div>
      </div>

      {/* Plans — horizontal scroll on mobile */}
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className={`card-base p-4 border-l-2 ${p.color} shrink-0 w-52 md:w-auto`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-display font-semibold text-sm">{p.name}</p>
                <p className="text-dim text-xs mt-0.5">{p.desc}</p>
              </div>
              <p className="font-display text-lg font-semibold text-aqua whitespace-nowrap">{p.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["all", "active", "warning", "expired"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
              filter === f ? "bg-aqua text-background" : "bg-secondary text-muted-foreground"
            }`}
          >
            {f === "all" ? "Все" : f === "active" ? "Активные" : f === "warning" ? "Заканчиваются" : "Истекшие"}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="card-base p-4 space-y-2">
        {filtered.map((s) => {
          const sc = statusConfig[s.status];
          const pct = s.maxVisits ? (s.visits / s.maxVisits) * 100 : null;
          return (
            <div key={s.id} className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
              <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center shrink-0">
                <span className="font-display text-xs font-semibold text-aqua">
                  {s.name.split(" ").map((w) => w[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{s.name}</p>
                <p className="text-xs text-dim">{s.plan} · {s.expires}</p>
                {pct !== null && (
                  <div className="progress-bar mt-1" style={{ width: "100px" }}>
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-medium">{s.maxVisits ? `${s.visits}/${s.maxVisits}` : `${s.visits}×`}</p>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                  <span className={`text-xs ${sc.color}`}>{sc.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
