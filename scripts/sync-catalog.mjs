import { readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
import { format, resolveConfig } from 'prettier'

const sourcePath = 'docs/catalog/PY01_catalogo_operativo_v1.2.json'
const source = new URL(`../${sourcePath}`, import.meta.url)
const target = new URL(
  '../src/data/catalog/catalog.generated.ts',
  import.meta.url,
)
const text = await readFile(source, 'utf8')
const data = JSON.parse(text)
assert.equal(
  data.schemaVersion,
  '1.0',
  'Revisar el modelo al cambiar schemaVersion',
)
assert.equal(data.products.length, 16, 'El alcance autorizado son 16 productos')
assert.equal(
  data.categories.length,
  5,
  'El alcance autorizado son cinco categorías',
)
const ids = new Set(data.products.map((product) => product.id))
const categories = new Set(data.categories.map((category) => category.id))
assert.equal(ids.size, 16, 'IDs duplicados')
assert.equal(categories.size, 5, 'Categorías duplicadas')
assert.equal(
  data.categories.find(({ id }) => id === 'kits-para-eventos')?.name,
  'Kits',
  'La categoría Kits debe conservar su identificador',
)
assert.deepEqual(
  data.products
    .filter(({ categoryId }) => categoryId === 'kits-para-eventos')
    .map(({ id }) => id)
    .sort(),
  ['P-001', 'P-002', 'P-015', 'P-016'],
  'Kits debe incluir el kit de baño y los tres formatos antiresaca',
)
for (const product of data.products) {
  assert(
    categories.has(product.categoryId),
    `Categoría inválida: ${product.id}`,
  )
  for (const related of product.relatedProducts.ids)
    assert(
      ids.has(related) && related !== product.id,
      `Relacionado inválido: ${product.id}/${related}`,
    )
}
for (const collection of data.collections)
  for (const id of collection.productIds)
    assert(ids.has(id), `Colección inválida: ${collection.id}/${id}`)
for (const note of data.pendingNotes)
  assert(ids.has(note.productId), 'Nota sin producto')
for (const id of data.featuredProducts.ids ?? [])
  assert(ids.has(id), 'Destacado inválido')
const sha = createHash('sha256').update(text).digest('hex')
const output = await format(
  `// Generado por npm run catalog:sync. No editar manualmente.
// Fuente exclusiva: ${sourcePath}
import type { Catalog } from './types'
export const catalogSourceSha256 = '${sha}'
export const officialCatalog = ${JSON.stringify(data, null, 2)} as const satisfies Catalog
`,
  { ...(await resolveConfig(target.pathname)), parser: 'typescript' },
)
if (process.argv.includes('--check')) {
  const existing = await readFile(target, 'utf8').catch(() => '')
  assert.equal(
    existing,
    output,
    'Catálogo derivado desactualizado: ejecutar npm run catalog:sync y revisar cambios',
  )
  console.log(
    'Catálogo sincronizado: 16 productos, cinco categorías y cuatro productos en Kits.',
  )
} else {
  await writeFile(target, output)
  console.log('Catálogo generado sin modificar el original. SHA-256: ' + sha)
}
