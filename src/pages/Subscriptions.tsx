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
  { name: "Безлимит", price: "4 900 ₽", desc: "Неограниченные посещения", duration: "1 месяц", color: "border-aqua" },
  { name: "10 занятий", price: "2 800 ₽", desc: "10 посещений, без срока", duration: "Без срока", color: "border-emerald-500" },
  { name: "20 занятий", price: "4 200 ₽", desc: "20 посещений, без срока", duration: "Без срока", color: "border-violet-500" },
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
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dim text-sm mb-1">Управление</p>
          <h1 className="font-display text-3xl font-semibold">Абонементы</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-aqua text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Icon name="Plus" size={16} />
          Выдать абонемент
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat-card">
          <Icon name="CreditCard" size={18} className="text-dim" />
          <p className="font-display text-2xl font-semibold mt-2">{subscriptions.length}</p>
          <p className="text-dim text-xs">Всего абонементов</p>
        </div>
        <div className="stat-card">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <p className="font-display text-2xl font-semibold mt-2 text-emerald-400">{activeCount}</p>
          <p className="text-dim text-xs">Активных</p>
        </div>
        <div className="stat-card">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <p className="font-display text-2xl font-semibold mt-2 text-amber-400">{warningCount}</p>
          <p className="text-dim text-xs">Заканчиваются</p>
        </div>
        <div className="stat-card">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <p className="font-display text-2xl font-semibold mt-2 text-red-400">{expiredCount}</p>
          <p className="text-dim text-xs">Истекших</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Plans */}
        <div className="space-y-3">
          <p className="text-dim text-xs uppercase tracking-widest mb-3">Тарифы</p>
          {plans.map((p) => (
            <div key={p.name} className={`card-base p-5 border-l-2 ${p.color}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display font-semibold text-base">{p.name}</p>
                  <p className="text-dim text-xs mt-0.5">{p.desc}</p>
                  <p className="text-dim text-xs">{p.duration}</p>
                </div>
                <p className="font-display text-xl font-semibold text-aqua">{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="col-span-2 card-base p-6">
          <div className="flex items-center gap-2 mb-5">
            {(["all", "active", "warning", "expired"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f ? "bg-aqua text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "Все" : f === "active" ? "Активные" : f === "warning" ? "Заканчиваются" : "Истекшие"}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filtered.map((s) => {
              const sc = statusConfig[s.status];
              const pct = s.maxVisits ? (s.visits / s.maxVisits) * 100 : null;
              return (
                <div key={s.id} className="flex items-center gap-4 p-4 bg-secondary rounded-xl hover:bg-muted transition-colors">
                  <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center shrink-0">
                    <span className="font-display text-sm font-semibold text-aqua">
                      {s.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                    <p className="text-xs text-dim">{s.plan} · до {s.expires}</p>
                    {pct !== null && (
                      <div className="progress-bar mt-1.5" style={{ width: "120px" }}>
                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium">{s.maxVisits ? `${s.visits}/${s.maxVisits}` : `${s.visits} посещ.`}</p>
                    <div className="flex items-center gap-1 justify-end mt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      <span className={`text-xs ${sc.color}`}>{sc.label}</span>
                    </div>
                  </div>
                  <button className="text-dim hover:text-foreground transition-colors">
                    <Icon name="MoreHorizontal" size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
