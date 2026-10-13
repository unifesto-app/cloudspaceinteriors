/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { db, GALLERY_GROUPS } from "@/lib/db";
import FolderForm from "./FolderForm";

type Row = { id: number; name: string; grp: string; description: string; count: number; cover: string | null };

async function Folders() {
  await requireAdmin();
  const rows = db
    .prepare(
      `SELECT f.id, f.name, f.grp, f.description, COUNT(p.id) AS count,
              (SELECT image FROM gallery_photos WHERE folder_id = f.id ORDER BY id DESC LIMIT 1) AS cover
       FROM gallery_folders f LEFT JOIN gallery_photos p ON p.folder_id = f.id
       GROUP BY f.id ORDER BY f.sort, f.id`,
    )
    .all() as Row[];

  return (
    <div className="grid gap-10">
      {GALLERY_GROUPS.map((g) => (
        <section key={g}>
          <h2 className="mb-3 text-sm font-semibold text-ink-soft">{g}</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rows.filter((r) => r.grp === g).map((r) => (
              <li key={r.id}>
                <Link href={`/admin/gallery/${r.id}`} className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-ink/10 hover:ring-brass-lo">
                  {r.cover ? <img src={r.cover} alt="" className="size-14 rounded-lg object-cover" /> : <FolderIcon />}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{r.name}</span>
                    <span className="text-xs text-ink-soft">{r.count} photo{r.count === 1 ? "" : "s"}{r.count === 0 ? " · hidden on site" : ""}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function FolderIcon() {
  return (
    <span className="grid size-14 place-items-center rounded-lg bg-ivory-dim text-ink-soft">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
    </span>
  );
}

export default function AdminGallery() {
  return (
    <>
      <h1 className="mb-2 font-display text-4xl">Gallery folders</h1>
      <p className="mb-8 text-sm text-ink-soft">One folder per design category. Folders with no photos stay hidden on the website.</p>
      <Suspense fallback={<p className="text-ink-soft">Loading…</p>}>
        <Folders />
      </Suspense>
      <section className="mt-12 max-w-xl">
        <h2 className="mb-3 font-display text-2xl">New folder</h2>
        <FolderForm />
      </section>
    </>
  );
}
