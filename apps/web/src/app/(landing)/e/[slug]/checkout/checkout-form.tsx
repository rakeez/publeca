"use client";

import { useActionState } from "react";
import { startCheckout, type CheckoutState } from "./actions";

type Method = { id: string; label: string; kind: "card" | "bnpl" };

export function CheckoutForm({
  ticketTypeId,
  methods,
}: {
  ticketTypeId: string;
  methods: Method[];
}) {
  const [state, action, pending] = useActionState(startCheckout, {
    error: null,
  } as CheckoutState);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="ticketTypeId" value={ticketTypeId} />

      {methods.length > 1 && (
        <fieldset>
          <legend className="text-sm font-medium text-slate-700">Payment method</legend>
          <div className="mt-2 space-y-2">
            {methods.map((m, i) => (
              <label
                key={m.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm has-[:checked]:border-brand-400 has-[:checked]:ring-2 has-[:checked]:ring-brand-100"
              >
                <input type="radio" name="provider" value={m.id} defaultChecked={i === 0} />
                <span className="font-medium">{m.label}</span>
                {m.kind === "bnpl" && (
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">
                    Pay later
                  </span>
                )}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      {methods.length === 1 && (
        <input type="hidden" name="provider" value={methods[0]!.id} />
      )}

      <div className="grid grid-cols-2 gap-3">
        <Field label="First name" name="firstName" autoComplete="given-name" />
        <Field label="Last name" name="lastName" autoComplete="family-name" />
      </div>
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" required={false} />

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
      >
        {pending ? "Reserving your seat…" : "Continue to payment"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}
