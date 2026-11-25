// El foco no inicia un segundo desplazamiento; el scroll respeta movimiento reducido.
export function revealSection(element: HTMLElement | null): void {
  if (!element) return
  element.focus({ preventScroll: true })
  const reduce =
    typeof window.matchMedia !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  element.scrollIntoView?.({
    block: 'start',
    behavior: reduce ? 'auto' : 'smooth',
  })
}
