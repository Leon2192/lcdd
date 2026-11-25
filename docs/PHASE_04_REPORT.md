# Informe Fase 04 — Catálogo y fichas LCDD

Fecha de entrega original: 2026-11-24. Estado vigente: Fase 04 aprobada para continuar; Fase 05 autorizada y documentada en PHASE_05_REPORT.

## Fuentes y referencias

Se revisaron AGENTS, README, reportes 01/02/03, documentación de diseño, decisiones, inventario y pendientes; README/LEEME/MANIFEST del paquete Marketing, integración Marketing & Product Integration V1.0, Product & Catalog Handoff V1.0 y catálogo público oficial de Productos. Se analizaron visualmente UI-02 V1.1 desktop/mobile, UI-03, UI-04 y UI-07 desktop/mobile. La fuente preliminar de Marketing no reemplaza a Productos.

Los 46 recursos enumerados por el manifiesto Marketing conservan bytes y SHA-256. El JSON oficial mantiene SHA-256 `5207b6431d612f46412d96396b8ea88368ab0a3b2fd4144b8ebf90f746ee6a6f`. Los originales permanecen intactos.

## Arquitectura y funcionalidades

Datos compartidos y tipados en `src/data/catalog`, generador verificable en `scripts/sync-catalog.mjs`, páginas y componentes en `src/features/catalog`, breadcrumbs en UI compartida y página informativa de pedido en `src/pages`. Compartidos no dependen de features. El CSS se importa desde main después de globals y Home, dentro de las capas existentes. No se modifica la composición de Home.

Implementados catálogo agrupado, filtros por categoría en URL, cinco categorías con búsqueda especificada, 14 fichas, breadcrumbs, relacionados, placeholders de galería, recuperación de rutas y enlaces desde Home/header/menu/footer. Las identidades comerciales ya no se duplican manualmente. Ver CATALOG_IMPLEMENTATION y PRODUCT_DETAIL_IMPLEMENTATION para rutas, listado y actualización.

Árbol principal:

```text
scripts/sync-catalog.mjs
src/data/catalog/
  types.ts
  catalog.generated.ts
  catalog.ts
src/features/catalog/
  CatalogPage.tsx
  CategoryPage.tsx
  ProductDetailPage.tsx
  catalog.css
  catalog.test.tsx
  components/
    CatalogShared.tsx
    ProductGallery.tsx
    ProductInformation.tsx
src/components/ui/Breadcrumbs.tsx
src/pages/OrderPendingPage.tsx
```

Reutilizados ProductCard, Checkbox, Input, Button, EmptyState, Icon y layout institucional. No se incorporaron dependencias. Se conservaron tipografías locales, glyph legítimo y sus licencias. package-lock está sincronizado con dependencias declaradas; npm ls --all terminó código 0, sin problemas.

## Decisiones y diferencias respecto del mockup

Se preservan todos los campos originales, incluidos null, publicationReady:false, colecciones y estados. Mostrar una vista local preliminar no aprueba publicación. No hay campo visibility en la fuente y no se inventa. Las descripciones propuestas se rotulan; las características, variantes e imágenes pendientes no se presentan como validadas. UI-03 incluye buscador; UI-02 general no lo incorpora. No hay ordenamiento comercial inventado.

No se incluyen acciones de agregar, selectores efectivos ni formularios de cotización que corresponden a Fase 05. CTA provisional informa su estado y transmite únicamente un ID por URL. Las invitaciones digitales y Save the date son servicios. Carpa QR conserva la discrepancia tarjetas/unidades y definición del servicio. No se muestran precios, pagos ni checkout.

## Validaciones reales

| Validación              | Resultado                                                                |
| ----------------------- | ------------------------------------------------------------------------ |
| catalog:check           | Sincronización completa, 14 productos / cinco categorías                 |
| TypeScript              | Ejecutado satisfactoriamente                                             |
| Build                   | Ejecutado satisfactoriamente                                             |
| ESLint                  | Sin errores ni advertencias                                              |
| Prettier                | Formato conforme                                                         |
| Vitest no interactivo   | 88 pruebas satisfactorias en seis archivos                               |
| npm run check           | Satisfactorio: catálogo, formato, lint, pruebas y build                  |
| Dependencias / lockfile | npm ls --all código 0; raíz sincronizada                                 |
| Integridad Marketing    | 46 entradas válidas                                                      |
| Navegador/HTTP Fase 04  | No ejecutados; bloqueos previos documentados, revisión externa pendiente |

Las pruebas cubren proyección oficial completa, referencias, cinco categorías, filtros, búsqueda, 14 fichas, relacionados, rutas desconocidas, ID legado, modalidades digitales, discrepancia QR, CTA provisional, ausencia de precios, galería por teclado y regresiones de Home/capas CSS/fuentes. No se declaran mediciones responsive hechas por jsdom.

## Pendientes, deuda y aceptación

Cumplidos técnicamente: fuente única verificable, cinco categorías, 14 fichas, enlaces funcionales, estados pendientes preservados, modalidades diferenciadas, sin precios ni flujo de Fase 05, pruebas y controles técnicos. Pendiente aceptación visual en los ocho anchos mediante Chrome Windows: instrucciones y matriz en CATALOG_VISUAL_VALIDATION.

Deuda controlada: reemplazo de fotografías/identidad provisional, validación de contenidos y selección de destacados, revisión de compatibilidad de slugs si cambian nombres, política definitiva de publicación/visibilidad al recibir catálogo aprobado. Carpa QR y número internacional requieren resolución empresarial. No son decisiones que deba inventar la implementación.

**Actualización: Dirección Técnica aprobó Fase 04 para continuar tras inspeccionar capturas desktop/mobile y autorizó Fase 05.** Permanecen fotografías, logo limpio, validación comercial y revisión responsive completa pendientes. Los resultados anteriores corresponden a la entrega original de Fase 04; no se reutilizan como pruebas de Fase 05.

## Archivos creados y modificados

Creados: scripts/sync-catalog.mjs; src/data/catalog/{types.ts,catalog.generated.ts,catalog.ts}; src/features/catalog/{CatalogPage.tsx,CategoryPage.tsx,ProductDetailPage.tsx,catalog.css,catalog.test.tsx,components/CatalogShared.tsx,components/ProductGallery.tsx,components/ProductInformation.tsx}; src/components/ui/Breadcrumbs.tsx; src/pages/OrderPendingPage.tsx; los cuatro documentos PHASE_04_REPORT, CATALOG_IMPLEMENTATION, PRODUCT_DETAIL_IMPLEMENTATION y CATALOG_VISUAL_VALIDATION.

Modificados: AGENTS.md, package.json (scripts, sin dependencias nuevas), src/main.tsx, src/routes/routes.tsx y routes.test.tsx, src/config/categories.ts, src/features/home/catalog-identities.ts, components/FeaturedProducts.tsx y HomePage.test.tsx; README, PHASE_03_REPORT, PENDING_ITEMS, DESIGN_DECISIONS, ASSET_INVENTORY y arquitectura.md. package-lock no requirió cambios. Handoff, logo original y fuentes preservados.
