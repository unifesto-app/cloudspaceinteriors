/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { businessServices, homeServices, type Service } from "@/lib/site";

export const metadata: Metadata = { title: "Services", description: "Residential, customised, office, commercial and hospitality interiors: design and build by one team." };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <h1 className="max-w-3xl font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02]">Design and build, from one quotation.</h1>
      <p className="mt-5 max-w-xl text-lg text-moss">
        Whether it&rsquo;s a 3BHK or a hotel lobby, the same team designs it, sources every finish, builds it and hands it over.
      </p>
      <nav className="mt-8 flex gap-3" aria-label="Jump to">
        <a href="#homes" className="btn-ghost">For homes</a>
        <a href="#businesses" className="btn-ghost">For businesses</a>
      </nav>

      <Group id="homes" title="For homes" items={homeServices} />
      <Group id="businesses" title="For businesses" items={businessServices} flip />

      <div className="mt-24 flex flex-wrap items-center gap-6">
        <p className="font-display text-3xl">Not sure which fits?</p>
        <Link href="/quote" className="btn-plate">Tell us about your space</Link>
      </div>
    </div>
  );
}

function Group({ id, title, items, flip }: { id: string; title: string; items: Service[]; flip?: boolean }) {
  return (
    <section id={id} className="scroll-mt-8 pt-24">
      <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05]">{title}</h2>
      <div className="mt-12 grid gap-16">
        {items.map((s, i) => {
          const right = flip ? i % 2 === 0 : i % 2 === 1;
          return (
            <article key={s.id} id={s.id} className="grid scroll-mt-8 items-center gap-8 md:grid-cols-12">
              <div className={`print relative md:col-span-7 ${right ? "md:order-2" : ""}`}>
                <span className="pin -top-1.5 left-1/2 -translate-x-1/2" aria-hidden />
                <img src={s.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              </div>
              <div className={`md:col-span-5 ${right ? "md:order-1" : ""}`}>
                <h3 className="font-display text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-moss">{s.text}</p>
                <Link href={`/quote`} className="mt-6 inline-block text-sm font-semibold text-brass-hi underline decoration-brass/60 underline-offset-4 hover:decoration-brass-hi">
                  Ask for a quote
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
