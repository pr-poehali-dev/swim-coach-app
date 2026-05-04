import Icon from "@/components/ui/icon";
import type { UserData } from "@/types/user";

type Role = "athlete" | "coach";

interface DashboardProps {
  role: Role;
  user: UserData;
}

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const weekMeters = [2400, 3200, 0, 4100, 2800, 5000, 1500];
const maxMeters = 5000;

const styles = [
  { name: "Кроль", meters: 12400, color: "hsl(199,89%,52%)", pct: 52 },
  { name: "Брасс", meters: 5800, color: "hsl(160,70%,45%)", pct: 24 },
  { name: "Спина", meters: 3600, color: "hsl(280,60%,60%)", pct: 15 },
  { name: "Баттерфляй", meters: 2100, color: "hsl(40,90%,55%)", pct: 9 },
];

const upcomingTrainings = [
  { time: "09:00", title: "Утренняя тренировка", coach: "Иванов А.В.", lane: "Дорожка 3" },
  { time: "14:30", title: "Техника кроля", coach: "Петрова М.С.", lane: "Дорожка 1" },
  { time: "18:00", title: "Интенсив", coach: "Иванов А.В.", lane: "Дорожка 5" },
];

const coachStats = [
  { label: "Мои группы", value: "4", icon: "Users", trend: "+1" },
  { label: "Трен./нед.", value: "18", icon: "CalendarDays", trend: "0" },
  { label: "Спортсменов", value: "34", icon: "UserCheck", trend: "+3" },
  { label: "Выручка", value: "₽186к", icon: "Banknote", trend: "+12%" },
];

export default function Dashboard({ role, user }: DashboardProps) {
  const totalWeekMeters = weekMeters.reduce((a, b) => a + b, 0);
  const firstName = user.profile.name.split(" ")[0] || "Тренер";

  if (role === "coach") {
    return (
      <div className="p-4 md:p-8 space-y-4 animate-fade-in">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-dim text-xs mb-1">Понедельник, 4 мая 2026</p>
            <h1 className="font-display text-2xl md:text-3xl font-semibold">Привет, {firstName}</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-aqua text-background text-sm font-medium hover:opacity-90 transition-opacity shrink-0">
            <Icon name="Users" size={15} />
            Создать комьюнити
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {coachStats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="flex items-center justify-between">
                <Icon name={s.icon} size={16} fallback="Circle" className="text-dim" />
                <span className={`text-xs font-medium ${s.trend.startsWith("+") ? "text-emerald-400" : "text-dim"}`}>{s.trend}</span>
              </div>
              <p className="font-display text-xl md:text-2xl font-semibold mt-2">{s.value}</p>
              <p className="text-dim text-xs">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="card-base p-4">
          <p className="text-dim text-xs mb-3 uppercase tracking-widest">Тренировки сегодня</p>
          <div className="space-y-2">
            {upcomingTrainings.map((t) => (
              <div key={t.time} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <span className="font-display text-aqua text-sm font-semibold w-12 shrink-0">{t.time}</span>
                <div>
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-dim text-xs mt-0.5">{t.lane}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-base p-4">
          <p className="text-dim text-xs mb-3 uppercase tracking-widest">Посещаемость групп</p>
          <div className="space-y-4">
            {[
              { name: "Группа A (взрослые)", pct: 92, count: "11/12" },
              { name: "Группа B (дети)", pct: 78, count: "7/9" },
              { name: "Продвинутые", pct: 100, count: "6/6" },
              { name: "Начинающие", pct: 71, count: "5/7" },
            ].map((g) => (
              <div key={g.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span>{g.name}</span>
                  <span className="text-dim">{g.count}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${g.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-base p-4">
          <p className="text-dim text-xs mb-3 uppercase tracking-widest">Быстрые действия</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: "UserPlus", label: "Добавить спортсмена" },
              { icon: "Calendar", label: "Создать тренировку" },
              { icon: "CreditCard", label: "Выдать абонемент" },
              { icon: "FileText", label: "Финансовый отчёт" },
            ].map((a) => (
              <button key={a.label} className="flex items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-muted transition-colors text-left">
                <Icon name={a.icon} size={14} fallback="Circle" className="text-aqua shrink-0" />
                <span className="text-xs leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-4 animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-dim text-xs mb-1">Понедельник, 4 мая 2026</p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold">Привет, {firstName}</h1>
        </div>
        <div className="card-base px-3 py-1.5 flex items-center gap-1.5 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs text-dim whitespace-nowrap">18 дней</span>
        </div>
      </div>

      <div className="card-base p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-dim text-xs uppercase tracking-widest">Метров за неделю</p>
          <span className="text-xs text-dim">Цель: 20 000</span>
        </div>
        <p className="font-display text-3xl font-semibold text-aqua mt-1">
          {totalWeekMeters.toLocaleString("ru")}
          <span className="text-sm text-dim font-normal ml-1">м</span>
        </p>
        <div className="progress-bar mt-3">
          <div className="progress-fill" style={{ width: `${(totalWeekMeters / 20000) * 100}%` }} />
        </div>
        <p className="text-xs text-dim mt-1.5">{Math.round((totalWeekMeters / 20000) * 100)}% от цели</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="stat-card">
          <Icon name="Flame" size={16} fallback="Circle" className="text-orange-400" />
          <p className="font-display text-2xl font-semibold mt-2">7</p>
          <p className="text-dim text-xs">Тренировок подряд</p>
        </div>
        <div className="stat-card">
          <Icon name="Timer" size={16} fallback="Circle" className="text-aqua" />
          <p className="font-display text-2xl font-semibold mt-2">12.4</p>
          <p className="text-dim text-xs">Сек/25м</p>
        </div>
      </div>

      <div className="card-base p-4">
        <p className="text-dim text-xs mb-4 uppercase tracking-widest">Нагрузка по дням</p>
        <div className="flex items-end gap-1.5 h-24">
          {weekDays.map((d, i) => {
            const pct = (weekMeters[i] / maxMeters) * 100;
            return (
              <div key={d} className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full flex items-end" style={{ height: "72px" }}>
                  <div
                    className="w-full rounded-t transition-all duration-700"
                    style={{
                      height: `${pct}%`,
                      background: weekMeters[i] > 0
                        ? "linear-gradient(180deg, hsl(199,89%,52%), hsl(199,60%,35%))"
                        : "hsl(var(--secondary))",
                    }}
                  />
                </div>
                <span className="text-dim text-xs">{d}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card-base p-4">
        <p className="text-dim text-xs mb-3 uppercase tracking-widest">По стилям</p>
        <div className="space-y-3">
          {styles.map((s) => (
            <div key={s.name} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>{s.name}</span>
                <span className="text-dim">{(s.meters / 1000).toFixed(1)}к м</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}80, ${s.color})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-base p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-dim text-xs uppercase tracking-widest">Ближайшие тренировки</p>
          <button className="text-xs text-aqua hover:opacity-80">Все →</button>
        </div>
        <div className="space-y-2">
          {upcomingTrainings.map((t) => (
            <div key={t.time} className="flex items-center gap-3 p-3 bg-secondary rounded-lg border border-border">
              <span className="font-display text-aqua text-sm font-semibold w-12 shrink-0">{t.time}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{t.title}</p>
                <p className="text-dim text-xs">{t.lane}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}