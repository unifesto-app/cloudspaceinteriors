import type { Metadata } from "next";
import QuoteForm from "./QuoteForm";
import { WaIcon } from "@/components/Footer";
import { waLink } from "@/lib/notify";
import { homeServices, businessServices, site } from "@/lib/site";

export const metadata: Metadata = { title: "Get a quote", description: "Send us your quote list or describe your space. We\u2019ll call you to talk it through." };

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02]">Tell us about your space.</h1>
          <p className="mt-5 max-w-md text-lg text-moss">
            We&rsquo;ll call you to talk it through. You&rsquo;ll get a copy by email, and you can carry on the conversation on WhatsApp.
          </p>
          <div className="mt-10 space-y-3 text-sm text-moss">
            <p className="font-semibold text-ivory">Rather talk now?</p>
            <a href={`tel:+${site.whatsapp}`} className="block font-display text-3xl tabular-nums text-ivory hover:text-brass-hi">{site.phone}</a>
            <a href={waLink(`Hi ${site.name}, I'd like to discuss an interior project.`)} target="_blank" rel="noopener" className="btn-ghost mt-2">
              <WaIcon size={18} /> WhatsApp us
            </a>
            <p className="pt-4">{site.hours}</p>
            <p className="max-w-xs">{site.address}</p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <QuoteForm services={[...homeServices, ...businessServices].map((s) => s.title)} />
        </div>
      </div>
    </div>
  );
}
