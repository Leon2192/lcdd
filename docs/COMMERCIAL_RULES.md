# Reglas comerciales — Fase 05

Fecha de revisión: 24/11/2026. Esta implementación local no aprueba condiciones comerciales ni publicación.

## Fuentes y autoridad

Resoluciones actuales de Dirección General > definiciones comerciales formalmente aprobadas > catálogo oficial de Productos > especificaciones vigentes de Marketing > mockups > decisiones técnicas. Los nueve archivos de Comercial fueron leídos íntegramente: README, COM-01, COM-02, COM-03-04, COM-09-10, catalogo.json, cotizacion.json, decisiones.json y manifiesto.json. Sus propuestas no se elevan a aprobaciones por autorizar la fase.

El manifiesto Comercial lista nueve archivos con ruta/tipo: se verificaron presencia, UTF-8 y sintaxis JSON. No contiene tamaños ni hashes contra los cuales autenticar los bytes de origen. Los siguientes SHA-256 son observaciones locales al comenzar, cotejadas nuevamente al cerrar, no firmas aportadas por Comercial:

| Archivo                 | SHA-256 observado                                                  |
| ----------------------- | ------------------------------------------------------------------ |
| README.md               | `263fd961764058bb3637cd8d2c23f1d717e153aa438683fbef85f1ff51d0cf64` |
| COM-01-estrategia.md    | `7a992c0f80b5f9e244e59b40b9ce2ac59e61214ebc186199d0b62f044ceb6f71` |
| COM-02-recorrido.md     | `d42f130ed94ccb8b75415f4e1cc36ab192abc22d4b0a1a28740aab96218880ef` |
| COM-03-04-propuesta.md  | `781f7322045d3ec58efd1c53a93a31e6b5bc55ddf7e34fceb6da84c7034d7146` |
| catalogo.json           | `9ecec2c28d724fc1f81db11532554f5b16d8bba79d19efc787361e46509b5772` |
| decisiones.json         | `77c08a283cf134c396e871dd4d248a40f886d4257f58b1f782313cbab6050b58` |
| cotizacion.json         | `785ba6f7c1418bda20aa607dc2ebe6382ddea5eadf6fb1819dbd74b09189cbad` |
| COM-09-10-validacion.md | `dae950921edcf70514b57dc598cfb15496e338a94d71a97f73ff6de3fc17a929` |
| manifiesto.json         | `770920f9aca32631c54104b110817eaa7dd0b3d21de3791091c8ff8641028245` |

Marketing conserva 46 entradas de manifiesto válidas (bytes/SHA-256). Productos mantiene su JSON oficial y DOCX, sin modificaciones. Los 14 IDs/nombres y la matriz de relacionados del JSON Comercial coinciden con Productos; la fuente runtime sigue siendo exclusivamente el JSON de Productos generado en Fase 04. No se sustituyeron fichas por catalogo.json Comercial.

## Aprobado y autorizado

- 14 identidades, cinco categorías e IDs oficiales. La publicación definitiva y las especificaciones reales siguen sin aprobarse: publicationReady:false permanece intacto.
- Selección de productos, cantidades y opciones cuando correspondan; cotización por WhatsApp y cierre humano; sin precios/pagos/checkout.
- Dirección Técnica autoriza expresamente Fase 05, Zustand/LocalStorage, edición/eliminación, persistencia tras recarga y nuevas sesiones del mismo navegador. Esta instrucción actual supera la antigua nota Comercial de persistencia pendiente.
- La orden actual distingue servicios digitales para P-013/P-014, sin unidades. Número local informado por Dirección General: 1135939460.

## Propuestas y decisiones técnicas provisionales

| Tema                      | Implementación local                                                                  | Estado                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Productos por cantidad    | P-001/002/003/004/005/006/007/009/010, cantidad ingresada explícitamente              | Referencia para cotizar; unidad/etiqueta de la propuesta original, condiciones no aprobadas         |
| Servicios                 | P-013/P-014 seleccionados una vez, quantity:null                                      | Tratamiento digital autorizado por la orden actual; funcionalidades/entrega pendientes              |
| P-008/P-012               | Selector y cotización con etiqueta «Cantidad»; consulta contextualizada disponible    | Unidad definitiva pendiente en decisiones.json                                                      |
| P-011 Carpa QR            | Selector y cotización con «Cantidad de tarjetas»; consulta contextualizada disponible | JSON Productos: tarjetas; matriz/Comercial: unidades; inclusión del servicio pendiente              |
| Cantidad vacía            | No se agrega como 1 ni como pendiente                                                 | No se autorizaron solicitudes físicas incompletas; consulta directa disponible                      |
| Entero positivo           | Mayor que cero, entero seguro de JavaScript                                           | Integridad técnica, no mínimo comercial. No se aplican mínimos/condiciones inventados               |
| Selección repetida        | Se informa que ya existe; no suma ni reemplaza. Edición explícita en pedido           | Solución técnica conservadora, pendiente política comercial definitiva de duplicados/variantes      |
| Variantes/personalización | No se ofrecen opciones pendientes ni se exige diseño final                            | Valores verificados ausentes. Comentarios opcionales en formulario, solo en memoria                 |
| Campos del evento         | Nombre, tipo, fecha, localidad, comentarios; opcionales en vista de revisión          | Candidatos de cotizacion.json, obligatoriedad NO aprobada                                           |
| Fecha por definir         | Opción explícita provisional; omite fecha numérica                                    | No inventa fecha ni plazos; revisar aprobación del formulario final                                 |
| Mensaje                   | Plantilla preliminar, revisión y copia manual                                         | COM-03/04 y cotizacion.json no aprobados como textos definitivos                                    |
| WhatsApp internacional    | Enlace habilitado por acción explícita                                                | Propietario verificó manualmente la conversación 5491135939460 en 05.1. No acredita envío/recepción |

No se solicita teléfono nuevamente ni correo sin justificación. No hay restricciones geográficas, fechas mínimas, promesas de entrega o variantes ficticias. Los relacionados y colecciones siguen propuestos, no combos ni ofertas. Los campos opcionales permiten probar una vista preliminar sin inventar obligatoriedad: esto no confirma aceptación comercial definitiva de solicitudes con datos del evento incompletos.

## Contradicciones de referencias y decisiones pendientes

UI-05 muestra suma genérica de unidades, cantidades de ejemplo y personalizaciones concretas: no se suman kits, ejemplares y servicios como si fueran equivalentes, ni se copian ejemplos. UI-06 y bloque C contienen asteriscos/campos obligatorios y tres etapas, mientras el extracto vigente indica dos etapas y Comercial declara obligatoriedad pendiente. Se implementan Tu pedido/Tu evento y revisión dentro de la segunda, sin asteriscos inventados. El estado gráfico “Solicitud enviada” del bloque D se descarta: preparar/copiar/abrir nunca confirma envío.

Resolver con Comercial/Dirección General: mínimos y variantes, unidad P-008/P-012, alcance/servicio Carpa QR, política de duplicados con futuras variantes, campos obligatorios y aceptación de incompletos, textos/CTA/nombre definitivo y aprobación de publicación. La verificación internacional fue resuelta por el propietario en 05.1. COM-01 sigue pendiente, COM-02/09 parciales y COM-05 a COM-08 no están cerrados. No se implementaron CRM, medición externa ni automatización.

## Resolución vigente 05.1

La autorización actual supera las referencias a número no verificado de los handoffs originales, que permanecen intactos. Se activa 5491135939460 por verificación manual de apertura de conversación del propietario. No se confirma envío/recepción. IDs preservados en linea_plantilla, mensaje separado en bloques para legibilidad. La actualización puntual posterior aprueba la lista de eventos indicada a continuación; no cambia obligatoriedad ni modalidades pendientes.

## Tipos de evento — aprobación puntual del propietario

El propietario aprobó expresamente Fiesta de XV, Casamiento, Cumpleaños y Otro para el selector del formulario. Fuente de opciones centralizada en quotation/schema.ts y validada por Zod. Placeholder: “Seleccioná el tipo de evento”, valor vacío inicial y campo opcional; no hay selección automática. El valor se refleja en resumen y mensaje WhatsApp, y puede volver a dejarse vacío. Esta aprobación reemplaza la decisión previa de texto libre, sin modificar los handoffs ni otras reglas comerciales.
