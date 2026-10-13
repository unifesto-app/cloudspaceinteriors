import type { Metadata } from "next";
import Link from "next/link";
import ProjectPin from "@/components/ProjectPin";
import { projects } from "@/lib/site";

export const metadata: Metadata = { title: "Work", description: "Homes, villas, offices and hotels finished by Cloud Space Interiors across Hyderabad." };

const layout = [
  ["lg:col-span-7", "-rotate-[0.8deg]", true],
  ["lg:col-span-5 lg:mt-32", "rotate-[1deg]", false],
  ["lg:col-span-5 lg:col-start-2", "rotate-[0.6deg]", false],
  ["lg:col-span-6 lg:mt-20", "-rotate-[0.9deg]", true],
] as const;

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <h1 className="max-w-3xl font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02]">Rooms we&rsquo;ve designed, built and handed over.</h1>
      <p className="mt-5 max-w-xl text-lg text-moss">Open a project to see more of it, and what went into it.</p>

      <div className="mt-16 grid gap-x-12 gap-y-20 lg:grid-cols-12">
        {projects.map((p, i) => {
          const [col, tilt, large] = layout[i % layout.length];
          return <ProjectPin key={p.slug} p={p} className={col} tilt={tilt} large={large} />;
        })}
      </div>

      <div className="mt-24 flex flex-wrap items-center gap-6">
        <p className="font-display text-3xl">Want a space like these?</p>
        <Link href="/quote" className="btn-plate">Get a quote</Link>
      </div>
    </div>
  );
}
