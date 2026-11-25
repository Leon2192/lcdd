import { spawnSync } from 'node:child_process'
import { performance } from 'node:perf_hooks'
// Una sola pasada. build incluye catálogo y TypeScript; no duplicar esos controles.
const started = performance.now()
for (const command of ['format:check', 'lint', 'test', 'build']) {
  const step = performance.now()
  const result = spawnSync('npm', ['run', command], { stdio: 'inherit' })
  console.log(
    `[quality] ${command}: ${((performance.now() - step) / 1000).toFixed(3)} s`,
  )
  if (result.error) console.error(result.error.message)
  if (result.status !== 0) process.exit(result.status ?? 1)
}
console.log(
  `[quality] total: ${((performance.now() - started) / 1000).toFixed(3)} s`,
)
