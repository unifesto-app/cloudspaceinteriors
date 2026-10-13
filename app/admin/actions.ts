"use server";
import { randomUUID } from "node:crypto";
import { writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import { checkPassword, requireAdmin, SESSION_COOKIE } from "@/lib/auth";
import { db, GALLERY_GROUPS, UPLOAD_DIR } from "@/lib/db";

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

  const values = [name, category, s("description", 2000), image, form.get("featured") ? 1 : 0, form.get("active") ? 1 : 0] as const;
  if (id) {
    db.prepare("UPDATE products SET name=?, category=?, description=?, image=?, featured=?, active=? WHERE id=?").run(...values, id);
  } else {
    db.prepare("INSERT INTO products (name, category, description, image, featured, active) VALUES (?, ?, ?, ?, ?, ?)").run(...values);
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

// ── Gallery folders & photos ─────────────────────────────────────────────

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

export async function saveFolder(_: string | undefined, form: FormData) {
  await requireAdmin();
  const id = Number(form.get("id")) || null;
  const name = String(form.get("name") ?? "").trim().slice(0, 80);
  const description = String(form.get("description") ?? "").trim().slice(0, 300);
  const grp = (GALLERY_GROUPS as readonly string[]).includes(String(form.get("grp"))) ? String(form.get("grp")) : "Residential";
  if (!name) return "Folder name is required.";
  if (id) {
    db.prepare("UPDATE gallery_folders SET name = ?, description = ?, grp = ? WHERE id = ?").run(name, description, grp, id);
  } else {
    let slug = slugify(name) || "folder";
    if (db.prepare("SELECT 1 FROM gallery_folders WHERE slug = ?").get(slug)) slug = `${slug}-${Date.now().toString(36)}`;
    const { m } = db.prepare("SELECT COALESCE(MAX(sort), 0) + 1 AS m FROM gallery_folders").get() as { m: number };
    const res = db.prepare("INSERT INTO gallery_folders (slug, name, description, grp, sort) VALUES (?, ?, ?, ?, ?)").run(slug, name, description, grp, m);
    updateTag("gallery");
    redirect(`/admin/gallery/${res.lastInsertRowid}`);
  }
  updateTag("gallery");
  revalidatePath("/admin/gallery", "layout");
  return "Saved.";
}

export async function deleteFolder(form: FormData) {
  await requireAdmin();
  const id = Number(form.get("id"));
  const photos = db.prepare("SELECT image FROM gallery_photos WHERE folder_id = ?").all(id) as { image: string }[];
  db.prepare("DELETE FROM gallery_folders WHERE id = ?").run(id); // photos cascade
  await Promise.all(photos.map((p) => removeUpload(p.image)));
  updateTag("gallery");
  redirect("/admin/gallery");
}

export async function uploadPhotos(_: string | undefined, form: FormData) {
  await requireAdmin();
  const folderId = Number(form.get("folderId"));
  if (!db.prepare("SELECT 1 FROM gallery_folders WHERE id = ?").get(folderId)) return "Folder not found.";
  const files = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (!files.length) return "Choose at least one photo.";
  if (files.length > 10) return "Upload up to 10 photos at a time.";
  const add = db.prepare("INSERT INTO gallery_photos (folder_id, image) VALUES (?, ?)");
  let saved = 0;
  const errors: string[] = [];
  for (const file of files) {
    try {
      add.run(folderId, await saveUpload(file));
      saved++;
    } catch (e) {
      errors.push(`${file.name}: ${(e as Error).message}`);
    }
  }
  updateTag("gallery");
  revalidatePath("/admin/gallery", "layout");
  return [`${saved} photo${saved === 1 ? "" : "s"} added.`, ...errors].join(" ");
}

export async function deletePhoto(form: FormData) {
  await requireAdmin();
  const id = Number(form.get("id"));
  const row = db.prepare("SELECT image FROM gallery_photos WHERE id = ?").get(id) as { image: string } | undefined;
  if (!row) return;
  db.prepare("DELETE FROM gallery_photos WHERE id = ?").run(id);
  await removeUpload(row.image);
  updateTag("gallery");
  revalidatePath("/admin/gallery", "layout");
}
