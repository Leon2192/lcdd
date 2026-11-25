# LCDD Web V1.3 · Inicio mobile y navegación

## Inicio

Header → franja comercial → slider → Explorá por categoría → Sobre nosotros → ¿Organizás eventos? → Eventos para cada momento → Hagamos algo especial → Footer. Desde 768 px se conserva el Inicio editorial de escritorio.

La franja azul petróleo repite el mensaje con animación CSS continua y un botón de pausa. El slider rota cada seis segundos y admite gestos, indicadores, teclado y pausa manual. Interactuar con la placa o los indicadores detiene la rotación hasta que se reanuda explícitamente. La preferencia de movimiento reducido deja el mensaje estático y permite seleccionar los banners manualmente.

El registro local incluye `banner-detalles.webp` y `banner-combos.webp`, copiados sin recomprimir y marcados internamente como ilustrativos. Los textos y los CTA son HTML. El primer enlace va al Catálogo y el segundo prepara una consulta de combos en el WhatsApp oficial.

El commit `81dc79d` incorporó la imagen de Mensaje en la botella. Su padre, `c69a611`, no tenía imagen registrada para Experiencias y detalles para eventos. La categoría vuelve a mostrar «Sin imagen».

## Navegación

- El proyecto no incluía un fallback de Vercel. El build previo devolvió 404 al abrir una ficha directamente en una simulación de servidor estático. `vercel.json` dirige las rutas de página a `index.html` y deja a los archivos estáticos fuera de la reescritura. El HTML se revalida. [Guía de Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas)
- El enfoque de títulos podía cambiar el desplazamiento en Atrás o Adelante. React Router restaura ahora la posición del historial y el enfoque del título con desplazamiento se reserva para las navegaciones hacia una ruta nueva.
- Al simular una importación de ruta ausente, el build previo mostraba la pantalla de error. V1.3 detecta el fallo de carga y recarga una sola vez por pestaña, en la URL de destino. Si persiste, ofrece recarga manual y un enlace interno al catálogo. [Guía de carga de recursos de Vite](https://vite.dev/guide/build#load-error-handling)

## Validación

- `npm run catalog:check`, `npm run build`, ESLint de archivos modificados y Prettier selectivo. Se conservaron los 16 productos, cinco categorías y cuatro Kits.
- 93 casos dirigidos aprobados. Tres casos de navegación y pedido agotaron el tiempo o la espera en la primera ejecución y aprobaron en la repetición selectiva.
- Chrome offline sobre el build local comprobó los recorridos A–F, el carrito al salir y volver, el desplazamiento de Atrás, la ruta inexistente y los archivos estáticos. Se simuló tanto una ausencia transitoria como una persistente de un chunk.
- Anchos comprobados en Chrome: 320, 375, 390, 430, 768 y 1440 px. Slider de 300 a 336 px en los teléfonos comprobados y sin desbordamiento horizontal. Se verificaron los dos WebP, el movimiento reducido y la separación horizontal entre los controles inferiores del slider y el botón de WhatsApp.
- **Pendiente en producción.** Verificar el fallback y las cabeceras en la configuración efectiva de Vercel, repetir A–F en el dominio desplegado y abrir una ruta diferida desde una pestaña que permanezca abierta entre dos despliegues. Las pestañas que cargaron una versión anterior a V1.3 incorporan esta recuperación al actualizarse.

## Archivos para el próximo commit

### Creados

- `docs/UI_V1_3_REPORT.md`
- `public/media/home/banner-combos.webp`
- `public/media/home/banner-detalles.webp`
- `src/features/home/components/CommercialSlider.tsx`
- `src/features/home/components/CommercialStrip.tsx`
- `src/features/home/components/HomeBanners.tsx`
- `src/routes/route-assets.ts`
- `src/routes/route-assets.test.ts`
- `vercel.json`

### Modificados

- `.gitignore`
- `README.md`
- `src/components/ui/Icon.tsx`
- `src/config/image-attribution.ts`
- `src/config/media.ts`
- `src/features/home/HomePage.test.tsx`
- `src/features/home/HomePage.tsx`
- `src/features/home/home.css`
- `src/features/quotation/optimizations.test.tsx`
- `src/layouts/RootLayout.tsx`
- `src/pages/RouteErrorPage.tsx`
- `src/routes/RouteMetadata.tsx`
- `src/routes/quality.test.tsx`
- `src/routes/routes.test.tsx`
- `src/routes/routes.tsx`
- `src/test/setup.ts`
- `vite.config.ts`

### Eliminado

- `public/media/categories/experiencias-y-detalles.webp`
