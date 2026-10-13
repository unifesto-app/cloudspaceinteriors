"use server";
import { randomUUID } from "node:crypto";
import { writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { checkPassword, requireAdmin, SESSION_COOKIE } from "@/lib/auth";
import { db, UPLOAD_DIR } from "@/lib/db";

export async function login(_: string | undefined, form: FormData) {
  const token = checkPassword(String(form.get("password") ?? ""));
  if (!token) return "Incorrect password.";
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

const IMAGE_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" };

async function saveUpload(file: File) {
  const ext = IMAGE_TYPES[file.type];
  if (!ext) throw new Error("Image must be JPG, PNG, WebP or AVIF.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5 MB.");
  const name = `${randomUUID()}.${ext}`;
  await writeFile(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

async function removeUpload(image: string) {
  if (image.startsWith("/uploads/")) await unlink(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, path.basename(image))).catch(() => {});
}

export async function saveProduct(_: string | undefined, form: FormData) {
  await requireAdmin();
  const id = Number(form.get("id")) || null;
  const s = (k: string, max: number) => String(form.get(k) ?? "").trim().slice(0, max);
  const name = s("name", 120);
  const category = s("category", 60);
  if (!name || !category) return "Name and category are required.";

  const prev = id ? (db.prepare("SELECT image FROM products WHERE id = ?").get(id) as { image: string } | undefined) : undefined;
  let image = s("imageUrl", 500) || prev?.image || "";
  const file = form.get("imageFile");
  if (file instanceof File && file.size > 0) {
    try {
      image = await saveUpload(file);
    } catch (e) {
      return (e as Error).message;
    }
  }
  if (image && !/^(https:\/\/|\/uploads\/)/.test(image)) return "Image URL must start with https://";
  if (prev && prev.image !== image) await removeUpload(prev.image);

  const values = [name, category, s("description", 2000), s("price", 60), image, form.get("featured") ? 1 : 0, form.get("active") ? 1 : 0] as const;
  if (id) {
    db.prepare("UPDATE products SET name=?, category=?, description=?, price=?, image=?, featured=?, active=? WHERE id=?").run(...values, id);
  } else {
    db.prepare("INSERT INTO products (name, category, description, price, image, featured, active) VALUES (?, ?, ?, ?, ?, ?, ?)").run(...values);
  }
  updateTag("products");
  redirect("/admin/products");
}

export async function deleteProduct(form: FormData) {
  await requireAdmin();
  const id = Number(form.get("id"));
  const row = db.prepare("SELECT image FROM products WHERE id = ?").get(id) as { image: string } | undefined;
  if (!row) return;
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
  await removeUpload(row.image);
  updateTag("products");
  redirect("/admin/products");
}

export async function setQuoteStatus(form: FormData) {
  await requireAdmin();
  const status = String(form.get("status"));
  if (!["new", "contacted", "won", "closed"].includes(status)) return;
  db.prepare("UPDATE quotes SET status = ? WHERE id = ?").run(status, Number(form.get("id")));
  redirect("/admin");
}
