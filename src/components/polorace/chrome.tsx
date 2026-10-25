import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { links } from "@/lib/polorace/content";

const NAV = [
  { href: "#how", label: "איך זה עובד" },
  { href: "#why", label: "למה PoloRace" },
  { href: "#stories", label: "לקוחות מספרים" },
  { href: "#gallery", label: "גלריה" },
  { href: "#calc", label: "מחשבון" },
  { href: "#faq", label: "שאלות נפוצות" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="glass-nav">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a href="#top" className="text-xl font-black tracking-tight text-white">
          PoloRace
        </a>
        <nav className="hidden items-center gap-4 lg:flex" aria-label="ראשי">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-semibold text-white/90">
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-white/10 px-4 py-3 lg:hidden" aria-label="נייד">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex min-h-12 items-center text-base font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="no-print border-t border-white/15 px-4 pt-10 pb-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
        <p className="text-2xl font-black text-white">PoloRace · Breaking The Loop</p>
        <div className="social-row">
          <a href={links.instagram} target="_blank" rel="noreferrer" className="social-btn social-ig">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
            </svg>
            אינסטגרם
          </a>
          <a href={links.whatsapp} target="_blank" rel="noreferrer" className="social-btn social-wa">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12.1 3.2A8.3 8.3 0 0 0 5.2 16l-.9 3.3 3.4-.9a8.3 8.3 0 0 0 4.4 1.2 8.3 8.3 0 0 0 0-16.6Zm4.8 11.7c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.3-.5-2.3-1-3.8-3.3-3.9-3.5-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4.2.6.7 2 .7 2.1.1.2 0 .3-.1.5l-.3.4c-.1.1-.2.3-.1.5.1.2.6 1 1.3 1.6.9.8 1.6 1 1.8 1.2.2.1.4.1.5-.1l.4-.5c.1-.2.3-.1.5-.1l2 .9c.2.1.3.2.4.3.1.3 0 .8-.2 1.1Z"
              />
            </svg>
            וואטסאפ
          </a>
        </div>
        <p className="text-sm text-white/80">
          הכירו את היוצרים:{" "}
          <a href={links.pushers} target="_blank" rel="noreferrer" className="font-bold underline">
            פושרז גרופ הפקות בע״מ
          </a>
          {" · "}
          <a href={links.smirnov} target="_blank" rel="noreferrer" className="font-bold underline">
            גלב סמירנוב
          </a>
        </p>
        <p className="mx-auto max-w-2xl text-xs leading-6 text-white/70">
          כל הזכויות שמורות ליוצרי הפעילות: פושרז גרופ הפקות בע״מ × גלב סמירנוב. אין להשתמש ברעיון או
          בחלקו ללא אישור מפורש מיוצריו הישירים.
        </p>
      </div>
    </footer>
  );
}
