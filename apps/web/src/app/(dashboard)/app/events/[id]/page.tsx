import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { EventForm } from "../event-form";
import { updateEvent, addTicketType, deleteTicketType, setEventStatus } from "../actions";

// datetime-local wants "yyyy-MM-ddTHH:mm". (UTC slice — local-tz polish comes later.)
function toLocalInput(d: Date | null): string {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 16);
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const host = await getCurrentHost();

  const event = await prisma.event.findUnique({
    where: { id },
    include: { ticketTypes: { orderBy: { createdAt: "asc" } } },
  });

  if (!event) notFound();
  if (event.hostId !== host.id) redirect("/app/events");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const liveUrl = `${appUrl}/e/${event.slug}`;
  const canPublish = event.ticketTypes.length > 0;

  return (
    <div className="max-w-3xl">
      <Link href="/app/events" className="text-sm text-slate-500 hover:text-slate-900">
        ← Events
      </Link>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{event.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {event.status === "LIVE" ? (
              <a href={liveUrl} target="_blank" className="text-brand-600 hover:underline">
                {liveUrl} ↗
              </a>
            ) : (
              <>Landing page: /e/{event.slug} (not public until published)</>
            )}
          </p>
        </div>

        {/* Publish controls */}
        <div className="flex shrink-0 items-center gap-2">
          {event.status !== "LIVE" ? (
            <form action={setEventStatus.bind(null, event.id, "LIVE")}>
              <button
                disabled={!canPublish}
                title={canPublish ? "" : "Add a ticket type first"}
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Publish
              </button>
            </form>
          ) : (
            <form action={setEventStatus.bind(null, event.id, "DRAFT")}>
              <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
                Unpublish
              </button>
            </form>
          )}
        </div>
      </div>

      {!canPublish && (
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Add at least one ticket type before publishing.
        </p>
      )}

      {/* Ticket types */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Ticket types</h2>
        <div className="mt-3 space-y-2">
          {event.ticketTypes.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
            >
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-slate-500">
                  {event.currency} {t.price.toString()} · {t.quantitySold}/{t.quantityTotal} sold
                </p>
              </div>
              {t.quantitySold === 0 && (
                <form action={deleteTicketType.bind(null, t.id)}>
                  <button className="text-sm font-medium text-red-600 hover:underline">
                    Remove
                  </button>
                </form>
              )}
            </div>
          ))}
          {event.ticketTypes.length === 0 && (
            <p className="text-sm text-slate-500">No ticket types yet.</p>
          )}
        </div>

        {/* Add ticket type */}
        <form
          action={addTicketType.bind(null, event.id)}
          className="mt-4 flex flex-wrap items-end gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-4"
        >
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Name</span>
            <input
              name="name"
              required
              placeholder="General / VIP"
              className="mt-1 w-40 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Price ({event.currency})</span>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              className="mt-1 w-32 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Quantity</span>
            <input
              name="quantityTotal"
              type="number"
              min="1"
              required
              className="mt-1 w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <button className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600">
            Add ticket type
          </button>
        </form>
      </section>

      {/* Edit event details */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Event details</h2>
        <div className="mt-3 rounded-xl border border-slate-200 bg-white p-6">
          <EventForm
            action={updateEvent.bind(null, event.id)}
            submitLabel="Save changes"
            defaults={{
              title: event.title,
              description: event.description ?? "",
              venue: event.venue ?? "",
              startsAt: toLocalInput(event.startsAt),
              endsAt: toLocalInput(event.endsAt),
              currency: event.currency,
            }}
          />
        </div>
      </section>
    </div>
  );
}
