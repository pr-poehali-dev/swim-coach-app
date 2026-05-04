import { useState } from "react";
import Icon from "@/components/ui/icon";

interface RegisterAthleteProps {
  onBack: () => void;
  onComplete: () => void;
}

const CITIES = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
  "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону",
  "Уфа", "Красноярск", "Воронеж", "Пермь", "Волгоград",
];

export default function RegisterAthlete({ onBack, onComplete }: RegisterAthleteProps) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [city, setCity] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleCityChange = (val: string) => {
    setCity(val);
    if (val.length >= 1) {
      const filtered = CITIES.filter((c) =>
        c.toLowerCase().startsWith(val.toLowerCase())
      );
      setCitySuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (c: string) => {
    setCity(c);
    setShowSuggestions(false);
  };

  const isValid = name.trim() && birthdate && gender && city.trim();

  const inputCls =
    "w-full bg-card border border-border rounded-xl px-4 py-3 text-sm placeholder:text-dim focus:outline-none focus:border-aqua transition-colors";

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-dim text-xs hover:text-foreground transition-colors mb-4"
        >
          <Icon name="ChevronLeft" size={14} />
          Назад
        </button>
        <h1 className="font-display text-2xl md:text-3xl font-semibold">Расскажите о себе</h1>
        <p className="text-dim text-sm mt-1">Роль: <span className="text-aqua">Спортсмен</span></p>
      </div>

      {/* Имя */}
      <div className="space-y-1.5">
        <label className="text-xs text-dim">Как вас зовут <span className="text-red-400">*</span></label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя (фамилия и отчество — по желанию)"
          className={inputCls}
        />
      </div>

      {/* Дата рождения */}
      <div className="space-y-1.5">
        <label className="text-xs text-dim">Дата рождения <span className="text-red-400">*</span></label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className={inputCls}
          style={{ colorScheme: "dark" }}
        />
      </div>

      {/* Пол */}
      <div className="space-y-1.5">
        <label className="text-xs text-dim">Пол <span className="text-red-400">*</span></label>
        <div className="flex gap-3">
          {[
            { id: "male", label: "Мужской" },
            { id: "female", label: "Женский" },
          ].map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGender(g.id as "male" | "female")}
              className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                gender === g.id
                  ? "border-aqua bg-aqua/5 text-aqua"
                  : "border-border bg-card text-dim hover:bg-secondary"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Город */}
      <div className="space-y-1.5 relative">
        <label className="text-xs text-dim">Город проживания <span className="text-red-400">*</span></label>
        <input
          type="text"
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          onFocus={() => city && setShowSuggestions(citySuggestions.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Начните вводить город..."
          className={inputCls}
        />
        {showSuggestions && (
          <div className="absolute z-10 left-0 right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            {citySuggestions.map((c) => (
              <button
                key={c}
                type="button"
                onMouseDown={() => selectCity(c)}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onComplete}
        disabled={!isValid}
        className="w-full py-3 bg-aqua text-background rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Завершить регистрацию
      </button>
    </div>
  );
}
