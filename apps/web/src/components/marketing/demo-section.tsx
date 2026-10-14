import { DEMO_COPY } from "@/lib/content/demos";
import type { DemoId, DemoSection as DemoSectionContent } from "@/lib/content/types";
import { DemoStage } from "./demos";
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
      <DemoStage id={id} title={copy.title} />
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
