/**
 * arch-motifs.tsx — thin-stroke, monochrome line-art used sparingly across the
 * dossier: section dividers, empty/error states, and quiet masthead cartouches.
 *
 * DESIGN rules: 1–1.5px hairline strokes, square caps, no fills, no gradients,
 * no color stops, no shading. Ink (on-surface/currentColor) or terracotta
 * (text-primary) only. Used sparingly; never as decoration noise.
 */

const strokeBase = "fill-none stroke-current";

export function ColumnCapital({
  className = "w-14 h-14",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={`${className} text-primary`} aria-hidden>
      <g
        className={strokeBase}
        strokeWidth={1.2}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M14 12 V8 H50 V12" />
        <path d="M14 12 Q32 7 50 12" />
        <path d="M14 12 V16 H50 V12" />
        <path d="M14 20 H50 M14 28 H50" />
        <path d="M14 16 V20 M22 16 V20 M30 16 V20 M38 16 V20 M46 16 V20" />
        <path d="M14 20 Q32 18 50 20" />
        <path d="M14 28 V36 H50 V28" />
        <path d="M14 36 L20 40 M20 40 V42 M14 42 H50 M40 42 V40 L50 36" />
        <path d="M20 36 H44 M22 33 H42" />
      </g>
    </svg>
  );
}

export function ArchMotif({
  className = "w-14 h-14",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={`${className} text-primary`} aria-hidden>
      <g
        className={strokeBase}
        strokeWidth={1.2}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M12 50 V36 A20 20 0 0 1 52 36 V50" />
        <path d="M12 40 A20 20 0 0 1 52 40" />
        <path d="M12 44 A20 20 0 0 1 52 44" />
        <path d="M12 50 H52" />
        <path d="M20 50 V38 A12 12 0 0 1 44 38 V50" />
        <path d="M20 38 A12 12 0 0 1 44 38" />
        <path d="M12 50 V54 H52 V50" />
      </g>
    </svg>
  );
}

export function FloorPlanMotif({
  className = "w-14 h-14",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={`${className} text-primary`} aria-hidden>
      <g
        className={strokeBase}
        strokeWidth={1.2}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <rect x="10" y="10" width="44" height="44" />
        <path d="M10 20 H18 M18 20 V28 M18 28 H26 M18 32 H10" />
        <path d="M26 28 V20 M26 28 H34 M34 20 V32 H26" />
        <path d="M34 28 H42 M42 28 V40 M42 40 H34 M34 40 V48 M34 48 H46 M46 48 V40" />
        <path d="M10 40 H18 M18 46 H10 M18 52 H26 M24 52 V58 M10 58 H32" />
        <path d="M44 36 H50 M50 36 V44 M44 44 H50" />
        <path d="M46 12 V20 M48 20 V28" />
      </g>
    </svg>
  );
}

export function BrickCoursing({
  className = "w-full h-6",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 320 28" className={`${className} text-primary`} aria-hidden preserveAspectRatio="none">
      <g
        className={strokeBase}
        strokeWidth={1}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <line x1="0" y1="6" x2="320" y2="6" />
        <line x1="0" y1="14" x2="320" y2="14" />
        <line x1="0" y1="22" x2="320" y2="22" />
        <path d="M16 0 V6 M40 0 V6 M64 0 V6 M88 0 V6 M112 0 V6 M136 0 V6 M160 0 V6 M184 0 V6 M208 0 V6 M232 0 V6 M256 0 V6 M280 0 V6 M304 0 V6" />
        <path d="M8 6 V14 M32 6 V14 M56 6 V14 M80 6 V14 M104 6 V14 M128 6 V14 M152 6 V14 M176 6 V14 M200 6 V14 M224 6 V14 M248 6 V14 M272 6 V14 M296 6 V14" />
        <path d="M16 14 V22 M40 14 V22 M64 14 V22 M88 14 V22 M112 14 V22 M136 14 V22 M160 14 V22 M184 14 V22 M208 14 V22 M232 14 V22 M256 14 V22 M280 14 V22 M304 14 V22" />
        <path d="M8 22 V28 M24 22 V28 M40 22 V28 M56 22 V28 M72 22 V28 M88 22 V28 M104 22 V28 M120 22 V28 M136 22 V28 M152 22 V28 M168 22 V28 M184 22 V28 M200 22 V28 M216 22 V28 M232 22 V28 M248 22 V28 M264 22 V28 M280 22 V28 M296 22 V28 M312 22 V28" />
      </g>
    </svg>
  );
}

export function ArchDivider({
  className = "w-12 h-10",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 48" className={`${className} text-primary`} aria-hidden>
      <g
        className={strokeBase}
        strokeWidth={1.2}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M6 44 V30 A26 22 0 0 1 58 30 V44" />
        <path d="M6 38 A26 22 0 0 1 58 38" />
        <path d="M6 44 H58" />
        <path d="M14 44 V34 A18 14 0 0 1 50 34 V44" />
        <path d="M10 44 V42 H58 M18 30 H22 M42 30 H46" />
      </g>
    </svg>
  );
}
