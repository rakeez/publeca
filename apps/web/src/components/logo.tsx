// Refined version of the 2017 Publeca mark: a bold "P" with a teardrop counter
// and a left-curling tail. The counter is a true knockout (via mask) so the mark
// works on any background. Uses currentColor — set text color to brand the mark.

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 165" className={className} role="img" aria-label="Publeca">
      <defs>
        <mask id="publeca-counter">
          <rect width="120" height="165" fill="white" />
          {/* teardrop hole, pointing toward the stem (lower-left) */}
          <g transform="translate(82 44) rotate(-38)">
            <path
              d="M0 -19 C 12 -19 18 -7 16 6 C 14 16 6 23 0 26 C -6 23 -14 16 -16 6 C -18 -7 -12 -19 0 -19 Z"
              fill="black"
            />
          </g>
        </mask>
      </defs>
      <g mask="url(#publeca-counter)" fill="currentColor">
        {/* tail (drawn first, under the body) */}
        <path
          d="M50 110 C 50 134 40 147 22 146"
          fill="none"
          stroke="currentColor"
          strokeWidth="30"
          strokeLinecap="round"
        />
        {/* stem */}
        <rect x="35" y="20" width="30" height="100" rx="15" />
        {/* bowl */}
        <circle cx="74" cy="48" r="45" />
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
