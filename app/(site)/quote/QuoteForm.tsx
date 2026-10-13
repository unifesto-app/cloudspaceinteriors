"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { submitQuote, type QuoteState } from "./actions";

export default function QuoteForm({ services }: { services: string[] }) {
  const { lines, setQty, remove, clear } = useCart();
  const [state, action, pending] = useActionState<QuoteState, FormData>(submitQuote, {});

  const v = state.values ?? {};

  useEffect(() => {
    if (state.ok) clear();
  }, [state.ok]); // eslint-disable-line react-hooks/exhaustive-deps

  if (state.ok) {
    return (
      <div className="tag relative p-10" role="status">
        <span className="pin -top-1.5 left-10" aria-hidden />
        <p className="font-display text-4xl">Thank you. It&rsquo;s on our board.</p>
        <p className="mt-3 text-ink-soft">
          {state.id ? <>Your request number is <strong className="tabular-nums text-ink">#{state.id}</strong>. </> : null}
          We&rsquo;ll call you shortly.
        </p>
        {state.wa && (
          <a href={state.wa} target="_blank" rel="noopener" className="btn-plate mt-8">Send it on WhatsApp too</a>
        )}
        <p className="mt-6"><Link href="/work" className="text-sm font-semibold text-brass-lo underline underline-offset-4">Look through our work meanwhile</Link></p>
      </div>
    );
  }

  return (
    <form action={action} className="tag relative grid gap-8 p-6 sm:p-8">
      <span className="pin -top-1.5 left-10" aria-hidden />

      <section aria-labelledby="list-h">
        <h2 id="list-h" className="font-display text-2xl">Your quote list</h2>
        {lines.length ? (
          <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {lines.map((l) => (
              <li key={l.id} className="flex items-center gap-4 py-3">
                {l.image ? <img src={l.image} alt="" className="size-14 rounded-[2px] object-cover" /> : <div className="size-14 rounded-[2px] bg-ivory-dim" />}
                <span className="flex-1 text-sm font-medium">{l.name}</span>
                <input
                  type="number"
                  min={1}
                  max={999}
                  value={l.qty}
                  onChange={(e) => setQty(l.id, Number(e.target.value))}
                  aria-label={`Quantity of ${l.name}`}
                  className="field w-18 px-2 py-2 text-center tabular-nums"
                />
                <button type="button" onClick={() => remove(l.id)} className="text-xs font-semibold text-ink-soft underline-offset-4 hover:text-[#9b2c1f] hover:underline">
                  Remove<span className="sr-only"> {l.name}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-ink-soft">
            Nothing on it yet. <Link href="/products" className="font-semibold text-brass-lo underline underline-offset-4">Pick pieces from the sample tray</Link>, or just describe your project below.
          </p>
        )}
        <input type="hidden" name="items" value={JSON.stringify(lines.map(({ id, qty }) => ({ id, qty })))} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2" aria-label="Your details">
        <label className="grid gap-1.5 text-xs font-semibold text-ink-soft">
          Name (required)
          <input name="name" defaultValue={v.name} required maxLength={100} autoComplete="name" className="field" />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-ink-soft">
          Phone / WhatsApp (required)
          <input name="phone" defaultValue={v.phone} type="tel" required maxLength={20} autoComplete="tel" placeholder="+91" className="field" />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-ink-soft">
          Email, for your copy
          <input name="email" defaultValue={v.email} type="email" maxLength={150} autoComplete="email" className="field" />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-ink-soft">
          Area / city
          <input name="city" defaultValue={v.city} maxLength={100} placeholder="e.g. Kokapet" className="field" />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-ink-soft sm:col-span-2">
          What are we designing?
          <select name="service" className="field" defaultValue={v.service ?? ""}>
            <option value="">Choose one (optional)</option>
            {services.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-ink-soft sm:col-span-2">
          About your space
          <textarea name="message" defaultValue={v.message} rows={5} maxLength={2000} placeholder="e.g. 3BHK in Kokapet, possession in March, budget around ₹12 lakh" className="field" />
        </label>
        {/* Honeypot — hidden from people, filled by bots */}
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        {state.error && <p role="alert" className="text-sm font-medium text-[#9b2c1f] sm:col-span-2">{state.error}</p>}
        <button disabled={pending} className="btn-plate sm:col-span-2">
          {pending ? "Sending…" : "Send my quote request"}
        </button>
      </section>
    </form>
  );
}
