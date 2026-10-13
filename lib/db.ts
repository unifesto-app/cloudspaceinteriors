import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { WP } from "./site";

// ponytail: single-file SQLite, fine for one server; move to Postgres if you ever run >1 instance.
export const DATA_DIR = path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
mkdirSync(UPLOAD_DIR, { recursive: true });

export const db = new DatabaseSync(path.join(DATA_DIR, "app.db"));
db.exec(`
PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS quotes (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  service TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  items TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string; // unused: pricing removed from the site at the studio's request
  image: string;
  featured: number;
  active: number;
};

export type QuoteItem = { id: number; name: string; qty: number };

export type Quote = {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  items: string; // JSON QuoteItem[]
  status: string;
  created_at: string;
};

// Sample catalog so the site isn't empty on first boot. Edit or delete from /admin/products.
const { n } = db.prepare("SELECT COUNT(*) AS n FROM products").get() as { n: number };
if (n === 0) {
  const insert = db.prepare(
    "INSERT INTO products (name, category, description, price, image, featured) VALUES (?, ?, ?, ?, ?, ?)",
  );
  const seed: [string, string, string, string, string, number][] = [
    ["Modular Kitchen", "Residential", "L / U / parallel layouts with soft-close hardware, quartz tops and handle-less shutters.", "", `${WP}/2025/07/r.i.webp`, 1],
    ["Marble-Finish TV Unit", "Residential", "Feature wall with marble-textured panels, gold inlays and concealed ambient lighting.", "", `${WP}/2025/07/IMG-20250723-WA0027.jpg`, 1],
    ["Custom Wardrobe", "Customized", "Floor-to-ceiling wardrobes in laminate, acrylic or veneer, with lofts and internal organisers.", "", `${WP}/2025/07/custo-i.webp`, 1],
    ["Office Workstations", "Office", "Ergonomic linear and cluster workstations with cable management and acoustic screens.", "", `${WP}/2025/07/o.i.webp`, 0],
    ["Hotel Room Package", "Hospitality", "Bed back panel, wardrobe, console and lighting — a repeatable package for guest rooms.", "", `${WP}/2025/07/h.i.webp`, 0],
    ["Retail Showroom Fit-out", "Commercial", "Display walls, cash counter and brand zones designed around how customers move.", "", `${WP}/2025/07/c.i.webp`, 0],
  ];
  for (const row of seed) insert.run(...row);
}

// ── Gallery: photo folders by design category, managed from /admin/gallery ──
db.exec(`
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS gallery_folders (
  id INTEGER PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  grp TEXT NOT NULL DEFAULT 'Residential',
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS gallery_photos (
  id INTEGER PRIMARY KEY,
  folder_id INTEGER NOT NULL REFERENCES gallery_folders(id) ON DELETE CASCADE,
  image TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

export type GalleryFolder = { id: number; slug: string; name: string; description: string; grp: string; sort: number };
export type GalleryPhoto = { id: number; folder_id: number; image: string; caption: string };
export const GALLERY_GROUPS = ["Residential", "Commercial"] as const;

const { f } = db.prepare("SELECT COUNT(*) AS f FROM gallery_folders").get() as { f: number };
if (f === 0) {
  // Categories supplied by the studio. Photos: their own work from the old site, where one fits the folder.
  const u = (p: string) => `${WP}/${p}`;
  const seed: [string, string, string, string, string[]][] = [
    ["modular-kitchen", "Modular Kitchen", "Modern, customised & space-saving kitchen solutions.", "Residential", [u("2025/07/IMG-20250723-WA0030.jpg"), u("2025/07/2.jpg"), u("2025/08/WhatsApp-Image-2025-07-23-at-9.59.24-PM_7_11zon-scaled.jpeg")]],
    ["tv-unit", "TV Unit", "Stylish living room & bedroom TV units.", "Residential", [u("2025/07/IMG-20250723-WA0027.jpg"), u("2025/07/WhatsApp-Image-2025-07-23-at-14.53.17_926a5a0f-e1753272077736.jpg")]],
    ["breakfast-counter", "Breakfast Counter", "Breakfast counters and kitchen islands.", "Residential", [u("2025/07/IMG-20250723-WA0032.jpg")]],
    ["bedrooms", "Bedrooms", "Complete bedroom interiors.", "Residential", [u("2025/07/IMG-20250723-WA0029.jpg"), u("2025/07/IMG-20250723-WA0031.jpg")]],
    ["bedroom-wardrobe", "Bedroom Wardrobe", "Modern, customised & functional wardrobe solutions.", "Residential", [u("2025/07/3.jpg"), u("2025/07/WhatsApp-Image-2025-07-23-at-14.56.46_d30c26c7.jpg")]],
    ["crockery-unit", "Crockery Unit", "Elegant crockery display & storage units.", "Residential", []],
    ["partition", "Partition", "Decorative & functional living and dining area partitions.", "Residential", []],
    ["main-door", "Main Door Elevation", "Premium entrance door & decorative elevation designs.", "Residential", []],
    ["shoe-rack", "Shoe Rack", "Modern, space-saving & customised shoe storage units.", "Residential", []],
    ["plain-false-ceiling", "Plain False Ceiling with Profile Lighting", "Minimalist ceiling designs with elegant profile lights.", "Residential", []],
    ["designer-false-ceiling", "Designer False Ceiling with Lighting", "Modern decorative ceiling designs with integrated lighting.", "Residential", []],
    ["pvc-ceiling", "PVC Ceiling", "Stylish, durable & low-maintenance PVC ceiling solutions.", "Residential", []],
    ["wall-designs", "Wall Designs", "Feature walls, panelling and textures.", "Residential", [u("2025/07/WhatsApp-Image-2025-07-23-at-14.53.17_38b27096-1.jpg")]],
    ["commercial", "Commercial", "Retail, showrooms, restaurants and hospitality.", "Commercial", []],
    ["office-space", "Office Space", "Workspaces, cabins and receptions.", "Commercial", [u("2025/07/WhatsApp-Image-2025-07-23-at-14.53.18_96d48da6-e1753272028607.jpg"), u("2025/07/b2-768x431.webp")]],
  ];
  const addFolder = db.prepare("INSERT INTO gallery_folders (slug, name, description, grp, sort) VALUES (?, ?, ?, ?, ?)");
  const addPhoto = db.prepare("INSERT INTO gallery_photos (folder_id, image) VALUES (?, ?)");
  seed.forEach(([slug, name, desc, grp, photos], i) => {
    const id = addFolder.run(slug, name, desc, grp, i).lastInsertRowid;
    for (const p of photos) addPhoto.run(id, p);
  });
}
