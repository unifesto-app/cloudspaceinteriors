"use client";
import { useActionState } from "react";
import type { GalleryFolder } from "@/lib/db";
import { saveFolder } from "../actions";

// Create (no folder) or rename/describe (folder) a gallery folder.
export default function FolderForm({ folder }: { folder?: GalleryFolder }) {
  const [msg, action, pending] = useActionState(saveFolder, undefined);
  return (
    <form action={action} className="grid gap-3 rounded-xl bg-white p-5 ring-1 ring-ink/10 sm:grid-cols-[1fr_auto]">
      {folder && <input type="hidden" name="id" value={folder.id} />}
      <label className="grid gap-1 text-sm">
        Folder name
        <input name="name" required maxLength={80} defaultValue={folder?.name} placeholder="e.g. Pooja Unit" className="field" />
      </label>
      <label className="grid gap-1 text-sm">
        Group
        <select name="grp" defaultValue={folder?.grp ?? "Residential"} className="field">
          <option>Residential</option>
          <option>Commercial</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm sm:col-span-2">
        Short description (shown on the website)
        <input name="description" maxLength={300} defaultValue={folder?.description} className="field" />
      </label>
      {msg && <p role="status" className="text-sm text-ink-soft sm:col-span-2">{msg}</p>}
      <button disabled={pending} className="btn-plate sm:col-span-2">{pending ? "Saving…" : folder ? "Save folder" : "Create folder"}</button>
    </form>
  );
}
