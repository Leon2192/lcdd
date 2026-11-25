import css from './tokens.css?raw'
import { describe, expect, it } from 'vitest'

function luminance(name: string) {
  const value = css.match(
    new RegExp(`--lcdd-${name}: #([a-f0-9]{6});`, 'i'),
  )?.[1]
  if (!value) throw new Error(`Token hexadecimal no encontrado: ${name}`)
  return [0, 2, 4].reduce((sum, start, index) => {
    const channel = Number.parseInt(value.slice(start, start + 2), 16) / 255
    const linear =
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    return sum + linear * ([0.2126, 0.7152, 0.0722][index] ?? 0)
  }, 0)
}
describe('Contraste de combinaciones utilizadas', () => {
  it.each([
    ['white', 'primary', 4.5],
    ['text', 'background', 4.5],
    ['text', 'sand', 4.5],
    ['editorial', 'sand', 4.5],
    ['muted', 'background', 4.5],
    ['muted', 'white', 4.5],
    ['error', 'background', 4.5],
    ['success', 'success-background', 4.5],
    ['primary', 'sand', 4.5],
    ['taupe', 'background', 3],
    ['taupe', 'white', 3],
    ['white', 'hover', 4.5],
    ['white', 'pressed', 4.5],
  ] as const)('%s sobre %s alcanza %s:1', (foreground, background, minimum) => {
    const first = luminance(foreground)
    const second = luminance(background)
    expect(
      (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05),
    ).toBeGreaterThanOrEqual(minimum)
  })
})
