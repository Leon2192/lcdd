> Actualización 03.1: las fuentes locales y el glyph legítimo de WhatsApp ya están integrados; corregido el orden de capas y la estructura de pasos. Las referencias a pendientes de instalación en la entrega inicial se conservan como antecedente, no como estado vigente. Ver PHASE_03_REPORT.md.

# Home LCDD — Implementación de Fase 03

Ruta pública local: **`/`**. La Home sustituye únicamente el placeholder de Inicio. Catálogo, fichas, Inspiración, Nosotros, Profesionales y pedido conservan los destinos provisionales existentes; no se implementa Fase 04 ni cotización.

## Referencias y jerarquía

Editorial Boutique original y UI-01 Inicio Desktop/Mobile vigentes, inspeccionados visualmente. Especificaciones: Mobile First Experience, Sistema de Diseño, Design & UX Master e integración Marketing/Productos. El contenido comercial usa exclusivamente identidades del catálogo oficial de Productos. No se usan referencias históricas como diseño vigente.

La composición y el título del Hero proceden de UI-01: «Hacé de tu evento un momento único». El JSON de textos de Marketing propone otro título, pero está marcado preliminar; se prioriza el UI-01 aprobado para esta orden. El bloque final «Hagamos algo especial» procede del JSON preliminar entregado y se mantiene dentro del aviso general de contenido pendiente.

## Componentes y composición

| Orden | Componente / sección  | Implementación                                                                                                       |
| ----- | --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1     | Header compartido     | Nombre institucional temporal; centrado mobile de tres columnas, navegación y pedido desktop; menú mobile con pedido |
| 2     | Hero                  | Copy editorial y CTA a catálogo; texto sobre media en mobile, composición dividida desde tablet                      |
| 3     | ValueProposition      | Cuatro textos de referencia UI-01, bajo aviso provisional; filas mobile y banda desktop                              |
| 4     | HomeCategories        | Cinco categorías oficiales, tarjetas apiladas mobile, tres columnas tablet y cinco desde 1024                        |
| 5     | FeaturedProducts      | Cinco productos oficiales en selección de demostración rotulada; carrusel horizontal sin autoplay                    |
| 6     | Inspiration           | Copy y media mobile; collage de tres marcos desktop, todos con placeholders                                          |
| 7–8   | AboutAndProfessionals | Nosotros y Profesionales separados semánticamente, columna mobile y composición lateral desktop                      |
| 9     | HowItWorks            | Cuatro pasos informativos de la lámina, sin wizard ni estado enviado; lista mobile y banda desktop                   |
| 10    | EventTypes            | Cuatro tipos de evento del UI-01 Mobile; sección visible bajo 768 px                                                 |
| 11    | HomeConversion        | Bloque de llamada a pedido, sin seleccionar ni persistir productos                                                   |
| 12    | HomeContact           | Acción WhatsApp que abre el diálogo compartido con número local                                                      |
| 13    | Footer compartido     | Categorías, navegación y contactos; sin captura del logo                                                             |

El listado de cuatro pasos de Home describe el recorrido de manera informativa; no define cuatro etapas de formulario ni contradice las dos etapas funcionales futuras del handoff. No afirma envío ni confirmación.

## Arquitectura

```text
src/features/home/
  HomePage.tsx
  HomePage.test.tsx
  home-content.ts
  catalog-identities.ts
  home.css
  components/
    Hero.tsx
    HomeMedia.tsx
    ValueProposition.tsx
    HomeCategories.tsx
    FeaturedProducts.tsx
    Inspiration.tsx
    AboutAndProfessionals.tsx
    HowItWorks.tsx
    EventTypes.tsx
    HomeConversion.tsx
    HomeContact.tsx
```

HomePage compone las secciones, sin componente monolítico. El contacto reutiliza Outlet context tipado mediante `src/layouts/layout-context.ts` y el Modal existente. No hay nuevo estado global ni dependencia circular hacia features desde componentes compartidos.

Reutilizados: Header, Footer, Brand, Container, Section, SectionHeading, Button, Icon, CategoryCard, ProductCard, Carousel y Modal. Carousel conserva el modo single de Fase 02 y añade `layout="rail"` con scroll nativo, botones, teclado izquierda/derecha, posición anunciada y medición de extremos mediante ResizeObserver. Respeta movimiento reducido y no depende de arrastrar.

## Datos comerciales y reemplazo de destacados

`catalog-identities.ts` contiene solo ID, nombre y categoría de los 14 productos confirmados. `config/categories.ts` conserva las cinco categorías oficiales. Ambas proyecciones se contrastan por pruebas con el JSON oficial. No se importan descripciones propuestas, variantes, mínimos ni fotografías ficticias.

Fuente: `docs/handoff/productos/PY01_catalogo_publico_v1.0.json`.
SHA-256 registrado: `5207b6431d612f46412d96396b8ea88368ab0a3b2fd4144b8ebf90f746ee6a6f`.

El origen tiene `featuredProducts.ids = null`. Por eso `featuredSelection` en `home-content.ts` define explícitamente `status: demonstration` y los IDs P-003, P-004, P-002, P-005 y P-009, visibles en UI-01. Son demostración para composición, no aprobación comercial. Para reemplazarlos, modificar ese array con IDs oficiales y cambiar el estado únicamente al recibir una aprobación explícita; la leyenda depende del estado. No se modifica el archivo oficial.

Carpa QR mantiene sus definiciones y discrepancias originales. No se conecta a cantidades ni se decide si incluye servicio digital.

## Medios y contenido provisional

Aviso visible: «Vista previa · Textos e imágenes pendientes de validación». La selección de destacados tiene además su propia leyenda. Las fotografías tienen placeholders rotulados, incluidos Hero, tarjetas, inspiración, Nosotros y conversión.

HomeMedia admite una imagen aprobada con src, alt y dimensiones para sustituir el placeholder sin reestructurar la sección; prioridad alta solo para la futura media del Hero. Los componentes de tarjeta conservan sus props de imagen opcional. No se recortan mockups ni se generan fotografías.

Los textos se recuperan de las referencias entregadas, no se inventan testimonios, clientes, garantías, números ni promociones. La versión definitiva de textos y la selección comercial siguen pendientes.

## Correcciones del sistema visual

- Captura del logo retirada del render y preservada sin modificaciones; nombre institucional como texto temporal, sin dibujar una nueva marca.
- Header mobile equilibrado con columnas laterales iguales y nombre en el centro. Pedido disponible en menú y CTAs; desktop conserva acceso directo.
- Nombre desktop limitado a 192 px con escala de 30 px. No se interpreta el texto temporal como logo definitivo.
- Espaciado vertical base reducido de 48 a 32 px y de 72 a 48 px en tablet para componentes compartidos. Home usa 32 px mobile y 40 px desde tablet.
- Paleta conservada; escala de H1 basada en los tokens existentes. Iconos auxiliares con el mismo tamaño, stroke y color del sistema.
- Fuentes locales y glyph legítimo WhatsApp siguen pendientes: el intento npm falla por EAI_AGAIN y se solicitó instalación externa. No se agregan imports que rompan build ni se declara un icono genérico como oficial.

## Diferencias conscientes frente a los mockups

Fotografías y logo limpios ausentes; fallbacks tipográficos actuales; textos y destacados provisionales. No hay dots de Hero inertes porque no existen varias imágenes aprobadas. Las categorías de Home siguen la pila de UI-01 Mobile, distinta de la grilla genérica del catálogo. El carrusel usa scroll y controles inferiores accesibles, no botones que cubran imágenes. Tipos de eventos solo mobile. Se omiten TikTok, testimonios y promesas no confirmadas.

La composición se implementó por referencia; su fidelidad visual efectiva todavía no fue comprobada por el agente. Ver HOME_VISUAL_VALIDATION.md y PHASE_03_REPORT.md.

## Corrección de auditoría 03.1

El CSS de Home se carga desde main después de globals; se declara primero el orden de capas. Esto evita que base sobreescriba componentes, causa del SVG visible inesperadamente en los pasos y de posibles colores incorrectos en footer y botones. Número e icono se agrupan en un solo marcador; texto permanece en la segunda columna flexible de cada paso. Mobile: lista flex vertical de ancho completo; desktop: cuatro columnas.

Fuentes e icono WhatsApp ya incorporados y verificados. Las notas de indisponibilidad anteriores corresponden a la entrega inicial de Fase 03 y están superadas. El registro vigente, licencias y resultados se detallan en PHASE_03_REPORT.md y ASSET_INVENTORY.md. No se reconstruyó la Home ni se modificaron fotos, catálogo, datos de Carpa QR o el número internacional.
