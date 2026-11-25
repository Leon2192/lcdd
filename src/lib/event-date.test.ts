import { describe, it, expect } from 'vitest'
import { formatEventDate } from './event-date'
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
})
