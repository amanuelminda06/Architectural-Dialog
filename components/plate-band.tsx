/**
 * plate-band.tsx — a thin, full-width architectural plate used only at the head
 * of the home feed (and nowhere else in the dossier).
 *
 * Rules: grayscale, low contrast, no overlay text, no borders, no rounded
 * corners, no gradients. The plate sits quietly above the issue header.
 */

const PLATE = "/plates/salk-band.jpg";

export function PlateBand() {
  return (
    <div className="w-full h-40 overflow-hidden bg-surface-container-low" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PLATE}
        alt=""
        className="w-full h-full object-cover object-center grayscale contrast-[0.9]"
        loading="eager"
      />
    </div>
  );
}

/* Safe alias so both call sites resolve, whichever the importer uses. */
export const PlateBand = MastheadPlate;
