# Pendientes vigentes — Fase 06

Dirección Técnica aprobó condicionadamente Fase 02 tras revisar capturas externas y autorizó Fase 03. Fases 03 y 04 aprobadas para continuar; Fase 05 aprobada para continuar y Fase 06 autorizada. No hay autorización para Fase 07, ZIP ni publicación. Los recursos ausentes no bloquean la implementación con placeholders, pero deben conservar su estado pendiente.

| ID      | Pendiente / estado actual                                                                                 | Responsable y alcance                                                                                                                           |
| ------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| PEND-01 | Resuelto técnicamente: Cormorant Garamond y DM Sans locales 5.3.0, normal/italic, licencias OFL revisadas | Cuatro WOFF2 Latin y avisos distribuidos en el build; revisión visual de pesos sigue a cargo de Dirección Técnica                               |
| PEND-02 | PNG limpio y vector original: no entregados                                                               | Marketing / Dirección General. Captura original preservada sin renderizar; denominación institucional temporal en texto                         |
| PEND-03 | Validación exacta de valores de paleta, pesos y detalles técnicos                                         | Marketing / Dirección Técnica. Paleta conservada; valores siguen trazados a propuesta                                                           |
| PEND-04 | Fotografías definitivas de Hero, productos, inspiración, Nosotros y conversión                            | Productos / Marketing. Placeholders identificados; sin recortes de mockups                                                                      |
| PEND-05 | Características, variantes, mínimos y condiciones reales                                                  | Productos / Comercial. No inferirlas ni publicarlas desde las láminas                                                                           |
| PEND-06 | Carpa QR: tarjetas/unidades y servicio QR asociado                                                        | Productos / Comercial. Discrepancia sin resolver; fuente oficial intacta                                                                        |
| PEND-07 | Funcionalidades digitales y formato/entrega Save the date                                                 | Productos. No se prometen funcionalidades en la Home                                                                                            |
| PEND-08 | Informe definitivo Comercial, mensajes y recorrido funcional                                              | Comercial / Dirección General. Handoff parcial recibido; formulario/mensaje candidatos implementados sin envío                                  |
| PEND-09 | Textos institucionales finales y textos comerciales de Home                                               | Marketing / Dirección General. Copy recuperado de UI-01 y JSON preliminar; aviso visible de revisión pendiente                                  |
| PEND-10 | Seis expedientes maestros Marketing íntegros                                                              | Marketing. Los extractos no reemplazan originales                                                                                               |
| PEND-11 | Resuelto 05.1: número internacional WhatsApp                                                              | Propietario verificó apertura de conversación con 5491135939460; enlace autorizado. No acredita envío/recepción                                 |
| PEND-12 | Revisión visual de Fase 02                                                                                | Revisada externamente por Dirección Técnica; aprobación condicionada comunicada al autorizar Fase 03. No equivale a inspección de la Home nueva |
| PEND-13 | Aprobación de Fase 02                                                                                     | Condicionada; logo, fuentes y consistencia visual se corrigen o mantienen pendientes conforme a esta fase                                       |
| PEND-14 | Selección de productos destacados                                                                         | Comercial. Demo rotulada P-003/P-004/P-002/P-005/P-009, reemplazable en home-content.ts                                                         |
| PEND-15 | Resuelto: glyph legítimo faWhatsapp, Font Awesome Free Brands 7.3.1                                       | Licencia CC BY 4.0 y atribución incluidas; accesibilidad preservada                                                                             |
| PEND-16 | Revisión posterior a correcciones 03.1 de Home a ocho anchos, especialmente 360 px                        | Auditoría externa detectó fallo de pasos; causa de capas corregida. Revalidar manualmente en Chrome Windows                                     |
| PEND-17 | Fase 03 aprobada para continuar; estética definitiva aún pendiente                                        | Dirección Técnica. Fase 06 autorizada; no avanzar a Fase 07                                                                                     |

## Bloqueos del entorno registrados

La instalación externa fue completada por el usuario. En 03.1 se verificaron los paquetes, se integraron los recursos y se preservaron licencias/atribuciones. El bloqueo de descarga de fases previas ya no deja fuentes ni iconos pendientes.

Chromium no inicia por falta de `libnspr4.so`. Vite no puede abrir el puerto 5199 por `listen EPERM`; el proceso quedó finalizado. Según la última instrucción del usuario, no se dedica más tiempo a resolver estas limitaciones: la validación visual corresponde a Chrome en Windows.

El HTTP 200 externo que cerró Fase 01 y las capturas de Fase 02 se mantienen como evidencias de esas fases; no se reutilizan para declarar verificada visualmente la Home.

## Entrega Fase 04

- Revisar catálogo, cinco categorías y 14 fichas en Chrome Windows a 320/360/390/768/1024/1280/1440/1920. No se ejecutó renderizado de navegador en esta fase.
- Todos los productos siguen publicationReady:false; falta validación comercial antes de publicación. Descripciones/relaciones/modalidades propuestas, variantes/características/personalización/imágenes pendientes.
- Carpa QR: tarjetas frente a unidades y definición del servicio sin resolver.
- Fotografías, logo limpio, textos, destacados e informe Comercial definitivo siguen pendientes. WhatsApp internacional validado por el propietario en 05.1.
- Superado en Fase 05: pedido editable/persistido y evento/mensaje candidatos. El enlace legado con ID sigue sin agregar automáticamente. Permanece validación comercial final; el número internacional se resolvió en 05.1.

## Entrega Fase 05

- Handoff Comercial de nueve archivos leído; no es informe definitivo: COM-01 pendiente, COM-02/09 parciales, COM-03/04 candidatos, COM-05–08 sin cierre. No hay hashes de emisor en manifiesto Comercial.
- Aprobar obligatoriedad de campos y tratamiento final de datos incompletos; vista actual opcional y provisional. No se aceptan cantidades desconocidas ni unidad indefinida como líneas estructuradas.
- Resolver unidad de P-008/P-012 y tarjetas/unidades/servicio P-011. Hay consultas contextualizadas, sin modalidad impuesta.
- Aprobar política final de duplicados/variantes. Implementación actual idempotente conserva selección y exige edición explícita.
- Resuelto 05.1: número internacional verificado manualmente por el propietario. Apertura habilitada por acción explícita; sin envío automático ni vaciado.
- Revisar los ocho anchos y el recorrido en Chrome Windows conforme a PHASE_05_VISUAL_VALIDATION.
- Decisión técnica conservadora: todo cambio del hash del catálogo requiere reseleccionar. Si se desea migración granular o sincronización entre pestañas, definir alcance posterior.
- Bloqueo de instalación de dependencias de esta fase resuelto por el usuario desde WSL; verificadas versiones y lockfile. Ningún bloqueo técnico de build/lint/test permanece.
- Fase 06 no iniciada. Fotos/logo/condiciones/textos/variantes/mínimos/publicación siguen pendientes.

## Revisión pendiente de 05.1

Validar externamente ocho anchos, foco/scroll reales y reduced-motion, carrusel de relacionados, fechas nativas y retorno desde WhatsApp. Las pruebas no acreditan envío ni recepción. Resuelto por aprobación puntual del propietario: selector de tipo de evento con Fiesta de XV, Casamiento, Cumpleaños y Otro; placeholder sin selección inicial y campo opcional. La obligatoriedad de los demás campos no cambia. Carpa QR/Capitán de mesa/Números de mesa conservan las modalidades pendientes. Fase 05 fue aprobada para continuar; el cierre de Fase 06 y cualquier avance a Fase 07 requieren Dirección Técnica.

## Cierre técnico de Fase 06

- Corregidos hallazgos técnicos Q-01 a Q-14, con límites de comprobación en TECHNICAL_AUDIT. Check/tipos/build/lint/formato: correctos, 220 pruebas. npm ls y lock consistentes.
- Auditoría npm de red del agente bloqueada; propietario compartió resultado WSL de 0 vulnerabilidades conocidas. No se ejecutaron fix/force ni cambios de dependencias.
- Pendiente matriz manual de ocho anchos, NVDA/Chrome, rendimiento real y comprobación de reglas HTTP locales. No se reintentó Chromium.
- /inspiracion, /nosotros y /profesionales no implementadas definitivamente; no ampliar sin autorización.
- Publicación bloqueada: noindex/robots activos, fotografías/logo/favicon/textos y condiciones comerciales pendientes. Recursos preparados mediante registros vacíos; no se inventaron archivos.
- Modalidades P-008/P-011/P-012, mínimos/variantes y obligatoriedad final permanecen empresariales. Eventos aprobados y carrito ya resueltos.
- Preparación para entrega local documentada; no se generó ZIP ni inició Fase 07.

## Actualización vigente — cierre V1.0

Fase 06 aprobada y finalización integral/ZIP local autorizados por el propietario; las restricciones históricas de no empaquetar quedan superadas por esa orden. Inspiración, Nosotros y Profesionales implementadas con textos propuestos; cinco colecciones oficiales conservan estado conceptual propuesto. No existen fotografías independientes aprobadas ni logo limpio en los handoffs: se mantienen placeholders abstractos identificados y denominación textual. Favicon tipográfico provisional local, sin rediseñar el logo original. Registro de imágenes único en src/config/media.ts; 74 archivos esperados en pending-assets/EXPECTED_FILES.csv. Ver REPLACE_RESOURCES.md y LOCAL_V1_SUMMARY.md para el cierre operativo y comprobaciones reales. No se autoriza publicación, ni se resuelven modalidades, mínimos, variantes u obligatoriedad comercial pendientes.
