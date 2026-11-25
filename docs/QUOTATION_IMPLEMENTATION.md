# Cotización — Fase 05

## Flujo actual

- **Cotizar mi pedido** aparece en `/arma-tu-pedido`, debajo del resumen del pedido. El enlace usa la selección actual y el número oficial de LCDD.
- Las solicitudes incluyen el nombre y cantidad de los productos físicos y los servicios digitales elegidos. El usuario decide cuándo enviar desde WhatsApp y el pedido permanece guardado.
- La ruta anterior `/cotizacion` redirige al pedido. El formulario de datos del evento queda en pausa.

- La consulta directa desde una ficha conserva su diálogo contextual y la opción de copiar el texto. Si el portapapeles falla, el diálogo selecciona el mensaje para copiarlo manualmente.

## Corrección del desplegable a 360 px

La captura aportada por el usuario muestra el popup nativo de Windows/Chrome fuera del viewport emulado, aunque el control cerrado cabe en el formulario. Su tamaño no está limitado de forma fiable por el CSS del select. Se sustituye únicamente el tipo de evento por EventTypeField, combobox select-only con lista HTML contenida al ancho del campo, texto envolvente y altura/despliegue adaptados al espacio visible. El selector nativo de fecha no se modifica.

Integra useController de React Hook Form y conserva el enum Zod, las cuatro opciones aprobadas, el placeholder y el valor vacío opcional. Se soportan flechas, Home/End, búsqueda por letras, Enter/Espacio, Escape, Tab y clic exterior; el foco permanece en el control y aria-activedescendant identifica la opción activa. Sin nuevas dependencias.

TypeScript y npm run check satisfactorios: 175 pruebas en 12 archivos. Build código 0 con advertencia de chunk inicial de aproximadamente 502 kB, sin modificar el umbral. CSS compilado y pruebas de comportamiento no sustituyen revalidación visual a 360 px en Chrome Windows.
