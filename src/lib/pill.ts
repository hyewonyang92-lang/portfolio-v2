// Shared Pill/Tag styling per the AND2ES-derived design system: every
// interactive nav/label element is the same black "pill" that inverts to
// gray on hover/active; static metadata uses the gray "tag". State is
// communicated only through this background/text color flip — no size,
// shadow, or position change.

const BASE =
  "inline-flex items-center justify-center rounded-[var(--radius-sm)] px-[0.6rem] py-[0.423rem] text-[11px] font-medium uppercase tracking-[0.012em] transition-colors duration-200 ease-in-out";

export function pillClass(active = false, className = "") {
  return `${BASE} ${
    active
      ? "bg-[var(--color-gray)] text-[var(--color-text)]"
      : "bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-gray)] hover:text-[var(--color-text)]"
  } ${className}`.trim();
}

// The logo and other permanent-emphasis pills stay black even on hover.
export function pillStaticClass(className = "") {
  return `${BASE} bg-[var(--color-text)] text-[var(--color-bg)] ${className}`.trim();
}

export function tagClass(className = "") {
  return `${BASE} bg-[var(--color-gray)] text-[var(--color-text)] ${className}`.trim();
}
