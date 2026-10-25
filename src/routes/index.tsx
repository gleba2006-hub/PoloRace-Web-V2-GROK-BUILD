import { createFileRoute } from "@tanstack/react-router";
import { Backdrop } from "@/components/polorace/backdrop";
import { Footer, Nav } from "@/components/polorace/chrome";
import { Calculator } from "@/components/polorace/calculator";
import { Faq } from "@/components/polorace/faq";
import { Stories } from "@/components/polorace/proof";
import { Hero, How, Problem, Why } from "@/components/polorace/story";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <Backdrop />
      <div className="app-layer">
        <div className="no-print">
          <Nav />
        </div>
        <main>
          <div className="no-print">
            <Hero />
            <Problem />
            <Why />
            <How />
            <Stories />
          </div>
          <Calculator />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  );
}
