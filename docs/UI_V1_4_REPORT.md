# LCDD Web V1.4 · Recursos gráficos

## Integración

| WebP entregado                  | Ubicación pública                                 | Destino                                | Identificador                          |
| ------------------------------- | ------------------------------------------------- | -------------------------------------- | -------------------------------------- |
| `kits.webp`                     | `/media/categories/kits.webp`                     | Kits                                   | `kits-para-eventos`                    |
| `souvenirs-personalizados.webp` | `/media/categories/souvenirs-personalizados.webp` | Souvenirs personalizados               | `souvenirs-personalizados`             |
| `papeleria-eventos.webp`        | `/media/categories/papeleria-eventos.webp`        | Detalles de mesa                       | `detalles-de-mesa`                     |
| `save-the-date.webp`            | `/media/products/save-the-date.webp`              | Invitaciones digitales y Save the date | `invitaciones-digitales` y `P-014`     |
| `experiencias-y-detalles.webp`  | `/media/categories/experiencias-y-detalles.webp`  | Experiencias y detalles para eventos   | `experiencias-y-detalles-para-eventos` |

Los cinco WebP son idénticos a los del ZIP. El registro documenta el suministro por LCDD y contiene los textos alternativos, dimensiones y encuadres. El manifiesto deja la autoría sin verificar. El producto y la categoría comparten el archivo de Save the date. Las tarjetas mantienen marcos 4:3. Save the date y Experiencias muestran la composición completa y las otras tres imágenes usan recorte ajustado.

Se preservaron las rutas, los slugs y el catálogo operativo de 16 productos en cinco categorías. Save the date conserva las mismas referencias comerciales y se muestra con el nuevo recurso donde se reutiliza su imagen principal. La selección de destacados se conserva.

## Espacios que muestran «Sin imagen»

Todas las categorías tienen imagen.

| Producto                 | ID      | Recurso necesario                            |
| ------------------------ | ------- | -------------------------------------------- |
| Kit antiresaca Bolsa     | `P-001` | Imagen principal del formato Bolsa           |
| Vasos personalizados     | `P-003` | Imagen principal de vasos personalizados     |
| Abanicos personalizados  | `P-004` | Imagen principal de abanicos personalizados  |
| Espejitos personalizados | `P-010` | Imagen principal de espejitos personalizados |
| Carpa QR                 | `P-011` | Imagen principal de Carpa QR                 |
| Números de mesa          | `P-012` | Imagen principal de números de mesa          |
| Kit antiresaca Pillow    | `P-015` | Imagen principal del formato Pillow          |

El mismo estado acompaña al producto en sus tarjetas, fichas y pantallas de pedido. En Destacados de Inicio aparece para Vasos personalizados y Abanicos personalizados.

| Página o sección                                                         | Ranura o ID                                                                                                                                                     | Recurso necesario                                      |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Inicio de escritorio, presentación principal                             | `hero`                                                                                                                                                          | Imagen editorial de presentación                       |
| Inicio de escritorio, collage de Ideas y combinaciones                   | `inspiration-1`, `inspiration-2`, `inspiration-3`                                                                                                               | Tres imágenes complementarias para el collage          |
| Inicio de escritorio, Sobre nosotros y Hagamos algo especial             | `about`, `conversion`                                                                                                                                           | Una imagen institucional y una de cierre del recorrido |
| Nosotros y Profesionales, presentación y bloque editorial de cada página | `about`                                                                                                                                                         | Imagen institucional compartida por las vistas         |
| Inspiración, presentación principal                                      | `inspiration-1`                                                                                                                                                 | Imagen editorial de apertura                           |
| Inspiración, portadas de colecciones                                     | `COL-001` Cuidá a tus invitados, `COL-002` Que empiece la fiesta, `COL-003` Cada mesa, un detalle, `COL-004` Recuerdos especiales y `COL-005` Contá tu historia | Una portada acorde a cada colección                    |

## Comprobaciones

- `npm run catalog:check` y `npm run build` aprobados con Node 24. Pasaron 34 pruebas dirigidas y el lint de los archivos TypeScript modificados.
- Chrome local sin red verificó 320, 390, 768 y 1440 px. Las cinco tarjetas mantuvieron dimensiones uniformes por viewport. Se revisaron los encuadres a 390 y 1440 px y la carga desde Inicio, catálogo, ficha y carrito.
- `dist/` contiene 15 WebP únicos. Los dos banners se conservaron. Las diez ilustraciones archivadas permanecen en las fuentes y se excluyen del build. El ZIP y los temporales quedan fuera de la entrega.
- La configuración de Vercel se conserva y el build es apto para el flujo actual de Vercel.

## Archivos para el próximo commit

### Creados

- `docs/UI_V1_4_REPORT.md`
- `public/media/categories/experiencias-y-detalles.webp`
- `public/media/categories/kits.webp`
- `public/media/categories/papeleria-eventos.webp`
- `public/media/categories/souvenirs-personalizados.webp`

### Modificados

- `README.md`
- `pending-assets/incorporation-plan.json`
- `public/media/products/save-the-date.webp`
- `src/components/ui/CategoryCard.tsx`
- `src/config/image-attribution.ts`
- `src/config/media.ts`
- `src/data/catalog/types.ts`
- `src/features/catalog/catalog.test.tsx`
- `src/features/home/HomePage.test.tsx`
- `src/features/home/home.css`
- `vite.config.ts`

### Eliminados

- `public/media/categories/detalles-de-mesa-v01.webp`
- `public/media/categories/invitaciones-digitales-v01.webp`
- `public/media/categories/kits-para-eventos-v01.webp`
- `public/media/categories/souvenirs-personalizados-v01.webp`

La imagen anterior de Save the date se sustituyó en su ruta existente.
