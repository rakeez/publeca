import { notFound } from "next/navigation";
import { prisma } from "@publeca/db";

// Per-event public landing page. Shared structure, host-customized content.
// Conversion pixels (Meta + Google Ads) are injected from LandingPage settings.
export default async function EventLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: { slug },
    include: { ticketTypes: true, landingPage: true, host: true },
  });

  if (!event || event.status !== "LIVE") notFound();

  const lp = event.landingPage;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero — host-customizable image/video + copy */}
      <section className="relative">
        {lp?.heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={lp.heroImageUrl}
            alt={event.title}
            className="h-[42vh] w-full object-cover md:h-[56vh]"
          />
        ) : (
          <div className="h-[42vh] w-full bg-gradient-to-br from-brand-500 to-emerald-500 md:h-[56vh]" />
        )}
        <div className="mx-auto max-w-3xl px-6 py-10">
          <p className="text-sm font-medium text-brand-600">{event.host.name}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{event.title}</h1>
          {event.venue && <p className="mt-2 text-slate-600">{event.venue}</p>}
          <p className="mt-1 text-slate-600">
            {new Date(event.startsAt).toLocaleString("en-GB", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
          {event.description && (
            <p className="mt-6 whitespace-pre-line leading-relaxed text-slate-700">
              {event.description}
            </p>
          )}
        </div>
      </section>

      {/* Ticket selection + checkout (wired in Phase 2) */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="text-xl font-semibold">Tickets</h2>
        <div className="mt-4 space-y-3">
          {event.ticketTypes.map((t) => {
            const remaining = t.quantityTotal - t.quantitySold;
            const soldOut = remaining <= 0;
            return (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
              >
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-slate-500">
                    {event.currency} {t.price.toString()}
                    {!soldOut && remaining <= 10 ? ` · only ${remaining} left` : ""}
                  </p>
                </div>
                {soldOut ? (
                  <span className="rounded-full bg-slate-200 px-5 py-2 text-sm font-semibold text-slate-500">
                    Sold out
                  </span>
                ) : (
                  <a
                    href={`/e/${event.slug}/checkout?tt=${t.id}`}
                    className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
                  >
                    Buy
                  </a>
                )}
              </div>
            );
          })}
          {event.ticketTypes.length === 0 && (
            <p className="text-sm text-slate-500">Tickets coming soon.</p>
          )}
        </div>
      </section>

      {/* Conversion tracking placeholders — populated in Phase 3 */}
      {lp?.metaPixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `/* Meta Pixel ${lp.metaPixelId} injected in Phase 3 */`,
          }}
        />
      )}
      {lp?.googleAdsId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `/* Google Ads ${lp.googleAdsId} injected in Phase 3 */`,
          }}
        />
      )}
    </main>
  );
}
