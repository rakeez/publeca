// Faithful trace of the original Publeca mark: an organic "P" — a rounded bowl,
// a spine that curls into a tail at the lower-left, and a tilted teardrop counter.
// The counter is a true knockout (mask) so the mark works on any background.
// Uses currentColor — set text color to brand the mark.

const MARK_PATHS = (
  <>
    {/* spine + curling tail */}
    <path
      d="M455 175 C 415 340 430 470 445 575 C 462 700 420 825 305 880"
      fill="none"
      stroke="currentColor"
      strokeWidth="250"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* bowl */}
    <ellipse cx="600" cy="320" rx="295" ry="280" transform="rotate(-6 600 320)" />
  </>
);

const COUNTER = (
  <g transform="translate(610 340) rotate(-32)">
    <path d="M0 -165 C 104 -165 165 -62 140 60 C 124 142 64 202 0 226 C -64 202 -124 142 -140 60 C -165 -62 -104 -165 0 -165 Z" />
  </g>
);

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 1000" className={className} role="img" aria-label="Publeca">
      <defs>
        <mask id="publeca-counter">
          <rect width="1000" height="1000" fill="white" />
          <g fill="black">{COUNTER}</g>
        </mask>
      </defs>
      <g mask="url(#publeca-counter)" fill="currentColor">
        {MARK_PATHS}
      </g>
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-7 w-7",
  wordClassName = "text-xl font-bold tracking-tight",
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="text-brand-500">
        <LogoMark className={markClassName} />
      </span>
      <span className={wordClassName}>Publeca</span>
    </span>
  );
}
