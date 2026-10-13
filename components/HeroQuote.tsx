"use client";
import { useActionState, useEffect } from "react";
import { submitQuote, type QuoteState } from "@/app/(site)/quote/actions";
import { useCart } from "@/lib/cart";

// The short form in the first viewport. Same server action as /quote, so it lands in admin + email + WhatsApp.
export default function HeroQuote() {
  const { lines, clear } = useCart();
  const [state, action, pending] = useActionState<QuoteState, FormData>(submitQuote, {});
  const v = state.values ?? {};

  useEffect(() => {
    if (state.ok) clear();
  }, [state.ok]); // eslint-disable-line react-hooks/exhaustive-deps

  if (state.ok) {
    return (
      <div className="tag p-6" role="status">
        <p className="font-display text-3xl">Thank you. We&rsquo;ll call you shortly.</p>
        {state.id && <p className="mt-2 text-sm text-ink-soft">Your request number is <strong className="tabular-nums">#{state.id}</strong>.</p>}
        {state.wa && (
          <a href={state.wa} target="_blank" rel="noopener" className="btn-plate mt-5">Send it on WhatsApp too</a>
        )}
      </div>
    );
  }

  return (
    <form action={action} className="tag grid gap-2.5 p-4 sm:p-5" aria-label="Start your quote">
      <fieldset className="grid grid-cols-2 gap-2">
        <legend className="mb-1.5 text-sm font-semibold">What are we designing?</legend>
        {[["Home interiors", "My home"], ["Business interiors", "My business"]].map(([value, label], i) => (
          <label key={value} className="cursor-pointer">
            <input type="radio" name="service" value={value} defaultChecked={v.service ? v.service === value : i === 0} className="peer sr-only" />
            <span className="block rounded-[3px] border border-ink/15 px-3 py-2 text-center text-sm transition-colors peer-checked:border-brass-lo peer-checked:bg-brass/15 peer-checked:font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-brass">
              {label}
            </span>
          </label>
        ))}
      </fieldset>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-xs font-semibold text-ink-soft">
          Your name
          <input name="name" required maxLength={100} autoComplete="name" defaultValue={v.name} className="field" />
        </label>
        <label className="grid gap-1 text-xs font-semibold text-ink-soft">
          Phone / WhatsApp
          <input name="phone" type="tel" required maxLength={20} autoComplete="tel" placeholder="+91" defaultValue={v.phone} className="field" />
        </label>
      </div>
      <input type="hidden" name="items" value={JSON.stringify(lines.map(({ id, qty }) => ({ id, qty })))} />
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state.error && <p role="alert" className="text-sm font-medium text-[#9b2c1f]">{state.error}</p>}
      <button disabled={pending} className="btn-plate mt-1 py-3">
        {pending ? "Sending…" : lines.length ? `Start my quote with ${lines.length} piece${lines.length > 1 ? "s" : ""}` : "Start my quote"}
      </button>
      <p className="text-xs text-ink-soft">No obligation. We&rsquo;ll call you to talk it through.</p>
    </form>
  );
}
