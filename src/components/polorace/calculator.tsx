import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { prices } from "@/lib/polorace/content";
import { formatIls, quoteFrom, type ClientType, type FrameCount, type Quote } from "@/lib/polorace/calc";

type Draft = {
  participants: number;
  clientType: ClientType;
  frames: FrameCount;
  english: boolean;
  orgQuestions: boolean;
  chaser: boolean;
  album: boolean;
  highlight: boolean;
  km: number;
  location: string;
  clientName: string;
  eventDate: string;
  logo: string;
};

const initial: Draft = {
  participants: prices.minParticipants,
  clientType: "direct",
  frames: 10,
  english: false,
  orgQuestions: false,
  chaser: false,
  album: false,
  highlight: false,
  km: 0,
  location: "",
  clientName: "",
  eventDate: "",
  logo: "",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "\u0026amp;";
      case "<":
        return "\u0026lt;";
      case ">":
        return "\u0026gt;";
      case '"':
        return "\u0026quot;";
      default:
        return "\u0026#39;";
    }
  });
}

const PARTICIPANT_MAX = 300;
const PARTICIPANT_STEP = 5;

function snapParticipants(value: number): number {
  if (!Number.isFinite(value)) return prices.minParticipants;
  const clamped = Math.min(PARTICIPANT_MAX, Math.max(prices.minParticipants, value));
  const steps = Math.round((clamped - prices.minParticipants) / PARTICIPANT_STEP);
  return prices.minParticipants + steps * PARTICIPANT_STEP;
}

function useChase(target: number) {
  const [shown, setShown] = useState(target);
  const shownRef = useRef(target);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = shownRef.current;
    if (reduce || from === target) {
      shownRef.current = target;
      setShown(target);
      return;
    }
    const start = performance.now();
    const duration = 160;
    let raf = 0;
    let cancelled = false;
    const step = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      const next = t === 1 ? target : from + (target - from) * eased;
      shownRef.current = next;
      setShown(next);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return shown;
}

function AnimatedIls({ value }: { value: number }) {
  const n = useChase(value);
  return <span className="tabular-nums">{formatIls(n)}</span>;
}

function AnimatedInt({ value }: { value: number }) {
  const n = useChase(value);
  return <span className="tabular-nums">{Math.round(n).toLocaleString("he-IL")}</span>;
}

function clientLabel(type: ClientType) {
  return type === "direct" ? "לקוח ישיר" : "מפיק / סוכן";
}

function quoteHtml(draft: Draft, quote: Quote) {
  const rows = [
    ["סוג לקוח", clientLabel(draft.clientType)],
    ["פורמט", draft.frames === 10 ? "10 פריימים" : "8 פריימים"],
    ["משתתפים", String(quote.participants)],
    ["פעילות", formatIls(quote.activity)],
    ["נסיעות", formatIls(quote.travel)],
    ["לפני מע״מ", formatIls(quote.subtotal)],
    ["מע״מ 18%", formatIls(quote.vat)],
    ["סה״כ כולל מע״מ", formatIls(quote.total)],
    ["ממוצע למשתתף", formatIls(quote.average)],
    ["מקדמה 30%", formatIls(quote.deposit)],
    ["קבוצות", String(quote.groups)],
    ["מצלמות", String(quote.cameras)],
    ["תמונות", String(quote.photos)],
  ];
  const logo = draft.logo
    ? `<img src="${draft.logo}" alt="" style="height:64px;object-fit:contain" />`
    : "";
  return `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><title>הצעת מחיר PoloRace</title>
<style>body{font-family:Rubik,Arial,sans-serif;margin:40px;color:#16131c}h1{margin-bottom:0}table{width:100%;border-collapse:collapse;margin-top:24px}td{padding:10px 0;border-bottom:1px solid #eadfd2}td:last-child{text-align:left;font-weight:700}</style>
</head><body>${logo}<h1>הצעת מחיר PoloRace</h1><p>${escapeHtml(draft.clientName || "מקבל ההצעה")} · ${escapeHtml(draft.eventDate || "מועד ייקבע")}</p>
<p>מיקום: ${escapeHtml(draft.location || "ייקבע")} · יציאה מ${prices.departure}</p>
<table>${rows.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}</table>
<p>המחיר כולל מצלמות מקצועיות, 2 סטים פילמים לכל קבוצה (16 תמונות), הדרכה, לוח תיעוד ואטבים, וארגז חפצים למשימות.</p>
<p>ההצעה תקפה 5 ימי עסקים. 30% מקדמה בחתימה, יתרה ביום האירוע.</p>
</body></html>`;
}

export function Calculator() {
  const [draft, setDraft] = useState<Draft>(initial);
  const [peopleText, setPeopleText] = useState(String(initial.participants));
  const [exportOpen, setExportOpen] = useState(false);
  const quote = useMemo(() => quoteFrom(draft), [draft]);

  function patch(partial: Partial<Draft>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  function setPeople(value: number) {
    const snapped = snapParticipants(value);
    patch({ participants: snapped });
    setPeopleText(String(snapped));
  }

  function download() {
    const blob = new Blob([quoteHtml(draft, quote)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "polorace-quote.html";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section id="calc" className="band scroll-mt-24 px-4">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="no-print grid gap-4">
          <div className="pb-2">
            <h2 className="section-title mx-0 max-w-none text-start">בנו את ההצעה שלכם</h2>
            <p className="mt-3 max-w-xl leading-7 text-white/75">
              בחרו כמות משתתפים ותוספות, המחיר מתעדכן בזמן אמת.
            </p>
            <p className="mt-2 text-sm text-white/60">
              מינימום חיוב {prices.minParticipants} משתתפים · חלוקה לקבוצות של 5–7
            </p>
          </div>

          <div className="calc-block grid gap-3">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="participants" className="text-xl font-black text-white">
                כמות משתתפים
              </label>
              <span className="text-sm font-semibold text-white/70">הכניסו ידני</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="participants"
                type="range"
                min={prices.minParticipants}
                max={PARTICIPANT_MAX}
                step={PARTICIPANT_STEP}
                value={draft.participants}
                aria-valuemin={prices.minParticipants}
                aria-valuemax={PARTICIPANT_MAX}
                aria-valuenow={draft.participants}
                aria-label="גרירת כמות משתתפים"
                style={{ ["--fill" as string]: `${((draft.participants - prices.minParticipants) / (PARTICIPANT_MAX - prices.minParticipants)) * 100}%` }}
                onChange={(event) => setPeople(Number(event.target.value))}
                className="people-range"
              />
              <input
                type="number"
                min={prices.minParticipants}
                max={PARTICIPANT_MAX}
                step={PARTICIPANT_STEP}
                inputMode="numeric"
                aria-label="מספר משתתפים"
                value={peopleText}
                onChange={(event) => {
                  const raw = event.target.value;
                  setPeopleText(raw);
                  const next = Number(raw);
                  if (raw !== "" && Number.isFinite(next)) patch({ participants: snapParticipants(next) });
                }}
                onBlur={() => setPeople(Number(peopleText))}
                className="field people-count"
              />
            </div>
          </div>

          <div className="calc-block grid gap-2">
            <p className="text-sm font-bold text-white">תוספות</p>
            <Check
              checked={draft.english}
              onChange={(english) => patch({ english })}
              title="פעילות באנגלית"
              detail="+20% מעלות הפעילות"
            />
            <Check
              checked={draft.orgQuestions}
              onChange={(orgQuestions) => patch({ orgQuestions })}
              title="שאלות הבניה ארגונית"
              detail={`+${prices.orgPerPerson} ₪ למשתתף`}
            />
            <Check
              checked={draft.chaser}
              onChange={(chaser) => patch({ chaser })}
              title="צ'ייסר יצירתיות"
              detail={`+${prices.chaserPerPerson} ₪ למשתתף`}
            />
            <Check
              checked={draft.album}
              onChange={(album) => patch({ album })}
              title="אלבום תמונות מקצועיות"
              detail={`+${prices.album.toLocaleString("he-IL")} ₪`}
            />
            <Check
              checked={draft.highlight}
              onChange={(highlight) => patch({ highlight })}
              title="סרטון היילייטס"
              detail={`+${prices.highlight.toLocaleString("he-IL")} ₪`}
            />
          </div>

          <div className="calc-block grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-white">
              מיקום הפעילות
              <input
                type="text"
                value={draft.location}
                placeholder="לדוגמה: פארק הירקון"
                onChange={(event) => patch({ location: event.target.value })}
                className="field font-semibold"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-white">
              מרחק בק״מ מ{prices.departure}
              <input
                type="number"
                min={0}
                inputMode="decimal"
                value={draft.km}
                onChange={(event) => patch({ km: Number(event.target.value) })}
                className="field font-semibold"
              />
            </label>
          </div>

          <p className="calc-note">
            נסיעות מחושבות אוטומטית ×{prices.travelPerKm} ₪ לק״מ. נקודת יציאה: {prices.departure}.
          </p>
          <p className="calc-note">
            המחיר כולל מצלמות מקצועיות, 2 סטים פילמים לכל קבוצה (16 תמונות), הדרכה, לוח תיעוד ואטבים,
            וארגז חפצים למשימות.
          </p>
        </div>

        <aside className="price-panel h-fit p-6 lg:sticky lg:top-24" aria-live="polite">
          <p className="text-sm font-bold text-white/80">סיכום הצעת מחיר</p>
          <dl className="mt-5 space-y-2 text-sm text-white/80">
            <Row label={`פעילות PoloRace · ${quote.participants} משתתפים`} value={<AnimatedIls value={quote.activity} />} />
            <Row label="נסיעות" value={<AnimatedIls value={quote.travel} />} />
            <Row label="לפני מע״מ" value={<AnimatedIls value={quote.subtotal} />} />
            <Row label="מע״מ 18%" value={<AnimatedIls value={quote.vat} />} />
          </dl>
          <div className="mt-5 border-t border-white/15 pt-4">
            <p className="text-sm font-bold text-white/80">סה״כ כולל מע״מ</p>
            <p className="mt-1 text-5xl font-black tracking-tight text-white">
              <AnimatedIls value={quote.total} />
            </p>
          </div>
          <dl className="mt-5 space-y-2 text-sm text-white/80">
            <Row label="מחיר ממוצע למשתתף" value={<AnimatedIls value={quote.average} />} />
            <Row label="מקדמה לחתימת חוזה (30%)" value={<AnimatedIls value={quote.deposit} />} />
          </dl>
          <p className="mt-4 text-sm text-white/70">
            <AnimatedInt value={quote.groups} /> קבוצות · <AnimatedInt value={quote.cameras} /> מצלמות ·{" "}
            <AnimatedInt value={quote.photos} /> תמונות
          </p>
          <button type="button" className="btn-glow mt-5 w-full" onClick={() => setExportOpen(true)}>
            ייצוא מסמך הצעת מחיר
          </button>

          {exportOpen ? (
            <div className="no-print mt-5 grid gap-3 border-t border-white/15 pt-5">
              <label className="grid gap-2 text-sm font-bold text-white">
                הלוגו של החברה
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="field"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === "string") patch({ logo: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-white">
                שם מקבל ההצעה
                <input
                  type="text"
                  value={draft.clientName}
                  placeholder="שם החברה"
                  onChange={(event) => patch({ clientName: event.target.value })}
                  className="field"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-white">
                תאריך / מועד משוער
                <input
                  type="text"
                  value={draft.eventDate}
                  onChange={(event) => patch({ eventDate: event.target.value })}
                  className="field"
                />
              </label>
              <button type="button" className="btn-glass w-full" onClick={() => window.print()}>
                ייצוא / שמירה כ-PDF
              </button>
              <button type="button" className="btn-glow w-full" onClick={download}>
                הורדת קובץ HTML
              </button>
              <p className="text-xs text-white/60">בחלון ההדפסה בחרו שמירה כ-PDF.</p>
            </div>
          ) : null}
        </aside>
      </div>

      <article className="print-sheet mx-auto hidden max-w-3xl p-8">
        {draft.logo ? <img src={draft.logo} alt="" className="mb-4 h-16 object-contain" /> : null}
        <h2 className="text-3xl font-black">הצעת מחיר PoloRace</h2>
        <p className="mt-2">
          {draft.clientName || "מקבל ההצעה"} · {draft.eventDate || "מועד ייקבע"}
        </p>
        <p className="mt-1 text-sm">
          {clientLabel(draft.clientType)} · {draft.frames} פריימים · {quote.participants} משתתפים
        </p>
        <p className="mt-1 text-sm">
          מיקום: {draft.location || "ייקבע"} · יציאה מ{prices.departure} · {draft.km} ק״מ
        </p>
        <p className="mt-6 text-2xl font-black">{formatIls(quote.total)} כולל מע״מ</p>
        <p className="mt-2 text-sm">
          לפני מע״מ {formatIls(quote.subtotal)} · מע״מ {formatIls(quote.vat)} · מקדמה{" "}
          {formatIls(quote.deposit)}
        </p>
      </article>
    </section>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
      <dt className="text-white/75">{label}</dt>
      <dd className="font-bold text-white tabular-nums">{value}</dd>
    </div>
  );
}

function Toggle({
  pressed,
  onClick,
  label,
  detail,
}: {
  pressed: boolean;
  onClick: () => void;
  label: string;
  detail?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`w-full ${pressed ? "btn-glow" : "btn-glass"}`}
    >
      <span>
        {label}
        {detail ? <span className="mt-0.5 block text-xs font-semibold opacity-80">{detail}</span> : null}
      </span>
    </button>
  );
}

function Check({
  checked,
  onChange,
  title,
  detail,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  title: string;
  detail: string;
}) {
  return (
    <label
      className={`mt-2 flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 py-2 ${
        checked ? "border-[#ff8ac4]/70 bg-white/15" : "border-white/15 bg-white/5"
      }`}
    >
      <span>
        <span className="block text-sm font-bold text-white">{title}</span>
        <span className="text-xs text-white/65">{detail}</span>
      </span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}
