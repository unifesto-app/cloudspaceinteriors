/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, testimonials } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title}, ${p.location}`, description: p.highlight, openGraph: { images: [p.images[0]] } } : {};
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const note = testimonials.find((t) => t.who.includes(p.location));
  const [cover, ...more] = p.images;

  return (
    <article className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <Link href="/work" className="text-sm text-moss hover:text-brass-hi">All work</Link>

      <div className="mt-6 grid gap-12 lg:grid-cols-12">
        <div className="print relative -rotate-[0.6deg] lg:col-span-8">
          <span className="pin -top-1.5 left-8" aria-hidden />
          <span className="pin -top-1.5 right-8" aria-hidden />
          <img src={cover} alt={`${p.title}, ${p.location}`} className="aspect-[4/3] w-full object-cover" fetchPriority="high" />
        </div>

        <div className="lg:col-span-4">
          <h1 className="font-display text-[clamp(2.4rem,4.4vw,3.8rem)] leading-[1.02]">{p.title}</h1>
          <p className="mt-4 text-lg text-moss">{p.highlight}</p>
          <dl className="tag mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 p-6 text-sm">
            <dt className="text-ink-soft">Where</dt><dd>{p.location}, Hyderabad</dd>
            <dt className="text-ink-soft">Style</dt><dd>{p.style}</dd>
            <dt className="text-ink-soft">Scope</dt><dd>{p.scope}</dd>
            {p.delivered && (<><dt className="text-ink-soft">Handover</dt><dd className="font-semibold tabular-nums">{p.delivered}</dd></>)}
          </dl>
          <Link href="/quote" className="btn-plate mt-8 w-full">Quote a space like this</Link>
        </div>
      </div>

      {more.length > 0 && (
        <div className="mt-20 grid items-start gap-10 sm:grid-cols-2">
          {more.map((src, i) => (
            <div key={src} className={`print relative ${i % 2 ? "rotate-[0.7deg] sm:mt-16" : "-rotate-[0.5deg]"}`}>
              <span className="pin -top-1.5 left-1/2 -translate-x-1/2" aria-hidden />
              <img src={src} alt={`${p.title}, view ${i + 2}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {note && (
        <figure className="tag relative mx-auto mt-20 max-w-2xl rotate-[0.6deg] p-8">
          <span className="pin -top-1.5 left-1/2 -translate-x-1/2" aria-hidden />
          <blockquote className="font-display text-2xl leading-snug">&ldquo;{note.quote}&rdquo;</blockquote>
          <figcaption className="mt-5 text-sm text-ink-soft">{note.who}</figcaption>
        </figure>
      )}
    </article>
  );
}
