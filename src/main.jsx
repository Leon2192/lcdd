import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <MantineProvider
    defaultColorScheme="light"
    theme={{
      fontFamily: 'Lora, serif',
      headings: {
        fontFamily: '"Great Vibes", cursive',
        // Opcional: tamaños más elegantes para títulos
        sizes: {
          h1: { fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, lineHeight: 1.1 },
          h2: { fontSize: 'clamp(2rem, 5vw, 3rem)',  fontWeight: 400, lineHeight: 1.15 },
          h3: { fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 400, lineHeight: 1.2 },
          h4: { fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.25 },
        },
      },
    }}
  >
    <App />
  </MantineProvider>
  </StrictMode>,
)
