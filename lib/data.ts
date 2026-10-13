import { cacheLife, cacheTag } from "next/cache";
import { db, type Product } from "./db";

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
