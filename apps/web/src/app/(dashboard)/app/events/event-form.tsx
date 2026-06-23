"use client";

import { useActionState } from "react";

type ActionState = { error: string | null };
type EventAction = (prev: ActionState, formData: FormData) => Promise<ActionState>;

export type EventDefaults = {
  title?: string;
  description?: string;
  venue?: string;
  startsAt?: string; // datetime-local value (yyyy-MM-ddTHH:mm)
  endsAt?: string;
  currency?: string;
};

export function EventForm({
  action,
  defaults,
  submitLabel,
}: {
  action: EventAction;
  defaults?: EventDefaults;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null } as ActionState);

  return (
    <form action={formAction} className="space-y-5">
      <Field label="Event title" name="title" defaultValue={defaults?.title} required />

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Description</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={defaults?.description}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </label>

      <Field label="Venue" name="venue" defaultValue={defaults?.venue} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Starts at"
          name="startsAt"
          type="datetime-local"
          defaultValue={defaults?.startsAt}
          required
        />
        <Field
          label="Ends at (optional)"
          name="endsAt"
          type="datetime-local"
          defaultValue={defaults?.endsAt}
        />
      </div>

      <label className="block max-w-[12rem]">
        <span className="text-sm font-medium text-slate-700">Currency</span>
        <select
          name="currency"
          defaultValue={defaults?.currency ?? "LKR"}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        >
          <option value="LKR">LKR — Sri Lankan Rupee</option>
          <option value="USD">USD — US Dollar</option>
        </select>
      </label>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}
