"use client";
import type { ReactNode } from "react";
import { useCart } from "@/lib/cart";

// Continuity: a thumbnail of the piece flies from its card into the header's quote plate,
// so the visitor sees where it went. Skipped under reduced motion (the plate still flashes).
function flyToQuote(from: Element | null) {
  const target = document.getElementById("quote-tag");
  if (!from || !target || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  if (!a.width || b.bottom < 0) return; // header scrolled away: nothing to fly to
  const size = 72;
  const ghost = from.cloneNode() as HTMLElement;
  Object.assign(ghost.style, {
    position: "fixed", left: `${a.left + a.width / 2 - size / 2}px`, top: `${a.top + a.height / 2 - size / 2}px`,
    width: `${size}px`, height: `${size}px`, objectFit: "cover", borderRadius: "3px", zIndex: "60", pointerEvents: "none",
    boxShadow: "0 0 0 3px #f3ead7, 0 18px 30px -10px rgb(0 0 0 / .6)",
  });
  document.body.append(ghost);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  ghost
    .animate(
      [
        { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx * 0.45}px, ${dy * 0.55 - 60}px) scale(0.8) rotate(-6deg)`, opacity: 1, offset: 0.45 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.22) rotate(-10deg)`, opacity: 0.2 },
      ],
      { duration: 640, easing: "cubic-bezier(0.55, 0, 0.35, 1)" },
    )
    .finished.finally(() => ghost.remove());
}

// Wraps a product so that choosing it lifts the whole piece off the board.
export default function AddToQuote({ id, name, image, children }: { id: number; name: string; image: string; children: ReactNode }) {
  const { lines, add: addLine, setQty, remove } = useCart();
  const qty = lines.find((l) => l.id === id)?.qty ?? 0;
  const add = (p: { id: number; name: string; image: string }, e?: React.MouseEvent) => {
    flyToQuote(e?.currentTarget.closest("article")?.querySelector("img") ?? null);
    addLine(p);
  };

  return (
    <article className={`tag relative flex flex-col overflow-hidden transition-[translate,box-shadow] duration-500 ease-settle ${qty ? "chosen" : ""}`}>
      {children}
      <div className="flex items-center justify-between gap-3 border-t border-ink/10 px-5 py-4">
        {qty ? (
          <>
            <div className="flex items-center gap-1" role="group" aria-label={`Quantity of ${name}`}>
              <button type="button" onClick={() => (qty > 1 ? setQty(id, qty - 1) : remove(id))} className="grid size-9 place-items-center rounded-[3px] border border-ink/15 hover:border-brass-lo" aria-label={qty > 1 ? "One fewer" : `Remove ${name}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden><path d="M2 7h10" /></svg>
              </button>
              <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">{qty}</span>
              <button type="button" onClick={(e) => add({ id, name, image }, e)} className="grid size-9 place-items-center rounded-[3px] border border-ink/15 hover:border-brass-lo" aria-label="One more">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden><path d="M2 7h10M7 2v10" /></svg>
              </button>
            </div>
            <span className="text-sm font-semibold text-brass-lo">On your quote</span>
          </>
        ) : (
          <button type="button" onClick={(e) => add({ id, name, image }, e)} className="btn-plate w-full py-3">
            Add to my quote
          </button>
        )}
      </div>
    </article>
  );
}
