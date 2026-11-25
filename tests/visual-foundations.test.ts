// @vitest-environment node
import { build } from 'vite'
import { readFile } from 'node:fs/promises'
import { beforeAll, describe, expect, it } from 'vitest'
import viteConfig from '../vite.config.ts'

let css = ''
let javascript = ''
const emittedChunks = new Map<string, readonly string[]>()
const fontAssets: string[] = []
beforeAll(async () => {
  const result = await build({
    ...viteConfig,
    configFile: false,
    logLevel: 'silent',
    // Mantener las opciones reales de producción; NODE_ENV=test no debe activar la demo.
    define: {
      ...viteConfig.define,
      'import.meta.env.DEV': 'false',
      'import.meta.env.PROD': 'true',
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
      ...viteConfig.build,
      write: false,
      minify: true,
      cssMinify: false,
    },
  })
  const bundles = Array.isArray(result) ? result : [result]
  for (const bundle of bundles) {
    if (!('output' in bundle))
      throw new Error('La prueba requiere un build sin watch')
    for (const item of bundle.output) {
      if (item.type === 'chunk') {
        javascript += item.code
        emittedChunks.set(item.fileName, item.imports)
        continue
      }
      if (item.type !== 'asset') continue
      if (item.fileName.endsWith('.css'))
        css +=
          typeof item.source === 'string'
            ? item.source
            : new TextDecoder().decode(item.source)
      if (item.fileName.endsWith('.woff2')) fontAssets.push(item.fileName)
    }
  }
}, 30000)

describe('Regresiones del CSS realmente compilado', () => {
  it('bloquea indexación antes de ejecutar JavaScript y preserva la demo fuera del build', async () => {
    const html = await readFile(
      new URL('../index.html', import.meta.url),
      'utf8',
    )
    const robots = await readFile(
      new URL('../public/robots.txt', import.meta.url),
      'utf8',
    )
    expect(html).toMatch(/<html lang="es-AR">/)
    expect(html).toContain(
      'name="robots" content="noindex, nofollow, noarchive"',
    )
    expect(robots).toMatch(/User-agent: \*\s+Disallow: \//)
    expect(javascript).not.toContain('/__dev/design-system')
    expect(javascript).not.toContain('Biblioteca visual')
  })
  it('emite las dependencias estáticas sin referencias faltantes ni ciclos de chunks', () => {
    expect(
      [...emittedChunks.keys()].some((name) => name.includes('react-vendor')),
    ).toBe(true)
    function visit(name: string, ancestors: Set<string>): void {
      expect(ancestors.has(name)).toBe(false)
      const imports = emittedChunks.get(name)
      expect(imports).toBeDefined()
      for (const dependency of imports ?? [])
        visit(dependency, new Set([...ancestors, name]))
    }
    for (const name of emittedChunks.keys()) visit(name, new Set())
  })
  it('mantiene base antes que components para que el reset no anule pasos, botones y footer', () => {
    const orderedLayers: string[] = []
    for (const match of css.matchAll(/@layer\s+([^;{]+)[;{]/g)) {
      for (const name of (match[1] ?? '')
        .split(',')
        .map((value) => value.trim())) {
        if (
          ['theme', 'base', 'components', 'utilities'].includes(name) &&
          !orderedLayers.includes(name)
        )
          orderedLayers.push(name)
      }
    }
    expect(orderedLayers).toEqual(['theme', 'base', 'components', 'utilities'])
  })
  it('mantiene relacionados en una pista horizontal compacta y acotada al componente', () => {
    const rule = css.match(
      /\.product-rail\s+\.carousel-track\s*>\s*\.carousel-item\s*\{([^}]+)\}/,
    )
    expect(rule?.[1]).toMatch(/flex:\s*0\s+0\s+78%/)
    expect(rule?.[1]).toMatch(/max-width:\s*18rem/)
    expect(css).toMatch(/\.product-rail\s+\.media-placeholder/)
  })
  it('contiene el menú de evento al ancho del campo y permite envolver el texto', () => {
    const popup = css.match(/\.event-type-options\s*\{([^}]+)\}/)?.[1] ?? ''
    expect(popup).toMatch(/position:\s*absolute/)
    expect(popup).toMatch(/inset-inline:\s*0/)
    expect(popup).toMatch(/max-width:\s*100%/)
    expect(popup).toMatch(/box-sizing:\s*border-box/)
    expect(css).toMatch(
      /\.event-type-options\s+\[role=["']?option["']?\]\s*\{[^}]*white-space:\s*normal/,
    )
  })
  it('distribuye únicamente cuatro WOFF2 locales y ambas familias con estilos reales', () => {
    expect(fontAssets).toHaveLength(4)
    for (const family of ['cormorant-garamond', 'dm-sans']) {
      for (const style of ['normal', 'italic'])
        expect(
          fontAssets.some((file) =>
            file.includes(`${family}-latin-wght-${style}-`),
          ),
        ).toBe(true)
    }
    expect(css).toContain('Cormorant Garamond Variable')
    expect(css).toContain('DM Sans Variable')
    expect(css).not.toMatch(/url\(\s*['"]?https?:\/\//i)
  })
})
