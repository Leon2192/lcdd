import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { ReactNode, TouchEvent } from 'react'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'

const motionPreference = '(prefers-reduced-motion: reduce)'

function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia?.(motionPreference)
  media?.addEventListener?.('change', onChange)
  return () => media?.removeEventListener?.('change', onChange)
}

function reducedMotion() {
  return window.matchMedia?.(motionPreference).matches ?? false
}

type Slide = { id: string; title: string; content: ReactNode }

export function CommercialSlider({
  label,
  slides,
}: {
  label: string
  slides: readonly [Slide, Slide, ...Slide[]]
}) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useSyncExternalStore(
    subscribeToMotion,
    reducedMotion,
    () => true,
  )
  const start = useRef<{ x: number; y: number } | null>(null)
  const playing = !paused && !reduce

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      6_000,
    )
    return () => window.clearInterval(timer)
  }, [playing, slides.length])

  function choose(index: number) {
    setActive((index + slides.length) % slides.length)
    setPaused(true)
  }

  function beginSwipe(event: TouchEvent) {
    const touch = event.touches[0]
    start.current =
      touch && event.touches.length === 1
        ? { x: touch.clientX, y: touch.clientY }
        : null
    setPaused(true)
  }

  function endSwipe(event: TouchEvent) {
    const point = start.current
    start.current = null
    const touch = event.changedTouches[0]
    if (!point || !touch) return
    const deltaX = touch.clientX - point.x
    const deltaY = touch.clientY - point.y
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY))
      choose(active + (deltaX < 0 ? 1 : -1))
  }

  return (
    <section
      className="home-banner-slider"
      aria-label={label}
      aria-roledescription="carrusel"
      onKeyDown={(event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
        event.preventDefault()
        choose(active + (event.key === 'ArrowRight' ? 1 : -1))
      }}
    >
      <div
        className="home-banner-stage"
        aria-live={playing ? 'off' : 'polite'}
        onFocusCapture={() => setPaused(true)}
        onMouseEnter={() => setPaused(true)}
        onTouchStart={beginSwipe}
        onTouchEnd={endSwipe}
        onTouchCancel={() => {
          start.current = null
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="home-banner-slide"
            data-active={index === active}
            aria-hidden={index !== active}
            inert={index !== active}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={slide.title}
          >
            {slide.content}
          </div>
        ))}
      </div>
      <div className="home-banner-controls">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className="home-banner-dot"
            type="button"
            aria-label={`Mostrar ${slide.title}`}
            aria-current={index === active ? 'true' : undefined}
            onFocus={() => setPaused(true)}
            onClick={() => choose(index)}
          />
        ))}
        {!reduce && (
          <IconButton
            label={playing ? 'Pausar banners' : 'Reproducir banners'}
            onClick={() => setPaused((value) => !value)}
          >
            <Icon name={playing ? 'pause' : 'play'} />
          </IconButton>
        )}
      </div>
    </section>
  )
}
