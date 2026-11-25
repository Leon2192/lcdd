# Home LCDD — Validación visual y responsive

**Estado: pendiente de revisión manual desde Chrome en Windows. No se afirma fidelidad visual comprobada ni ausencia de overflow medida en un navegador.**

Dirección Técnica revisó capturas reales de la Home de Fase 03: base satisfactoria, pero **no aprobada**, con error grave de pasos a 360 px. En 03.1 se corrigió su causa de cascada y estructura; falta la nueva revisión manual. La evidencia externa se atribuye al usuario/Dirección Técnica, no al agente.

## Evidencia disponible

- Inspección visual de las referencias originales Editorial Boutique y UI-01 Inicio Desktop/Mobile.
- Revisión estática de CSS Mobile First, columnas minmax, límites de ancho, wrapping, áreas táctiles mínimas de 44 px, safe areas, placeholders, foco y movimiento reducido.
- En 03.1, TypeScript y npm run check aprobados: formato, lint, 56 pruebas y build. Incluye regresión sobre CSS compilado y distribución local de fuentes.
- Pruebas DOM de estructura, navegación, categorías, destacados, contacto, guía y carrusel; las métricas del carrusel son simuladas. jsdom no es un motor de layout.
- Prueba de Chromium disponible: falla antes de abrir con `libnspr4.so: cannot open shared object file`, código 127. No hay screenshots nuevos del agente.
- Vite intentó abrir 127.0.0.1:5199 y falló con `listen EPERM`, código 1. La solicitud HTTP falló con `Operation not permitted`. El proceso terminó y su grupo ya no existe.
- Registro temporal: `/tmp/lcdd-phase03-dev.log`.

Se siguió la instrucción del usuario de no dedicar más tiempo a restricciones de entorno. No se instalaron librerías del sistema ni se reintentó Chromium tras identificar el bloqueo.

## Matriz de revisión requerida

Todas las filas están **pendientes de revalidación tras 03.1** en Chrome Windows. En 360 px el error previo fue observado externamente. Lo descrito es el comportamiento implementado esperado, no una comprobación realizada.

| Viewport | Diseño esperado                                                                                 | Revisión real               |
| -------- | ----------------------------------------------------------------------------------------------- | --------------------------- |
| 320 px   | Nombre centrado, menú y contacto, Hero en columna, una categoría y un destacado por vista       | Pendiente en Chrome Windows |
| 360 px   | Pasos corregidos: lista vertical, marcador 44 px y texto flexible; comprobar que no se comprima | Pendiente en Chrome Windows |
| 390 px   | Tipografía y controles de tokens mobile; categorías apiladas; eventos en cuatro columnas        | Pendiente en Chrome Windows |
| 768 px   | Hero dividido, categorías en tres columnas, tres destacados; sin sección de eventos             | Pendiente en Chrome Windows |
| 1024 px  | Cinco categorías y destacados, collage editorial y bloques laterales; menú mobile               | Pendiente en Chrome Windows |
| 1280 px  | Navegación desktop, denominación temporal, categorías desplegables                              | Pendiente en Chrome Windows |
| 1440 px  | Container máximo, escala H1 de 56 px, header de referencia 96 px                                | Pendiente en Chrome Windows |
| 1920 px  | Contenido centrado y ancho limitado; sin escalado indefinido de tarjetas o textos               | Pendiente en Chrome Windows |

## Procedimiento manual en Windows

1. Desde WSL, ejecutar `npm run dev -- --host 127.0.0.1 --port 5199 --strictPort`.
2. Abrir `http://localhost:5199/` en Chrome de Windows. Revisar consola y red; comprobar respuesta HTTP correcta sin confundirla con la inspección visual.
3. En DevTools, seleccionar cada ancho de la matriz; capturar pantalla completa y detalle del header/Hero. Con zoom 200%, comprobar reflow.
4. Comparar con los archivos vigentes de UI-01. Verificar orden, composición, legibilidad, proporciones y espaciados. No comparar con archivo histórico.
5. Medir `document.documentElement.scrollWidth <= document.documentElement.clientWidth`. Si falla, localizar el elemento que excede; no ocultar overflow global para encubrirlo. El scroll horizontal dentro del carrusel sí es intencional.
6. Abrir menú y categorías. Probar Tab/Shift+Tab, Escape, cierre y retorno del foco. Revisar áreas táctiles y centrado real de la marca temporal.
7. Desplazar destacados con botones, teclado y gesto. Comprobar extremos, foco, anuncio y ausencia de autoplay. Activar prefers-reduced-motion.
8. Abrir contacto desde Home y header: debe mostrar número local, sin enlace internacional ni confirmación de envío.
9. Confirmar placeholders y aviso provisional; no deben aparecer la captura del logo ni fotografías recortadas.
10. Detener el servidor con Ctrl+C y registrar resultado, fecha, navegador y capturas aquí antes de dar por cerrada esta validación.

## Condiciones pendientes de fidelidad

Las fuentes locales y el glyph legítimo de WhatsApp ya están integrados con licencias verificadas en 03.1. Siguen pendientes PNG limpio/vector, fotografías, textos finales y la revisión visual posterior al cambio tipográfico. Sin esos recursos no corresponde declarar equivalencia final con el mockup, aunque el build y las pruebas pasen.

## Evidencia técnica de 03.1 y alcance de la revisión pendiente

El CSS productivo previo declaraba components antes de base. Esto daba mayor prioridad a Preflight: SVG visibles podían ocupar una celda inesperada en el grid de pasos y el párrafo caía en la columna de 44 px. También podían prevalecer colores de headings/fondos del reset sobre footer y botones. Se corrigió el orden a theme/base/components/utilities, se movió la carga de estilos al punto de entrada y se agrupó el marcador; la lista mobile tiene ancho completo explícito. Una prueba compila la aplicación y verifica ese orden real, además de los cuatro WOFF2 locales. No equivale a medición de píxeles.

No se volvió a ejecutar Chromium ni Playwright ni a resolver librerías del sistema. La restricción de navegador/HTTP previamente registrada se conserva como antecedente; no se presenta como un nuevo intento ni como un fallo de la aplicación.

Prioridad de revisión manual:

1. A 360 px, cada paso debe mostrar número a la izquierda y texto legible a la derecha, con una sola fila de pasos por ancho y sin columnas de texto de 44 px.
2. A 1024 px y superiores, conservar título lateral y cuatro pasos con iconos alineados; sin números duplicados.
3. Confirmar carga de los cuatro WOFF2 en Network desde el servidor local, con red externa desconectada; verificar normal y cursiva sin síntesis.
4. Revisar Hero desktop, separación heading-tarjetas, propuesta de valor mobile, footer blanco/petróleo, botones y targets táctiles.
5. Revisar el icono de WhatsApp, foco y contraste. El glyph no habilita el enlace internacional pendiente.

Estado final de esta hoja: **corrección técnica aplicada, nueva validación visual externa pendiente**. No declarar aprobada Fase 03 solo por pruebas automatizadas.
