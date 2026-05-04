import { useState } from "react";
import Icon from "@/components/ui/icon";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

interface Training {
  id: number;
  day: number;
  time: string;
  title: string;
  coach: string;
  type: "swim" | "strength" | "rest";
  booked: boolean;
  slots: number;
  maxSlots: number;
}

const trainings: Training[] = [
  { id: 1, day: 5, time: "09:00", title: "Утренний кроль", coach: "Иванов А.В.", type: "swim", booked: true, slots: 7, maxSlots: 10 },
  { id: 2, day: 5, time: "18:00", title: "Интенсив", coach: "Петрова М.С.", type: "swim", booked: false, slots: 2, maxSlots: 8 },
  { id: 3, day: 6, time: "10:00", title: "Техника брасса", coach: "Иванов А.В.", type: "swim", booked: false, slots: 5, maxSlots: 10 },
  { id: 4, day: 7, time: "08:00", title: "Силовая", coach: "Сидоров Е.Г.", type: "strength", booked: true, slots: 8, maxSlots: 12 },
  { id: 5, day: 8, time: "07:30", title: "Ранняя тренировка", coach: "Иванов А.В.", type: "swim", booked: false, slots: 9, maxSlots: 10 },
  { id: 6, day: 9, time: "16:00", title: "Спринт", coach: "Петрова М.С.", type: "swim", booked: true, slots: 4, maxSlots: 6 },
  { id: 7, day: 12, time: "09:00", title: "Баттерфляй", coach: "Петрова М.С.", type: "swim", booked: false, slots: 6, maxSlots: 8 },
  { id: 8, day: 14, time: "18:30", title: "Вечерний интенсив", coach: "Иванов А.В.", type: "swim", booked: false, slots: 3, maxSlots: 10 },
];

const typeColors: Record<string, string> = {
  swim: "text-aqua",
  strength: "text-amber-400",
  rest: "text-muted-foreground",
};

const typeBg: Record<string, string> = {
  swim: "bg-sky-500/10 border-sky-500/20",
  strength: "bg-amber-500/10 border-amber-500/20",
  rest: "bg-secondary border-border",
};

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(5);
  const [bookedIds, setBookedIds] = useState<number[]>([1, 4, 6]);
  const year = 2026;
  const month = 4;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const dayTrainings = trainings.filter((t) => t.day === selectedDay);

  const toggleBook = (id: number) => {
    setBookedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dim text-sm mb-1">Планирование</p>
          <h1 className="font-display text-3xl font-semibold">Календарь тренировок</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-aqua text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Icon name="Plus" size={16} />
          Записаться
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="col-span-2 card-base p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="text-dim hover:text-foreground transition-colors">
              <Icon name="ChevronLeft" size={20} />
            </button>
            <h2 className="font-display text-xl font-semibold">{MONTHS[month]} {year}</h2>
            <button className="text-dim hover:text-foreground transition-colors">
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs text-dim py-1 font-medium">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: offset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const hasTraining = trainings.some((t) => t.day === day);
              const isSelected = selectedDay === day;
              const isToday = day === 4;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all
                    ${isSelected ? "bg-aqua text-background font-semibold" : ""}
                    ${isToday && !isSelected ? "border border-aqua text-aqua" : ""}
                    ${!isSelected && !isToday ? "hover:bg-secondary text-foreground" : ""}
                  `}
                >
                  {day}
                  {hasTraining && (
                    <span
                      className={`absolute bottom-1.5 w-1 h-1 rounded-full ${isSelected ? "bg-background" : "bg-aqua"}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day panel */}
        <div className="card-base p-6">
          <p className="text-dim text-xs uppercase tracking-widest mb-4">
            {selectedDay ? `${selectedDay} ${MONTHS[month]}` : "Выберите день"}
          </p>
          <div className="space-y-3">
            {dayTrainings.length === 0 && (
              <div className="text-center py-8">
                <Icon name="CalendarX" size={32} className="text-dim mx-auto mb-2" />
                <p className="text-dim text-sm">Тренировок нет</p>
              </div>
            )}
            {dayTrainings.map((t) => {
              const isBooked = bookedIds.includes(t.id);
              return (
                <div
                  key={t.id}
                  className={`p-4 rounded-xl border ${typeBg[t.type]}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-display font-semibold text-sm ${typeColors[t.type]}`}>{t.time}</span>
                    <span className="text-xs text-dim">{t.slots}/{t.maxSlots}</span>
                  </div>
                  <p className="text-sm font-medium mb-0.5">{t.title}</p>
                  <p className="text-xs text-dim mb-3">{t.coach}</p>
                  <button
                    onClick={() => toggleBook(t.id)}
                    className={`w-full py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isBooked
                        ? "bg-secondary text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        : "bg-aqua text-background hover:opacity-90"
                    }`}
                  >
                    {isBooked ? "Отменить запись" : "Записаться"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Week view */}
      <div className="card-base p-6">
        <p className="text-dim text-xs uppercase tracking-widest mb-4">Мои записи на неделю</p>
        <div className="grid grid-cols-7 gap-3">
          {DAYS.map((d, idx) => {
            const day = idx + 5;
            const dayTs = trainings.filter((t) => t.day === day && bookedIds.includes(t.id));
            return (
              <div key={d} className="space-y-2">
                <div className="text-center">
                  <p className="text-xs text-dim">{d}</p>
                  <p className={`text-sm font-medium ${day === 4 ? "text-aqua" : ""}`}>{day}</p>
                </div>
                {dayTs.map((t) => (
                  <div key={t.id} className="p-2 bg-sky-500/10 rounded-lg border border-sky-500/20">
                    <p className="text-xs text-aqua font-medium">{t.time}</p>
                    <p className="text-xs text-dim leading-tight mt-0.5">{t.title}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
