import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { db, type Quote, type QuoteItem } from "@/lib/db";
import { setQuoteStatus } from "./actions";

const STATUSES = ["new", "contacted", "won", "closed"];
const badge: Record<string, string> = { new: "bg-brass text-white", contacted: "bg-sky-100 text-sky-800", won: "bg-emerald-100 text-emerald-800", closed: "bg-stone-200 text-stone-600" };

async function Quotes() {
  await requireAdmin(); // reads cookies → request-time, never prerendered
  // ponytail: latest 200 only; add paging if the list ever outgrows that.
  const quotes = db.prepare("SELECT * FROM quotes ORDER BY id DESC LIMIT 200").all() as Quote[];
  if (!quotes.length) return <p className="text-ink-soft">No quote requests yet.</p>;

  return (
    <div className="grid gap-4">
      {quotes.map((q) => {
        const items = JSON.parse(q.items) as QuoteItem[];
        return (
          <article key={q.id} className="rounded-xl bg-white p-5 ring-1 ring-ink/10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold">#{q.id} · {q.name}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge[q.status] ?? ""}`}>{q.status}</span>
              <time className="ml-auto text-xs text-ink-soft">{q.created_at} UTC</time>
            </div>
            <p className="mt-2 flex flex-wrap gap-x-4 text-sm">
              <a href={`tel:${q.phone}`} className="text-baize underline">{q.phone}</a>
              <a href={`https://wa.me/${q.phone.replace(/\D/g, "").replace(/^(\d{10})$/, "91$1")}`} target="_blank" rel="noopener" className="text-baize underline">WhatsApp</a>
              {q.email && <a href={`mailto:${q.email}`} className="text-baize underline">{q.email}</a>}
              {q.city && <span className="text-ink-soft">{q.city}</span>}
              {q.service && <span className="text-ink-soft">{q.service}</span>}
            </p>
            {items.length > 0 && (
              <ul className="mt-3 text-sm">
                {items.map((i) => <li key={i.id}>• {i.name} × {i.qty}</li>)}
              </ul>
            )}
            {q.message && <p className="mt-3 whitespace-pre-wrap rounded-lg bg-ivory p-3 text-sm">{q.message}</p>}
            <form action={setQuoteStatus} className="mt-4 flex gap-2">
              <input type="hidden" name="id" value={q.id} />
              {STATUSES.filter((s) => s !== q.status).map((s) => (
                <button key={s} name="status" value={s} className="rounded-full border border-ink/15 px-3 py-1 text-xs hover:border-brass-lo">
                  Mark {s}
                </button>
              ))}
            </form>
          </article>
        );
      })}
    </div>
  );
}

export default function AdminHome() {
  return (
    <>
      <h1 className="mb-6 font-display text-4xl font-semibold">Quote requests</h1>
      <Suspense fallback={<p className="text-ink-soft">Loading…</p>}>
        <Quotes />
      </Suspense>
    </>
  );
}
