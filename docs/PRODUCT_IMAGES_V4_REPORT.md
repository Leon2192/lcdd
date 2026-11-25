# LCDD · Imágenes de producto del paquete V4.0

Se incorporaron seis WebP idénticos a los entregados. El registro existente conserva sus dimensiones, un texto alternativo descriptivo y el suministro por LCDD. Las tarjetas y las fichas mantienen su proporción y muestran la composición completa mediante `object-fit: contain`.

| ID      | Producto                 | Slug                             | Archivo en `public/media/products/` |
| ------- | ------------------------ | -------------------------------- | ----------------------------------- |
| `P-011` | Carpa QR                 | `p-011-carpa-qr`                 | `carpa-qr.webp`                     |
| `P-012` | Números de mesa          | `p-012-numeros-de-mesa`          | `numeros-de-mesa.webp`              |
| `P-004` | Abanicos personalizados  | `p-004-abanicos-personalizados`  | `abanicos-personalizados.webp`      |
| `P-010` | Espejitos personalizados | `p-010-espejitos-personalizados` | `espejitos-personalizados.webp`     |
| `P-015` | Kit antiresaca Pillow    | `p-015-kit-antiresaca-pillow`    | `kit-antiresaca-pillow.webp`        |
| `P-003` | Vasos personalizados     | `p-003-vasos-personalizados`     | `vasos-personalizados.webp`         |

Las tarjetas, fichas, destacados, relacionados y el pedido reutilizan el mismo archivo de cada producto cuando corresponde. Las imágenes de Craft, Save the date y de las cinco categorías se conservaron byte a byte. La ilustración genérica de Bolsa permanece archivada y fuera del build.

## Recursos que siguen mostrando «Sin imagen»

| Producto, página o sección             | ID o ranura                                                                                                                                                    | Ubicación                                                              | Recurso que falta                            |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------- |
| Kit antiresaca Bolsa                   | `P-001`                                                                                                                                                        | Catálogo, Kits, ficha, tarjetas relacionadas y pedido si se selecciona | Imagen principal del formato Bolsa           |
| Presentación principal de Inicio       | `hero`                                                                                                                                                         | Inicio de escritorio                                                   | Imagen editorial de presentación             |
| Ideas y combinaciones para tu evento   | `inspiration-1`, `inspiration-2`, `inspiration-3`                                                                                                              | Collage de Inicio de escritorio                                        | Tres imágenes complementarias de inspiración |
| Sobre nosotros y Hagamos algo especial | `about`, `conversion`                                                                                                                                          | Inicio de escritorio                                                   | Imagen institucional y una de cierre         |
| Nosotros y Profesionales               | `about`                                                                                                                                                        | Presentación y bloque editorial de `/nosotros` y `/profesionales`      | Imagen institucional para ambas páginas      |
| Apertura de Inspiración                | `inspiration-1`                                                                                                                                                | Presentación de `/inspiracion`                                         | Imagen editorial de apertura                 |
| Colecciones de Inspiración             | `COL-001` Cuidá a tus invitados, `COL-002` Que empiece la fiesta, `COL-003` Cada mesa, un detalle, `COL-004` Recuerdos especiales, `COL-005` Contá tu historia | Portadas en `/inspiracion`                                             | Una portada acorde a cada colección          |

Las cinco categorías y los dos banners tienen imagen. Las apariciones de Bolsa reutilizan el mismo placeholder.

## Validación

- `npm run catalog:check` y `npm run build` aprobados con Node 24. El catálogo se mantiene en 16 productos, cinco categorías y cuatro Kits.
- 41 pruebas dirigidas aprobadas y ESLint sin advertencias en los TypeScript y TSX modificados.
- Chrome offline verificó 320, 390 y 1440 px. Las seis tarjetas conservaron sus dimensiones antes y después de decodificar las imágenes, con carga diferida y sin desplazamiento horizontal. También se comprobaron las seis fichas, sus categorías, las apariciones en destacados y relacionados y la imagen de Pillow en el pedido.
- Los seis archivos de `dist/` coinciden byte a byte con el ZIP. El build contiene 21 WebP únicos. El ZIP y los temporales quedan fuera del commit y del build. La configuración de Vercel se conserva.

## Archivos para el próximo commit

### Creados

- `docs/PRODUCT_IMAGES_V4_REPORT.md`
- `public/media/products/abanicos-personalizados.webp`
- `public/media/products/carpa-qr.webp`
- `public/media/products/espejitos-personalizados.webp`
- `public/media/products/kit-antiresaca-pillow.webp`
- `public/media/products/numeros-de-mesa.webp`
- `public/media/products/vasos-personalizados.webp`

### Modificados

- `README.md`
- `pending-assets/incorporation-plan.json`
- `src/config/image-attribution.ts`
- `src/config/media.ts`
- `src/features/catalog/catalog.test.tsx`
- `src/features/home/HomePage.test.tsx`

### Recursos públicos obsoletos eliminados

- `public/media/products/P-003/P-003_principal_01_v01.webp`
- `public/media/products/P-004/P-004_principal_01_v01.webp`
- `public/media/products/P-010/P-010_principal_01_v01.webp`
- `public/media/products/P-011/P-011_principal_01_v01.webp`
- `public/media/products/P-012/P-012_principal_01_v01.webp`

Las copias de trabajo históricas se conservan en `pending-assets/`.
