"use client";

import { useActionState } from "react";
import { inviteTeamMember, type TeamState } from "./actions";

export function InviteForm() {
  const [state, action, pending] = useActionState(inviteTeamMember, {
    error: null,
  } as TeamState);

  return (
    <form action={action} className="flex flex-wrap items-end gap-3">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="teammate@example.com"
          className="mt-1 w-64 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Role</span>
        <select
          name="role"
          defaultValue="STAFF"
          className="mt-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        >
          <option value="STAFF">Staff — scan + attendees</option>
          <option value="MANAGER">Manager — full event access</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
      >
        {pending ? "Inviting…" : "Invite"}
      </button>
      {state?.ok && <span className="text-sm text-emerald-600">Invited ✓</span>}
      {state?.error && <span className="text-sm text-red-600">{state.error}</span>}
    </form>
  );
}
