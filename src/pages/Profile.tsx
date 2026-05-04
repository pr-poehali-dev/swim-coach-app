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
  { dist: "50м", style: "Кроль", time: "27.4 с", date: "12.03.26" },
  { dist: "100м", style: "Кроль", time: "58.1 с", date: "05.02.26" },
  { dist: "200м", style: "Брасс", time: "2:42.8", date: "22.01.26" },
  { dist: "50м", style: "Спина", time: "33.2 с", date: "15.04.26" },
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
    <div className="p-4 md:p-8 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dim text-xs mb-1">Личный кабинет</p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold">Профиль</h1>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            editMode ? "bg-aqua text-background" : "bg-secondary text-muted-foreground"
          }`}
        >
          <Icon name={editMode ? "Check" : "Pencil"} size={15} />
          <span className="hidden sm:inline">{editMode ? "Сохранить" : "Редактировать"}</span>
        </button>
      </div>

      {/* Avatar + info card */}
      <div className="card-base p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-aqua/10 border-2 border-aqua/30 flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-aqua">{initials}</span>
            </div>
            {editMode && (
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-aqua flex items-center justify-center">
                <Icon name="Camera" size={11} className="text-background" />
              </button>
            )}
          </div>
          <div>
            <p className="font-display text-base font-semibold">{athleteProfile.name}</p>
            <p className="text-dim text-sm">{role === "athlete" ? "Спортсмен" : role === "coach" ? "Тренер" : "Администратор"}</p>
            <p className="text-xs text-dim mt-0.5">В клубе с {athleteProfile.since}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 pt-3 border-t border-border">
          {[
            { icon: "Mail", value: athleteProfile.email },
            { icon: "Phone", value: athleteProfile.phone },
            { icon: "Calendar", value: athleteProfile.dob },
            ...(role === "athlete" ? [
              { icon: "Users", value: athleteProfile.group },
              { icon: "UserCheck", value: `Тренер: ${athleteProfile.coach}` },
            ] : []),
          ].map((item) => (
            <div key={item.value} className="flex items-center gap-2 text-sm">
              <Icon name={item.icon} size={14} className="text-dim shrink-0" />
              <span className="text-dim text-xs truncate">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card">
          <Icon name="Waves" size={16} className="text-aqua" />
          <p className="font-display text-xl font-semibold mt-2">
            {(athleteProfile.totalMeters / 1000).toFixed(0)}к
          </p>
          <p className="text-dim text-xs">Метров</p>
        </div>
        <div className="stat-card">
          <Icon name="CalendarCheck" size={16} className="text-emerald-400" />
          <p className="font-display text-xl font-semibold mt-2">{athleteProfile.totalSessions}</p>
          <p className="text-dim text-xs">Тренировок</p>
        </div>
        <div className="stat-card">
          <Icon name="Award" size={16} className="text-amber-400" />
          <p className="font-display text-xl font-semibold mt-2 truncate">{athleteProfile.bestStyle}</p>
          <p className="text-dim text-xs">Стиль</p>
        </div>
      </div>

      {/* Progress chart */}
      <div className="card-base p-4">
        <p className="text-dim text-xs uppercase tracking-widest mb-3">Прогресс по месяцам</p>
        <div className="flex items-end gap-2 h-24">
          {monthHistory.map((m) => {
            const pct = (m.meters / maxH) * 100;
            const isCurrent = m.month === "Май";
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end" style={{ height: "72px" }}>
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
      <div className="card-base p-4">
        <p className="text-dim text-xs uppercase tracking-widest mb-3">Личные рекорды</p>
        <div className="grid grid-cols-2 gap-2">
          {personalBests.map((pb) => (
            <div key={pb.dist + pb.style} className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-aqua/10 flex items-center justify-center shrink-0">
                <Icon name="Timer" size={14} className="text-aqua" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-dim">{pb.dist} {pb.style}</p>
                <p className="font-display text-sm font-semibold">{pb.time}</p>
                <p className="text-xs text-dim">{pb.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
