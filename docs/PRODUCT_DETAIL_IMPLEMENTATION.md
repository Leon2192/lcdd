# Fichas — Fase 04

## Datos y rutas

`/catalogo/producto/p-003-vasos-personalizados` ejemplifica la ruta canónica: ID oficial normalizado más nombre legible. Los ID originales, por ejemplo `/catalogo/producto/P-003`, redirigen con replace. Al actualizar un nombre se debe revisar compatibilidad de sus slugs; el ID sigue siendo la clave estable. Rutas desconocidas muestran recuperación al catálogo.

| ID    | Producto                 | Modalidad original propuesta |
| ----- | ------------------------ | ---------------------------- |
| P-001 | Kits antiresaca          | quantity                     |
| P-002 | Kits de baño             | quantity                     |
| P-003 | Vasos personalizados     | quantity                     |
| P-004 | Abanicos personalizados  | quantity                     |
| P-005 | Lentes personalizados    | quantity                     |
| P-006 | Diarios personalizados   | quantity                     |
| P-007 | Estrellitas              | quantity                     |
| P-008 | Capitán de mesa          | tables_or_units              |
| P-009 | Difusores personalizados | quantity                     |
| P-010 | Espejitos personalizados | quantity                     |
| P-011 | Carpa QR                 | quantity                     |
| P-012 | Números de mesa          | tables_or_units              |
| P-013 | Invitaciones digitales   | service                      |
| P-014 | Save the date            | service                      |

## Presentación responsable

La ficha incluye breadcrumbs, categoría, galería, nombre, descripción preliminar rotulada, bloques de características/personalización/variantes, modalidad y relacionados. Las descripciones son propuestas, no textos comercialmente aprobados. Valores desconocidos no se sustituyen por materiales, dimensiones o variantes ficticias. Los bloques técnicos muestran información pendiente mientras no existan valores confirmados. Los relacionados preservan el orden y estado propuesto de Productos.

Quantity no habilita todavía un selector: esa selección corresponde a Fase 05. Tables_or_units conserva su etiqueta y carácter propuesto. Service se presenta como servicio digital, sin selector de unidades ni mínimos físicos. Carpa QR mantiene el conflicto tarjetas/unidades y la definición del servicio pendiente; no se toma una decisión empresarial.

## Galería

ProductGallery recibe imágenes locales tipadas (src, alt, width, height). Sin recursos aprobados muestra un único placeholder explícito y ningún control ficticio. Con múltiples recursos muestra miniaturas como botones, aria-pressed y operación por teclado. `approvedProductMedia` centraliza el registro local, actualmente vacío. Para sustituir placeholders: recibir fotografías propias aprobadas, incorporar archivos locales, registrar dimensiones/alt y actualizar el estado de imágenes mediante fuente autorizada. No se extraen fotos de mockups ni se hacen solicitudes a servicios de imágenes.

## Integración futura

El CTA “Preparar mi pedido · Próximamente” lleva a `/arma-tu-pedido?producto=P-003`: comunica una referencia y explica que no agrega ni guarda productos. No existe acción de éxito simulada. La consulta de WhatsApp abre el modal institucional existente; el número internacional sigue sin validación y no se activa wa.me. La Fase 05 requiere autorización independiente.

## Actualización Fase 05

Las fichas elegibles permiten agregar una cantidad explícita o un servicio sin unidades. CTA provisional sustituido; duplicados no suman automáticamente. P-008/P-011/P-012 mantienen consulta directa por modalidad pendiente. Los bloques repetidos de opciones desconocidas se agrupan. El enlace legado de referencia sigue sin agregar automáticamente. La preparación de mensaje y límites actuales se detallan en ORDER_IMPLEMENTATION/QUOTATION_IMPLEMENTATION/COMMERCIAL_RULES; las notas de próxima etapa anteriores son históricas de Fase 04.
