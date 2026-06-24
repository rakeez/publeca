import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { accessibleHostIds } from "@/lib/access";
import { refundOrder } from "./actions";

const statusStyles: Record<string, string> = {
  PAID: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-amber-100 text-amber-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-slate-200 text-slate-600",
};

export default async function OrdersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const host = await getCurrentHost();

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();
  const hostIds = await accessibleHostIds(host.id);
  if (!hostIds.includes(event.hostId)) redirect("/app/events");

  const orders = await prisma.order.findMany({
    where: { eventId: id },
    include: { tickets: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl">
      <Link href={`/app/events/${id}`} className="text-sm text-slate-500 hover:text-slate-900">
        ← {event.title}
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Orders</h1>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Buyer</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Via</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{o.buyerName}</p>
                  <p className="text-xs text-slate-400">{o.buyerEmail}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {o.currency} {o.amount.toString()}
                </td>
                <td className="px-4 py-3 capitalize text-slate-600">{o.provider}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {o.status === "PAID" && (
                    <form action={refundOrder.bind(null, id, o.id)}>
                      <button className="text-sm font-medium text-red-600 hover:underline">
                        Refund
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Refunding voids the tickets and releases the seats back to your inventory. Move the
        money in your payment gateway dashboard to complete the refund to the buyer.
      </p>
    </div>
  );
}
