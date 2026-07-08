// Built by ATLAS — 2026-07-07
'use client'

// Hero media wrapper — plays an autoplay/muted/looping video when available,
// falls back to the poster still both for prefers-reduced-motion users and
// gracefully when the video file doesn't exist yet (onError -> still image).
// Never a blank hero: the poster renders first in all cases.
// The clip loops in slow motion (0.2x) for a calm, ambient boat drift.

import { useEffect, useRef, useState } from 'react'

const PLAYBACK_RATE = 0.22 // 22% speed — slow ambient drift (owner: +10%)

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
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Set slow-motion rate once the element mounts (playbackRate can't be an attribute).
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = PLAYBACK_RATE
  }, [reducedMotion, videoFailed])

  if (reducedMotion || videoFailed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={alt} style={mediaStyle} />
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      preload="auto"
      aria-label={alt}
      // Re-assert the slow rate on load — some browsers reset it when the source loads.
      onLoadedData={(e) => { e.currentTarget.playbackRate = PLAYBACK_RATE }}
      onError={() => setVideoFailed(true)}
      style={mediaStyle}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  )
}
