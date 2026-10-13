"use client";
import { useActionState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mx-auto mt-32 grid max-w-sm gap-4 rounded-2xl bg-white p-8 ring-1 ring-ink/10">
      <h1 className="font-display text-3xl font-semibold">Admin sign in</h1>
      <label className="grid gap-1.5 text-sm">
        Password
        <input name="password" type="password" required autoFocus autoComplete="current-password" className="field" />
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button disabled={pending} className="btn-plate">{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
