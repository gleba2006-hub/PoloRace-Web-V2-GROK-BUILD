import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { gallery, videos } from "@/lib/polorace/content";

const PAGE = 3;

export function Stories() {
  const [open, setOpen] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const active = gallery.find((item) => item.src === open);

  return (
    <>
      <section id="stories" className="band scroll-mt-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title">לקוחות מספרים</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {videos.slice(0, shown).map((video) => (
              <li key={video.src}>
                <a
                  href={video.src}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block overflow-hidden rounded-3xl"
                >
                  <img
                    src={video.poster}
                    alt=""
                    width={360}
                    height={640}
                    loading="lazy"
                    className="aspect-3/4 w-full object-cover sm:aspect-4/5"
                  />
                  <span className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full bg-white/85 text-[#2a0614]">
                    <Play aria-hidden="true" className="size-6" />
                  </span>
                </a>
                <div className="mt-4 px-2 pb-2 text-center">
                  <p className="text-base font-black text-white">{video.name}</p>
                  <p className="mt-1 text-sm text-white/75">{video.role}</p>
                  <p className="text-sm text-white/60">{video.company}</p>
                </div>
              </li>
            ))}
          </ul>
          {shown < videos.length ? (
            <div className="mt-8 text-center">
              <button type="button" className="btn-glass" onClick={() => setShown((count) => count + PAGE)}>
                הצג עוד לקוחות
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section id="gallery" className="band scroll-mt-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title">רגעים אמיתיים</h2>
          <ul className="bento mt-8">
            {gallery.map((item) => (
              <li key={item.src}>
                <button type="button" className="polaroid-btn" onClick={() => setOpen(item.src)}>
                  <img src={item.src} alt={item.alt} width={480} height={600} loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="absolute top-4 left-4 inline-flex size-11 items-center justify-center rounded-full bg-white text-[#1a1220]"
            aria-label="סגירה"
            onClick={() => setOpen(null)}
          >
            <X aria-hidden="true" />
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[85vh] max-w-full bg-white object-contain p-3 pb-10"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
