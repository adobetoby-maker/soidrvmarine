// Built by ATLAS — 2026-07-07
'use client'

// Hero media wrapper — plays an autoplay/muted/looping video when available,
// falls back to the poster still both for prefers-reduced-motion users and
// gracefully when the video file doesn't exist yet (onError -> still image).
// Never a blank hero: the poster renders first in all cases.

import { useEffect, useState } from 'react'

interface Props {
  poster: string
  videoSrc: string
  alt: string
}

const mediaStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
}

export function HeroVideo({ poster, videoSrc, alt }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (reducedMotion || videoFailed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={alt} style={mediaStyle} />
  }

  return (
    <video
      autoPlay
      muted
      playsInline
      poster={poster}
      preload="auto"
      aria-label={alt}
      onError={() => setVideoFailed(true)}
      style={mediaStyle}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  )
}
