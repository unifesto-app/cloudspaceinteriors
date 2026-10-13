import { cacheLife, cacheTag } from "next/cache";
import { db, type GalleryFolder, type GalleryPhoto, type Product } from "./db";

// Public catalog is cached until an admin edit calls updateTag("products").
export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("max");
  cacheTag("products");
  return db
    .prepare("SELECT * FROM products WHERE active = 1 ORDER BY featured DESC, id DESC")
    .all()
    .map((r) => ({ ...r }) as Product);
}

export type GalleryFolderWithPhotos = GalleryFolder & { photos: GalleryPhoto[] };

// Public gallery: every folder with its photos, cached until an admin edit calls updateTag("gallery").
export async function getGallery(): Promise<GalleryFolderWithPhotos[]> {
  "use cache";
  cacheLife("max");
  cacheTag("gallery");
  const folders = db.prepare("SELECT * FROM gallery_folders ORDER BY sort, id").all().map((r) => ({ ...r }) as GalleryFolder);
  const photos = db.prepare("SELECT id, folder_id, image, caption FROM gallery_photos ORDER BY id DESC").all().map((r) => ({ ...r }) as GalleryPhoto);
  return folders.map((f) => ({ ...f, photos: photos.filter((p) => p.folder_id === f.id) }));
}
