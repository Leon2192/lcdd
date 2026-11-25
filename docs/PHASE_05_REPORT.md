# PY01 — Informe Fase 05: pedido y cotización

**Resolución posterior vigente:** Dirección Técnica y propietario aprueban Fase 05 para continuar y autorizan Fase 06. Se preservan pendientes gráficos/comerciales y validación completa; el cierre técnico posterior está en PHASE_06_REPORT.

**Actualización vigente 05.1:** Dirección Técnica revisó satisfactoriamente la implementación principal mobile y autorizó optimización/WhatsApp. El propietario verificó manualmente la apertura de conversación con 5491135939460. Enlaces activos solo por acción explícita, sin evidencia de envío/recepción. Resultado posterior: 160 pruebas; ver PHASE_05_1_REPORT. Las cifras de 138 pruebas de este informe corresponden a la entrega original.

Fecha: 24/11/2026. Dirección Técnica aprobó Fase 04 para continuar tras revisar capturas desktop/mobile, manteniendo fotos, logo limpio, validación comercial y responsive completa pendientes. Esta orden autoriza Fase 05; Fase 06 no iniciada.

## Material analizado

AGENTS, README, informes 01–04, arquitectura, sistema de diseño, decisiones, inventario y pendientes. Los nueve originales Comercial fueron leídos íntegramente y contrastados con Marketing y Productos. UI-05 desktop/mobile, UI-06, Commercial Journey y Mobile First fueron inspeccionados visualmente como referencias, sin extraer fotografías.

Marketing: 46/46 entradas con tamaño y SHA-256 coincidentes. Comercial: 9/9 archivos presentes, UTF-8/JSON válidos; su manifiesto carece de hashes/tamaños, por lo que no permite cotejo criptográfico contra emisor. Se registraron hashes locales iniciales y se cotejaron al cerrar (COMMERCIAL_RULES). Productos mantiene SHA-256 `5207b6431d612f46412d96396b8ea88368ab0a3b2fd4144b8ebf90f746ee6a6f`. No se alteraron originales.

## Resultado funcional

Recorrido local disponible: ficha → selección → pedido editable/persistido → datos del evento → revisión/copia de mensaje. Nueve productos físicos usan cantidades explícitas, dos servicios digitales no tienen unidades. P-008/P-012 mantienen pendiente la unidad mesas/unidades y P-011 la discrepancia tarjetas/unidades/servicio: se ofrece consulta contextualizada sin imponer regla comercial ni admitir una cantidad desconocida como 1.

Se pueden agregar, editar, quitar, continuar explorando, recuperar selección y vaciar con confirmación. Repetir un ID no suma ni reemplaza: informa y remite a edición. Los datos del evento no se persisten; se conservan solo en memoria al navegar y se descartan al recargar. Formulario candidato con nombre, tipo, fecha, localidad y comentarios opcionales, con obligatoriedad expresamente pendiente. No se solicita teléfono/correo ni se inventan mínimos o variantes.

El mensaje incluye productos oficiales, cantidades semánticas/servicios y datos aportados; se revisa antes de copiar, con fallback manual si falla Clipboard API. En 05.1 WhatsApp se habilita tras la verificación manual del propietario. No hay envío automático, recepción simulada ni vaciado al copiar/abrir. La vista preliminar no constituye aceptación comercial definitiva de solicitudes incompletas ni aprobación de publicación.

## Arquitectura y rutas

- `features/order`: reglas, store Zustand, selectores, recuperación Zod/LocalStorage, UI y pruebas.
- `features/quotation`: RHF/Zod, sesión en memoria, formulario, generación pura/URL, revisión/copia y consulta directa.
- `data/catalog`: única fuente de verdad de Productos. Se conserva catalog:check, null, estados, colecciones y publicationReady:false.
- `components/ui`: ProductGrid compartido, resto de controles reutilizados. Header recibe contador por props desde RootLayout y no importa el store.
- `/arma-tu-pedido`: selección y resumen; `/cotizacion`: evento y revisión. Se preservan rutas Home/catálogo/categorías/14 fichas, aliases por ID y recuperación de inexistentes. Pedido/cotización con carga por ruta y estado de carga accesible.

Persistencia: clave lcdd:order, version:1, hash del catálogo y líneas por ID/modalidad/cantidad. Validación de corrupción, referencias eliminadas, cantidades, duplicados y cambios de modo. Al cambiar revisión se reselecciona todo de manera conservadora, con aviso. Sin almacenamiento disponible se mantiene la sesión y se informa. Detalles en ORDER_IMPLEMENTATION y QUOTATION_IMPLEMENTATION.

## Integración y ajustes Fase 04

Header desktop/mobile con lista y contador; menú/footer y CTA Home siguen conectados al pedido real. Se conserva composición de Home. Fichas sustituyen CTA provisional por selección real cuando corresponde y consulta directa. Catálogo/categorías explican acceso al pedido sin falsa promesa de futura funcionalidad.

Breadcrumbs alineados con flex y altura táctil, headings con separación coherente, búsqueda de categoría con icono y placeholder, grillas compactas sin alterar columnas mínimas, tarjetas con dos columnas desktop cuando hay pocos productos y ancho contenido. Filtros nativos desplegables, inicialmente abiertos para descubrimiento y consistencia desktop; se pueden cerrar en mobile. Se agruparon avisos repetidos de características/variantes. No se cambió paleta ni logo.

## Dependencias y consistencia

| Nueva dependencia aprobada | Instalada |
| -------------------------- | --------- |
| Zustand                    | 5.1.0     |
| React Hook Form            | 7.92.0    |
| Zod                        | 4.6.7     |

La instalación inicial del agente falló con EAI_AGAIN al resolver registry.npmjs.org. El usuario instaló desde WSL y se verificaron paquetes, manifiesto y lockfile. No se añadió @hookform/resolvers: el adaptador tipado utiliza las APIs ya instaladas. Hay 29 dependencias directas (9 producción/20 desarrollo), sin paquetes necesarios faltantes; npm ls --all código 0. Los cuatro WOFF2 y licencias locales se conservan.

## Validaciones efectivamente ejecutadas

| Comprobación           | Resultado                                                                  |
| ---------------------- | -------------------------------------------------------------------------- |
| catalog:check          | Correcto: 14 productos, cinco categorías y proyección íntegra              |
| TypeScript             | Código 0, tipos estrictos preservados                                      |
| ESLint                 | Código 0, sin advertencias                                                 |
| Prettier               | Código 0, handoffs excluidos para preservar originales                     |
| Vitest no interactivo  | 138 pruebas aprobadas en nueve archivos                                    |
| Build                  | Código 0, 199 módulos, cuatro WOFF2 y cargas por ruta                      |
| npm run check          | Código 0: sincronización, formato, lint, pruebas y build                   |
| Dependencias/lockfile  | npm ls --all código 0; manifiesto/raíz del lock coincidentes               |
| Manifest Marketing     | 46 entradas válidas                                                        |
| Manifest Comercial     | Nueve entradas válidas por presencia/tipo; hashes de emisor no disponibles |
| Navegador/HTTP Fase 05 | No ejecutados; revisión Chrome Windows pendiente                           |

Se mantienen los escenarios previos, adaptando CTA/selector provisional al comportamiento autorizado. Se agregaron 50 pruebas: altas/edición/eliminación, duplicados, físicos/digitales/pendientes, navegación/vacío, persistencia y recuperación, versiones/revisión/IDs eliminados, almacenamiento denegado, formulario/fechas, mensajes, codificación, copia fallida, no persistencia personal y ausencia de precios. Se conserva la prueba sobre CSS compilado que exige theme → base → components → utilities y cuatro fuentes locales. jsdom no comprueba geometrías.

Incidentes resueltos: bloqueo inicial de dependencias superado por instalación del usuario; regla lint de un helper solo usado como tipo corregida; pruebas de CTA antiguas adaptadas sin eliminar su propósito, y aserciones de textarea corregidas. El primer bundle superó 500 kB; se separaron rutas sin elevar el umbral ni reducir estándares. La compilación final ya no emite ese aviso (entrada aproximada 497.7 kB, gzip 153.8 kB).

## Archivos y componentes

Nuevos: `features/order/{rules,persistence,store,use-order,selectors,OrderPage,order.css,order.test,order-flow.test}` y componentes OrderSelection/OrderSummary/OrderSteps; `features/quotation/{schema,message,message.test,QuotationSession,QuotationPage,MessageReview,DirectConsultation}`; ProductGrid compartido; los cinco entregables documentales.

Modificados: package.json y package-lock por dependencias instaladas; AGENTS, README, main, RootLayout, Header, rutas y pruebas; CatalogPage/CategoryPage/ProductDetailPage/CatalogShared/ProductInformation, catalog.css, Icon y pruebas catálogo. Eliminada OrderPendingPage al sustituirla por pedido real, preservando el tratamiento del parámetro legado. Actualizados PHASE_04_REPORT, PENDING_ITEMS, DESIGN_DECISIONS y documentación técnica relacionada.

## Deuda, pendientes y estado final

Pendiente decisión empresarial: campos obligatorios/aceptación de incompletos, política final de duplicados y variantes, tres modalidades no resueltas, mínimos/condiciones, textos/nombre. El número internacional fue validado por el propietario en 05.1. El handoff Comercial sigue siendo parcial y no acredita cierre COM-01–10 completo. Fotografías, logo limpio y revisión responsive real siguen abiertos. Política de invalidar toda selección ante cambios de hash es conservadora; una migración granular requerirá criterio aprobado. Sin sincronización de pestañas/dispositivos ni datos personales persistidos.

Criterios técnicos demostrados localmente en pruebas: selección/edición/persistencia/formulario/revisión/mensaje para productos con modalidad utilizable, con caminos de consulta para pendientes. No se enviaron mensajes. Revisión visual/manual de los ocho anchos y aprobación final a cargo de Dirección Técnica: PHASE_05_VISUAL_VALIDATION contiene instrucciones.

**Fase 05 implementada y validada técnicamente con pendientes comerciales y visuales explícitos; a revisión de Dirección Técnica. Plataforma NO lista para publicación.** Sin Git/GitHub, servicios remotos, backend, pagos, despliegues ni Fase 06. Detenerse y esperar aprobación.

Las interfaces públicas order/index.ts y quotation/index.ts evitan que catálogo o composición importen detalles internos de otras funcionalidades. src/features/README.md refleja los cuatro dominios implementados.

## Correcciones 05.1

Se activan CTA principal de WhatsApp, consulta contextual e institucional, se conserva copia secundaria y persistencia. Scroll/foco explícitos, movimiento reducido, retorno a edición y resumen de evento; fecha es-AR/DD/MM/AAAA con selector nativo; relacionados compactos. Los datos personales siguen en memoria y no cambian modalidades pendientes. TypeScript, build, lint, formato y check satisfactorios; 160 pruebas en 11 archivos. Revisión visual real 05.1 pendiente; Fase 06 no iniciada.
