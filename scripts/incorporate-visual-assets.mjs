import { readFile, copyFile, mkdir, lstat, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, sep } from 'node:path'
import { visualAssets } from '../src/config/media.ts'

// Herramienta local de recursos; no interviene en el runtime ni en reglas comerciales.
const root = fileURLToPath(new URL('../', import.meta.url))
const inbox = resolve(root, 'pending-assets')
const destination = resolve(root, 'public/media')
const configFile = resolve(root, 'src/config/media.ts')
const plan = JSON.parse(
  await readFile(resolve(inbox, 'incorporation-plan.json'), 'utf8'),
)
const apply = process.argv.includes('--apply')
const assets = structuredClone(visualAssets)
let found = 0
let favicon = false

function dimensions(bytes, file) {
  if (
    file.endsWith('.png') &&
    bytes.length >= 24 &&
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  ) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) }
  }
  if (
    file.endsWith('.webp') &&
    bytes.length >= 30 &&
    bytes.toString('ascii', 0, 4) === 'RIFF' &&
    bytes.toString('ascii', 8, 12) === 'WEBP'
  ) {
    const kind = bytes.toString('ascii', 12, 16)
    if (kind === 'VP8X')
      return {
        width: bytes.readUIntLE(24, 3) + 1,
        height: bytes.readUIntLE(27, 3) + 1,
      }
    if (kind === 'VP8L' && bytes[20] === 47) {
      const bits = bytes.readUInt32LE(21)
      return { width: (bits & 16383) + 1, height: ((bits >>> 14) & 16383) + 1 }
    }
    if (
      kind === 'VP8 ' &&
      bytes.subarray(23, 26).equals(Buffer.from([157, 1, 42]))
    )
      return {
        width: bytes.readUInt16LE(26) & 16383,
        height: bytes.readUInt16LE(28) & 16383,
      }
  }
  throw new Error(`Formato de imagen no reconocido: ${file}`)
}

// Validar todos los archivos disponibles antes de copiar o registrar ninguno.
const ready = []
for (const item of plan) {
  const source = resolve(inbox, item.file)
  const target = resolve(destination, item.file)
  if (!source.startsWith(inbox + sep) || !target.startsWith(destination + sep))
    throw new Error('Ruta de recurso fuera de las carpetas autorizadas')
  let stat
  try {
    stat = await lstat(source)
  } catch (error) {
    if (error.code === 'ENOENT') continue
    throw error
  }
  if (!stat.isFile() || stat.isSymbolicLink())
    throw new Error(`Se requiere un archivo de imagen local: ${item.file}`)
  const size = dimensions(await readFile(source), item.file)
  if (!size.width || !size.height)
    throw new Error(`Dimensiones inválidas: ${item.file}`)
  ready.push({ item, source, target, size })
  found++
  console.log(
    `${apply ? 'Incorporar' : 'Disponible'}: ${item.file} (${size.width}×${size.height})`,
  )
}

if (apply && found) {
  const originalConfig = await readFile(configFile, 'utf8')
  if (!/\n\} = [\s\S]+$/u.test(originalConfig))
    throw new Error(
      'El registro cambió de estructura: revisar antes de incorporar',
    )
  for (const { item, size } of ready) {
    const image = { src: `/media/${item.file}`, alt: item.alt, ...size }
    if (item.kind === 'favicon') favicon = true
    else if (item.kind === 'logo') assets.logo = image
    else if (item.kind === 'products') {
      const current = assets.products[item.key] ?? []
      assets.products[item.key] = [
        image,
        ...current.filter((entry) => entry.src !== image.src),
      ]
    } else assets[item.kind][item.key] = image
  }
  if (assets.home.hero) {
    assets.home.about = assets.home.hero
    assets.home.conversion = assets.home.hero
  }
  for (const [index, slot] of [
    'inspiration-1',
    'inspiration-2',
    'inspiration-3',
    'inspiration-1',
    'inspiration-2',
  ].entries()) {
    if (assets.home[slot])
      assets.collections[`COL-00${index + 1}`] = assets.home[slot]
  }
  const { format, resolveConfig } = await import('prettier')
  const content = originalConfig.replace(
    /\n\} = [\s\S]+$/u,
    `\n} = ${JSON.stringify(assets, null, 2)}\n`,
  )
  const formatted = await format(content, {
    ...(await resolveConfig(configFile)),
    filepath: configFile,
  })
  for (const { source, target } of ready) {
    await mkdir(dirname(target), { recursive: true })
    await copyFile(source, target)
  }
  await writeFile(configFile, formatted)
  if (favicon) {
    const htmlFile = resolve(root, 'index.html')
    const html = await readFile(htmlFile, 'utf8')
    const updated = html.replace(
      /<link\s+rel="icon"[^>]*\/>/u,
      '<link rel="icon" type="image/png" href="/media/brand/favicon-32-v01.png" />',
    )
    if (updated === html && !html.includes('/media/brand/favicon-32-v01.png'))
      throw new Error('Revisar el enlace de favicon en index.html')
    await writeFile(
      htmlFile,
      await format(updated, {
        ...(await resolveConfig(htmlFile)),
        filepath: htmlFile,
      }),
    )
  }
}
console.log(
  `${found}/${plan.length} piezas disponibles en la carpeta de recepción.`,
)
if (!found)
  console.log(
    'No se modificó el registro ni se crearon imágenes vacías. Favicon provisional existente: public/favicon.svg.',
  )
if (!apply)
  console.log(
    'Solo revisión. Para incorporar recursos aprobados: node scripts/incorporate-visual-assets.mjs --apply',
  )
