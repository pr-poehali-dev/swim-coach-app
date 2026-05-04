import { useState } from "react";
import Icon from "@/components/ui/icon";

type Role = "athlete" | "coach" | "admin";

interface ProfileProps {
  role: Role;
}

const athleteProfile = {
  name: "Попов Алексей Игоревич",
  email: "popov@email.com",
  phone: "+7 (916) 234-56-78",
  dob: "15.03.1995",
  group: "Группа А — Взрослые",
  coach: "Иванов А.В.",
  since: "Март 2023",
  totalMeters: 284000,
  totalSessions: 96,
  bestStyle: "Кроль",
};

const personalBests = [
  { dist: "50м", style: "Кроль", time: "27.4 с", date: "12.03.2026" },
  { dist: "100м", style: "Кроль", time: "58.1 с", date: "05.02.2026" },
  { dist: "200м", style: "Брасс", time: "2:42.8", date: "22.01.2026" },
  { dist: "50м", style: "Спина", time: "33.2 с", date: "15.04.2026" },
];

const monthHistory = [
  { month: "Янв", meters: 18400 },
  { month: "Фев", meters: 22100 },
  { month: "Мар", meters: 24800 },
  { month: "Апр", meters: 21500 },
  { month: "Май", meters: 7200 },
];
const maxH = 30000;

export default function Profile({ role }: ProfileProps) {
  const [editMode, setEditMode] = useState(false);

  const initials = athleteProfile.name.split(" ").slice(0, 2).map((w) => w[0]).join("");

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dim text-sm mb-1">Личный кабинет</p>
          <h1 className="font-display text-3xl font-semibold">Профиль</h1>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            editMode ? "bg-aqua text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon name={editMode ? "Check" : "Pencil"} size={16} />
          {editMode ? "Сохранить" : "Редактировать"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: avatar + info */}
        <div className="card-base p-6 flex flex-col items-center text-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-aqua/10 border-2 border-aqua/30 flex items-center justify-center">
              <span className="font-display text-3xl font-bold text-aqua">{initials}</span>
            </div>
            {editMode && (
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-aqua flex items-center justify-center">
                <Icon name="Camera" size={12} className="text-background" />
              </button>
            )}
          </div>
          <div>
            <p className="font-display text-lg font-semibold">{athleteProfile.name}</p>
            <p className="text-dim text-sm mt-0.5">{role === "athlete" ? "Спортсмен" : role === "coach" ? "Тренер" : "Администратор"}</p>
            <p className="text-xs text-dim mt-1">В клубе с {athleteProfile.since}</p>
          </div>
          <div className="w-full pt-4 border-t border-border space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Mail" size={14} className="text-dim shrink-0" />
              <span className="text-dim truncate">{athleteProfile.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Phone" size={14} className="text-dim shrink-0" />
              <span className="text-dim">{athleteProfile.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Calendar" size={14} className="text-dim shrink-0" />
              <span className="text-dim">{athleteProfile.dob}</span>
            </div>
          </div>
          {role === "athlete" && (
            <div className="w-full pt-3 border-t border-border space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Users" size={14} className="text-dim shrink-0" />
                <span className="text-dim text-xs">{athleteProfile.group}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="UserCheck" size={14} className="text-dim shrink-0" />
                <span className="text-dim text-xs">Тренер: {athleteProfile.coach}</span>
              </div>
            </div>
          )}
        </div>

        {/* Stats + history */}
        <div className="col-span-2 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card">
              <Icon name="Waves" size={18} className="text-aqua" />
              <p className="font-display text-2xl font-semibold mt-2">
                {(athleteProfile.totalMeters / 1000).toFixed(0)}к
              </p>
              <p className="text-dim text-xs">Всего метров</p>
            </div>
            <div className="stat-card">
              <Icon name="CalendarCheck" size={18} className="text-emerald-400" />
              <p className="font-display text-2xl font-semibold mt-2">{athleteProfile.totalSessions}</p>
              <p className="text-dim text-xs">Тренировок</p>
            </div>
            <div className="stat-card">
              <Icon name="Award" size={18} className="text-amber-400" />
              <p className="font-display text-2xl font-semibold mt-2">{athleteProfile.bestStyle}</p>
              <p className="text-dim text-xs">Лучший стиль</p>
            </div>
          </div>

          {/* History chart */}
          <div className="card-base p-6">
            <p className="text-dim text-xs uppercase tracking-widest mb-4">Прогресс по месяцам</p>
            <div className="flex items-end gap-4 h-28">
              {monthHistory.map((m) => {
                const pct = (m.meters / maxH) * 100;
                const isCurrent = m.month === "Май";
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end" style={{ height: "90px" }}>
                      <div
                        className="w-full rounded-t transition-all duration-700"
                        style={{
                          height: `${pct}%`,
                          background: isCurrent
                            ? "linear-gradient(180deg, hsl(199,89%,52%), hsl(199,60%,35%))"
                            : "hsl(var(--secondary))",
                        }}
                      />
                    </div>
                    <span className={`text-xs ${isCurrent ? "text-aqua" : "text-dim"}`}>{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Personal bests */}
          <div className="card-base p-6">
            <p className="text-dim text-xs uppercase tracking-widest mb-4">Личные рекорды</p>
            <div className="grid grid-cols-2 gap-3">
              {personalBests.map((pb) => (
                <div key={pb.dist + pb.style} className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-aqua/10 flex items-center justify-center shrink-0">
                    <Icon name="Timer" size={16} className="text-aqua" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-dim">{pb.dist} {pb.style}</p>
                    <p className="font-display text-base font-semibold">{pb.time}</p>
                  </div>
                  <p className="text-xs text-dim shrink-0">{pb.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
