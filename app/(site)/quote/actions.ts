"use server";
import { db, type QuoteItem } from "@/lib/db";
import { notifyQuote, waLink } from "@/lib/notify";

// `values` echoes the inputs back on error, since React resets the form after every action.
export type QuoteState = { ok?: true; id?: number; wa?: string; error?: string; values?: Record<string, string> };

const field = (f: FormData, k: string, max: number) => String(f.get(k) ?? "").trim().slice(0, max);

export async function submitQuote(_: QuoteState, form: FormData): Promise<QuoteState> {
  if (field(form, "company", 100)) return { ok: true }; // honeypot: bots fill hidden fields

  const name = field(form, "name", 100);
  const phone = field(form, "phone", 20);
  const email = field(form, "email", 150);
  const city = field(form, "city", 100);
  const service = field(form, "service", 100);
  const message = field(form, "message", 2000);

  const values = { name, phone, email, city, service, message };
  const fail = (error: string): QuoteState => ({ error, values });

  if (!name) return fail("Please enter your name.");
  if (!/^\+?[\d\s-]{10,16}$/.test(phone)) return fail("Please enter a valid phone number.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email or leave it blank.");

  // Trust only product ids + quantities from the browser; names come from the DB.
  let raw: { id: unknown; qty: unknown }[] = [];
  try {
    raw = JSON.parse(String(form.get("items") || "[]"));
  } catch {}
  const getName = db.prepare("SELECT name FROM products WHERE id = ?");
  const items: QuoteItem[] = [];
  for (const r of Array.isArray(raw) ? raw.slice(0, 50) : []) {
    const id = Number(r?.id);
    const row = Number.isInteger(id) ? (getName.get(id) as { name: string } | undefined) : undefined;
    if (row) items.push({ id, name: row.name, qty: Math.max(1, Math.min(999, Math.floor(Number(r.qty)) || 1)) });
  }

  if (!items.length && !message && !service) return fail("Add a product or tell us a little about your space.");

  const { lastInsertRowid } = db
    .prepare("INSERT INTO quotes (name, phone, email, city, service, message, items) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .run(name, phone, email, city, service, message, JSON.stringify(items));
  const id = Number(lastInsertRowid);

  const text = await notifyQuote({ name, phone, email, city, service, message, items }, id);
  return { ok: true, id, wa: waLink(text) };
}
