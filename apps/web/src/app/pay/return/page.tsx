import Link from "next/link";
import { prisma } from "@publeca/db";

// Where PayHere sends the buyer after payment. Status here is informational only —
// the notify webhook is authoritative — so we show a friendly state and tell them
// to check their email for the ticket.
export default async function PayReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;
  const order = orderId
    ? await prisma.order.findUnique({ where: { id: orderId }, include: { event: true } })
    : null;

  const paid = order?.status === "PAID";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-10">
        <div className="text-5xl">{paid ? "🎟️" : "⏳"}</div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          {paid ? "You're in!" : "Payment processing"}
        </h1>
        <p className="mt-3 text-slate-600">
          {paid
            ? "Your ticket has been emailed to you with a QR code. Show it at the door."
            : "We're confirming your payment. Your ticket will arrive by email shortly — you can safely close this page."}
        </p>
        {order?.event && (
          <Link
            href={`/e/${order.event.slug}`}
            className="mt-6 inline-block text-sm font-medium text-brand-600 hover:underline"
          >
            Back to {order.event.title}
          </Link>
        )}
      </div>
    </main>
  );
}
