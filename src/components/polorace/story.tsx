import { Brain, Camera, Handshake, MessagesSquare, Play, Sparkles } from "lucide-react";
import { steps, why } from "@/lib/polorace/content";

const HERO_POLAS = [
  { src: "/polorace/team-right.jpg", tilt: "pola-l" },
  { src: "/polorace/team-camera.jpg", tilt: "pola-c" },
  { src: "/polorace/team-left.jpg", tilt: "pola-r" },
] as const;

function GroupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="6" r="2.15" />
      <circle cx="5.5" cy="7.3" r="1.65" />
      <circle cx="18.5" cy="7.3" r="1.65" />
      <path d="M8.3 20v-1.1c0-2.05 1.65-3.5 3.7-3.5s3.7 1.45 3.7 3.5V20" />
      <path d="M2.8 20v-.5c0-1.55 1.05-2.7 2.5-3.05" />
      <path d="M21.2 20v-.5c0-1.55-1.05-2.7-2.5-3.05" />
    </svg>
  );
}

function BrainIdeas({ className }: { className?: string }) {
  return (
    <span className={`brain-ideas ${className ?? ""}`}>
      <Brain strokeWidth={1.8} />
      <svg className="flying-ideas" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="7" cy="8" r="1.5" fill="currentColor" />
        <circle cx="13" cy="3.2" r="1.15" fill="currentColor" />
        <path d="M17 7.2 18.6 4.6M18 10.4l2.6-.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <div className="hero-polas" aria-hidden="true">
          <span className="pola-wire" />
          {HERO_POLAS.map((shot) => (
            <div key={shot.src} className={`pola-hang ${shot.tilt}`}>
              <span className="pola-string" />
              <figure className="pola">
                <img src={shot.src} alt="" width={320} height={400} />
              </figure>
            </div>
          ))}
        </div>
        <h1 className="hero-title">
          <span>המשחק</span>
          <span>שיגבש</span>
          <span>כל צוות!</span>
        </h1>
        <p className="hero-sub">
          משחק קבוצתי עם מצלמות פולורואיד שיגרום לכל צוות לשתף פעולה בעולם האמיתי
        </p>
        <div className="hero-actions">
          <a
            href="https://youtu.be/mrfkDl6OaKE?si=pMLi7SrTf9X1HPmB"
            className="btn-glass"
            target="_blank"
            rel="noreferrer"
          >
            סרטון הסבר
            <Play aria-hidden="true" className="play-tri" />
          </a>
          <a href="#calc" className="btn-cta">
            קבלו הצעת מחיר
          </a>
        </div>
      </div>
    </section>
  );
}

export function Problem() {
  return (
    <section className="band px-4">
      <div className="mx-auto max-w-5xl text-center">
        <img
          src="/polorace/disconnected.jpg"
          alt="אנשים שעומדים יחד, כל אחד עסוק בעצמו"
          width={1792}
          height={1008}
          className="team-photo"
        />
        <h2 className="section-title">קבוצה של יחידים היא לא צוות</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-white/75">
          כשכל אחד תקוע במסך שלו קל לשכוח את המטרה המשותפת. תן לצוות שלך את ההזדמנות להתגבש בעולם
          האמיתי.
        </p>
        <a href="#calc" className="btn-cta mt-8">
          קבלו הצעת מחיר
        </a>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section id="why" className="band scroll-mt-24 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">למה דווקא PoloRace</h2>
        <ul className="why-grid mx-auto mt-6 max-w-5xl">
          {why.map((item, index) => {
            const Icon = [MessagesSquare, Sparkles, Handshake, Camera][
              index === 1 ? 0 : index > 2 ? index - 2 : 0
            ];
            return (
              <li key={item.title} className="plain-item">
                {index === 0 ? <GroupIcon className="why-icon" /> : null}
                {index === 2 ? <BrainIdeas className="why-icon" /> : null}
                {index !== 0 && index !== 2 && Icon ? <Icon aria-hidden="true" className="why-icon" /> : null}
                <h3 className="mt-3 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-2 text-base leading-7 text-white/75">{item.text}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 text-center">
          <a href="#calc" className="btn-cta">
            קבלו הצעת מחיר
          </a>
        </div>
      </div>
    </section>
  );
}

export function How() {
  return (
    <section id="how" className="band scroll-mt-24 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">איך זה עובד</h2>
        <ol className="mx-auto mt-6 grid max-w-5xl lg:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="plain-item lg:px-4">
              <p className="text-5xl font-black text-[#edf7e9]">{step.n}</p>
              <h3 className="mt-2 text-3xl font-black text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-white/75">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <a href="#calc" className="btn-cta">
            קבלו הצעת מחיר
          </a>
        </div>
      </div>
    </section>
  );
}
