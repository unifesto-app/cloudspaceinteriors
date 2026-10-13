/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { db, type GalleryFolder, type GalleryPhoto } from "@/lib/db";
import { deletePhoto } from "../../actions";
import FolderForm from "../FolderForm";
import { DeleteFolder, UploadPhotos } from "./FolderTools";

async function Folder({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const id = Number((await params).id);
  const folder = db.prepare("SELECT * FROM gallery_folders WHERE id = ?").get(id) as GalleryFolder | undefined;
  if (!folder) notFound();
  const photos = db.prepare("SELECT id, folder_id, image, caption FROM gallery_photos WHERE folder_id = ? ORDER BY id DESC").all(id) as GalleryPhoto[];

  return (
    <>
      <Link href="/admin/gallery" className="text-sm text-ink-soft hover:text-brass-lo">All folders</Link>
      <h1 className="mb-1 mt-2 font-display text-4xl">{folder.name}</h1>
      <p className="mb-8 text-sm text-ink-soft">
        {folder.grp} · {photos.length} photo{photos.length === 1 ? "" : "s"} ·{" "}
        {photos.length ? <a href={`/gallery/${folder.slug}`} target="_blank" className="underline">view on site</a> : "hidden on site until it has photos"}
      </p>

      <UploadPhotos folderId={folder.id} />

      {photos.length > 0 ? (
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p) => (
            <li key={p.id} className="overflow-hidden rounded-xl bg-white ring-1 ring-ink/10">
              <img src={p.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <form action={deletePhoto} className="flex justify-end p-2">
                <input type="hidden" name="id" value={p.id} />
                <button className="text-xs text-red-700 hover:underline">Delete photo</button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-ink-soft">No photos yet.</p>
      )}

      <section className="mt-14 max-w-xl">
        <h2 className="mb-3 font-display text-2xl">Folder details</h2>
        <FolderForm folder={{ ...folder }} />
        <DeleteFolder id={folder.id} name={folder.name} count={photos.length} />
      </section>
    </>
  );
}

export default function AdminFolder({ params }: PageProps<"/admin/gallery/[id]">) {
  return (
    <Suspense fallback={<p className="text-ink-soft">Loading…</p>}>
      <Folder params={params} />
    </Suspense>
  );
}
