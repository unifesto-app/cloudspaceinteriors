import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "csi_admin";

// ponytail: one shared admin password, token derived from it — changing ADMIN_PASSWORD logs everyone out.
// Add a users table if staff ever need separate logins.
function expectedToken() {
  const { ADMIN_PASSWORD, SESSION_SECRET } = process.env;
  if (!ADMIN_PASSWORD || !SESSION_SECRET) return null;
  return createHmac("sha256", SESSION_SECRET).update(ADMIN_PASSWORD).digest("hex");
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function isValidSession(token: string | undefined) {
  const expected = expectedToken();
  return !!expected && !!token && safeEqual(token, expected);
}

export function checkPassword(password: string) {
  const real = process.env.ADMIN_PASSWORD;
  return !!real && safeEqual(password, real) ? expectedToken() : null;
}

// Real authorization check — call at the top of every admin action and admin data read.
export async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!isValidSession(token)) redirect("/admin/login");
}
