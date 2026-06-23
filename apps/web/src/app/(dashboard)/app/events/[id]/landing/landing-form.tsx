"use client";

import { useActionState, useState } from "react";
import type { LandingState } from "./actions";

type Defaults = {
  accent: string;
  tagline: string;
  aboutHeading: string;
  aboutBody: string;
  heroImageUrl: string;
  videoUrl: string;
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
    <form action={formAction} className="space-y-8">
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
        <Text label="About heading" name="aboutHeading" defaultValue={defaults.aboutHeading} />
        <label className="block">
          <span className="text-sm font-medium text-slate-700">About text</span>
          <textarea
            name="aboutBody"
            rows={5}
            defaultValue={defaults.aboutBody}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </label>
      </Section>

      <Section title="Media">
        <MediaField
          label="Hero image"
          name="heroImageUrl"
          accept="image/*"
          defaultValue={defaults.heroImageUrl}
        />
        <MediaField
          label="Video (URL or upload)"
          name="videoUrl"
          accept="video/*"
          defaultValue={defaults.videoUrl}
          hint="Paste a YouTube/Vimeo/MP4 URL, or upload a file."
        />
      </Section>

      <Section
        title="Conversion tracking"
        subtitle="Paste your IDs — Publeca installs the code and fires a conversion when someone pays. No developer needed."
      >
        <Text label="Meta Pixel ID" name="metaPixelId" defaultValue={defaults.metaPixelId} />
        <Text
          label="Meta Conversions API token"
          name="metaCapiToken"
          defaultValue={defaults.metaCapiToken}
          hint="Optional but recommended — enables accurate server-side tracking."
        />
        <Text
          label="Google Ads ID (AW-XXXXXXXXX)"
          name="googleAdsId"
          defaultValue={defaults.googleAdsId}
        />
        <Text
          label="Google Ads conversion label"
          name="googleConversionLabel"
          defaultValue={defaults.googleConversionLabel}
        />
      </Section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save landing page"}
        </button>
        <a
          href={`/e/${slug}`}
          target="_blank"
          className="text-sm font-medium text-brand-600 hover:underline"
        >
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

// URL field + optional file upload. Upload posts to /api/uploads; if R2 isn't
// configured the endpoint returns 503 and we tell the user to paste a URL instead.
function MediaField({
  label,
  name,
  accept,
  defaultValue,
  hint,
}: {
  label: string;
  name: string;
  accept: string;
  defaultValue?: string;
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("Uploading…");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: fd });
      if (res.status === 503) {
        setStatus("Uploads not configured yet — paste a URL instead.");
        return;
      }
      if (!res.ok) throw new Error("upload failed");
      const json = (await res.json()) as { url: string };
      setUrl(json.url);
      setStatus("Uploaded ✓");
    } catch {
      setStatus("Upload failed — paste a URL instead.");
    }
  }

  return (
    <div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://…"
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      <div className="mt-2 flex items-center gap-3">
        <input type="file" accept={accept} onChange={onFile} className="text-xs text-slate-500" />
        {status && <span className="text-xs text-slate-400">{status}</span>}
      </div>
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </div>
  );
}
