# Cotización — Fase 05

## Ruta y formulario

`/cotizacion` requiere al menos una selección válida. Sin productos se orienta a catálogo o contacto institucional; no se prepara una solicitud vacía. OrderPage y QuotationPage se cargan por ruta para limitar el bundle inicial, con estado de carga accesible.

QuotationSession utiliza React Hook Form y su FormProvider en RootLayout: los datos del evento se conservan en memoria al volver a editar productos y se descartan al recargar/cerrar. El store persistido no conoce datos personales. “Borrar datos del evento” limpia explícitamente el formulario sin vaciar selección.

Campos candidatos de cotizacion.json: nombre, tipo de evento mediante selector opcional con opciones aprobadas por el propietario, fecha válida si se informa, fecha por definir, localidad y comentarios. Todos opcionales en esta vista provisional, con aviso explícito de obligatoriedad pendiente. No se solicita teléfono/correo ni cobertura geográfica. No se imponen plazos, anticipación ni fechas futuras.

`schema.ts` integra Zod con un resolver tipado de RHF, sin dependencia adicional de resolvers. La fecha se valida por calendario real, incluidos bisiestos; no pueden coexistir fecha numérica y por definir. Errores asociados al input mediante Field; RHF gestiona foco. La selección física debe tener un entero positivo explícito y modalidad definida. Datos personales incompletos no se transforman en confirmación de aceptación comercial: la interfaz produce una vista previa para revisión.

## Mensaje y revisión

`generateQuotationMessage(lines,data)` es pura, tipada y testeable. Revalida las líneas y el formulario, usa identidades oficiales y produce la estructura candidata: saludo/origen web, lista de nombres/IDs, cantidades con etiqueta semántica o servicio digital, datos aportados, comentarios y cierre. Omite campos vacíos y solo declara fecha por definir si se eligió. No copia variantes pendientes ni inventa datos.

Al revisar se presenta textarea de solo lectura; se enfoca el título de revisión para teclado y desplazamiento nativo. Cambiar un campo invalida la revisión. Cambiar selección exige generar una revisión actual; el snapshot de líneas impide copiar una revisión obsoleta. Se puede volver al pedido conservando la selección y campos en memoria.

“Copiar mensaje” usa Clipboard API. Solo informa copiado tras resolverse correctamente; si no existe o falla, selecciona/enfoca el texto y explica cómo copiar manualmente. No se simula recepción ni envío. La consulta directa de fichas usa un texto contextualizado independiente, sin exigir cantidades desconocidas ni formulario.

## WhatsApp — actualización 05.1

El propietario verificó manualmente que el número internacional 5491135939460 abre la conversación LCDD y autorizó su uso. src/config/site.ts centraliza internationalNumber e internationalNumberValidated:true; lib/whatsapp.ts construye enlaces institucionales y con texto. La evidencia reportada no acredita mensajes enviados o recibidos.

Enviar solicitud por WhatsApp es la acción principal; copiar queda secundaria. El enlace target blank/rel noopener noreferrer se activa solo por el usuario y usa encodeURIComponent. Las fichas usan Consultar por WhatsApp con contexto oficial. Header/Home/footer/menú conservan el diálogo institucional con enlace activo. Nunca se envía automáticamente ni se vacía pedido al abrir/copiar.

## Revisión, foco y fechas — 05.1

revealSection enfoca con preventScroll y desplaza al título de revisión, smooth o auto según reduced-motion. Editar datos del evento vuelve con foco al formulario, conserva valores y elimina la revisión obsoleta. EventSummary muestra datos aportados; el textarea separa bloques y mantiene IDs oficiales según el handoff. La copia confirmada se anuncia con role status y aria-atomic; el fallo mantiene selección manual.

El selector fecha sigue nativo con lang es-AR y etiqueta/hint. Las representaciones de aplicación usan Intl.DateTimeFormat es-AR con UTC y DD/MM/AAAA; el formato visual nativo depende de navegador/sistema. Actualización puntual del propietario: selector opcional con Fiesta de XV, Casamiento, Cumpleaños y Otro; placeholder sin selección inicial. Las opciones se centralizan y validan en schema.ts. El formulario conserva la obligatoriedad actual, sin persistir datos personales. Avisos unificados, sin convertir propuestas en condiciones definitivas.

## Pendientes

Campos obligatorios, CTA y mensaje finales, aceptación comercial de datos incompletos, nombre definitivo, unidad de tres productos y revisión visual final. Ver COMMERCIAL_RULES. No hay confirmaciones de venta, autenticación, pagos, APIs o transmisión remota desde la app.

## Corrección del desplegable a 360 px

La captura aportada por el usuario muestra el popup nativo de Windows/Chrome fuera del viewport emulado, aunque el control cerrado cabe en el formulario. Su tamaño no está limitado de forma fiable por el CSS del select. Se sustituye únicamente el tipo de evento por EventTypeField, combobox select-only con lista HTML contenida al ancho del campo, texto envolvente y altura/despliegue adaptados al espacio visible. El selector nativo de fecha no se modifica.

Integra useController de React Hook Form y conserva el enum Zod, las cuatro opciones aprobadas, el placeholder y el valor vacío opcional. Se soportan flechas, Home/End, búsqueda por letras, Enter/Espacio, Escape, Tab y clic exterior; el foco permanece en el control y aria-activedescendant identifica la opción activa. La selección explícita invalida la revisión anterior para no conservar un enlace WhatsApp obsoleto. Sin nuevas dependencias.

TypeScript y npm run check satisfactorios: 175 pruebas en 12 archivos. Build código 0 con advertencia de chunk inicial de aproximadamente 502 kB, sin modificar el umbral. CSS compilado y pruebas de comportamiento no sustituyen revalidación visual a 360 px en Chrome Windows.
