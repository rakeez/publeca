"use client";

import { useActionState, useState } from "react";
import { PROVIDER_CATALOG } from "@publeca/payments";
import { addPaymentAccount, type ConfigState } from "./actions";

export function AddAccountForm() {
  const [providerId, setProviderId] = useState(PROVIDER_CATALOG[0]!.id);
  const [state, action, pending] = useActionState(addPaymentAccount, { error: null } as ConfigState);
  const meta = PROVIDER_CATALOG.find((p) => p.id === providerId)!;

  return (
    <form action={action} className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold">Add a payment account</h2>
      <p className="mt-1 text-sm text-slate-500">
        Connect a gateway or BNPL account. You can add several (e.g. two PayHere accounts)
        and choose which to use per event. Keys are encrypted and never shown again.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Provider</span>
          <select
            name="provider"
            value={providerId}
            onChange={(e) => setProviderId(e.target.value as typeof providerId)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
          >
            {PROVIDER_CATALOG.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
                {p.kind === "bnpl" ? " (BNPL)" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Account name</span>
          <input
            name="label"
            placeholder={`e.g. Main ${meta.label}`}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
        </label>

        {meta.fields.map((f) => (
          <label key={f.name} className="block">
            <span className="text-sm font-medium text-slate-700">{f.label}</span>
            <input
              name={f.name}
              type={f.type === "password" ? "password" : "text"}
              autoComplete="off"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
            />
          </label>
        ))}

        {meta.hasSandbox && (
          <label className="flex items-center gap-2 sm:col-span-2">
            <input type="checkbox" name="sandbox" defaultChecked className="rounded" />
            <span className="text-sm text-slate-600">Sandbox / test mode</span>
          </label>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {pending ? "Adding…" : "Add account"}
        </button>
        {state?.ok && <span className="text-sm text-emerald-600">Added ✓</span>}
        {state?.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}
