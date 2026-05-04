import Icon from "@/components/ui/icon";

const topAthletes = [
  { rank: 1, name: "Орлов Дмитрий", weekMeters: 28000, style: "Кроль", growth: "+8%", group: "Продвинутые" },
  { rank: 2, name: "Федорова Анна", weekMeters: 24500, style: "Баттерфляй", growth: "+12%", group: "Продвинутые" },
  { rank: 3, name: "Попов Алексей", weekMeters: 21400, style: "Кроль", growth: "+5%", group: "Группа А" },
  { rank: 4, name: "Кузнецова Мария", weekMeters: 15600, style: "Брасс", growth: "+3%", group: "Группа А" },
  { rank: 5, name: "Смирнова Елена", weekMeters: 8200, style: "Спина", growth: "-2%", group: "Группа Б" },
];

const styleData = [
  { style: "Кроль", meters: 49400, pct: 52, color: "hsl(199,89%,52%)" },
  { style: "Брасс", meters: 22800, pct: 24, color: "hsl(160,70%,45%)" },
  { style: "Спина", meters: 14200, pct: 15, color: "hsl(280,60%,60%)" },
  { style: "Баттерфляй", meters: 8500, pct: 9, color: "hsl(40,90%,55%)" },
];

const weekProgress = [
  { week: "Нед 1", meters: 58000 },
  { week: "Нед 2", meters: 72000 },
  { week: "Нед 3", meters: 65000 },
  { week: "Нед 4", meters: 84000 },
  { week: "Нед 5 (тек.)", meters: 94500 },
];
const maxProgress = 100000;

const loadZones = [
  { name: "Аэробная", pct: 45, color: "hsl(160,70%,45%)" },
  { name: "Пороговая", pct: 30, color: "hsl(199,89%,52%)" },
  { name: "Анаэробная", pct: 18, color: "hsl(40,90%,55%)" },
  { name: "Максимальная", pct: 7, color: "hsl(0,72%,51%)" },
];

export default function Analytics() {
  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dim text-sm mb-1">Аналитика</p>
          <h1 className="font-display text-3xl font-semibold">Аналитика и отчёты</h1>
        </div>
        <div className="flex gap-2">
          {["Неделя", "Месяц", "Квартал"].map((p, i) => (
            <button
              key={p}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                i === 1 ? "bg-aqua text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Всего метров (месяц)", value: "374,100", unit: "м", icon: "Waves", color: "text-aqua" },
          { label: "Ср. нагрузка/спортсмен", value: "3,018", unit: "м/нед", icon: "Activity", color: "text-emerald-400" },
          { label: "Активных спортсменов", value: "34", unit: "", icon: "Users", color: "text-violet-400" },
          { label: "Прогресс к цели", value: "87%", unit: "", icon: "Target", color: "text-amber-400" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <Icon name={s.icon} size={18} fallback="Circle" className={s.color} />
            <p className={`font-display text-2xl font-semibold mt-2 ${s.color}`}>
              {s.value}
              {s.unit && <span className="text-sm text-dim font-normal ml-1">{s.unit}</span>}
            </p>
            <p className="text-dim text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Progress chart */}
        <div className="col-span-2 card-base p-6">
          <p className="text-dim text-xs uppercase tracking-widest mb-6">Метры по неделям (суммарно)</p>
          <div className="space-y-3">
            {weekProgress.map((w) => {
              const pct = (w.meters / maxProgress) * 100;
              const isCurrent = w.week.includes("тек");
              return (
                <div key={w.week} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className={isCurrent ? "text-aqua font-medium" : "text-dim"}>{w.week}</span>
                    <span className={isCurrent ? "text-aqua" : "text-dim"}>
                      {(w.meters / 1000).toFixed(1)}к м
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: isCurrent
                          ? "linear-gradient(90deg, hsl(199,60%,35%), hsl(199,89%,52%))"
                          : "hsl(var(--border))",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Zones */}
        <div className="card-base p-6">
          <p className="text-dim text-xs uppercase tracking-widest mb-4">Зоны нагрузки</p>
          <div className="space-y-4">
            {loadZones.map((z) => (
              <div key={z.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span>{z.name}</span>
                  <span className="text-dim">{z.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${z.pct}%`, background: z.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-dim text-xs uppercase tracking-widest mb-3">Стили плавания</p>
            <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-3">
              {styleData.map((s) => (
                <div
                  key={s.style}
                  style={{ width: `${s.pct}%`, background: s.color }}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1">
              {styleData.map((s) => (
                <div key={s.style} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="text-dim truncate">{s.style}</span>
                  <span className="ml-auto">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top athletes */}
      <div className="card-base p-6">
        <p className="text-dim text-xs uppercase tracking-widest mb-4">Топ спортсменов по нагрузке</p>
        <div className="space-y-2">
          {topAthletes.map((a) => {
            const isPositive = a.growth.startsWith("+");
            return (
              <div key={a.rank} className="flex items-center gap-4 p-4 bg-secondary rounded-xl hover:bg-muted transition-colors">
                <span className={`font-display text-xl font-bold w-8 text-center ${a.rank === 1 ? "text-amber-400" : a.rank === 2 ? "text-slate-400" : a.rank === 3 ? "text-amber-700" : "text-dim"}`}>
                  {a.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center shrink-0">
                  <span className="font-display text-sm font-semibold text-aqua">
                    {a.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{a.name}</p>
                  <p className="text-xs text-dim">{a.group} · {a.style}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-semibold text-aqua">
                    {(a.weekMeters / 1000).toFixed(1)}к
                    <span className="text-xs text-dim font-normal ml-1">м/нед</span>
                  </p>
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium w-14 justify-end ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                  <Icon name={isPositive ? "TrendingUp" : "TrendingDown"} size={12} />
                  {a.growth}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
