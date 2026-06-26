import { notFound } from "next/navigation";
import { prisma } from "@publeca/db";
import { getProviderMeta } from "@publeca/payments";
import { MetaPixel, GoogleGtag } from "@/lib/tracking";
import { enabledProvidersForEvent } from "@/lib/payment-config";
import { SeatPicker } from "./seat-picker";

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function videoEmbed(url: string) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) return { type: "iframe" as const, src: `https://www.youtube.com/embed/${yt[1]}` };
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return { type: "iframe" as const, src: `https://player.vimeo.com/video/${vimeo[1]}` };
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { type: "video" as const, src: url };
  return { type: "iframe" as const, src: url };
}

type Block = { id: string; name: string; rows: number; seats: number; x: number; y: number; ticketTypeId?: string };

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
  const copy = (lp?.copyBlocks as Record<string, any> | null) ?? {};
  const accent = theme.accent ?? "#635bff";
  const video = lp?.videoUrl ? videoEmbed(lp.videoUrl) : null;
  const gallery: string[] = copy.gallery ?? [];
  const highlights: string[] = copy.highlights ?? [];
  const faq: { q: string; a: string }[] = copy.faq ?? [];
  const socials = (copy.socials as Record<string, string>) ?? {};
  const blocks: Block[] = (event.seatingMap as { blocks?: Block[] } | null)?.blocks ?? [];
  const ttById = new Map(event.ticketTypes.map((t) => [t.id, t]));

  // Assigned seating: load generated seats and group them into the interactive picker.
  const seatRows = await prisma.seat.findMany({
    where: { eventId: event.id },
    orderBy: [{ block: "asc" }, { row: "asc" }, { num: "asc" }],
  });
  const now = Date.now();
  const seatedTtIds = new Set(seatRows.map((s) => s.ticketTypeId).filter(Boolean) as string[]);
  const pickerBlocksMap = new Map<string, { name: string; price: number; seats: { id: string; row: number; num: number; taken: boolean }[] }>();
  for (const s of seatRows) {
    const tt = s.ticketTypeId ? ttById.get(s.ticketTypeId) : undefined;
    if (!tt) continue;
    if (!pickerBlocksMap.has(s.block))
      pickerBlocksMap.set(s.block, { name: s.block, price: Number(tt.price), seats: [] });
    const taken = s.status === "SOLD" || (s.status === "HELD" && s.holdExpiresAt != null && s.holdExpiresAt.getTime() > now);
    pickerBlocksMap.get(s.block)!.seats.push({ id: s.id, row: s.row, num: s.num, taken });
  }
  const pickerBlocks = [...pickerBlocksMap.values()];

  const methods = (await enabledProvidersForEvent(event))
    .map((id) => getProviderMeta(id))
    .filter((m): m is NonNullable<typeof m> => !!m)
    .map((m) => ({ id: m.id, label: m.label, kind: m.kind }));

  const mapEmbed =
    MAPS_KEY && (event.placeId || (event.venueLat != null && event.venueLng != null))
      ? `https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=${
          event.placeId ? `place_id:${event.placeId}` : `${event.venueLat},${event.venueLng}`
        }`
      : null;
  const mapsLink =
    event.mapsUrl ||
    (event.venue ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}` : null);

  return (
    <main className="min-h-screen bg-white">
      <MetaPixel id={lp?.metaPixelId} />
      <GoogleGtag id={lp?.googleAdsId} />

      {/* Hero */}
      <section className="relative">
        {lp?.heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={lp.heroImageUrl} alt={event.title} className="h-[44vh] w-full object-cover md:h-[60vh]" />
        ) : (
          <div className="h-[40vh] w-full md:h-[52vh]" style={{ background: `linear-gradient(135deg, ${accent}, #0f172a)` }} />
        )}
        <div className="mx-auto max-w-3xl px-6 py-10">
          <p className="text-sm font-semibold" style={{ color: accent }}>{event.host.name}</p>
          <h1 className="font-display mt-2 text-4xl font-bold tracking-tight md:text-5xl">{event.title}</h1>
          {copy.tagline && <p className="mt-3 text-lg text-slate-600">{copy.tagline}</p>}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            <span>
              📅{" "}
              {new Date(event.startsAt).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}
            </span>
            {copy.doorsOpen && <span>🚪 Doors {copy.doorsOpen}</span>}
            {event.venue && <span>📍 {event.venue}</span>}
          </div>
          <a
            href="#tickets"
            className="mt-7 inline-block rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            Get tickets
          </a>
        </div>
      </section>

      {/* About */}
      {(copy.aboutHeading || copy.aboutBody || event.description) && (
        <Section>
          {copy.aboutHeading && <h2 className="font-display text-2xl font-bold">{copy.aboutHeading}</h2>}
          <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">
            {copy.aboutBody || event.description}
          </p>
        </Section>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-bold">Highlights</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-slate-700">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: accent }}
                >
                  ✓
                </span>
                <span className="text-sm leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Video */}
      {video && (
        <Section>
          <div className="aspect-video overflow-hidden rounded-2xl bg-black">
            {video.type === "iframe" ? (
              <iframe src={video.src} className="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            ) : (
              <video src={video.src} controls className="h-full w-full" />
            )}
          </div>
        </Section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-bold">Gallery</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((g, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={g} alt="" className="aspect-square w-full rounded-xl border border-slate-100 object-cover" />
            ))}
          </div>
        </Section>
      )}

      {/* Assigned seating — interactive seat picker */}
      {pickerBlocks.length > 0 && (
        <section id="tickets" className="mx-auto max-w-3xl px-6 py-12">
          <div className="border-t border-slate-100 pt-8">
            <h2 className="font-display text-2xl font-bold">Choose your seats</h2>
            <div className="mb-4 mt-3 flex justify-center">
              <span className="rounded-full bg-slate-800 px-6 py-1 text-xs font-semibold text-white">STAGE</span>
            </div>
            <SeatPicker blocks={pickerBlocks} currency={event.currency} accent={accent} methods={methods} />
          </div>
        </section>
      )}

      {/* Static seating preview (blocks defined but no seats generated) */}
      {pickerBlocks.length === 0 && blocks.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-bold">Seating</h2>
          <div className="relative mt-5 h-72 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-slate-800 px-4 py-1 text-xs font-semibold text-white">
              STAGE
            </div>
            {blocks.map((b) => (
              <div
                key={b.id}
                className="absolute flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border-2 px-2 py-1.5 text-center text-xs"
                style={{ left: `${b.x}%`, top: `${b.y}%`, borderColor: accent, backgroundColor: "#fff" }}
              >
                <span className="font-semibold text-slate-900">{b.name}</span>
                <span className="text-slate-500">{b.rows}×{b.seats} seats</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* General-admission tickets (excludes seated types) */}
      {event.ticketTypes.some((t) => !seatedTtIds.has(t.id)) && (
      <section id={pickerBlocks.length > 0 ? undefined : "tickets"} className="mx-auto max-w-3xl px-6 py-12">
        <h2 className="font-display text-2xl font-bold">Tickets</h2>
        <div className="mt-4 space-y-3">
          {event.ticketTypes.filter((t) => !seatedTtIds.has(t.id)).map((t) => {
            const remaining = t.quantityTotal - t.quantitySold;
            const soldOut = remaining <= 0;
            return (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-slate-500">
                    {event.currency} {t.price.toString()}
                    {!soldOut && remaining <= 10 ? ` · only ${remaining} left` : ""}
                  </p>
                </div>
                {soldOut ? (
                  <span className="rounded-full bg-slate-200 px-5 py-2 text-sm font-semibold text-slate-500">Sold out</span>
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
        </div>
      </section>
      )}

      {/* Venue map */}
      {(mapEmbed || mapsLink) && (
        <Section>
          <h2 className="font-display text-2xl font-bold">Getting there</h2>
          {event.venue && <p className="mt-1 text-slate-600">{event.venue}</p>}
          {mapEmbed ? (
            <iframe
              src={mapEmbed}
              className="mt-4 h-72 w-full rounded-2xl border border-slate-200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            mapsLink && (
              <a
                href={mapsLink}
                target="_blank"
                className="mt-4 inline-block rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              >
                View on Google Maps ↗
              </a>
            )
          )}
        </Section>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-bold">FAQ</h2>
          <div className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200">
            {faq.map((f, i) => (
              <details key={i} className="group p-5">
                <summary className="cursor-pointer list-none font-medium text-slate-900">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      )}

      {/* Socials + footer */}
      <section className="border-t border-slate-100">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-10 text-center">
          {(socials.instagram || socials.facebook || socials.website) && (
            <div className="flex gap-4 text-sm font-medium text-slate-600">
              {socials.instagram && <a href={socials.instagram} target="_blank" className="hover:text-slate-900">Instagram</a>}
              {socials.facebook && <a href={socials.facebook} target="_blank" className="hover:text-slate-900">Facebook</a>}
              {socials.website && <a href={socials.website} target="_blank" className="hover:text-slate-900">Website</a>}
            </div>
          )}
          <p className="text-xs text-slate-400">
            Powered by <span className="font-semibold">Publeca</span>
          </p>
        </div>
      </section>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-8">
      <div className="border-t border-slate-100 pt-8">{children}</div>
    </section>
  );
}
