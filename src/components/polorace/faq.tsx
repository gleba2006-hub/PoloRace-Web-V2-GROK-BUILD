import { faq, links } from "@/lib/polorace/content";

export function Faq() {
  return (
    <section id="faq" className="band no-print scroll-mt-24 px-4">
      <div className="mx-auto max-w-3xl">
        <h2 className="section-title">שאלות נפוצות</h2>
        <div className="mt-8">
          {faq.map((item) => (
            <details key={item.q} className="faq-item group">
              <summary className="flex min-h-12 list-none items-center justify-between gap-4 text-base font-bold text-white">
                {item.q}
                <span aria-hidden="true" className="text-xl text-[#edf7e9] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-4 leading-7 text-white/75">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center">
          <a href={links.whatsapp} target="_blank" rel="noreferrer" className="btn-glow">
            לא מצאת תשובה? שאל את איתי
          </a>
        </p>
      </div>
    </section>
  );
}
