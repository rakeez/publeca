// The real Publeca mark (transparent PNG in /public). Height is set by the caller's
// className (e.g. h-7); width stays auto so the portrait mark keeps its proportions.

export function LogoMark({ className = "h-8" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/publeca-logo.png"
      alt="Publeca"
      className={`${className} object-contain`}
      style={{ width: "auto" }}
    />
  );
}

export function Logo({
  className = "",
  markClassName = "h-7",
  wordClassName = "text-xl font-bold tracking-tight",
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className={markClassName} />
      <span className={wordClassName}>Publeca</span>
    </span>
  );
}
