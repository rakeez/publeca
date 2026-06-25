import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { manageableHostIds } from "@/lib/access";
import { saveSeating } from "./actions";
import { SeatingBuilder } from "./seating-builder";

type Block = { id: string; name: string; rows: number; seats: number; x: number; y: number; ticketTypeId?: string };

export default async function SeatingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const host = await getCurrentHost();

  const event = await prisma.event.findUnique({
    where: { id },
    include: { ticketTypes: { orderBy: { createdAt: "asc" } } },
  });
  if (!event) notFound();
  const allowed = await manageableHostIds(host.id);
  if (!allowed.includes(event.hostId)) redirect("/app/events");

  const blocks: Block[] = (event.seatingMap as { blocks?: Block[] } | null)?.blocks ?? [];
  const ticketTypes = event.ticketTypes.map((t) => ({ id: t.id, name: t.name, price: t.price.toString() }));

  return (
    <div className="max-w-3xl">
      <Link href={`/app/events/${id}`} className="text-sm text-slate-500 hover:text-slate-900">
        ← {event.title}
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Seating arrangement</h1>
      <p className="mt-1 text-slate-600">
        Create blocks, set rows × seats, link each to a ticket type, and drag them into place.
        The layout shows on your event page.
      </p>

      {ticketTypes.length === 0 && (
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Tip: add ticket types on the event first so you can link blocks to them (and their prices).
        </p>
      )}

      <div className="mt-6">
        <SeatingBuilder action={saveSeating.bind(null, id)} ticketTypes={ticketTypes} initial={blocks} />
      </div>
    </div>
  );
}
