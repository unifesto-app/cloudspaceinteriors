/* eslint-disable @next/next/no-img-element */
import type { Product } from "@/lib/db";
import { swatchFor } from "@/lib/site";
import AddToQuote from "./AddToQuote";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <AddToQuote id={p.id} name={p.name} image={p.image}>
      <div className="relative aspect-[4/3] bg-ivory-dim">
        {p.image && <img src={p.image} alt={p.name} loading="lazy" className="size-full object-cover" />}
        {/* finish chip clipped to the corner, like a sample tied to a board */}
        <span className={`${swatchFor(p.category)} absolute bottom-0 left-5 h-9 w-14 translate-y-1/2 rounded-[2px] shadow-[0_6px_12px_-4px_rgb(0_0_0/0.45)] ring-2 ring-ivory`} aria-hidden />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 pb-5 pt-7">
        <h3 className="font-display text-[1.65rem] leading-tight">{p.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-ink-soft">{p.description}</p>
      </div>
    </AddToQuote>
  );
}
