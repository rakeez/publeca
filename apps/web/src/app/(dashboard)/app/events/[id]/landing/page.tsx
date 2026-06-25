import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@publeca/db";
import { getCurrentHost } from "@/lib/session";
import { manageableHostIds } from "@/lib/access";
import { upsertLandingPage } from "./actions";
import { LandingForm } from "./landing-form";

export default async function LandingEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const host = await getCurrentHost();

  const event = await prisma.event.findUnique({
    where: { id },
    include: { landingPage: true },
  });
  if (!event) notFound();
  const allowed = await manageableHostIds(host.id);
  if (!allowed.includes(event.hostId)) redirect("/app/events");

  const lp = event.landingPage;
  const theme = (lp?.theme as { accent?: string } | null) ?? {};
  const copy = (lp?.copyBlocks as Record<string, unknown> | null) ?? {};
  const socials = (copy.socials as Record<string, string> | undefined) ?? {};
  const gallery = (copy.gallery as string[] | undefined) ?? [];
  const faq = (copy.faq as { q: string; a: string }[] | undefined) ?? [];

  return (
    <div className="max-w-2xl">
      <Link href={`/app/events/${id}`} className="text-sm text-slate-500 hover:text-slate-900">
        ← {event.title}
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Landing page</h1>
      <p className="mt-1 text-slate-600">
        Customize your public event page at{" "}
        <span className="font-mono text-slate-700">/e/{event.slug}</span>.
      </p>

      <div className="mt-8">
        <LandingForm
          action={upsertLandingPage.bind(null, id)}
          slug={event.slug}
          defaults={{
            accent: theme.accent ?? "#635bff",
            tagline: (copy.tagline as string) ?? "",
            aboutHeading: (copy.aboutHeading as string) ?? "",
            aboutBody: (copy.aboutBody as string) ?? "",
            doorsOpen: (copy.doorsOpen as string) ?? "",
            highlights: ((copy.highlights as string[]) ?? []).join("\n"),
            faq: faq.map((f) => `${f.q} :: ${f.a}`).join("\n"),
            gallery,
            heroImageUrl: lp?.heroImageUrl ?? "",
            videoUrl: lp?.videoUrl ?? "",
            instagram: socials.instagram ?? "",
            facebook: socials.facebook ?? "",
            website: socials.website ?? "",
            metaPixelId: lp?.metaPixelId ?? "",
            metaCapiToken: lp?.metaCapiToken ?? "",
            googleAdsId: lp?.googleAdsId ?? "",
            googleConversionLabel: lp?.googleConversionLabel ?? "",
          }}
        />
      </div>
    </div>
  );
}
