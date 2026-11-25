import { describe, it, expect, vi } from 'vitest'
import { formatEventDate } from './event-date'
import { revealSection } from './reveal-section'
describe('Representaciones locales', () => {
  it.each([
    ['2027-01-05', '05/01/2027'],
    ['2024-02-29', '29/02/2024'],
    ['2026-12-31', '31/12/2026'],
    ['0099-04-02', '02/04/0099'],
  ])(
    'formatea %s como %s sin desplazamiento de zona horaria',
    (value, expected) => {
      expect(formatEventDate(value)).toBe(expected)
    },
  )
  it('rechaza fechas inexistentes', () => {
    expect(() => formatEventDate('2026-02-30')).toThrow(RangeError)
  })
  it('separa foco y scroll para evitar desplazamiento doble', () => {
    const node = document.createElement('h2')
    node.tabIndex = -1
    document.body.append(node)
    const focus = vi.spyOn(node, 'focus')
    const scroll = vi.fn()
    node.scrollIntoView = scroll
    revealSection(node)
    expect(focus).toHaveBeenCalledWith({ preventScroll: true })
    expect(node).toHaveFocus()
    expect(scroll).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' })
    node.remove()
    focus.mockRestore()
    expect(() => revealSection(null)).not.toThrow()
  })
})
