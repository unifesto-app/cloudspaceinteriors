"use client";
import { useActionState } from "react";
import { deleteFolder, uploadPhotos } from "../../actions";

export function UploadPhotos({ folderId }: { folderId: number }) {
  const [msg, action, pending] = useActionState(uploadPhotos, undefined);
  return (
    <form action={action} className="grid gap-3 rounded-xl bg-white p-5 ring-1 ring-ink/10 sm:grid-cols-[1fr_auto] sm:items-end">
      <input type="hidden" name="folderId" value={folderId} />
      <label className="grid gap-1 text-sm">
        Add photos (JPG, PNG or WebP · up to 10 at once · max 5 MB each)
        <input name="photos" type="file" multiple required accept="image/jpeg,image/png,image/webp,image/avif" className="field py-2" />
      </label>
      <button disabled={pending} className="btn-plate">{pending ? "Uploading…" : "Upload"}</button>
      {msg && <p role="status" className="text-sm text-ink-soft sm:col-span-2">{msg}</p>}
    </form>
  );
}

export function DeleteFolder({ id, name, count }: { id: number; name: string; count: number }) {
  return (
    <form
      action={deleteFolder}
      onSubmit={(e) => {
        if (!confirm(`Delete the folder "${name}"${count ? ` and its ${count} photo${count === 1 ? "" : "s"}` : ""}? This cannot be undone.`)) e.preventDefault();
      }}
      className="mt-4"
    >
      <input type="hidden" name="id" value={id} />
      <button className="text-sm text-red-700 underline">Delete this folder</button>
    </form>
  );
}
