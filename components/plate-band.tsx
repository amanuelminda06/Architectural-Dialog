/**
 * plate-band.tsx — a quiet, full-width grayscale architectural plate used ONLY
 * at the head of the home feed (and nowhere else in the dossier). No overlay
 * text, no borders, no rounded corners, no gradients — grayscale, low contrast,
 * thin and silent.
 */

const LOUS_PLATE = "/plates/salk-band.jpg";

export function PlateBand({
  className = "h-48",
}: {
  className?: string;
}) {
  return (
    <div className={`${className} w-full overflow-hidden bg-surface-container-low`} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOUS_PLATE}
        alt=""
        className="w-full h-full object-cover object-center grayscale contrast-[0.94] grayscale-[0.9]"
        loading="eager"
      />
    </div>
  );
}
