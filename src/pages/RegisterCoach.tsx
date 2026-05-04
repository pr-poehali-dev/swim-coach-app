import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

interface RegisterCoachProps {
  onBack: () => void;
  onComplete: () => void;
}

const CITIES = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
  "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону",
  "Уфа", "Красноярск", "Воронеж", "Пермь", "Волгоград",
];

const EXPERIENCE_OPTIONS = [
  "До 1 года", "1–3 года", "3–5 лет", "5–10 лет", "Более 10 лет",
];

const EDUCATION_OPTIONS = [
  { value: "sports", label: "Спортивное" },
  { value: "medical", label: "Медицинское" },
  { value: "other", label: "Другое" },
];

interface UploadedFile {
  name: string;
  size: number;
}

export default function RegisterCoach({ onBack, onComplete }: RegisterCoachProps) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [city, setCity] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [education, setEducation] = useState("");
  const [educationOther, setEducationOther] = useState("");
  const [certificates, setCertificates] = useState("");
  const [experience, setExperience] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.size <= 5 * 1024 * 1024);
    setUploadedFiles((prev) => [
      ...prev,
      ...valid.map((f) => ({ name: f.name, size: f.size })),
    ]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    return bytes < 1024 * 1024
      ? `${Math.round(bytes / 1024)} КБ`
      : `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
  };

  const isValid =
    name.trim() &&
    birthdate &&
    gender &&
    city.trim() &&
    education &&
    experience &&
    (education !== "other" || educationOther.trim());

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
        <p className="text-dim text-sm mt-1">Роль: <span className="text-emerald-400">Тренер</span></p>
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

      {/* Образование */}
      <div className="space-y-1.5">
        <label className="text-xs text-dim">Образование <span className="text-red-400">*</span></label>
        <select
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className={inputCls + " cursor-pointer"}
          style={{ colorScheme: "dark" }}
        >
          <option value="">Выберите тип образования</option>
          {EDUCATION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {education === "other" && (
          <input
            type="text"
            value={educationOther}
            onChange={(e) => setEducationOther(e.target.value)}
            placeholder="Уточните образование..."
            className={inputCls + " mt-2"}
          />
        )}
      </div>

      {/* Стаж */}
      <div className="space-y-1.5">
        <label className="text-xs text-dim">Стаж тренерской работы <span className="text-red-400">*</span></label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className={inputCls + " cursor-pointer"}
          style={{ colorScheme: "dark" }}
        >
          <option value="">Выберите стаж</option>
          {EXPERIENCE_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Сертификаты */}
      <div className="space-y-1.5">
        <label className="text-xs text-dim">Сертификаты и квалификации</label>
        <textarea
          value={certificates}
          onChange={(e) => setCertificates(e.target.value)}
          placeholder="Перечислите сертификаты или загрузите скан..."
          rows={3}
          className={inputCls + " resize-none"}
        />
        <div className="mt-2">
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border hover:border-aqua hover:text-aqua text-dim text-xs transition-colors"
          >
            <Icon name="Upload" size={13} />
            Загрузить файлы (PDF, JPG, PNG, до 5 МБ)
          </button>
          {uploadedFiles.length > 0 && (
            <div className="mt-2 space-y-1.5">
              {uploadedFiles.map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                  <Icon name="FileText" size={13} className="text-aqua shrink-0" />
                  <span className="text-xs flex-1 truncate">{f.name}</span>
                  <span className="text-xs text-dim shrink-0">{formatSize(f.size)}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-dim hover:text-red-400 transition-colors ml-1"
                  >
                    <Icon name="X" size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
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
