# Cotización — Fase 05

## Flujo actual

- `/cotizacion` requiere una selección válida. Con el pedido vacío, orienta al catálogo.
- React Hook Form conserva en memoria los campos opcionales del evento durante la navegación interna. LocalStorage conserva únicamente el pedido. Zod valida el tipo de evento y la fecha de calendario, incluyendo la compatibilidad con «Fecha por definir».
- `generateQuotationMessage` revalida la selección y usa los nombres de los productos, las cantidades o el servicio digital y los campos aportados. La fecha se expresa en DD/MM/AAAA.
- **Cotizar por WhatsApp** abre en la misma pestaña el enlace oficial con el mensaje preparado. El envío se decide en WhatsApp y la selección permanece guardada.
- La consulta directa desde una ficha conserva su diálogo contextual y la opción de copiar el texto. Si el portapapeles falla, el diálogo selecciona el mensaje para copiarlo manualmente.

## Corrección del desplegable a 360 px

La captura aportada por el usuario muestra el popup nativo de Windows/Chrome fuera del viewport emulado, aunque el control cerrado cabe en el formulario. Su tamaño no está limitado de forma fiable por el CSS del select. Se sustituye únicamente el tipo de evento por EventTypeField, combobox select-only con lista HTML contenida al ancho del campo, texto envolvente y altura/despliegue adaptados al espacio visible. El selector nativo de fecha no se modifica.

Integra useController de React Hook Form y conserva el enum Zod, las cuatro opciones aprobadas, el placeholder y el valor vacío opcional. Se soportan flechas, Home/End, búsqueda por letras, Enter/Espacio, Escape, Tab y clic exterior; el foco permanece en el control y aria-activedescendant identifica la opción activa. Sin nuevas dependencias.

TypeScript y npm run check satisfactorios: 175 pruebas en 12 archivos. Build código 0 con advertencia de chunk inicial de aproximadamente 502 kB, sin modificar el umbral. CSS compilado y pruebas de comportamiento no sustituyen revalidación visual a 360 px en Chrome Windows.
