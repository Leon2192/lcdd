# Arquitectura vigente — PY01 / Fase 06

React 19 + Vite 8 + TypeScript 6 estricto, Node 24/npm 11 y desarrollo local WSL2. Fase 05 aprobada para continuar; Fase 06 ejecutada y pendiente de revisión. Fase 07/ZIP/publicación no autorizados. Los informes de cada fase conservan su evolución histórica.

## Organización y dependencias

```text
src/
  app/          Composición y router de navegador
  routes/       Rutas, metadata/foco por navegación y pruebas
  layouts/      RootLayout y contacto institucional
  components/   UI compartida, Brand y Header/Footer (sin imports de features)
  config/       Institución, navegación, SEO y registros de imágenes
  data/catalog/ Tipos, proyección generada y consultas oficiales
  features/
    home/       Home modular y contenido provisional
    catalog/    Catálogo, categorías, fichas y galería
    order/      Reglas, Zustand, persistencia, selección y resumen
    quotation/  RHF/Zod, sesión en memoria, revisión y WhatsApp
  lib/          Funciones compartidas, fechas, URLs y foco
  pages/        Recuperación 404/error y demo de desarrollo
  styles/       Tokens, fuentes locales y componentes
  test/         Setup y simulación de dialog en jsdom
```

App → routes → layouts/pages/features. Features → UI/config/data/lib. Shared no depende de features; las pruebas sí pueden importar dominios. Order/quotation tienen interfaces públicas pequeñas para composición. No hay BFF/API/backend ni stores vacíos. ProductGrid/ProductRail reutilizan los mismos productos; no hay catálogo comercial alternativo.

RootLayout compone contador Zustand, Header/Footer, contacto, RouteMetadata y QuotationSession. Header recibe contador por props. El FormProvider permanece montado al navegar para mantener evento solo en memoria. La metadata ignora datos personales y filtros; el foco por cambio de pathname no interrumpe controles ya en uso. RouteErrorPage recupera errores con texto genérico.

## Rutas

| Ruta                                    | Estado                                                      |
| --------------------------------------- | ----------------------------------------------------------- |
| /                                       | Home implementada, recursos/textos pendientes identificados |
| /catalogo                               | Catálogo y filtros por categoría                            |
| /catalogo/categoria/:categorySlug       | Cinco categorías oficiales; búsqueda nominal                |
| /catalogo/producto/:productSlug         | Catorce fichas; ID legado redirige a slug legible           |
| /arma-tu-pedido                         | Selección editable y persistida; carga por ruta             |
| /cotizacion                             | Evento/revisión/mensaje; carga por ruta                     |
| /inspiracion, /nosotros, /profesionales | Provisionales, no ampliadas                                 |
| /__dev/design-system                    | Solo DEV, ausente del JavaScript productivo                 |
| desconocidas                            | 404 de interfaz y recuperación, sin afirmar HTTP 404        |

React Router exporta routes sin crear navegador para probar con createMemoryRouter. No existen loaders remotos. La SPA necesita JavaScript y un servidor local; no se promete SEO renderizado en servidor.

## Datos y privacidad

scripts/sync-catalog.mjs deriva catalog.generated.ts del JSON oficial y registra SHA. catalog:check rechaza diferencias antes de typecheck/build/check. Se conservan todos los estados/null/publicationReady:false, relacionados y colecciones. Los originales son inmutables; nuevas versiones futuras deben recibirse con trazabilidad.

Zustand guarda líneas por ID/modo/cantidad y metadatos de versión/revisión en lcdd:order. Zod valida el sobre estricto, referencias/cantidades y recuperación. Fallar limpieza no elimina líneas válidas de memoria. Un cambio de hash requiere reseleccionar; no se migran modalidades silenciosamente. RHF mantiene nombre/evento/fecha/localidad/comentarios solo en memoria.

Selector aprobado: Fiesta de XV, Casamiento, Cumpleaños y Otro; opcional, vacío inicial. EventTypeField evita el popup nativo desbordado con combobox/listbox contenido, conectado por useController. WhatsApp usa número autorizado central, codificación Unicode y acción explícita; nunca confirma envío ni borra selección por abrir/copiar. P-008/P-011/P-012 siguen consultándose sin imponer unidad.

## Recursos y estilos

visualAssets registra recursos locales aprobados de logo/Home/categorías, actualmente vacíos. Productos mantiene approvedProductMedia y su validación de origen. Los componentes ya admiten src/alt/dimensiones; no hay fotos ficticias. Las cuatro fuentes locales y sus licencias se preservan. SVG WhatsApp legítimo y carrito aprobado.

CSS inicia con theme → base → components → utilities. main importa globals antes de Home/catálogo/pedido; la regresión se comprueba sobre CSS compilado. Las cajas usan minmax(0,1fr), wrapping y targets definidos; geometría real pendiente de matriz Chrome Windows. No se oculta overflow global para encubrir errores.

## Compilación, seguridad y calidad

Alias @/ en TypeScript y Vite/Vitest. Strict/noUncheckedIndexedAccess/exactOptionalPropertyTypes y controles de código no usado activos, sin supresiones para ocultar errores. ESLint separado de Prettier.

Rolldown separa React y conserva rutas diferidas; se emite manifest para inspección. No se elevan umbrales para ocultar avisos ni se afirman mejores tiempos sin medición. Vite/preview loopback; deny HTTP de handoffs/carpetas sensibles; solo Vitest Node puede transformar docs como fixtures. index y robots bloquean indexación; metadata dinámica por ruta sin canonical público ni datos estructurados inventados.

Vitest/RTL cubren comportamiento y artefactos, no certifican navegación física, WCAG o CWV. Resultados y pendientes actuales en PHASE_06_REPORT, TECHNICAL_AUDIT y FINAL_QA_CHECKLIST. No hay Git/GitHub/despliegue ni ZIP generado.
