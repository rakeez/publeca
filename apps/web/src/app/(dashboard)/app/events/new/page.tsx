import Link from "next/link";
import { getCurrentHost } from "@/lib/session";
import { createEvent } from "../actions";
import { EventForm } from "../event-form";

export default async function NewEventPage() {
  await getCurrentHost(); // gate

  return (
    <div className="max-w-2xl">
      <Link href="/app/events" className="text-sm text-slate-500 hover:text-slate-900">
        ← Events
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Create event</h1>
      <p className="mt-1 text-slate-600">
        You'll add ticket types and publish on the next screen.
      </p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <EventForm action={createEvent} submitLabel="Create event" />
      </div>
    </div>
  );
}
