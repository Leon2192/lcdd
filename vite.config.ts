import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    watch: { ignored: ['**/docs/**', '**/pending-assets/**', '**/.cache/**'] },
    fs: {
      // Conservar exclusiones sensibles y evitar servir los handoffs por HTTP de desarrollo.
      deny: [
        '.env',
        '.env.*',
        '*.{crt,pem}',
        '**/.git/**',
        '**/docs/**',
        '**/pending-assets/**',
        '**/.cache/**',
        '**/AGENTS.md',
        '**/README.md',
        '**/LCDD_Web_Assets_V2.0.zip',
        '**/LCDD_Banners_V1.3.zip',
        '**/package-lock.json',
        '**/.aws/**',
        '**/.codex/**',
        '**/.agents/**',
      ],
    },
  },
  preview: { host: '127.0.0.1' },
  build: {
    manifest: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
              priority: 20,
            },
          ],
        },
      },
    },
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
