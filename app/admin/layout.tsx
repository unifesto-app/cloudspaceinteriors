import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "./actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-dvh bg-ivory text-ink">
      <header className="border-b border-ink/15 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 text-sm">
          <span className="font-display text-xl font-semibold">Cloud Space · Admin</span>
          <Link href="/admin" className="hover:text-brass-lo">Quote requests</Link>
          <Link href="/admin/products" className="hover:text-brass-lo">Products</Link>
          <Link href="/admin/gallery" className="hover:text-brass-lo">Gallery</Link>
          <Link href="/" className="ml-auto text-ink-soft hover:text-brass-lo">View site ↗</Link>
          <form action={logout}><button className="text-ink-soft hover:text-red-700">Log out</button></form>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
    </div>
  );
}
