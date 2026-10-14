"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupHost } from "../actions";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signupHost, { error: null } as {
    error: string | null;
  });

  return (
    <div>
      <h1 className="text-xl font-semibold">Create your host account</h1>
      <p className="mt-1 text-sm text-slate-500">Start selling tickets in minutes.</p>

      <form action={action} className="mt-6 space-y-4">
        <Field label="Full name" name="name" type="text" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
        />

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-brand-500 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {pending ? "Creating…" : "Create account"}
        </button>
      </form>

      {/* Show-your-working (playbook P11b): what happens after this form, and why. */}
      <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">What happens next</p>
        <ol className="mt-2 list-decimal space-y-1.5 pl-4 leading-snug">
          <li>Build your event page. It stays a private draft until you publish it.</li>
          <li>
            Connect your own PayHere, Koko or Mintpay accounts so ticket money goes straight to you.
            Until then, Publeca&rsquo;s PayHere account is offered so you can start selling.
          </li>
          <li>
            Paste your Meta and Google IDs. A purchase is sent to them only once payment is
            verified, so your ads learn from buyers.
          </li>
        </ol>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}
