"use client";
import { useActionState } from "react";
import type { Product } from "@/lib/db";
import { deleteProduct, saveProduct } from "../actions";

const CATEGORIES = ["Residential", "Commercial", "Hospitality", "Office", "Customized"];

// Shared by "new" (no product) and "edit".
export default function ProductForm({ p }: { p?: Product }) {
  const [error, action, pending] = useActionState(saveProduct, undefined);
  return (
    <div className="grid gap-6">
      <form action={action} className="grid gap-4 rounded-xl bg-white p-6 ring-1 ring-ink/10 sm:grid-cols-2">
        {p && <input type="hidden" name="id" value={p.id} />}
        <label className="grid gap-1.5 text-sm">
          Name *
          <input name="name" required maxLength={120} defaultValue={p?.name} className="field" />
        </label>
        <label className="grid gap-1.5 text-sm">
          Category *
          <input name="category" required maxLength={60} list="categories" defaultValue={p?.category} className="field" />
          <datalist id="categories">{CATEGORIES.map((c) => <option key={c} value={c} />)}</datalist>
        </label>
        <label className="grid gap-1.5 text-sm sm:col-span-2">
          Description
          <textarea name="description" rows={3} maxLength={2000} defaultValue={p?.description} className="field" />
        </label>
        <label className="grid gap-1.5 text-sm">
          Price label
          <input name="price" maxLength={60} placeholder="From ₹65,000 / On request" defaultValue={p?.price} className="field" />
        </label>
        <label className="grid gap-1.5 text-sm">
          Upload image (JPG/PNG/WebP, max 5 MB)
          <input name="imageFile" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="field py-2" />
        </label>
        <label className="grid gap-1.5 text-sm sm:col-span-2">
          …or image URL {p?.image && <span className="text-xs text-ink-soft">(leave as-is to keep the current image)</span>}
          <input name="imageUrl" maxLength={500} defaultValue={p?.image} placeholder="https://" className="field" />
        </label>
        <div className="flex gap-6 text-sm sm:col-span-2">
          <label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={!!p?.featured} /> Featured on home page</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="active" defaultChecked={p ? !!p.active : true} /> Visible on site</label>
        </div>
        {error && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{error}</p>}
        <button disabled={pending} className="btn-plate sm:col-span-2">{pending ? "Saving…" : "Save product"}</button>
      </form>

      {p && (
        <form action={deleteProduct} onSubmit={(e) => { if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) e.preventDefault(); }}>
          <input type="hidden" name="id" value={p.id} />
          <button className="text-sm text-red-700 underline">Delete this product</button>
        </form>
      )}
    </div>
  );
}
