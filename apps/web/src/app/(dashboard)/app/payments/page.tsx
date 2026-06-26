import { prisma } from "@publeca/db";
import { getProviderMeta, type ProviderId } from "@publeca/payments";
import { getCurrentHost } from "@/lib/session";
import { AddAccountForm } from "./add-account-form";
import { setAccountEnabled, removeAccount } from "./actions";

export default async function PaymentsPage() {
  const host = await getCurrentHost();
  const accounts = await prisma.paymentConfig.findMany({
    where: { hostId: host.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
      <p className="mt-1 text-slate-600">
        Connect your own merchant accounts. Add as many as you like, then choose which to
        offer on each event. Funds settle straight to you.
      </p>

      {/* Existing accounts */}
      <h2 className="mt-8 text-lg font-semibold">Your accounts</h2>
      <div className="mt-3 space-y-3">
        {accounts.map((a) => {
          const meta = getProviderMeta(a.provider as ProviderId);
          return (
            <div
              key={a.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900">{a.label}</p>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {meta?.label ?? a.provider}
                  </span>
                  {meta?.kind === "bnpl" && (
                    <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">
                      BNPL
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      a.enabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {a.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <form action={setAccountEnabled.bind(null, a.id, !a.enabled)}>
                  <button className="text-sm font-medium text-slate-600 hover:underline">
                    {a.enabled ? "Disable" : "Enable"}
                  </button>
                </form>
                <form action={removeAccount.bind(null, a.id)}>
                  <button className="text-sm font-medium text-red-600 hover:underline">Remove</button>
                </form>
              </div>
            </div>
          );
        })}
        {accounts.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            No accounts yet. Add one below to start taking payments.
          </p>
        )}
      </div>

      <div className="mt-8">
        <AddAccountForm />
      </div>

      <p className="mt-6 text-xs text-slate-400">
        If you don't connect PayHere, Publeca's platform PayHere is offered as a fallback so
        you can start selling immediately.
      </p>
    </div>
  );
}
