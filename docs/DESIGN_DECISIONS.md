# Decisiones e inconsistencias — Fase 02

Registro iniciado el 24/11/2026. Actualización: Dirección Técnica aprobó condicionadamente Fase 02 tras revisión externa y autorizó Fase 03. Sin autorización para Fase 04 ni publicación. Las decisiones DS-01 a DS-19 preservan su contexto histórico.

## Jerarquía aplicada

Dirección General > validaciones funcionales/comerciales > catálogo oficial entregado por Productos > especificaciones aprobadas > mockups. El material consolidado conserva extractos y propuestas, no todos los originales íntegros. La orden actual supera la prohibición histórica de programar en el DOCX de transferencia y confirma el cierre de Fase 01.

| ID    | Evidencia / inconsistencia                                                                                     | Decisión o estado                                                                                                                       |
| ----- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| DS-01 | Fase 01 figuraba pendiente de HTTP local                                                                       | Dirección Técnica confirma finalización; usuario informa curl HTTP/1.1 200 OK. Registrar evidencia externa sin atribuirla al sandbox    |
| DS-02 | Paleta JSON y lámina A dicen valores exactos, pero los extractos dejan aprobación pendiente                    | Usar valores del JSON como propuesta trazable. No declarar aprobación definitiva                                                        |
| DS-03 | Propuestas históricas varían identidad y saturación                                                            | Mantener Editorial Boutique original como referencia prioritaria; archivo histórico sin uso normativo                                   |
| DS-04 | Logo original recibido es una captura con círculo, fondo y lápiz de edición                                    | Copia binaria exacta completa, sin filtros/crop/SVG; versión limpia pendiente                                                           |
| DS-05 | Mockups posteriores muestran logos tipográficos reinterpretados                                                | No copiarlos; se conserva el PNG recibido                                                                                               |
| DS-06 | Cormorant/DM Sans propuestas; sin binarios ni pesos exactos aprobados                                          | Familia/licencia familiar consultadas; descarga bloqueada. Fallbacks y pesos técnicos provisionales, sin fingir distribución de fuentes |
| DS-07 | UI-02 original incluye productos ajenos y favoritos                                                            | Catálogo oficial Productos manda; no añadir esos productos ni favoritos                                                                 |
| DS-08 | UI-02 V1.1 es más reciente, pero conserva errores de logo y añadir directo                                     | Tomar organización visual, no replicar errores funcionales. ProductCard enlaza ficha                                                    |
| DS-09 | P-011 Carpa QR: ficha dice tarjetas, matriz general dice unidades; servicio QR incluido/separado sin confirmar | Mantener discrepancia abierta para Productos/Comercial. No editar catálogo ni conectar selector a P-011                                 |
| DS-10 | Bloques C/D y A muestran tres o cuatro etapas, bolsa y solicitud enviada                                       | No transferir esos estados; usar lista de solicitud. Fase 02 no implementa el flujo comercial                                           |
| DS-11 | D-01 muestra dos columnas a 320; extracto Mobile First indica una                                              | Prima especificación: una a 320, dos desde 390. Sin copiar el error de lámina                                                           |
| DS-12 | UI-04 afirma material, capacidad y accesorios; UI-07 afirma funcionalidades digitales                          | No incorporar esas características como reales; ninguna ficha comercial implementada                                                    |
| DS-13 | UI-08 mezcla eventos/colecciones con categorías                                                                | Cinco identidades oficiales intactas. Colecciones propuestas no son nuevas categorías ni combos                                         |
| DS-14 | Mockups muestran CTA flotantes duplicados y superpuestos                                                       | Sin flotantes duplicados en esta fase; accesos en layout y safe areas                                                                   |
| DS-15 | Acceso WhatsApp requerido, internacional aún provisional                                                       | Acceso a número local por diálogo; no habilitar enlace internacional ni envío preparado hasta validación                                |
| DS-16 | Informe definitivo Comercial y maestros Marketing no entregados                                                | No completar empresarialmente lo que falta; referencias preliminares etiquetadas                                                        |
| DS-17 | Menú desktop sin breakpoint exacto definido                                                                    | Umbral técnico provisional 1280; grilla sigue 1/2/3/4 columnas del handoff                                                              |
| DS-18 | Iconos solicitados, instalación Lucide bloqueada                                                               | Iconos geométricos mínimos locales, sin dependencia nueva ni reinterpretación de marca                                                  |
| DS-19 | Demo podría contaminar el sitio comercial                                                                      | Ruta lazy condicionada por DEV, sin enlaces comerciales; verificación del bundle productivo                                             |

## Implementación técnica

CSS variables como fuente única de tokens y exposición Tailwind 4; componentes tipados que consumen el mismo sistema. Sin librerías de overlays/carrusel o estado global innecesarias. Dialog y controles nativos mantienen semántica; reducer/store de pedido, formularios comerciales y catálogo real se reservan a fases autorizadas futuras.

No se modificó ningún archivo del handoff ni el catálogo oficial. Los límites numéricos de la demo son técnicos y no se transfieren a productos. El estado final de Fase 02 y los resultados de calidad se detallan en PHASE_02_REPORT.md.

## Decisiones vigentes de Fase 03

| ID     | Decisión                                                                            | Evidencia y límite                                                                                                                        |
| ------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| H03-01 | Denominación institucional temporal, sin captura de logo                            | Orden expresa de Dirección Técnica. Original preservado; no reconstruir identidad                                                         |
| H03-02 | Hero con texto y composición de UI-01 vigente                                       | Referencia principal de esta orden; título del JSON sigue preliminar. Copy visible bajo aviso de validación pendiente                     |
| H03-03 | Nombre centrado en mobile con columnas laterales iguales; escala desktop acotada    | Corrección implementada, centrado real pendiente de revisar en Chrome Windows                                                             |
| H03-04 | Espaciados mobile reducidos y paleta conservada                                     | Corrección solicitada; no nueva identidad ni colores arbitrarios                                                                          |
| H03-05 | Home como feature separada con componentes de sección                               | Sin catálogo funcional, stores ni cotización fuera de alcance                                                                             |
| H03-06 | Identidades de categorías y productos solo de la fuente oficial de Productos        | Proyecciones mínimas contrastadas por pruebas. Archivo oficial sin cambios                                                                |
| H03-07 | Selección de destacados de demostración explícita                                   | El origen tiene featuredProducts.ids null. Se toman cinco identidades del UI-01 sin convertirlas en aprobación comercial                  |
| H03-08 | Fotografías sustituidas por placeholders HTML/CSS identificados                     | No fotos generadas, recortes ni mockups completos de fondo                                                                                |
| H03-09 | Hero de una composición, sin dots inertes                                           | No hay varios recursos aprobados para simular slides                                                                                      |
| H03-10 | Categorías apiladas mobile y fila de cinco desde 1024; tipos de eventos solo mobile | Composición UI-01, no simple reducción del desktop. Grilla de Home distinta de grilla genérica del catálogo                               |
| H03-11 | Carrusel rail con scroll nativo, flechas, teclado y reduced-motion                  | Varias tarjetas desktop, una mobile; sin autoplay ni dependencia nueva                                                                    |
| H03-12 | Cuatro pasos de Home son información, no etapas de cotización                       | Se mantiene el recorrido de referencia sin wizard ni confirmación de envío; dos etapas funcionales futuras no implementadas               |
| H03-13 | Contacto compartido por Outlet context tipado                                       | WhatsApp muestra número local. Internacional y mensaje preparado siguen sin activar                                                       |
| H03-14 | Fuentes e icono oficial siguen pendientes tras instalación bloqueada                | Se solicitó instalación externa. No se incorporan binarios sin licencia ni se dibuja un falso glyph de WhatsApp                           |
| H03-15 | Validación visual manual en Chrome Windows                                          | Chromium carece de libnspr4.so; servidor sandbox EPERM. El usuario pidió no seguir resolviendo entorno                                    |
| H03-16 | Corrección de inventario de imagen                                                  | Editorial_Boutique_original.png contiene JPEG real 1536 × 1024. Se corrigieron dimensiones documentadas sin alterar el archivo ni su hash |

Los textos de Nosotros y propuesta de valor proceden de los mockups entregados y permanecen provisionales; no se agregan testimonios, estadísticas, garantías, promociones ni claims nuevos. La aprobación condicionada de Fase 02 no implica aprobación definitiva de textos, selección de destacados o recursos fotográficos.

## Auditoría visual y correcciones Fase 03.1 — estado vigente

Dirección Técnica considera satisfactoria la base de Home, pero **Fase 03 sigue sin aprobar**. Reportó en capturas reales un fallo grave a 360 px. La nueva corrección requiere revisión manual; no se declara validación visual del agente.

| ID      | Causa / decisión                                                                                                            | Corrección y evidencia                                                                                                                                                                                                |
| ------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H031-01 | El build anterior declaraba components antes que base; el orden de importación de Home y globals establecía esa precedencia | Declaración explícita theme/base/components/utilities e importación ordenada de estilos en main. HomePage ya no importa CSS fuera de ese punto de entrada. Regresión sobre CSS compilado                              |
| H031-02 | Preflight, en una capa base posterior, podía reactivar SVG que el componente ocultaba                                       | El grid mobile recibía tres hijos: número, icono y texto. El párrafo se autoposicionaba en la primera pista de 44 px. Número e icono quedan agrupados en un único marcador; texto siempre en segunda columna flexible |
| H031-03 | La lista y wrapper dependían de pistas implícitas                                                                           | Wrapper con columna minmax(0,1fr), lista mobile flex vertical de ancho 100%, pasos con marcador fijo y texto flexible. Desktop conserva cuatro columnas e iconos                                                      |
| H031-04 | La misma inversión de capas podía anular colores y fondos de componentes                                                    | Recuperada prioridad de footer blanco sobre petróleo y botones sobre Preflight, sin alterar la paleta. Contraste blanco/petróleo 7.45:1                                                                               |
| H031-05 | Ancho de párrafo Hero y espaciados mobile                                                                                   | Hero con pista explícita, width 100%, máximo 40ch; sección Home 28 px mobile y 40 px tablet; heading-tarjeta 20 px; títulos de categorías/productos 24 px                                                             |
| H031-06 | Fuentes solicitadas ya disponibles                                                                                          | Fontsource Variable 5.3.0 local, normal/italic, licencias OFL verificadas; cuatro archivos Latin, sin servicio externo                                                                                                |
| H031-07 | Glyph WhatsApp disponible                                                                                                   | faWhatsapp de Font Awesome Free Brands 7.3.1, geometría intacta, CC BY 4.0 y atribución preservada; SVG decorativo dentro de controles con nombre accesible                                                           |
| H031-08 | Riesgo de declarar regresiones DOM como verificación visual                                                                 | Pruebas de estructura, compilación y contraste; revisión responsive efectiva pendiente en Chrome Windows. No reintentar Chromium/Playwright bloqueados                                                                |

H03-14 queda resuelta en lo relativo a fuentes y glyph: la indisponibilidad registrada en Fase 03 es histórica. PEND-01 y PEND-15 están resueltos técnicamente; no implican aprobación de todos los pesos exactos, textos o identidad definitiva. Se mantienen logo provisional, fotografías pendientes, número internacional sin activar, catálogo oficial y Carpa QR intactos.

## Fase 04 — Catálogo derivado y exposición local

Se adopta generación verificable desde el JSON oficial (catalog:sync/check) y se elimina duplicación de identidades en Home/config. Conservación íntegra de estados, null y publicationReady:false; no se inventa visibility ausente. Exposición exclusivamente local con aviso preliminar, sin aprobación editorial implícita.

UI-02 V1.1 agrupa por categoría con filtros; UI-03 habilita búsqueda nominal dentro de cada categoría. Orden del origen, sin ordenamiento comercial. Fichas con ID más slug y compatibilidad por ID. UI-04/UI-07 orientan composición, pero no autorizan inventar capacidades, variantes o fotos. CTA futuro comunica Próximamente y nunca agrega productos. Servicios sin selector físico y QR pendiente.

CSS exclusivo catalog-* en capa components, importado desde main tras globals/Home, minmax(0,1fr) y sin anchos fijos de contenido. Se conserva la prueba del CSS compilado que previene la regresión de 03.1. Revisión visual de los ocho anchos pendiente externamente.

## Fase 05 — Selección y cotización

Dirección Técnica aprueba Fase 04 para continuar y autoriza explícitamente estado persistido, edición y formulario. El nuevo handoff Comercial es parcial: no equivale a aprobación de todas sus propuestas. COMMERCIAL_RULES separa autoridad y estado de cada decisión.

Store Zustand con líneas mínimas por ID y cantidades explícitas; recuperación Zod, versión y SHA de catálogo. Sin datos personales persistidos. Duplicados idempotentes sin suma/reemplazo automático, hasta política comercial final. P-008/P-011/P-012 se consultan sin forzar unidad. Servicios digitales sin cantidades. No se ofrecen variantes pendientes.

RHF mantiene el evento solo en memoria en el layout. Campos candidatos opcionales con aviso, sin teléfono/correo ni plazos/geografía ficticios. Revisión y copia honestas; mensaje puro/URL codificada, enlace desactivado por número sin verificar. Nunca se vacía por copiar/abrir ni se confirma envío. Order/Quotation se cargan por ruta para evitar el aviso de chunk inicial >500 kB sin elevar umbral.

Header mobile conserva marca y columna de acciones: pedido visible con lista/contador; contacto WhatsApp en menú y footer. Catálogo: breadcrumbs alineados, buscador con icono/placeholder, filtros desplegables inicialmente abiertos, espacio contenido para dos tarjetas, menos repetición de pendientes. No cambian identidad/Home. CSS mantiene el orden compilado theme/base/components/utilities. Revisión visual efectiva sigue externa.

## Fase 05.1 — WhatsApp autorizado y revisión visible

Dirección Técnica autoriza el número internacional tras verificación manual del propietario: apertura de la conversación, sin prueba de envío/recepción. site.ts centraliza el contacto y lib/whatsapp.ts evita duplicación entre institucional y cotización. Enlace principal Enviar solicitud por WhatsApp, copia secundaria; institucional conserva diálogo con enlace activo, consulta de ficha lleva ID/nombre. Ninguna apertura vacía selección.

revealSection separa foco preventScroll de scrollIntoView, respeta reduced-motion y permite retornar a edición. EventSummary y bloques del mensaje mejoran jerarquía; se conserva la plantilla de IDs por trazabilidad comercial. Avisos de formulario reducidos y confirmación de copia role status/aria-atomic sin afirmar envío.

Formato de aplicación DD/MM/AAAA es-AR/UTC, selector nativo accesible. No se crea Select de eventos: Comercial solo menciona segmentos hipotéticos. ProductRail reutiliza carrusel nativo horizontal para relacionados de ficha/pedido, con botones/teclado/scroll y tarjetas compactas; preserva capas y no cambia Home/catálogo. Revisión geométrica externa pendiente en ocho anchos. Las notas previas de WhatsApp desactivado son antecedentes superados por esta resolución.

## Selector de evento — contención del menú mobile

La captura de 360 px evidencia que el popup nativo del sistema puede exceder el ancho emulado pese a que el select cerrado cabe. EventTypeField reemplaza solo ese control por un combobox select-only de lista HTML con ancho limitado, texto envolvente, altura acotada y apertura arriba/abajo. No se modifica el Select genérico ni la fecha nativa. Opciones y enum siguen centralizados; useController conecta el valor/foco y la selección invalida el mensaje previo. Sin bibliotecas adicionales, sin ocultar overflow del documento. La validación visual sigue a cargo de Chrome Windows.

## Icono del pedido — instrucción posterior del propietario

El propietario solicita usar carrito en lugar de lista. Esta resolución reemplaza la elección visual anterior de lista de solicitud: Header desktop/mobile, footer y CTA de Home comparten Icon cart, con el tamaño, trazo y carácter decorativo de los demás iconos. Se conservan Armá tu pedido, contador, navegación y lógica comercial. No implica precios, pagos ni checkout; no se modifican handoffs originales ni se agregan dependencias.

## Fase 06 — Auditoría técnica autorizada

Fase 05 aprobada para continuar; se mantienen selector aprobado, carrito, identidad y reglas pendientes. Sin nuevas funcionalidades comerciales. Metadatos/noindex por ruta, error boundary y foco respetuoso con el usuario, contrato persistido estricto y recuperación sin pérdida de líneas válidas por fallo de limpieza. URL WhatsApp tolera UTF-16 malformado; repetición de copia se anuncia.

React se separa usando codeSplitting de Rolldown: reduce mayor chunk y favorece granularidad de caché; no se afirma menor JS inicial ni mejores CWV. Vite/preview en loopback; deny de handoffs para HTTP y excepción de lectura de fixtures solo en Vitest Node. Registros locales de imágenes vacíos conectan recursos futuros sin cambiar la Home actual.

Noindex/robots siguen activos; sin canonical/social image inventados. La calidad automatizada no constituye aprobación visual, WCAG completa o permiso de publicación. Npm audit externo informado: 0 conocidas; el agente registró su fallo de red. Ver los nueve entregables de Fase 06.

## Actualización vigente — cierre V1.0

Fase 06 aprobada y finalización integral/ZIP local autorizados por el propietario; las restricciones históricas de no empaquetar quedan superadas por esa orden. Inspiración, Nosotros y Profesionales implementadas con textos propuestos; cinco colecciones oficiales conservan estado conceptual propuesto. No existen fotografías independientes aprobadas ni logo limpio en los handoffs: se mantienen placeholders abstractos identificados y denominación textual. Favicon tipográfico provisional local, sin rediseñar el logo original. Registro de imágenes único en src/config/media.ts; 74 archivos esperados en pending-assets/EXPECTED_FILES.csv. Ver REPLACE_RESOURCES.md y LOCAL_V1_SUMMARY.md para el cierre operativo y comprobaciones reales. No se autoriza publicación, ni se resuelven modalidades, mínimos, variantes u obligatoriedad comercial pendientes.
