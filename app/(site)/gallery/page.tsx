/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { getGallery } from "@/lib/data";
import { GALLERY_GROUPS } from "@/lib/db";

export const metadata: Metadata = {
  title: "Design gallery",
  description: "Modular kitchens, TV units, wardrobes, false ceilings, main doors, wall designs, office and commercial interiors by Cloud Space Interiors.",
};

export default async function GalleryPage() {
  const folders = (await getGallery()).filter((f) => f.photos.length);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <h1 className="max-w-3xl font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02]">Design gallery</h1>
      <p className="mt-5 max-w-xl text-lg text-moss">Browse our work by category, from modular kitchens to false ceilings and office spaces.</p>

      {GALLERY_GROUPS.map((g) => {
        const list = folders.filter((f) => f.grp === g);
        if (!list.length) return null;
        return (
          <section key={g} className="pt-16">
            <h2 className="font-display text-4xl">{g}</h2>
            <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((f) => (
                <li key={f.id}>
                  <Link href={`/gallery/${f.slug}`} className="group block">
                    <div className="print relative">
                      <span className="pin -top-1.5 left-1/2 -translate-x-1/2" aria-hidden />
                      <img src={f.photos[0].image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    </div>
                    <div className="tag relative -mt-5 ml-5 mr-8 px-4 py-3">
                      <h3 className="font-display text-xl leading-tight">{f.name}</h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        {f.photos.length} design{f.photos.length === 1 ? "" : "s"}
                        {f.description && <> · {f.description}</>}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {!folders.length && <p className="mt-16 text-moss">Photos are being added. Meanwhile, see our <Link href="/work" className="text-brass-hi underline">projects</Link>.</p>}
    </div>
  );
}
