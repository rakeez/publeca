import { DEMO_COPY } from "@/lib/content/demos";
import type { DemoId, DemoSection as DemoSectionContent } from "@/lib/content/types";
import { Demo } from "./demos";
import { SectionHeading } from "./ui";

/**
 * One deliverable demo on a card (playbook R5): the stage with a visible "Sample data" label,
 * then the deliverable in bold followed by its specifics, then the show-your-working note.
 */
export function DemoCard({ id, index = 0 }: { id: DemoId; index?: number }) {
  const copy = DEMO_COPY[id];
  return (
    <figure
      data-reveal
      style={{ "--reveal-i": index } as React.CSSProperties}
      aria-label={copy.label}
      className="flex flex-col rounded-3xl border border-slate-200 bg-white p-3 md:p-4"
    >
      <div className="relative rounded-2xl bg-slate-50 p-3.5 pt-11 md:p-4 md:pt-12">
        {/* Window chrome: the demos read as product screenshots (docs/design-system.md). */}
        <span className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
          </span>
          <span className="mono-label text-slate-400">Sample data</span>
        </span>
        <Demo id={id} />
      </div>
      <figcaption className="mt-4 flex flex-1 flex-col px-2 pb-2">
        <p className="leading-relaxed text-slate-600">
          <strong className="font-bold text-slate-900">{copy.title}.</strong> {copy.body}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{copy.note}</p>
      </figcaption>
    </figure>
  );
}

/** "Shown, not described": a heading and up to three demos. */
export function DemoSection({ content, eyebrow = "Shown, not described" }: { content: DemoSectionContent; eyebrow?: string }) {
  return (
    <>
      <SectionHeading eyebrow={eyebrow} heading={content.heading} headingDim={content.headingDim} intro={content.intro} />
      {/* Stacked on phones (a demo needs the full width), a grid from md up. */}
      <div className={`mt-10 grid gap-5 md:grid-cols-2 ${content.items.length >= 3 ? "lg:grid-cols-3" : ""}`}>
        {content.items.map((id, i) => (
          <DemoCard key={id} id={id} index={i} />
        ))}
      </div>
    </>
  );
}
