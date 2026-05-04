import { useState } from "react";
import Icon from "@/components/ui/icon";

const groups = [
  {
    id: 1,
    name: "Группа А — Взрослые",
    coach: "Иванов А.В.",
    level: "Средний",
    count: 12,
    maxCount: 14,
    schedule: ["Пн 09:00", "Ср 09:00", "Пт 09:00"],
    attendance: 91,
    weekLoad: 7200,
    color: "border-sky-500",
  },
  {
    id: 2,
    name: "Группа Б — Дети",
    coach: "Петрова М.С.",
    level: "Начинающий",
    count: 9,
    maxCount: 12,
    schedule: ["Вт 15:00", "Чт 15:00", "Сб 10:00"],
    attendance: 78,
    weekLoad: 3400,
    color: "border-emerald-500",
  },
  {
    id: 3,
    name: "Продвинутые",
    coach: "Иванов А.В.",
    level: "Продвинутый",
    count: 6,
    maxCount: 8,
    schedule: ["Пн 18:00", "Ср 18:00", "Пт 18:00", "Сб 08:00"],
    attendance: 100,
    weekLoad: 18000,
    color: "border-violet-500",
  },
  {
    id: 4,
    name: "Начинающие",
    coach: "Сидоров Е.Г.",
    level: "Начинающий",
    count: 7,
    maxCount: 10,
    schedule: ["Вт 18:00", "Чт 18:00"],
    attendance: 71,
    weekLoad: 2800,
    color: "border-amber-500",
  },
];

const athletes = [
  { id: 1, name: "Попов Алексей", group: 1, visits: 18, weekMeters: 21400, style: "Кроль" },
  { id: 2, name: "Кузнецова Мария", group: 1, visits: 14, weekMeters: 15600, style: "Брасс" },
  { id: 3, name: "Орлов Дмитрий", group: 3, visits: 22, weekMeters: 28000, style: "Кроль" },
  { id: 4, name: "Смирнова Елена", group: 2, visits: 10, weekMeters: 8200, style: "Спина" },
  { id: 5, name: "Васильев Игорь", group: 4, visits: 6, weekMeters: 4800, style: "Брасс" },
  { id: 6, name: "Федорова Анна", group: 3, visits: 20, weekMeters: 24500, style: "Баттерфляй" },
];

const levelColors: Record<string, string> = {
  "Начинающий": "text-emerald-400 bg-emerald-500/10",
  "Средний": "text-sky-400 bg-sky-500/10",
  "Продвинутый": "text-violet-400 bg-violet-500/10",
};

export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(1);

  const groupAthletes = athletes.filter((a) => a.group === selectedGroup);
  const group = groups.find((g) => g.id === selectedGroup);

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dim text-sm mb-1">Управление</p>
          <h1 className="font-display text-3xl font-semibold">Группы</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-aqua text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Icon name="Plus" size={16} />
          Создать группу
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGroup(g.id)}
            className={`card-base p-5 text-left border-l-2 ${g.color} transition-all hover:bg-secondary ${selectedGroup === g.id ? "ring-1 ring-aqua/30" : ""}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-sm">{g.name}</p>
                <p className="text-dim text-xs mt-0.5">{g.coach}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-md font-medium ${levelColors[g.level]}`}>
                {g.level}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-dim mb-3">
              <span className="flex items-center gap-1">
                <Icon name="Users" size={12} />
                {g.count}/{g.maxCount}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Activity" size={12} />
                {g.attendance}% посещ.
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Waves" size={12} />
                {(g.weekLoad / 1000).toFixed(1)}к м/нед
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(g.count / g.maxCount) * 100}%` }} />
            </div>
          </button>
        ))}
      </div>

      {selectedGroup && group && (
        <div className="grid grid-cols-3 gap-6 animate-fade-in">
          {/* Group info */}
          <div className="card-base p-6 space-y-4">
            <p className="text-dim text-xs uppercase tracking-widest">О группе</p>
            <div>
              <p className="font-display text-lg font-semibold">{group.name}</p>
              <p className="text-dim text-sm mt-0.5">{group.coach}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-dim uppercase tracking-widest">Расписание</p>
              {group.schedule.map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <Icon name="Clock" size={14} className="text-aqua" />
                  {s}
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-2 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-dim">Посещаемость</span>
                <span className="font-medium text-emerald-400">{group.attendance}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dim">Нагрузка/нед</span>
                <span className="font-medium text-aqua">{(group.weekLoad / 1000).toFixed(1)}к м</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dim">Наполнение</span>
                <span className="font-medium">{group.count}/{group.maxCount}</span>
              </div>
            </div>
          </div>

          {/* Athletes */}
          <div className="col-span-2 card-base p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-dim text-xs uppercase tracking-widest">Спортсмены группы</p>
              <button className="flex items-center gap-1 text-xs text-aqua hover:opacity-80 transition-opacity">
                <Icon name="UserPlus" size={14} />
                Добавить
              </button>
            </div>
            <div className="space-y-2">
              {groupAthletes.length === 0 && (
                <div className="text-center py-8 text-dim text-sm">Спортсменов нет</div>
              )}
              {groupAthletes.map((a, idx) => (
                <div key={a.id} className="flex items-center gap-4 p-4 bg-secondary rounded-xl hover:bg-muted transition-colors">
                  <span className="text-dim text-xs w-4">{idx + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center shrink-0">
                    <span className="font-display text-sm font-semibold text-aqua">
                      {a.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.name}</p>
                    <p className="text-xs text-dim">{a.style}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium font-display text-aqua">
                      {(a.weekMeters / 1000).toFixed(1)}к м
                    </p>
                    <p className="text-xs text-dim">{a.visits} посещ.</p>
                  </div>
                  <button className="text-dim hover:text-foreground transition-colors">
                    <Icon name="ChevronRight" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
