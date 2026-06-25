"use client";

import { useActionState } from "react";
import type { LandingState } from "./actions";
import { MediaUploader } from "@/components/media-upload";

type Defaults = {
  accent: string;
  tagline: string;
  aboutHeading: string;
  aboutBody: string;
  doorsOpen: string;
  highlights: string;
  faq: string;
  gallery: string[];
  heroImageUrl: string;
  videoUrl: string;
  instagram: string;
  facebook: string;
  website: string;
  metaPixelId: string;
  metaCapiToken: string;
  googleAdsId: string;
  googleConversionLabel: string;
};

export function LandingForm({
  action,
  slug,
  defaults,
}: {
  action: (prev: LandingState, fd: FormData) => Promise<LandingState>;
  slug: string;
  defaults: Defaults;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null } as LandingState);

  return (
    <form action={formAction} className="space-y-6">
      <Section title="Branding">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Accent color</span>
          <input
            type="color"
            name="accent"
            defaultValue={defaults.accent}
            className="mt-1 h-10 w-20 cursor-pointer rounded border border-slate-200"
          />
        </label>
      </Section>

      <Section title="Content">
        <Text label="Tagline (under the title)" name="tagline" defaultValue={defaults.tagline} />
        <Text label="Doors open" name="doorsOpen" defaultValue={defaults.doorsOpen} hint="e.g. 7:00 PM" />
        <Text label="About heading" name="aboutHeading" defaultValue={defaults.aboutHeading} />
        <Area label="About text" name="aboutBody" defaultValue={defaults.aboutBody} rows={5} />
        <Area
          label="Highlights"
          name="highlights"
          defaultValue={defaults.highlights}
          rows={4}
          hint="One per line — shown as a checklist."
        />
      </Section>

      <Section title="Media">
        <MediaUploader label="Hero image" name="heroImageUrl" accept="image/*" defaultValue={defaults.heroImageUrl} />
        <MediaUploader
          label="Video"
          name="videoUrl"
          accept="video/*"
          defaultValue={defaults.videoUrl}
          hint="Paste a YouTube/Vimeo/MP4 URL, or upload."
        />
      </Section>

      <Section title="Photo gallery">
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <MediaUploader
              key={i}
              label={`Image ${i + 1}`}
              name={`gallery${i}`}
              accept="image/*"
              defaultValue={defaults.gallery[i] ?? ""}
            />
          ))}
        </div>
      </Section>

      <Section title="FAQ">
        <Area
          label="Questions & answers"
          name="faq"
          defaultValue={defaults.faq}
          rows={5}
          hint="One per line, format: Question :: Answer"
        />
      </Section>

      <Section title="Social links">
        <Text label="Instagram URL" name="instagram" defaultValue={defaults.instagram} />
        <Text label="Facebook URL" name="facebook" defaultValue={defaults.facebook} />
        <Text label="Website URL" name="website" defaultValue={defaults.website} />
      </Section>

      <Section
        title="Conversion tracking"
        subtitle="Paste your IDs — Publeca installs the code and fires a conversion when someone pays."
      >
        <Text label="Meta Pixel ID" name="metaPixelId" defaultValue={defaults.metaPixelId} />
        <Text label="Meta Conversions API token" name="metaCapiToken" defaultValue={defaults.metaCapiToken} />
        <Text label="Google Ads ID (AW-XXXXXXXXX)" name="googleAdsId" defaultValue={defaults.googleAdsId} />
        <Text label="Google Ads conversion label" name="googleConversionLabel" defaultValue={defaults.googleConversionLabel} />
      </Section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save landing page"}
        </button>
        <a href={`/e/${slug}`} target="_blank" className="text-sm font-medium text-brand-600 hover:underline">
          Preview ↗
        </a>
        {state?.ok && <span className="text-sm text-emerald-600">Saved ✓</span>}
        {state?.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Text({
  label,
  name,
  defaultValue,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

function Area({
  label,
  name,
  defaultValue,
  rows = 4,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}
