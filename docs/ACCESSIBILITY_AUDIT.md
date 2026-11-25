# Accesibilidad — Fase 06

WCAG 2.2 AA se usa como referencia; **no se declara conformidad completa**. Pruebas en jsdom y revisión estática no sustituyen Chrome/lector de pantalla/dispositivo real.

## Comprobado y corregido

- Trece combinaciones de contraste de tokens pasan los mínimos definidos en pruebas: texto normal 4.5:1 y controles 3:1. Referencias previas calculadas: blanco/petróleo 7.45:1, texto/marfil 14.33:1, secundario/marfil 5.27:1, borde taupe/marfil 3.10:1. Son colores fuente, no píxeles renderizados.
- Un H1 por ruta probada. Vacíos de página pasan a H2; vacío de categoría queda H3 bajo H2. Carrusel tiene región/pista nombradas, diapositivas identificadas, posición anunciada y alternativa de botones/teclado.
- Navegación actualiza título y lleva foco al H1 cuando procede; no afecta consulta/filtros ni interrumpe un control que el usuario ya empezó a usar. El límite de error tiene encabezado/enlaces y foco recuperable sin detalles técnicos.
- Selector de tipo de evento conserva label, rol combobox select-only/listbox, foco, activedescendant y cuatro opciones aprobadas. Abre/cierra, flechas, Home/End, letras, Enter/Espacio, Escape, Tab/clic exterior y reset se prueban. No tiene selección comercial inicial ni obligatoriedad nueva.
- Campos conservan labels, mensajes de error y aria-describedby. Fecha sigue nativa es-AR; representaciones de aplicación DD/MM/AAAA. No se introducen restricciones comerciales.
- Revisión desplaza/enfoca con preventScroll y reduced-motion; puede volver a editar. Copia real y fallida tienen anuncios. Copiar repetidamente ahora modifica el contenido accesible sin recrear la región de estado.
- Modal/Drawer mantienen dialog, cierre Escape, ciclo/restauración de foco, bloqueo de scroll y nombres accesibles. jsdom simula showModal/close: no certifica top-layer/inert reales.
- Controles conservan objetivo mínimo de 44 px definido en CSS; iconos decorativos aria-hidden. Alt de imágenes se toma del registro aprobado; miniaturas decorativas dentro de botones nombrados y grupo de selección explícito.

## Pendiente manual

NVDA + Chrome Windows: orden de lectura, título tras navegar, nombre/valor/estado del combobox, opción seleccionada, errores, anuncio de copia repetida, diálogos, foco visible sin ocultamiento y recuperación. Probar Tab/Shift+Tab/Enter/Espacio/Escape/flechas, zoom 200% y 400%, forced-colors, tamaño de texto, reduced-motion y reflow 320 px. Revisar contraste sobre fotografías finales y las áreas táctiles reales; hoy no hay evidencia suficiente de esos casos.

Matriz de ocho anchos y recorridos en FINAL_QA_CHECKLIST. Las aprobaciones externas del recorrido de Fase 05 no se presentan como auditoría WCAG ni como medición de los cambios de Fase 06.
