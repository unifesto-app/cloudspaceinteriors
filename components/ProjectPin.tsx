/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Project } from "@/lib/site";

// A pinned print with its spec tag (location, style, scope, handover) clipped underneath.
export default function ProjectPin({ p, className = "", large }: { p: Project; className?: string; large?: boolean }) {
  return (
    <Link href={`/work/${p.slug}`} className={`group block ${className}`}>
      <div className="print relative">
        <span className="pin -top-1.5 left-1/2 -translate-x-1/2" aria-hidden />
        <img src={p.images[0]} alt={`${p.title}, ${p.location}`} loading="lazy" className={`w-full object-cover ${large ? "aspect-[4/3]" : "aspect-[16/10]"}`} />
      </div>
      {/* spec tag: the dense reverse of the photo */}
      <div className="tag relative -mt-6 ml-6 mr-10 px-5 py-4 text-sm">
        <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
        <dt className="text-ink-soft">Where</dt><dd>{p.location}, Hyderabad</dd>
        <dt className="text-ink-soft">Style</dt><dd>{p.style}</dd>
        <dt className="text-ink-soft">Scope</dt><dd>{p.scope}</dd>
        </dl>
      </div>
    </Link>
  );
}
