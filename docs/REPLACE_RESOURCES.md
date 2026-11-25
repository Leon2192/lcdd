# Recursos gráficos — incorporación rápida

El mínimo vigente está en `pending-assets/EXPECTED_FILES.csv`: **25 piezas** (Home, cinco categorías, 14 principales de producto, tres inspiración, logo y favicon). El favicon provisional `public/favicon.svg` permite cerrar sin pedir un reemplazo inmediato: quedan 24 recursos faltantes. Las tomas de contexto/detalle/adicional y portadas exclusivas de colección son opcionales.

1. Recibir los archivos con nombre y ruta exactos de la planilla; dimensiones recomendadas, no obligatorias. Depositar únicamente imágenes aprobadas en `pending-assets/`.
2. Ejecutar `node scripts/incorporate-visual-assets.mjs` para revisar disponibilidad y dimensiones reales.
3. Ejecutar `node scripts/incorporate-visual-assets.mjs --apply` para copiar a public/media y completar el registro existente de src/config/media.ts. Los ausentes conservan placeholders. No modifica catálogo, arquitectura ni lógica comercial.
4. Revisar los encuadres en el navegador local. Después actualizar el ZIP.

Hero se reutiliza en Nosotros/Profesionales y cierre de Home. Tres imágenes de inspiración cubren sus tres espacios y las cinco colecciones. Una foto principal de cada producto se reutiliza en tarjetas, pedido, relacionados y ficha; no se necesitan cuatro tomas para el cierre.

Los 32 recursos de Marketing son mockups, láminas, referencias históricas y una captura de logo: `pending-assets/EXISTING_VISUALS.csv` resume usos legítimos. No recortar fotografías de mockups ni presentar imágenes conceptuales como fotos reales. La captura PNG del logo tiene fondo, botón de edición y trazos poco definidos: conservar denominación textual hasta recibir exportación limpia. No se reconstruye con IA ni se convierte en SVG.

Textos propuestos: src/config/editorial.ts y src/features/home/home-content.ts. Datos institucionales: src/config/site.ts. Sin cambiar estados de Productos ni publicationReady. El script registra archivos, no valida su procedencia ni aprueba sus características.
