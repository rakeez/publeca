import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { InviteForm } from "./invite-form";
import { removeMember } from "./actions";

export default async function TeamPage() {
  const host = await getCurrentHost();

  const [team, partOf] = await Promise.all([
    prisma.teamMember.findMany({
      where: { ownerId: host.id },
      include: { member: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.teamMember.findMany({
      where: { memberId: host.id },
      include: { owner: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight">Team</h1>
      <p className="mt-1 text-slate-600">
        Invite teammates to help run your events. Managers get full event access; staff can
        scan tickets and view attendees. Payment settings stay private to you.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Invite a teammate</h2>
        <p className="mt-1 text-sm text-slate-500">
          If they don't have a Publeca account yet, access activates automatically when they
          sign up with this email.
        </p>
        <div className="mt-4">
          <InviteForm />
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Your team</h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-slate-100">
            {team.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{m.member?.name ?? m.memberEmail}</p>
                  <p className="text-xs text-slate-400">
                    {m.memberEmail}
                    {!m.memberId && " · pending signup"}
                  </p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {m.role === "MANAGER" ? "Manager" : "Staff"}
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={removeMember.bind(null, m.id)}>
                    <button className="text-sm font-medium text-red-600 hover:underline">
                      Remove
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {team.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500">No teammates yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {partOf.length > 0 && (
        <>
          <h2 className="mt-8 text-lg font-semibold">Events you help with</h2>
          <div className="mt-3 space-y-2">
            {partOf.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
              >
                <span className="font-medium">{m.owner.name}</span>
                <span className="text-slate-500">{m.role === "MANAGER" ? "Manager" : "Staff"}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
