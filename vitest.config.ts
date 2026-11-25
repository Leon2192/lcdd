import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

// El runner Node necesita leer los originales como fixtures tipados. Esto no cambia
// el servidor de desarrollo: vite.config.ts mantiene docs/** fuera del acceso HTTP.
const testBaseConfig = {
  ...viteConfig,
  server: {
    ...viteConfig.server,
    fs: {
      ...viteConfig.server?.fs,
      deny:
        viteConfig.server?.fs?.deny?.filter(
          (pattern) => pattern !== '**/docs/**',
        ) ?? [],
    },
  },
}

export default mergeConfig(
  testBaseConfig,
  defineConfig({
    test: {
      include: ['src/**/*.test.{ts,tsx}', 'tests/**/*.test.{ts,tsx}'],
      css: { include: [/tokens\.css/] },
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      clearMocks: true,
      restoreMocks: true,
    },
  }),
)
