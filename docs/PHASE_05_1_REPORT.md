# PY01 — Informe Fase 05.1

**Resolución posterior:** Fase 05 aprobada para continuar y Fase 06 autorizada por Dirección Técnica/propietario. Las cifras y pendientes siguientes describen la entrega 05.1 y sus correcciones; estado técnico vigente en PHASE_06_REPORT.

Fecha: 24/11/2026. Alcance autorizado: optimización comercial del recorrido existente y activación de WhatsApp. Dirección Técnica consideró satisfactoria la implementación principal de Fase 05 tras revisar capturas mobile de ficha, pedido, formulario y revisión; solicitó estas correcciones antes del cierre definitivo. No se avanzó a Fase 06.

## Evidencia del número y límites

El propietario verificó manualmente que `https://wa.me/5491135939460` abre la conversación de La Casa del Detalle. Es evidencia comunicada por el usuario y autorización explícita, no una comprobación de navegador realizada por el agente. Se registró en AGENTS y configuración institucional. **La evidencia solo acredita apertura de la conversación: no acredita envío, recepción, cotización ni venta.**

`src/config/site.ts` centraliza internationalNumber y internationalNumberValidated:true. Se retiró el nombre provisionalInternationalNumber. `src/lib/whatsapp.ts` centraliza la construcción de URL institucional y URL con texto usando encodeURIComponent; quotation/message mantiene sus exports anteriores por compatibilidad.

## Cambios implementados

- Revisión: acción principal **Enviar solicitud por WhatsApp**, enlace dinámico con el mensaje vigente, target blank y rel noopener noreferrer. Solo abre por clic/activación de teclado; el envío final es manual en WhatsApp. Copiar mensaje pasa a acción secundaria.
- Consultas contextualizadas: modal con texto por nombre/ID oficial y CTA Consultar por WhatsApp. Carpa QR, Capitán de mesa y Números de mesa mantienen modalidades pendientes y no reciben cantidades ficticias.
- Institucional: header, menú mobile, Home y footer conservan el diálogo compartido; este ofrece Conversar por WhatsApp con el número autorizado. No se cambia la composición aprobada de Home ni se inicia conversación automáticamente.
- Revisión visible: revealSection enfoca con preventScroll y luego scrollIntoView al encabezado de revisión. Movimiento smooth solo cuando la preferencia lo permite; auto con reduced-motion o sin matchMedia. El foco no provoca otro desplazamiento independiente.
- Resumen del evento: nombre/tipo/fecha/localidad/comentarios aportados, jerarquía separada del texto final. Editar datos del evento invalida la revisión, vuelve con foco/scroll al formulario y conserva los valores.
- Copia: confirmación en role status con aria-atomic. Solo informa copiado después de Clipboard API; si falla, selecciona el texto y mantiene las instrucciones manuales. No afirma que algo fue enviado o recibido.
- Fechas: selector nativo preservado con lang es-AR, etiqueta y hint. La aplicación representa fechas en DD/MM/AAAA con Intl.DateTimeFormat es-AR y UTC para evitar corrimientos; conserva cuatro dígitos de año. No se impone formato visual al selector nativo, que también depende del navegador/sistema.
- Tipo de evento libre: Comercial menciona segmentos hipotéticos y cotizacion.json no aprueba un listado. No se inventó un Select ni se alteraron campos opcionales.
- Relacionados: ProductRail compartido reutiliza Carousel y ProductCard en ficha y pedido. Una pista horizontal reemplaza la larga grilla vertical; tarjetas compactas, vistazo de siguiente tarjeta, scroll nativo, botones, teclado y anuncios. No se ocultaron productos ni se alteró su orden/asociaciones.
- Comunicación: aviso del formulario unificado, resumen/mensaje separados y menos repetición de advertencias. Se preservan las aclaraciones de condiciones no confirmadas y compra no confirmada. El mensaje usa separación entre bloques y conserva IDs conforme a linea_plantilla del handoff Comercial.

## Estado y restricciones preservados

No cambiaron store, versión/clave de persistencia ni reglas de cantidades/duplicados. Abrir el enlace o copiar no vacía el pedido. Los datos personales del evento siguen solo en memoria; no se añaden a LocalStorage. No hay mínimos, variantes ni características inventadas. Productos sigue siendo fuente única, con null, estados y publicationReady intactos. Sin imágenes nuevas, precios, pagos, checkout, backend, APIs remotas, Git, GitHub ni despliegues. No se alteró docs/handoff.

## Archivos principales

Nuevos: lib/whatsapp.ts, lib/event-date.ts, lib/reveal-section.ts; components/ui/ProductRail.tsx; features/quotation/EventSummary.tsx; pruebas optimizations.test.tsx y event-date.test.ts; este informe.

Modificados: config/site.ts, RootLayout, quotation/{message,schema,MessageReview,DirectConsultation,QuotationPage}, order/OrderPage, catalog/ProductDetailPage, order.css; pruebas message/order-flow/Home/routes y visual-foundations. Actualizados README, AGENTS, PHASE_05_REPORT, PHASE_05_VISUAL_VALIDATION, DESIGN_DECISIONS, PENDING_ITEMS, COMMERCIAL_RULES y documentación de pedido/cotización. Sin nuevas dependencias ni cambios al lockfile.

## Validaciones reales

| Validación               | Resultado                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| TypeScript               | Código 0; estricto preservado                                                                   |
| Build                    | Código 0; 204 módulos, cuatro WOFF2 locales, rutas diferidas; sin aviso de tamaño de chunk      |
| ESLint                   | Código 0; sin advertencias                                                                      |
| Prettier                 | Código 0                                                                                        |
| Vitest no interactivo    | 160 pruebas aprobadas en 11 archivos                                                            |
| npm run check            | Código 0; catálogo, formato, lint, pruebas y build                                              |
| Dependencias y lock      | npm ls --all código 0; raíz/engines/dependencias coincidentes                                   |
| Catalog:check            | Fuente oficial sincronizada, 14 productos y cinco categorías                                    |
| Handoffs                 | Marketing: 46 entradas con bytes/SHA; Productos y nueve hashes locales de Comercial preservados |
| Chromium/Playwright/HTTP | No ejecutados en 05.1; bloqueos previos no se reintentaron                                      |

Las 138 pruebas anteriores se conservaron, actualizando las expectativas que antes exigían WhatsApp desactivado y el texto anterior de copia. Se agregaron 22 casos: número y codificación, accesos institucionales/menú/contexto, conservación de selección al activar, foco/scroll y reduced-motion, volver a editar, copia accesible, fecha nativa/formato local y pista compacta. La regresión de responsive comprueba la regla del carrusel en el CSS realmente compilado, además de teclado/estructura y capas; no mide geometría de navegador.

En la prueba de activación se cancela la navegación externa del entorno de test y se verifica el enlace/estado/persistencia. No se abrió WhatsApp ni se enviaron mensajes desde las herramientas de prueba. El evento de activación no se interpreta como recepción.

## Revisión externa pendiente

Ver PHASE_05_VISUAL_VALIDATION para Chrome Windows a 320/360/390/768/1024/1280/1440/1920. Revisar scroll/foco reales y reduced-motion, visibilidad de CTA, carrusel/touch/flechas, fechas nativas, enlace con texto y preservación al regresar, Home/catálogo/header/footer, zoom y overflow. No se afirma fidelidad visual comprobada de 05.1 ni certificación WCAG completa.

Persisten fotografías definitivas, logo limpio, textos/condiciones/variantes/mínimos, tres modalidades comerciales y obligatoriedad/aceptación de datos incompletos. El número internacional deja de ser pendiente. **Fase 05.1 implementada y validada técnicamente, pendiente de revisión y aprobación de Dirección Técnica; no se declara plataforma lista para publicación.** Detenerse y esperar autorización, sin Fase 06.

## Corrección posterior — desplegable Tipo de evento

El propietario aprobó posteriormente Fiesta de XV, Casamiento, Cumpleaños y Otro como selector opcional. Una captura real de Chrome Windows a 360 px mostró el menú nativo extendiéndose fuera del viewport emulado. Se reemplaza solo este campo por EventTypeField, lista HTML acotada al ancho del control, opciones con texto envolvente y altura/posición dependientes del espacio disponible. No se oculta el overflow global para tapar el problema ni se cambia el selector nativo de fecha.

Se preserva RHF/Zod, selección vacía inicial, accesibilidad de teclado/foco/lectura y reflejo en resumen/mensaje. Cambiar el valor invalida la revisión. Se agregan pruebas de apertura/cierre/teclado/búsqueda/reset/posición y del CSS compilado, conservando las pruebas del recorrido. Resultado actualizado: 175 pruebas, 12 archivos; typecheck, lint, formato y npm run check código 0. Build correcto con aviso de chunk inicial ~502 kB (umbral intacto); no es fallo de compilación. Sin dependencias ni cambios comerciales adicionales.

Revalidación visual externa pendiente a 360 px y resto de anchos. No se reintentaron Chromium/Playwright ni se afirma que se midió la geometría en navegador del agente. Fase 06 no iniciada.
