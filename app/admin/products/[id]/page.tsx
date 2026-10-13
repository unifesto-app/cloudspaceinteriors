import { notFound } from "next/navigation";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { db, type Product } from "@/lib/db";
import ProductForm from "../ProductForm";

async function Editor({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (id === "new") return <ProductForm />;
  const p = db.prepare("SELECT * FROM products WHERE id = ?").get(Number(id)) as Product | undefined;
  if (!p) notFound();
  return <ProductForm p={{ ...p }} />;
}

export default function EditProduct({ params }: PageProps<"/admin/products/[id]">) {
  return (
    <>
      <h1 className="mb-6 font-display text-4xl font-semibold">Product</h1>
      <Suspense fallback={<p className="text-ink-soft">Loading…</p>}>
        <Editor params={params} />
      </Suspense>
    </>
  );
}
