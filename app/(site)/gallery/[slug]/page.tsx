/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGallery } from "@/lib/data";

export async function generateStaticParams() {
  return (await getGallery()).map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const f = (await getGallery()).find((x) => x.slug === slug);
  return f ? { title: `${f.name} designs`, description: f.description || `${f.name} designs by Cloud Space Interiors.` } : {};
}

export default async function FolderPage({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const f = (await getGallery()).find((x) => x.slug === slug);
  // Unknown folder → 404. An empty folder renders an empty state instead, so its page
  // can refresh in place when the studio uploads its first photos.
  if (!f) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
      <Link href="/gallery" className="text-sm text-moss hover:text-brass-hi">All categories</Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02]">{f.name} designs</h1>
          {f.description && <p className="mt-3 max-w-xl text-lg text-moss">{f.description}</p>}
        </div>
        <Link href="/quote" className="btn-plate">Get a quote for this</Link>
      </div>

      {!f.photos.length && <p className="mt-12 text-moss">Photos for this category are coming soon.</p>}

      {/* masonry: photos keep their own proportions */}
      <div className="mt-12 gap-8 sm:columns-2 lg:columns-3">
        {f.photos.map((p, i) => (
          <a key={p.id} href={p.image} target="_blank" rel="noopener" className={`print relative mb-8 block break-inside-avoid`}>
            <span className="pin -top-1.5 left-1/2 -translate-x-1/2" aria-hidden />
            <img src={p.image} alt={p.caption || `${f.name} design ${i + 1}`} loading={i < 3 ? "eager" : "lazy"} className="w-full" />
            <span className="sr-only">Open full size</span>
          </a>
        ))}
      </div>
    </div>
  );
}
