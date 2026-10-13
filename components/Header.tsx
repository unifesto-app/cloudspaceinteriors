"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { site } from "@/lib/site";

const nav = [
  ["About", "/about"],
  ["Gallery", "/gallery"],
  ["Work", "/work"],
  ["Services", "/services"],
  ["Products", "/products"],
  ["How we work", "/how-we-work"],
] as const;

export default function Header() {
  const { count } = useCart();
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-brass bg-ivory text-ink shadow-[0_6px_18px_-10px_rgb(0_0_0/0.5)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.logo} alt="" className="h-16 w-auto" />
        </Link>

        <nav
          id="site-nav"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col border-b-2 border-brass bg-ivory px-4 py-3 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-7 lg:gap-9 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {nav.map(([label, href]) => {
            const active = path === href || path.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`py-3 text-[15px] underline-offset-[6px] transition-colors md:py-1 ${active ? "font-semibold text-ink underline decoration-brass decoration-2" : "text-ink/75 hover:text-brass-lo"}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/quote" id="quote-tag" className="btn-plate relative px-5 py-3">
            Get a quote
            {count > 0 && (
              <span key={count} className="anim-tap grid min-w-6 place-items-center rounded-full bg-baize-deep px-1.5 py-0.5 text-[11px] font-bold text-brass-hi [text-shadow:none]">
                <span className="sr-only">Items in your quote list: </span>
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="grid size-11 place-items-center rounded-[3px] text-ink md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="site-nav"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
