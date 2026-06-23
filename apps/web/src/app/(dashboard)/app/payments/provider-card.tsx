"use client";

import { useActionState } from "react";
import type { ProviderMeta, ProviderId } from "@publeca/payments";
import {
  savePaymentConfig,
  setProviderEnabled,
  removeProviderConfig,
  type ConfigState,
} from "./actions";

export function ProviderCard({
  meta,
  configured,
  enabled,
  sandbox,
}: {
  meta: ProviderMeta;
  configured: boolean;
  enabled: boolean;
  sandbox: boolean;
}) {
  const [state, action, pending] = useActionState(
    savePaymentConfig.bind(null, meta.id as ProviderId),
    { error: null } as ConfigState
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{meta.label}</h2>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                meta.kind === "bnpl"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-sky-100 text-sky-700"
              }`}
            >
              {meta.kind === "bnpl" ? "BNPL" : "Gateway"}
            </span>
            {configured && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {enabled ? "Enabled" : "Disabled"}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">{meta.blurb}</p>
        </div>

        {configured && (
          <div className="flex shrink-0 gap-2">
            <form action={setProviderEnabled.bind(null, meta.id as ProviderId, !enabled)}>
              <button className="text-sm font-medium text-slate-600 hover:underline">
                {enabled ? "Disable" : "Enable"}
              </button>
            </form>
            <form action={removeProviderConfig.bind(null, meta.id as ProviderId)}>
              <button className="text-sm font-medium text-red-600 hover:underline">Remove</button>
            </form>
          </div>
        )}
      </div>

      <form action={action} className="mt-4 grid gap-3 sm:grid-cols-2">
        {meta.fields.map((f) => (
          <label key={f.name} className="block">
            <span className="text-sm font-medium text-slate-700">{f.label}</span>
            <input
              name={f.name}
              type={f.type === "password" ? "password" : "text"}
              placeholder={configured ? "•••••••• (leave to re-enter)" : f.placeholder}
              autoComplete="off"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </label>
        ))}

        {meta.hasSandbox && (
          <label className="flex items-center gap-2 sm:col-span-2">
            <input type="checkbox" name="sandbox" defaultChecked={sandbox} className="rounded" />
            <span className="text-sm text-slate-600">Sandbox / test mode</span>
          </label>
        )}

        <div className="flex items-center gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {pending ? "Saving…" : configured ? "Update keys" : "Connect"}
          </button>
          {state?.ok && <span className="text-sm text-emerald-600">Saved ✓</span>}
          {state?.error && <span className="text-sm text-red-600">{state.error}</span>}
        </div>
      </form>
    </div>
  );
}
