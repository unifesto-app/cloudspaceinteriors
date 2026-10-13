/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import HeroQuote from "@/components/HeroQuote";
import ProjectPin from "@/components/ProjectPin";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";
import { about, businessServices, heroImage, homeServices, projects, promises, swatchFor, testimonials } from "@/lib/site";

const tray = [
  ["Residential", "Homes"],
  ["Customized", "Custom pieces"],
  ["Office", "Offices"],
  ["Commercial", "Retail"],
  ["Hospitality", "Hotels"],
] as const;

export default async function Home() {
  const featured = (await getProducts()).filter((p) => p.featured).slice(0, 3);
  const [lead, ...rest] = projects;

  return (
    <>
      {/* ── The board ─────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-7xl gap-x-10 gap-y-8 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:pt-8">
        <figure className="relative self-start lg:col-span-7 lg:row-start-1 lg:mt-4">
          <div className="print anim-print relative">
            <span className="pin anim-pin -top-1.5 left-6" aria-hidden />
            <span className="pin anim-pin -top-1.5 right-6" aria-hidden />
            <img src={heroImage.src} alt="A Cloud Space kitchen with a marble island and brass-lit cabinetry" className="aspect-[3/2] w-full object-cover lg:aspect-[16/10]" fetchPriority="high" />
          </div>
          <figcaption className="tag anim-swing absolute -bottom-6 left-6 px-4 pb-1 pt-1.5 font-hand text-lg">{heroImage.caption}</figcaption>
        </figure>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <div className="tag relative px-5 pb-5 pt-6">
            <span className="pin -top-1.5 left-8" aria-hidden />
            <h1 className="font-display text-[clamp(1.9rem,2.9vw,2.6rem)] leading-[1.05] tracking-[-0.01em]">
              Designs that speak. Spaces that transform.
            </h1>
            <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-ink-soft">
              End-to-end interiors for homes and businesses across Hyderabad, designed, built and handed over by one team.
            </p>
          </div>

          {/* sample tray: each finish chip opens that part of the catalog */}
          <ul className="mt-5 grid max-w-sm grid-cols-5 gap-2" aria-label="Browse by space">
            {tray.map(([cat, label]) => (
              <li key={cat}>
                <Link href={`/products#${cat}`} className="group flex flex-col items-center gap-2 text-center text-[11px] leading-tight text-moss hover:text-brass-hi sm:text-xs">
                  <span className={`${swatchFor(cat)} block aspect-[4/3] w-full rounded-[2px] shadow-[0_8px_14px_-6px_rgb(0_0_0/0.6)] ring-1 ring-black/20 transition-transform duration-300 ease-settle group-hover:-translate-y-1`} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <HeroQuote />
          </div>
        </div>

        {/* promises engraved on brass, pinned under the print */}
        <ul className="grid grid-cols-2 gap-3 lg:col-span-7 lg:row-start-2 lg:mt-5">
          {promises.map(([title, text]) => (
            <li key={title} className="plate px-4 py-2.5 sm:px-5">
              <p className="font-display text-lg leading-none sm:text-xl">{title}</p>
              <p className="mt-1.5 text-[13px] leading-snug sm:text-sm">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <section className="border-y border-ivory/10 bg-baize-deep/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-12">
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05] lg:col-span-5">{about.title}</h2>
          <div className="lg:col-span-6 lg:col-start-7">
            {about.intro.map((p) => (
              <p key={p.slice(0, 20)} className="mb-5 max-w-[62ch] text-lg leading-relaxed text-moss">{p}</p>
            ))}
            <Link href="/about" className="btn-ghost mt-2">More about us</Link>
          </div>
        </div>
      </section>

      {/* ── Work ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05]">Rooms we&rsquo;ve finished, pinned to the board</h2>
          <Link href="/work" className="btn-ghost">See all work</Link>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-16 lg:grid-cols-12">
          <ProjectPin p={lead} className="lg:col-span-7" large />
          <div className="grid gap-16 lg:col-span-5 lg:pt-24">
            {rest.slice(0, 2).map((p) => (
              <ProjectPin key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Two doors ─────────────────────────────────────────── */}
      <section className="border-y border-ivory/10 bg-baize-deep/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12">
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05] lg:col-span-4">One team for your home or your business</h2>
          <Door title="For homes" href="/services#homes" items={homeServices} className="lg:col-span-5" />
          <Door title="For businesses" href="/services#businesses" items={businessServices} className="lg:col-span-3 lg:mt-20" />
        </div>
      </section>

      {/* ── Sample tray ───────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05]">Start with a piece you love</h2>
              <p className="mt-4 max-w-sm text-moss">
                Add kitchens, wardrobes or a TV wall to your quote. We tailor size and finish to your space.
              </p>
              <Link href="/products" className="btn-ghost mt-8">Open the full sample tray</Link>
            </div>
            <div className="grid items-start gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {featured.map((p, i) => (
                <div key={p.id} className={["", "lg:mt-12", "lg:mt-24"][i]}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Notes from clients ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05]">Notes clients left on the board</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          {testimonials.map((t, i) => (
            <figure
              key={t.who}
              className={`tag relative p-7 ${["md:col-span-5", "md:col-span-4 md:mt-16", "md:col-span-3 md:-mt-4"][i]}`}
            >
              <span className="pin -top-1.5 left-1/2 -translate-x-1/2" aria-hidden />
              <blockquote className="font-display text-xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm text-ink-soft">{t.who}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-14 text-moss">
          Curious what working with us looks like?{" "}
          <Link href="/how-we-work" className="text-brass-hi underline decoration-brass/60 underline-offset-4 hover:decoration-brass-hi">See the nine steps from first call to handover.</Link>
        </p>
      </section>
    </>
  );
}

function Door({ title, href, items, className }: { title: string; href: string; items: { id: string; title: string; text: string }[]; className: string }) {
  return (
    <Link href={href} className={`tag group relative block p-7 transition-transform duration-500 ease-settle hover:-translate-y-1 ${className}`}>
      <span className="pin -top-1.5 left-7" aria-hidden />
      <h3 className="font-display text-3xl">{title}</h3>
      <ul className="mt-5 divide-y divide-ink/10">
        {items.map((s) => (
          <li key={s.id} className="py-3">
            <p className="font-semibold">{s.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm font-semibold text-brass-lo group-hover:underline">See {title.toLowerCase().replace("for ", "")} services</p>
    </Link>
  );
}
