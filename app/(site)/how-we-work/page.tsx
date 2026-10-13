import type { Metadata } from "next";
import Link from "next/link";
import { promises, steps } from "@/lib/site";

export const metadata: Metadata = { title: "How we work", description: "Nine steps from the first conversation to handover and after-support." };

export default function HowWeWork() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 className="font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02]">A seamless journey from vision to reality.</h1>
          <p className="mt-5 max-w-lg text-lg text-moss">
            You see the design and choose every finish with us before work begins, with clear communication at every stage and support after completion.
          </p>
        </div>
        <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:mt-4">
          {promises.map(([title, text]) => (
            <li key={title} className="plate px-5 py-4">
              <p className="font-display text-xl leading-none">{title}</p>
              <p className="mt-1.5 text-sm">{text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* The process board: steps in order. */}
      <ol className="tag mt-20 divide-y divide-ink/10" aria-label="Our nine steps">
        {steps.map(([title, text], i) => {
          return (
            <li key={title} className="grid gap-x-8 gap-y-1 px-6 py-6 sm:grid-cols-[4rem_minmax(12rem,18rem)_1fr] sm:items-baseline">
              <span className="font-display text-3xl tabular-nums text-brass-lo" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <h2 className="text-lg font-semibold">
                {title}
              </h2>
              <p className="max-w-prose leading-relaxed text-ink-soft">{text}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-20 flex flex-wrap items-center gap-6">
        <p className="font-display text-3xl">Step one is a conversation.</p>
        <Link href="/quote" className="btn-plate">Book it</Link>
      </div>
    </div>
  );
}
