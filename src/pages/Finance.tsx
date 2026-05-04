import Icon from "@/components/ui/icon";

const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"];
const revenue = [142000, 158000, 171000, 165000, 186400, 0];
const expenses = [68000, 72000, 75000, 71000, 78000, 0];
const maxRev = 200000;

const transactions = [
  { id: 1, name: "Безлимит — Попов А.", type: "income", amount: 4900, date: "04.05", category: "Абонемент" },
  { id: 2, name: "10 занятий — Кузнецова М.", type: "income", amount: 2800, date: "03.05", category: "Абонемент" },
  { id: 3, name: "Аренда бассейна", type: "expense", amount: -38000, date: "01.05", category: "Аренда" },
  { id: 4, name: "20 занятий — Орлов Д.", type: "income", amount: 4200, date: "02.05", category: "Абонемент" },
  { id: 5, name: "Зарплата тренеров", type: "expense", amount: -32000, date: "01.05", category: "Зарплата" },
  { id: 6, name: "Безлимит — Федорова А.", type: "income", amount: 4900, date: "03.05", category: "Абонемент" },
];

const categoryExpenses = [
  { name: "Аренда", amount: 38000, pct: 49 },
  { name: "Зарплата", amount: 32000, pct: 41 },
  { name: "Инвентарь", amount: 8000, pct: 10 },
];

export default function Finance() {
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0));
  const profit = totalIncome - totalExpense;

  return (
    <div className="p-4 md:p-8 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dim text-xs mb-1">Управление</p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold">Финансы</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-secondary rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Download" size={14} />
            <span className="hidden sm:inline">Экспорт</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-secondary rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="FileText" size={14} />
            <span className="hidden sm:inline">Отчёт</span>
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-3">
        <div className="stat-card">
          <Icon name="TrendingUp" size={16} className="text-emerald-400" />
          <p className="font-display text-lg md:text-2xl font-semibold mt-2 text-emerald-400">
            {(totalIncome / 1000).toFixed(1)}к ₽
          </p>
          <p className="text-dim text-xs">Доходы (май)</p>
        </div>
        <div className="stat-card">
          <Icon name="TrendingDown" size={16} className="text-red-400" />
          <p className="font-display text-lg md:text-2xl font-semibold mt-2 text-red-400">
            {(totalExpense / 1000).toFixed(0)}к ₽
          </p>
          <p className="text-dim text-xs">Расходы (май)</p>
        </div>
        <div className="stat-card">
          <Icon name="DollarSign" size={16} className="text-aqua" />
          <p className="font-display text-lg md:text-2xl font-semibold mt-2 text-aqua">
            {(profit / 1000).toFixed(1)}к ₽
          </p>
          <p className="text-dim text-xs">Прибыль</p>
        </div>
        <div className="stat-card">
          <Icon name="ArrowUpRight" size={16} className="text-emerald-400" />
          <p className="font-display text-lg md:text-2xl font-semibold mt-2">+12.3%</p>
          <p className="text-dim text-xs">Рост</p>
        </div>
      </div>

      {/* Chart */}
      <div className="card-base p-4">
        <p className="text-dim text-xs uppercase tracking-widest mb-4">Доходы и расходы</p>
        <div className="flex items-end gap-2 md:gap-4 h-32">
          {months.map((m, i) => {
            const revPct = (revenue[i] / maxRev) * 100;
            const expPct = (expenses[i] / maxRev) * 100;
            const isCurrent = i === 4;
            return (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end gap-0.5" style={{ height: "100px" }}>
                  <div
                    className="flex-1 rounded-t transition-all duration-700"
                    style={{
                      height: revenue[i] ? `${revPct}%` : "0%",
                      background: isCurrent
                        ? "linear-gradient(180deg, hsl(199,89%,52%), hsl(199,60%,35%))"
                        : "hsl(var(--secondary))",
                    }}
                  />
                  <div
                    className="flex-1 rounded-t transition-all duration-700"
                    style={{
                      height: expenses[i] ? `${expPct}%` : "0%",
                      background: isCurrent ? "hsl(0,72%,51%,0.6)" : "hsl(var(--border))",
                    }}
                  />
                </div>
                <span className={`text-xs ${isCurrent ? "text-aqua font-medium" : "text-dim"}`}>{m}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 rounded bg-aqua" />
            <span className="text-xs text-dim">Доходы</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 rounded bg-red-400/60" />
            <span className="text-xs text-dim">Расходы</span>
          </div>
        </div>
      </div>

      {/* Expenses breakdown */}
      <div className="card-base p-4">
        <p className="text-dim text-xs uppercase tracking-widest mb-4">Структура расходов</p>
        <div className="space-y-4">
          {categoryExpenses.map((c) => (
            <div key={c.name} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>{c.name}</span>
                <span className="text-dim">{c.amount.toLocaleString("ru")} ₽</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="card-base p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-dim text-xs uppercase tracking-widest">Последние операции</p>
          <button className="text-xs text-aqua">Все →</button>
        </div>
        <div className="space-y-2">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${t.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                <Icon
                  name={t.type === "income" ? "ArrowDownLeft" : "ArrowUpRight"}
                  size={13}
                  className={t.type === "income" ? "text-emerald-400" : "text-red-400"}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{t.name}</p>
                <p className="text-xs text-dim">{t.category}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-semibold font-display ${t.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                  {t.type === "income" ? "+" : ""}{(Math.abs(t.amount) / 1000).toFixed(1)}к
                </p>
                <p className="text-xs text-dim">{t.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
