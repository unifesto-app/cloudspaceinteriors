import nodemailer from "nodemailer";
import type { QuoteItem } from "./db";
import { site } from "./site";

export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  items: QuoteItem[];
};

/**
 * The one message body reused everywhere: the email to the studio, the customer's
 * confirmation email, the WhatsApp alert, and the prefilled wa.me chat the customer opens.
 * Plain text only (WhatsApp supports *bold* and _italic_; email shows them literally).
 */
export function quoteText(q: QuoteRequest, id: number): string {
  // First two lines are what shows in WhatsApp/inbox previews: who + what + where.
  const lines = [
    `*New quote request #${id}*`,
    [q.service || "Interior enquiry", q.city].filter(Boolean).join(" · "),
    "",
    `Name: ${q.name}`,
    `Phone: ${q.phone}`,
  ];
  if (q.email) lines.push(`Email: ${q.email}`);
  if (q.items.length) lines.push("", "Products:", ...q.items.map((i) => `• ${i.name} × ${i.qty}`));
  // Message goes last and gets trimmed so the whole text stays inside wa.me URL limits.
  if (q.message) lines.push("", `Notes: ${q.message.slice(0, 600)}`);
  return lines.join("\n");
}

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

async function sendEmails(q: QuoteRequest, id: number, text: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, QUOTE_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) throw new Error("SMTP not configured");
  const port = Number(SMTP_PORT || 465);
  const mailer = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  const from = `"${site.name}" <${SMTP_USER}>`;

  const sends = [
    mailer.sendMail({
      from,
      to: QUOTE_TO_EMAIL || SMTP_USER,
      replyTo: q.email || undefined,
      subject: `New quote request #${id} — ${q.name}`,
      text,
    }),
  ];
  if (q.email) {
    sends.push(
      mailer.sendMail({
        from,
        to: q.email,
        subject: `We've received your quote request #${id}`,
        text: `Hi ${q.name},\n\nThank you for reaching out to ${site.name}. Our design team will call you shortly.\n\nYour request:\n\n${text}\n\nPhone / WhatsApp: ${site.phone}\n${site.name}`,
      }),
    );
  }
  await Promise.all(sends);
}

// Optional: push an alert to the studio's phone through the WhatsApp Cloud API (Meta).
// ponytail: free-form text only delivers inside Meta's 24h window; for guaranteed delivery
// create an approved template in Meta Business and send type:"template" instead.
async function sendWhatsApp(text: string) {
  const { WHATSAPP_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_NOTIFY_TO } = process.env;
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) return;
  const res = await fetch(`https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: WHATSAPP_NOTIFY_TO || site.whatsapp,
      type: "text",
      text: { body: text.slice(0, 4096) },
    }),
  });
  if (!res.ok) throw new Error(`WhatsApp API ${res.status}: ${await res.text()}`);
}

// The quote is already saved before this runs, so a failed email never loses a lead — it's logged and visible in /admin.
export async function notifyQuote(q: QuoteRequest, id: number) {
  const text = quoteText(q, id);
  const results = await Promise.allSettled([sendEmails(q, id, text), sendWhatsApp(text)]);
  for (const r of results) if (r.status === "rejected") console.error(`[quote #${id}] notify failed:`, r.reason);
  return text;
}
