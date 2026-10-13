/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { db, type Product } from "@/lib/db";

async function ProductList() {
  await requireAdmin();
  const products = db.prepare("SELECT * FROM products ORDER BY category, featured DESC, id DESC").all() as Product[];
  if (!products.length) return <p className="text-ink-soft">No products yet.</p>;
  return (
    <ul className="divide-y divide-ink/10 rounded-xl bg-white ring-1 ring-ink/10">
      {products.map((p) => (
        <li key={p.id} className="flex items-center gap-4 p-4">
          {p.image ? <img src={p.image} alt="" className="size-14 rounded-lg object-cover" /> : <div className="size-14 rounded-lg bg-ivory-dim" />}
          <div className="flex-1">
            <p className="font-medium">{p.name}</p>
            <p className="text-xs text-ink-soft">
              {p.category} {p.featured ? "· ★ featured" : ""} {p.active ? "" : "· hidden"}
            </p>
          </div>
          <Link href={`/admin/products/${p.id}`} className="text-sm text-brass-lo underline">Edit</Link>
        </li>
      ))}
    </ul>
  );
}

export default function AdminProducts() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-4xl font-semibold">Products</h1>
        <Link href="/admin/products/new" className="btn-plate">+ Add product</Link>
      </div>
      <Suspense fallback={<p className="text-ink-soft">Loading…</p>}>
        <ProductList />
      </Suspense>
    </>
  );
}
