"use client";
import { useSyncExternalStore } from "react";

// Quote list kept in the visitor's browser; it's sent to the server only when they submit.
export type CartLine = { id: number; name: string; image: string; qty: number };

const KEY = "csi-quote";
const EMPTY: CartLine[] = [];
const listeners = new Set<() => void>();
let cache: CartLine[] | null = null;

function read(): CartLine[] {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    cache = [];
  }
  return cache!;
}

function write(lines: CartLine[]) {
  cache = lines;
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage); // sync across tabs
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  const lines = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    add: (p: Omit<CartLine, "qty">) => {
      const cur = read();
      write(cur.some((l) => l.id === p.id) ? cur.map((l) => (l.id === p.id ? { ...l, qty: l.qty + 1 } : l)) : [...cur, { ...p, qty: 1 }]);
    },
    setQty: (id: number, qty: number) => write(read().map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.min(999, qty || 1)) } : l))),
    remove: (id: number) => write(read().filter((l) => l.id !== id)),
    clear: () => write([]),
  };
}
