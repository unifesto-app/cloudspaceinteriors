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
  price: string;
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
    ["Modular Kitchen", "Residential", "L / U / parallel layouts with soft-close hardware, quartz tops and handle-less shutters.", "From ₹1,85,000", `${WP}/2025/07/r.i.webp`, 1],
    ["Marble-Finish TV Unit", "Residential", "Feature wall with marble-textured panels, gold inlays and concealed ambient lighting.", "From ₹65,000", `${WP}/2025/07/IMG-20250723-WA0027.jpg`, 1],
    ["Custom Wardrobe", "Customized", "Floor-to-ceiling wardrobes in laminate, acrylic or veneer, with lofts and internal organisers.", "From ₹1,450 / sq ft", `${WP}/2025/07/custo-i.webp`, 1],
    ["Office Workstations", "Office", "Ergonomic linear and cluster workstations with cable management and acoustic screens.", "On request", `${WP}/2025/07/o.i.webp`, 0],
    ["Hotel Room Package", "Hospitality", "Bed back panel, wardrobe, console and lighting — a repeatable package for guest rooms.", "On request", `${WP}/2025/07/h.i.webp`, 0],
    ["Retail Showroom Fit-out", "Commercial", "Display walls, cash counter and brand zones designed around how customers move.", "On request", `${WP}/2025/07/c.i.webp`, 0],
  ];
  for (const row of seed) insert.run(...row);
}
