# Catálogo — Fase 04

## Fuente única y actualización

El original `docs/handoff/productos/PY01_catalogo_publico_v1.0.json` es la fuente comercial exclusiva. `scripts/sync-catalog.mjs` genera `src/data/catalog/catalog.generated.ts`, con SHA-256 y `satisfies Catalog`. No se modifican originales. Actualización: recibir una nueva fuente autorizada, revisar su esquema, ejecutar `npm run catalog:sync`, revisar estados y ejecutar `npm run check`. Si cambian los 14 productos o las cinco categorías se requiere revisar explícitamente el alcance y las comprobaciones. `catalog:check` compara la proyección completa, formato y hash; build y typecheck rechazan una proyección desactualizada.

`types.ts` conserva identificadores, descripciones, null, estados, modalidades, mínimos desconocidos, relaciones, colecciones, imágenes previstas y notas. `catalog.ts` ofrece consultas y rutas sin dependencias hacia features. Home y configuración de categorías consumen esta proyección; no mantienen listas comerciales paralelas.

Todos los productos conservan publicationReady:false. La vista local muestra identidades confirmadas para revisión con aviso de catálogo preliminar. Esto no aprueba publicación. El original no define un atributo visibility: no se inventó. Su incorporación futura requerirá adaptar el modelo y la política de exposición antes de publicar.

## Rutas

- `/catalogo`: agrupación editorial por categorías oficiales en su orden de origen.
- `/catalogo/categoria/kits-para-eventos` — Kits para eventos
- `/catalogo/categoria/souvenirs-personalizados` — Souvenirs personalizados
- `/catalogo/categoria/experiencias-y-detalles-para-eventos` — Experiencias y detalles para eventos
- `/catalogo/categoria/detalles-de-mesa` — Detalles de mesa
- `/catalogo/categoria/invitaciones-digitales` — Invitaciones digitales

Los filtros generales usan `?categoria=<id>` repetible, combinan categorías con OR y permiten limpiar. Sin filtros se muestran los 14 productos. Un filtro desconocido da estado vacío recuperable. No hay ordenamientos comerciales ni filtros de precios.

UI-02 V1.1 no contiene buscador general. UI-03 sí contempla búsqueda: cada categoría permite `?q=...`, exclusivamente por nombre, ignorando tildes y mayúsculas, sin alterar el orden oficial. Los filtros persisten solamente en la URL, nunca en LocalStorage.

## Composición y componentes

`features/catalog` contiene CatalogPage, CategoryPage, ProductDetailPage, CatalogShared, ProductGallery y ProductInformation. Se reutilizan ProductCard, Checkbox, Input, EmptyState, Button, Icon, contenedor y estilos institucionales. Breadcrumbs es compartido y usa aria-current. Los resultados, cantidades y estados vacíos son accesibles.

Home conserva composición y CSS; destacados ahora usan URLs canónicas. Navegación principal, menú mobile, tarjetas de categorías y footer llegan a rutas funcionales. Los antiguos enlaces por ID siguen resolviendo mediante redirección local.

Mobile First: una columna antes de 390 px, dos desde 390, tres desde 768 y cuatro desde 1440; sidebar lateral desde 1024. Grillas minmax(0,1fr), textos envolventes, controles táctiles y sin elementos flotantes que tapen contenido. Son reglas implementadas, no mediciones visuales del navegador.

## Límites

Sin precios, carrito, checkout, backend, persistencia ni mensajes WhatsApp. Armá tu pedido es una página informativa de próxima etapa; puede recibir un ID de referencia en URL sin crear un pedido. Las colecciones originales se conservan como datos, sin crear categorías nuevas ni rutas fuera de alcance.

## Actualización Fase 05

ProductGrid es ahora compartido en components/ui. CTA de fichas y accesos al pedido son funcionales según reglas documentadas en COMMERCIAL_RULES; P-008/P-011/P-012 usan consulta contextualizada. Se implementaron ajustes menores de breadcrumbs, búsqueda, filtros y grilla sin reconstruir el catálogo. La persistencia corresponde exclusivamente a la selección, no a filtros/búsquedas ni datos personales. El apartado anterior de límites describe el alcance original de Fase 04; el vigente está en PHASE_05_REPORT.
