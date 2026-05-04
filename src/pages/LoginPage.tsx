import { useState } from "react";
import Icon from "@/components/ui/icon";
import RegisterAthlete from "@/pages/RegisterAthlete";
import RegisterCoach from "@/pages/RegisterCoach";
import type { UserData, AthleteData, CoachData, Role } from "@/types/user";

type Step = "role" | "auth" | "register-profile";
type AuthMode = "login" | "register";

interface LoginPageProps {
  onLogin: (data: UserData) => void;
}

const roles: { id: Role; label: string; desc: string; icon: string }[] = [
  { id: "athlete", label: "Спортсмен", desc: "Тренировки, прогресс, расписание", icon: "Waves" },
  { id: "coach", label: "Тренер", desc: "Группы, финансы, абонементы, статистика", icon: "UserCheck" },
];

const roleColors: Record<Role, string> = {
  athlete: "text-sky-400",
  coach: "text-emerald-400",
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<Role>("athlete");
  const [step, setStep] = useState<Step>("role");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const inputCls =
    "w-full bg-card border border-border rounded-xl px-4 py-3 text-sm placeholder:text-dim focus:outline-none focus:border-aqua transition-colors";

  const handleLoginSubmit = () => {
    onLogin({
      role: selectedRole,
      email,
      profile: {
        name: email.split("@")[0],
        birthdate: "",
        gender: "male",
        city: "",
      },
    });
  };

  const handleAthleteComplete = (data: AthleteData) => {
    onLogin({ role: "athlete", email, profile: data });
  };

  const handleCoachComplete = (data: CoachData) => {
    onLogin({ role: "coach", email, profile: data });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile logo */}
      <div className="md:hidden flex items-center gap-3 px-5 pt-8 pb-4">
        <div className="w-8 h-8 rounded-xl bg-aqua flex items-center justify-center">
          <span className="font-display font-bold text-background text-sm">AT</span>
        </div>
        <span className="font-display font-semibold text-lg tracking-wide">AquaTrack</span>
      </div>

      {/* Desktop left panel */}
      <div className="hidden md:flex flex-col justify-between w-96 bg-card border-r border-border p-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-aqua flex items-center justify-center">
            <span className="font-display font-bold text-background text-lg">AT</span>
          </div>
          <span className="font-display font-semibold text-xl tracking-wide">AquaTrack</span>
        </div>
        <div className="space-y-5">
          <div>
            <h2 className="font-display text-2xl font-semibold leading-tight">
              Платформа для частных<br />тренеров и спортсменов
            </h2>
            <p className="text-dim text-sm mt-3">Всё необходимое — в одном приложении.</p>
          </div>
          <div className="space-y-2.5">
            {[
              "Отслеживание метров и нагрузки",
              "Управление расписанием и бронированием",
              "Аналитика по стилям плавания",
              "Финансовые отчёты и абонементы",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-dim">
                <Icon name="Check" size={13} className="text-aqua shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-dim">© 2026 AquaTrack</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-start md:items-center justify-center px-5 py-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-md py-4 space-y-6">

          {/* Шаг 1: Выбор роли */}
          {step === "role" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-semibold">Войти в систему</h1>
                <p className="text-dim text-sm mt-1">Выберите свою роль</p>
              </div>
              <div className="space-y-2.5">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRole(r.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      selectedRole === r.id ? "border-aqua bg-aqua/5" : "border-border bg-card hover:bg-secondary"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      selectedRole === r.id ? "bg-aqua/10" : "bg-secondary"
                    }`}>
                      <Icon name={r.icon} size={20} fallback="Circle" className={selectedRole === r.id ? "text-aqua" : "text-dim"} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{r.label}</p>
                      <p className="text-dim text-xs">{r.desc}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                      selectedRole === r.id ? "border-aqua bg-aqua" : "border-border"
                    }`} />
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setStep("auth"); setAuthMode("login"); }}
                className="w-full py-3 bg-aqua text-background rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Продолжить
              </button>
            </div>
          )}

          {/* Шаг 2: Вход / Регистрация */}
          {step === "auth" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <button onClick={() => setStep("role")}
                  className="flex items-center gap-1 text-dim text-xs hover:text-foreground transition-colors mb-4">
                  <Icon name="ChevronLeft" size={14} />
                  Назад
                </button>
                <h1 className="font-display text-2xl md:text-3xl font-semibold">
                  {authMode === "login" ? "Вход" : "Регистрация"}
                </h1>
                <p className="text-dim text-sm mt-1">
                  Роль: <span className={roleColors[selectedRole]}>{roles.find((r) => r.id === selectedRole)?.label}</span>
                </p>
              </div>

              <div className="flex bg-secondary rounded-xl p-1">
                {(["login", "register"] as AuthMode[]).map((m) => (
                  <button key={m} onClick={() => setAuthMode(m)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      authMode === m ? "bg-card text-foreground shadow-sm" : "text-dim hover:text-foreground"
                    }`}>
                    {m === "login" ? "Войти" : "Зарегистрироваться"}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-dim">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-dim">Пароль</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password}
                      onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                      className={inputCls + " pr-11"} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-foreground transition-colors">
                      <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
                    </button>
                  </div>
                </div>
                {authMode === "login" && (
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-dim cursor-pointer">
                      <input type="checkbox" className="accent-aqua" />
                      Запомнить меня
                    </label>
                    <button className="text-aqua hover:opacity-80">Забыли пароль?</button>
                  </div>
                )}
              </div>

              {authMode === "login" ? (
                <button onClick={handleLoginSubmit} disabled={!email || !password}
                  className="w-full py-3 bg-aqua text-background rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
                  Войти
                </button>
              ) : (
                <button onClick={() => setStep("register-profile")} disabled={!email || !password}
                  className="w-full py-3 bg-aqua text-background rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
                  Продолжить
                </button>
              )}
            </div>
          )}

          {/* Шаг 3: Профиль */}
          {step === "register-profile" && (
            selectedRole === "athlete" ? (
              <RegisterAthlete onBack={() => setStep("auth")} onComplete={handleAthleteComplete} />
            ) : (
              <RegisterCoach onBack={() => setStep("auth")} onComplete={handleCoachComplete} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
