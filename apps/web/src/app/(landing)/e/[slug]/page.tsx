import { notFound } from "next/navigation";
import { prisma } from "@publeca/db";
import { MetaPixel, GoogleGtag } from "@/lib/tracking";

function videoEmbed(url: string) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) return { type: "iframe" as const, src: `https://www.youtube.com/embed/${yt[1]}` };
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return { type: "iframe" as const, src: `https://player.vimeo.com/video/${vimeo[1]}` };
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { type: "video" as const, src: url };
  return { type: "iframe" as const, src: url };
}

export default async function EventLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: { slug },
    include: { ticketTypes: { orderBy: { createdAt: "asc" } }, landingPage: true, host: true },
  });
  if (!event || event.status !== "LIVE") notFound();

  const lp = event.landingPage;
  const theme = (lp?.theme as { accent?: string } | null) ?? {};
  const copy =
    (lp?.copyBlocks as { tagline?: string; aboutHeading?: string; aboutBody?: string } | null) ??
    {};
  const accent = theme.accent ?? "#635bff";
  const video = lp?.videoUrl ? videoEmbed(lp.videoUrl) : null;

  return (
    <main className="min-h-screen bg-white">
      <MetaPixel id={lp?.metaPixelId} />
      <GoogleGtag id={lp?.googleAdsId} />

      {/* Hero */}
      <section className="relative">
        {lp?.heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={lp.heroImageUrl}
            alt={event.title}
            className="h-[42vh] w-full object-cover md:h-[56vh]"
          />
        ) : (
          <div
            className="h-[42vh] w-full md:h-[56vh]"
            style={{ background: `linear-gradient(135deg, ${accent}, #10b981)` }}
          />
        )}
        <div className="mx-auto max-w-3xl px-6 py-10">
          <p className="text-sm font-medium" style={{ color: accent }}>
            {event.host.name}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{event.title}</h1>
          {copy.tagline && <p className="mt-2 text-lg text-slate-600">{copy.tagline}</p>}
          {event.venue && <p className="mt-3 text-slate-600">{event.venue}</p>}
          <p className="mt-1 text-slate-600">
            {new Date(event.startsAt).toLocaleString("en-GB", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
        </div>
      </section>

      {/* About */}
      {(copy.aboutHeading || copy.aboutBody || event.description) && (
        <section className="mx-auto max-w-3xl px-6 pb-6">
          {copy.aboutHeading && (
            <h2 className="text-xl font-semibold">{copy.aboutHeading}</h2>
          )}
          <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">
            {copy.aboutBody || event.description}
          </p>
        </section>
      )}

      {/* Video */}
      {video && (
        <section className="mx-auto max-w-3xl px-6 pb-6">
          <div className="aspect-video overflow-hidden rounded-xl bg-black">
            {video.type === "iframe" ? (
              <iframe
                src={video.src}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={video.src} controls className="h-full w-full" />
            )}
          </div>
        </section>
      )}

      {/* Tickets */}
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-4">
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
                    className="rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: accent }}
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
    </main>
  );
}
