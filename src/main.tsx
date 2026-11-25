import '@/styles/globals.css'
import '@/features/home/home.css'
import '@/features/catalog/catalog.css'
import '@/features/order/order.css'
import '@/features/editorial/editorial.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'

const root = document.getElementById('root')
if (!root) throw new Error('No se encontró el elemento raíz de la aplicación.')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
