import { notFound, redirect } from "next/navigation";
import { prisma } from "@publeca/db";
import { getProvider } from "@publeca/payments";

// Builds the signed PayHere checkout form server-side (secret never reaches the client)
// and auto-submits it to PayHere. PayHere then redirects back to /pay/return and
// independently calls our notify webhook (the real source of truth).
export default async function PayPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ phone?: string }>;
}) {
  const { orderId } = await params;
  const { phone } = await searchParams;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { event: true },
  });
  if (!order) notFound();
  if (order.status === "PAID") redirect(`/pay/return?order=${order.id}`);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const [firstName, ...rest] = order.buyerName.split(" ");

  const checkout = getProvider("payhere").createCheckout(
    {
      orderId: order.id,
      amount: Number(order.amount),
      currency: order.currency,
      itemsDescription: order.event.title,
      customer: {
        firstName: firstName ?? order.buyerName,
        lastName: rest.join(" ") || "-",
        email: order.buyerEmail,
        phone: phone ?? "",
      },
      returnUrl: `${appUrl}/pay/return?order=${order.id}`,
      cancelUrl: `${appUrl}/e/${order.event.slug}`,
      notifyUrl: `${appUrl}/api/payments/payhere/notify`,
    },
    {
      merchantId: process.env.PAYHERE_MERCHANT_ID ?? "",
      merchantSecret: process.env.PAYHERE_MERCHANT_SECRET ?? "",
      sandbox: process.env.PAYHERE_SANDBOX !== "false",
    }
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6">
      <p className="text-slate-600">Redirecting you to PayHere…</p>

      <form id="payhere" method={checkout.method} action={checkout.actionUrl}>
        {Object.entries(checkout.fields).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
        <noscript>
          <button
            type="submit"
            className="mt-4 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
          >
            Continue to PayHere
          </button>
        </noscript>
      </form>

      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('payhere').submit();`,
        }}
      />
    </main>
  );
}
