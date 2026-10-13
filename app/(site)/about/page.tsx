/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { about, aboutImage } from "@/lib/site";

export const metadata: Metadata = { title: "About us", description: about.intro[0] };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 className="font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02]">{about.title}</h1>
          {about.intro.map((p) => (
            <p key={p.slice(0, 20)} className="mt-6 max-w-[62ch] text-lg leading-relaxed text-moss">{p}</p>
          ))}
        </div>
        <div className="print relative lg:col-span-5 lg:col-start-8 lg:mt-6">
          <span className="pin -top-1.5 left-8" aria-hidden />
          <span className="pin -top-1.5 right-8" aria-hidden />
          <img src={aboutImage} alt="A Cloud Space Interiors living room" className="aspect-[4/5] w-full object-cover" />
        </div>
      </div>

      <section className="mt-24">
        <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05]">{about.whyTitle}</h2>
        <p className="mt-4 max-w-xl text-moss">{about.whyIntro}</p>
        <ul className="tag mt-10 grid divide-y divide-ink/10 sm:grid-cols-2 sm:divide-y-0">
          {about.why.map(([title, text], i) => (
            <li key={title} className={`p-7 ${i > 1 ? "sm:border-t sm:border-ink/10" : ""} ${i % 2 ? "sm:border-l sm:border-ink/10" : ""}`}>
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-20 flex flex-wrap items-center gap-6">
        <p className="font-display text-3xl">Let&rsquo;s design your dream space together.</p>
        <Link href="/quote" className="btn-plate">Get a quote</Link>
        <Link href="/how-we-work" className="btn-ghost">How we work</Link>
      </div>
    </div>
  );
}
