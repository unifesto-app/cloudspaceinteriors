import { readFile } from "node:fs/promises";
import path from "node:path";
import { UPLOAD_DIR } from "@/lib/db";

const TYPES: Record<string, string> = { ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif" };

// Serves admin-uploaded product images from data/uploads (public/ is fixed at build time in production).
export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const name = path.basename((await params).file); // basename blocks ../ traversal
  const type = TYPES[path.extname(name)];
  if (!type) return new Response("Not found", { status: 404 });
  try {
    const body = await readFile(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, name));
    return new Response(body, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
