import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@publeca/db";
import { getProviderMeta } from "@publeca/payments";
import { enabledProvidersForHost } from "@/lib/payment-config";
import { CheckoutForm } from "./checkout-form";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tt?: string }>;
}) {
  const { slug } = await params;
  const { tt } = await searchParams;

  const event = await prisma.event.findUnique({
    where: { slug },
    include: { ticketTypes: true },
  });
  if (!event || event.status !== "LIVE") notFound();

  const ticketType = event.ticketTypes.find((t) => t.id === tt);
  if (!ticketType) notFound();

  const soldOut = ticketType.quantityTotal - ticketType.quantitySold <= 0;

  const methods = (await enabledProvidersForHost(event.hostId))
    .map((id) => {
      const meta = getProviderMeta(id);
      return meta ? { id: meta.id, label: meta.label, kind: meta.kind } : null;
    })
    .filter((m): m is NonNullable<typeof m> => m !== null);

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <Link href={`/e/${slug}`} className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to event
      </Link>

      <h1 className="mt-3 text-2xl font-bold tracking-tight">Checkout</h1>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">{event.title}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-medium">{ticketType.name}</span>
          <span className="font-semibold">
            {event.currency} {ticketType.price.toString()}
          </span>
        </div>
      </div>

      {soldOut ? (
        <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          This ticket is sold out.
        </p>
      ) : (
        <div className="mt-6">
          <CheckoutForm ticketTypeId={ticketType.id} methods={methods} />
          <p className="mt-4 text-center text-xs text-slate-400">
            You'll be redirected to your chosen provider to pay securely.
          </p>
        </div>
      )}
    </main>
  );
}
