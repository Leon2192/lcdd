import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
type CarouselProps = {
  label: string
  items: { id: string; content: ReactNode }[]
  layout?: 'single' | 'rail'
}
export function Carousel({ label, items, layout = 'single' }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [edges, setEdges] = useState({
    previous: false,
    next: items.length > 1,
  })
  const track = useRef<HTMLDivElement>(null)
  const current = Math.min(index, Math.max(0, items.length - 1))
  const id = useId()
  const measure = useCallback(() => {
    const node = track.current
    if (!node || layout !== 'rail') return
    const nextEdges = {
      previous: node.scrollLeft > 1,
      next: node.scrollLeft + node.clientWidth < node.scrollWidth - 1,
    }
    setEdges((previous) =>
      previous.previous === nextEdges.previous &&
      previous.next === nextEdges.next
        ? previous
        : nextEdges,
    )
    const first = node.firstElementChild
    if (first instanceof HTMLElement) {
      const step =
        first.getBoundingClientRect().width +
        (Number.parseFloat(getComputedStyle(node).columnGap) || 0)
      if (step > 0)
        setIndex(
          Math.min(
            items.length - 1,
            Math.max(0, Math.round(node.scrollLeft / step)),
          ),
        )
    }
  }, [items.length, layout])
  useEffect(() => {
    if (layout !== 'rail' || !track.current) return
    const frame = requestAnimationFrame(measure)
    const observer =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(measure)
    observer?.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [layout, measure])
  function move(direction: number) {
    if (layout === 'single') {
      setIndex(current + direction)
      return
    }
    const node = track.current
    const first = node?.firstElementChild
    if (!node || !(first instanceof HTMLElement)) return
    const step =
      first.getBoundingClientRect().width +
      (Number.parseFloat(getComputedStyle(node).columnGap) || 0)
    const target = Math.max(
      0,
      Math.min(
        node.scrollWidth - node.clientWidth,
        node.scrollLeft + direction * step,
      ),
    )
    const reduce = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches
    node.scrollTo({ left: target, behavior: reduce ? 'instant' : 'smooth' })
  }
  if (!items.length) return <p>No hay elementos para mostrar.</p>
  return (
    <section
      aria-label={label}
      aria-roledescription="carrusel"
      className={`carousel carousel--${layout}`}
    >
      <div
        ref={track}
        id={id}
        className={layout === 'rail' ? 'carousel-track' : undefined}
        tabIndex={layout === 'rail' ? 0 : undefined}
        role={layout === 'rail' ? 'group' : undefined}
        aria-label={layout === 'rail' ? `Elementos de ${label}` : undefined}
        aria-describedby={layout === 'rail' ? `${id}-position` : undefined}
        onScroll={layout === 'rail' ? measure : undefined}
        onKeyDown={(event) => {
          if (
            layout === 'rail' &&
            ['ArrowLeft', 'ArrowRight'].includes(event.key)
          ) {
            event.preventDefault()
            move(event.key === 'ArrowRight' ? 1 : -1)
          }
        }}
      >
        {items.map((item, n) => (
          <div
            key={item.id}
            hidden={layout === 'single' && n !== current}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${n + 1} de ${items.length}`}
            className="carousel-item"
          >
            {item.content}
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <IconButton
          label={`Anterior en ${label}`}
          aria-controls={id}
          disabled={layout === 'rail' ? !edges.previous : current === 0}
          onClick={() => move(-1)}
        >
          <Icon name="previous" />
        </IconButton>
        <p id={`${id}-position`} aria-live="polite" aria-atomic="true">
          {current + 1} / {items.length}
        </p>
        <IconButton
          label={`Siguiente en ${label}`}
          aria-controls={id}
          disabled={
            layout === 'rail' ? !edges.next : current === items.length - 1
          }
          onClick={() => move(1)}
        >
          <Icon name="arrow" />
        </IconButton>
      </div>
    </section>
  )
}
