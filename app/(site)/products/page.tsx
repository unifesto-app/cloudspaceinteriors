import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/data";
import { swatchFor } from "@/lib/site";

export const metadata: Metadata = { title: "Products", description: "Kitchens, wardrobes, TV walls, workstations and more. Add pieces to your quote list and get one quotation." };

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02]">The sample tray</h1>
          <p className="mt-5 max-w-xl text-lg text-moss">
            Pick the pieces you like and add them to your quote. We&rsquo;ll fit sizes, finishes and pricing to your space and send one clear quotation.
          </p>
        </div>
        {categories.length > 1 && (
          <nav className="flex flex-wrap content-end gap-4 lg:col-span-5" aria-label="Jump to a category">
            {categories.map((c) => (
              <a key={c} href={`#${encodeURIComponent(c)}`} className="group flex flex-col items-center gap-2 text-xs text-moss hover:text-brass-hi">
                <span className={`${swatchFor(c)} block h-12 w-16 rounded-[2px] shadow-[0_8px_14px_-6px_rgb(0_0_0/0.6)] ring-1 ring-black/20 transition-transform duration-300 ease-settle group-hover:-translate-y-1`} />
                {c}
              </a>
            ))}
          </nav>
        )}
      </div>

      <div className="mt-8 gap-10 sm:columns-2 lg:columns-3">
      {categories.map((c) => (
        <section key={c} id={encodeURIComponent(c)} className="scroll-mt-24 break-inside-avoid pt-12">
          <div className="flex items-center gap-4">
            <span className={`${swatchFor(c)} block h-8 w-11 rounded-[2px] ring-1 ring-black/20`} aria-hidden />
            <h2 className="font-display text-4xl">{c}</h2>
          </div>
          <div className="mt-6 grid gap-8">
            {products.filter((p) => p.category === c).map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      ))}
      </div>

      {!products.length && <p className="mt-16 text-moss">New pieces are on their way. Meanwhile, tell us what you need.</p>}

      <div className="tag relative mt-24 grid gap-6 p-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <span className="pin -top-1.5 left-8" aria-hidden />
        <div>
          <p className="font-display text-3xl">Don&rsquo;t see it on the tray?</p>
          <p className="mt-2 text-ink-soft">Everything we make is made to measure. Describe it and we&rsquo;ll design it.</p>
        </div>
        <Link href="/quote" className="btn-plate">Describe what you need</Link>
      </div>
    </div>
  );
}
