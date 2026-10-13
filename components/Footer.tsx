import Link from "next/link";
import { site } from "@/lib/site";
import { waLink } from "@/lib/notify";

export const WaIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zM20.5 3.5C18.2 1.2 15.2 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.4z" />
  </svg>
);

export default function Footer() {
  const wa = waLink(`Hi ${site.name}, I'd like to discuss an interior project.`);
  return (
    <>
      <footer id="contact" className="mt-24 border-t border-ivory/10 bg-baize-deep/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="max-w-sm font-display text-4xl leading-tight text-ivory">Bring us your floor plan. We&rsquo;ll bring the finishes.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-plate">Get a quote</Link>
              <a href={wa} target="_blank" rel="noopener" className="btn-ghost">
                <WaIcon size={18} /> WhatsApp us
              </a>
            </div>
          </div>
          <address className="space-y-2 text-sm not-italic text-moss">
            <p className="mb-3 font-semibold text-ivory">Studio</p>
            <p className="max-w-xs leading-relaxed">{site.address}</p>
            <p>{site.hours}</p>
          </address>
          <div className="space-y-2 text-sm text-moss">
            <p className="mb-3 font-semibold text-ivory">Talk to us</p>
            <p><a href={`tel:+${site.whatsapp}`} className="tabular-nums hover:text-brass-hi">{site.phone}</a></p>
            {site.emails.map((e) => (
              <p key={e}><a href={`mailto:${e}`} className="hover:text-brass-hi">{e}</a></p>
            ))}
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-ivory/10 px-4 py-6 text-xs text-moss sm:px-6">
          <p>© {site.name}</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/about" className="hover:text-brass-hi">About</Link>
            <Link href="/gallery" className="hover:text-brass-hi">Gallery</Link>
            <Link href="/work" className="hover:text-brass-hi">Work</Link>
            <Link href="/services" className="hover:text-brass-hi">Services</Link>
            <Link href="/products" className="hover:text-brass-hi">Products</Link>
            <Link href="/how-we-work" className="hover:text-brass-hi">How we work</Link>
          </nav>
        </div>
      </footer>

      <a
        href={wa}
        target="_blank"
        rel="noopener"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-6px_rgb(0_0_0/0.6)] transition-transform duration-300 ease-settle hover:-translate-y-0.5"
      >
        <WaIcon size={28} />
      </a>
    </>
  );
}
