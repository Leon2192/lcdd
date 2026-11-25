# LCDD · Catálogo e Inicio V1.2

El catálogo operativo tiene **16 productos, cinco categorías y cuatro productos en Kits**. «Kits para eventos» pasa a llamarse «Kits» y conserva `/catalogo/categoria/kits-para-eventos`. El enlace descriptivo anterior del kit genérico lleva a esa categoría para elegir formato. Los campos comerciales de los demás productos, las colecciones y la selección de destacados se conservan. Las referencias existentes a P-001 conservan el identificador y resuelven a Bolsa.

**Ajustes posteriores a la entrega.** Bolsa y Pillow muestran la ilustración original del kit antiresaca y sus dos WebP específicos salen del build. El título de la ficha precede a la galería, el fondo de las imágenes contenidas es blanco y el selector de ficha y pedido ofrece cantidades de 10 a 200. La tabla registra la integración inicial.

## Productos y recursos

| Destino                              | ID                                     | WebP                            | Integración                              |
| ------------------------------------ | -------------------------------------- | ------------------------------- | ---------------------------------------- |
| Experiencias y detalles para eventos | `experiencias-y-detalles-para-eventos` | `experiencias-y-detalles.webp`  | Completa espacio sin imagen              |
| Save the date                        | P-014                                  | `save-the-date.webp`            | Completa espacio sin imagen              |
| Estrellitas                          | P-007                                  | `estrellitas.webp`              | Completa espacio sin imagen              |
| Diarios personalizados               | P-006                                  | `diarios-personalizados.webp`   | Reemplaza imagen                         |
| Invitaciones digitales               | P-013                                  | `invitaciones-digitales.webp`   | Reemplaza imagen                         |
| Capitán de mesa                      | P-008                                  | `capitan-de-mesa.webp`          | Completa espacio sin imagen              |
| Difusores personalizados             | P-009                                  | `difusores-personalizados.webp` | Reemplaza imagen                         |
| Lentes personalizados                | P-005                                  | `lentes-personalizados.webp`    | Reemplaza imagen                         |
| Kits de baño                         | P-002                                  | `kit-de-bano.webp`              | Reemplaza imagen                         |
| Kit antiresaca Bolsa                 | P-001                                  | `kit-antiresaca-bolsa.webp`     | Reemplaza la ficha y la imagen genéricas |
| Kit antiresaca Pillow                | P-015                                  | `kit-antiresaca-pillow.webp`    | Nueva ficha                              |
| Kit antiresaca Craft                 | P-016                                  | `kit-antiresaca-craft.webp`     | Nueva ficha                              |

## Decisiones técnicas

- Las imágenes se copiaron byte a byte y utilizan el registro existente. Los encuadres de tarjetas se mantienen y muestran completas las imágenes entregadas mediante `contain`. El registro indica que LCDD suministró los recursos. El manifiesto de entrega deja la autoría y los derechos de publicación sin verificar.
- La revisión conocida del carrito anterior migra las líneas válidas. Un P-001 genérico queda fuera de la selección recuperada y el pedido y la cotización indican que hay que volver a elegir el formato. Un P-001 de la revisión nueva identifica Bolsa normalmente.
- Inicio mobile sigue el orden Header → Explorá por categoría → Productos destacados → Hero → Propuesta de valor y demás secciones → Footer. Desde 768 px conserva Hero → Propuesta de valor → Categorías → Destacados. El orden visual y el orden del DOM coinciden y se reutilizan las mismas secciones al cambiar de ancho.
- Los handoffs históricos se preservan. La nueva fuente operativa alimenta el generador existente. Las seis copias públicas reemplazadas salen del build y el plan de incorporación evita que vuelvan a registrarse desde el archivo de trabajo histórico.

## Validación

- `npm run catalog:sync`, `npm run catalog:check` y `npm run build` aprobados con Node 24.22.3 y npm 11.19.1. El build incluye el control de TypeScript.
- 231 casos dirigidos cubiertos. Dos agotaron el tiempo inicial y aprobaron en una repetición selectiva. Se comprobó el alta, persistencia, edición, retiro y cotización independiente de los tres formatos, además de la recuperación del carrito anterior, la navegación y los formularios.
- 12 WebP verificados contra la entrega y decodificados desde `dist/`. Los 25 WebP públicos están registrados. Se verificaron también las capas CSS, las directivas de indexación y la exclusión del ZIP, los temporales y la documentación del build.
- Chrome headless verificó el build local sin red a 375, 390, 430, 768 y 1440 px. Se comprobó el orden visual y del DOM de Inicio, un único H1, ausencia de desplazamiento horizontal, carga de las fichas directas de los tres kits y decodificación de las 12 imágenes sin recursos faltantes.
- Listo técnicamente para actualizar el proyecto existente de Vercel con el mismo proceso de build.

## Archivos para el próximo commit

### Creados

- `docs/UI_V1_2_REPORT.md`
- `docs/catalog/PY01_catalogo_operativo_v1.2.json`
- `public/media/categories/experiencias-y-detalles.webp`
- `public/media/products/capitan-de-mesa.webp`
- `public/media/products/diarios-personalizados.webp`
- `public/media/products/difusores-personalizados.webp`
- `public/media/products/estrellitas.webp`
- `public/media/products/invitaciones-digitales.webp`
- `public/media/products/kit-antiresaca-bolsa.webp`
- `public/media/products/kit-antiresaca-craft.webp`
- `public/media/products/kit-antiresaca-pillow.webp`
- `public/media/products/kit-de-bano.webp`
- `public/media/products/lentes-personalizados.webp`
- `public/media/products/save-the-date.webp`

### Modificados

- `.gitignore`
- `README.md`
- `pending-assets/incorporation-plan.json`
- `scripts/sync-catalog.mjs`
- `src/components/ui/CategoryCard.tsx`
- `src/components/ui/ProductCard.tsx`
- `src/components/ui/components.test.tsx`
- `src/config/image-attribution.ts`
- `src/config/media.ts`
- `src/data/catalog/catalog.generated.ts`
- `src/data/catalog/types.ts`
- `src/features/catalog/ProductDetailPage.tsx`
- `src/features/catalog/catalog.test.tsx`
- `src/features/home/HomePage.test.tsx`
- `src/features/home/HomePage.tsx`
- `src/features/home/components/Hero.tsx`
- `src/features/order/order.css`
- `src/features/order/persistence.ts`
- `src/features/order/recovery.test.ts`
- `src/features/quotation/QuotationPage.tsx`
- `src/styles/components.css`
- `vite.config.ts`

### Eliminados

- `public/media/products/P-001/P-001_principal_01_v01.webp`
- `public/media/products/P-002/P-002_principal_01_v01.webp`
- `public/media/products/P-005/P-005_principal_01_v01.webp`
- `public/media/products/P-006/P-006_principal_01_v01.webp`
- `public/media/products/P-009/P-009_principal_01_v01.webp`
- `public/media/products/P-013/P-013_principal_01_v01.webp`
