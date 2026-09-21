"use client";

import { useState } from "react";

export function SafeImage({
  src,
  fallbackSrc = "/plates/salk.png",
  alt = "",
  className = "",
  ...rest
}: {
  src?: string;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [srcState, setSrcState] = useState(
    src && src.trim() ? src : fallbackSrc
  );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      alt={alt}
      src={srcState}
      className={className}
      onError={() => {
        if (srcState !== fallbackSrc) setSrcState(fallbackSrc);
      }}
    />
  );
}