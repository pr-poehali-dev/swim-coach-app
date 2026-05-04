import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { UserData, CoachData } from "@/types/user";

type Role = "athlete" | "coach";

interface ProfileProps {
  role: Role;
  user: UserData;
}

const EDUCATION_LABELS: Record<string, string> = {
  sports: "Спортивное",
  medical: "Медицинское",
  other: "Другое",
};

const GENDER_LABELS: Record<string, string> = {
  male: "Мужской",
  female: "Женский",
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

const coachGroupStats = [
  { name: "Группа A (взрослые)", athletes: 12, sessions: 48 },
  { name: "Группа B (дети)", athletes: 9, sessions: 36 },
  { name: "Продвинутые", athletes: 6, sessions: 24 },
];

export default function Profile({ role, user }: ProfileProps) {
  const [editMode, setEditMode] = useState(false);
  const { profile, email } = user;
  const isCoach = role === "coach";
  const coachProfile = isCoach ? (profile as CoachData) : null;

  const initials = profile.name
    ? profile.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : email.slice(0, 2).toUpperCase();

  const formatDate = (d: string) => {
    if (!d) return "—";
    const [y, m, day] = d.split("-");
    return `${day}.${m}.${y}`;
  };

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
            <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
              isCoach ? "bg-emerald-400/10 border-emerald-400/30" : "bg-aqua/10 border-aqua/30"
            }`}>
              <span className={`font-display text-2xl font-bold ${isCoach ? "text-emerald-400" : "text-aqua"}`}>
                {initials}
              </span>
            </div>
            {editMode && (
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-aqua flex items-center justify-center">
                <Icon name="Camera" size={11} className="text-background" />
              </button>
            )}
          </div>
          <div>
            <p className="font-display text-base font-semibold">{profile.name || email}</p>
            <p className={`text-sm ${isCoach ? "text-emerald-400" : "text-sky-400"}`}>
              {isCoach ? "Тренер" : "Спортсмен"}
            </p>
            {profile.city && <p className="text-xs text-dim mt-0.5">{profile.city}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 pt-3 border-t border-border">
          {[
            { icon: "Mail", value: email },
            profile.birthdate && { icon: "Calendar", value: `Д.р.: ${formatDate(profile.birthdate)}` },
            profile.gender && { icon: "User", value: GENDER_LABELS[profile.gender] },
            profile.city && { icon: "MapPin", value: profile.city },
            isCoach && coachProfile?.education && {
              icon: "GraduationCap",
              value: `Образование: ${EDUCATION_LABELS[coachProfile.education] || coachProfile.educationOther || coachProfile.education}`,
            },
            isCoach && coachProfile?.experience && {
              icon: "Briefcase",
              value: `Стаж: ${coachProfile.experience}`,
            },
            isCoach && coachProfile?.certificates && {
              icon: "Award",
              value: coachProfile.certificates,
            },
          ]
            .filter(Boolean)
            .map((item) => (
              <div key={(item as { icon: string; value: string }).value} className="flex items-start gap-2 text-sm">
                <Icon name={(item as { icon: string; value: string }).icon} size={14} className="text-dim shrink-0 mt-0.5" />
                <span className="text-dim text-xs">{(item as { icon: string; value: string }).value}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Coach-specific: stats + настройка кабинета */}
      {isCoach && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="stat-card">
              <Icon name="Users" size={16} className="text-emerald-400" />
              <p className="font-display text-xl font-semibold mt-2">34</p>
              <p className="text-dim text-xs">Спортсменов</p>
            </div>
            <div className="stat-card">
              <Icon name="CalendarCheck" size={16} className="text-aqua" />
              <p className="font-display text-xl font-semibold mt-2">18</p>
              <p className="text-dim text-xs">Трен./нед.</p>
            </div>
            <div className="stat-card">
              <Icon name="Banknote" size={16} className="text-amber-400" />
              <p className="font-display text-xl font-semibold mt-2">₽186к</p>
              <p className="text-dim text-xs">Выручка</p>
            </div>
          </div>

          <div className="card-base p-4">
            <p className="text-dim text-xs uppercase tracking-widest mb-3">Мои группы</p>
            <div className="space-y-2">
              {coachGroupStats.map((g) => (
                <div key={g.name} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={14} className="text-emerald-400 shrink-0" />
                    <span className="text-sm">{g.name}</span>
                  </div>
                  <div className="flex gap-3 text-xs text-dim">
                    <span>{g.athletes} чел.</span>
                    <span>{g.sessions} тр.</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-base p-4">
            <p className="text-dim text-xs uppercase tracking-widest mb-3">Настройка кабинета</p>
            <div className="space-y-2">
              {[
                { icon: "Bell", label: "Уведомления об оплате", desc: "Получать алерты при просрочке" },
                { icon: "Calendar", label: "Онлайн-расписание", desc: "Публичная запись на тренировки" },
                { icon: "BarChart3", label: "Статистика для спортсменов", desc: "Показывать прогресс участникам" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name={s.icon} size={15} className="text-aqua shrink-0" />
                    <div>
                      <p className="text-sm">{s.label}</p>
                      <p className="text-xs text-dim">{s.desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 rounded-full bg-aqua/20 relative cursor-pointer hover:bg-aqua/30 transition-colors">
                    <div className="w-4 h-4 rounded-full bg-aqua absolute top-0.5 right-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Athlete-specific */}
      {!isCoach && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="stat-card">
              <Icon name="Waves" size={16} className="text-aqua" />
              <p className="font-display text-xl font-semibold mt-2">284к</p>
              <p className="text-dim text-xs">Метров</p>
            </div>
            <div className="stat-card">
              <Icon name="CalendarCheck" size={16} className="text-emerald-400" />
              <p className="font-display text-xl font-semibold mt-2">96</p>
              <p className="text-dim text-xs">Тренировок</p>
            </div>
            <div className="stat-card">
              <Icon name="Award" size={16} className="text-amber-400" />
              <p className="font-display text-xl font-semibold mt-2 truncate">Кроль</p>
              <p className="text-dim text-xs">Стиль</p>
            </div>
          </div>

          <div className="card-base p-4">
            <p className="text-dim text-xs uppercase tracking-widest mb-3">Прогресс по месяцам</p>
            <div className="flex items-end gap-2 h-24">
              {monthHistory.map((m) => {
                const pct = (m.meters / maxH) * 100;
                const isCurrent = m.month === "Май";
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end" style={{ height: "72px" }}>
                      <div className="w-full rounded-t transition-all duration-700" style={{
                        height: `${pct}%`,
                        background: isCurrent
                          ? "linear-gradient(180deg, hsl(199,89%,52%), hsl(199,60%,35%))"
                          : "hsl(var(--secondary))",
                      }} />
                    </div>
                    <span className={`text-xs ${isCurrent ? "text-aqua" : "text-dim"}`}>{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

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

          <div className="card-base p-4">
            <p className="text-dim text-xs uppercase tracking-widest mb-3">Настройка кабинета</p>
            <div className="space-y-2">
              {[
                { icon: "Bell", label: "Уведомления о тренировках", desc: "Напоминания за 1 час" },
                { icon: "Target", label: "Цели по метражу", desc: "Еженедельная цель: 20 000 м" },
                { icon: "Shield", label: "Приватность профиля", desc: "Видят только тренеры" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name={s.icon} size={15} className="text-aqua shrink-0" />
                    <div>
                      <p className="text-sm">{s.label}</p>
                      <p className="text-xs text-dim">{s.desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 rounded-full bg-aqua/20 relative cursor-pointer hover:bg-aqua/30 transition-colors">
                    <div className="w-4 h-4 rounded-full bg-aqua absolute top-0.5 right-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
