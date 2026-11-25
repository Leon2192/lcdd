# Revisión visual y funcional externa — Fases 05 / 05.1

## Evidencia y límites

Se inspeccionaron visualmente UI-05 Pedido desktop/mobile, UI-06 Cotización, bloque C Commercial Journey y bloque D Mobile First, además de sus extractos y handoffs. Se mantuvieron Editorial Boutique, paleta, familias locales, placeholders y denominación institucional. No se usaron fotos recortadas de mockups.

No se renderizaron las Fases 05/05.1 en Chromium/Playwright ni se inició un servidor HTTP de prueba. Persisten como antecedentes el fallo de librería libnspr4.so y listen EPERM; según la orden no se dedicó tiempo adicional a reparar restricciones del entorno. Las capturas externas que aprobaron Fase 04 no acreditan la Fase 05. jsdom verifica comportamiento, no geometría, touch real ni fidelidad visual.

## Matriz pendiente en Chrome Windows

| Ancho   | Revisión 05.1 |
| ------- | ------------- |
| 320 px  | Pendiente     |
| 360 px  | Pendiente     |
| 390 px  | Pendiente     |
| 768 px  | Pendiente     |
| 1024 px | Pendiente     |
| 1280 px | Pendiente     |
| 1440 px | Pendiente     |
| 1920 px | Pendiente     |

Iniciar `npm run dev` desde WSL, abrir la URL local informada en Chrome Windows y detener con Ctrl+C al finalizar. No se afirma HTTP 200 de Fase 05 sin esta ejecución externa.

## Recorrido funcional para Dirección Técnica

1. Abrir `/catalogo`, probar desplegable de filtros y búsqueda con icono/placeholder en una categoría. Revisar breadcrumbs y categorías de dos productos.
2. Abrir `/catalogo/producto/p-003-vasos-personalizados`. La cantidad comienza vacía. Intentar agregar sin cantidad y con 0/decimales: error y foco en campo. Ingresar 25 y agregar: confirmación e indicador del header. Repetir con otra cantidad: no sumar ni reemplazar automáticamente.
3. Agregar `/catalogo/producto/p-013-invitaciones-digitales` y Save the date como servicios sin unidades. Abrir `/arma-tu-pedido`, editar, quitar y continuar explorando. No debe haber dinero ni total de unidades mezcladas.
4. Recargar y cerrar/reabrir la misma URL en el mismo navegador: recuperar selección. En un perfil de pruebas se puede simular JSON inválido en lcdd:order con DevTools y verificar recuperación con aviso; no modificar los handoffs para probar cambios de catálogo.
5. Abrir `/cotizacion`, completar nombre/tipo/fecha/localidad/comentarios, volver a editar pedido y regresar. Los campos y la selección se mantienen en memoria. Recargar: solo la selección permanece, los datos personales no. Inspeccionar LocalStorage: solo IDs, modalidades, cantidades, versión/revisión.
6. Alternar fecha y fecha por definir; generar vista previa. Comprobar nombres, IDs, cantidad/servicio, tildes y saltos. Editar un dato: invalidar la revisión. Revisar otra vez y copiar: pegar en editor local para comprobar texto, sin enviar mensajes.
7. Si Clipboard API falla, verificar selección manual y aviso honesto. WhatsApp debe mostrar el enlace activo al número autorizado 5491135939460 con el mensaje de revisión. Abrirlo es una acción explícita y no envía automáticamente ni vacía pedido. Verificar que el texto preparado coincida; no se interpreta apertura como recepción.
8. Abrir P-008, P-011 y P-012: no imponer unidad ni selector físico; consulta contextualizada con texto revisable. No presentarlos como variantes o servicio incluido aprobado.
9. Probar vaciado con cancelación y confirmación, estado vacío y `/cotizacion` sin selección. El acceso legado `?producto=P-003` no agrega automáticamente.

## Responsive y accesibilidad

En cada ancho revisar header centrado y acceso de lista/contador, menú y contacto, listas de productos, selectores, formularios, resumen, errores y CTA sin superposición. Verificar scroll horizontal: document.documentElement.scrollWidth <= window.innerWidth. Revisar textos largos, zoom 200%, Tab/Shift+Tab/Enter/Espacio/Escape, foco al error/revisión/modal, lectura de labels y anuncios de agregado/copia, reduced-motion y blancos sobre petróleo. Confirmar Home a 360 y desktop conserva su distribución. No hay afirmación de certificación WCAG ni fidelidad pixel a pixel.

Diferencias justificadas: sin fotografías definitivas; sin bolsa de compra ni estado “solicitud enviada”; dos etapas; campos opcionales pendientes; no suma de unidades heterogéneas; cantidades de ejemplo no precargadas; tres productos con unidad pendiente se consultan directamente. La composición real debe ser aprobada externamente.

## Evidencia externa y revisión 05.1

Dirección Técnica revisó satisfactoriamente capturas mobile de Fase 05 (ficha/pedido/formulario/revisión). No se comunicaron anchos exactos ni capturas de las nuevas correcciones 05.1: la matriz permanece pendiente para estas modificaciones. El propietario confirmó manualmente apertura de conversación de LCDD con wa.me/5491135939460; esta evidencia no acredita envío o recepción ni fue ejecutada por el agente.

Probar los ocho anchos de la matriz en Chrome Windows, sin nuevos intentos de Chromium/Playwright del agente. En 05.1, revisar el desplazamiento inmediato hacia revisión y su foco; activar reduced-motion en sistema/DevTools y confirmar desplazamiento sin animación. Editar datos del evento debe regresar al formulario conservando valores y quitando la revisión anterior.

La revisión muestra resumen de evento y mensaje separados, fecha DD/MM/AAAA, CTA principal Enviar solicitud por WhatsApp y Copiar mensaje secundario. Verificar anuncio de copia y alternativa manual, apertura en otra pestaña y selección intacta al volver. Probar todos los accesos institucionales y contextualizados, incluyendo menú mobile y modalidades pendientes. El selector nativo de fecha puede mostrar formato del sistema; el resumen/mensaje usan es-AR.

Relacionados en pista horizontal: revisar altura, siguiente tarjeta visible, scroll/touch, flechas, Tab y nombre accesible, sin tapar edición/eliminación ni desbordar el documento. Comparar Home, catálogo, navegación y footer para evitar regresiones. Las 160 pruebas comprueban contratos de foco/scroll, reglas CSS compiladas y comportamiento; no certifican geometría, envío real ni WCAG completo.

## Revalidación puntual del tipo de evento

Captura del usuario: Chrome Windows emulando 360 × 800, popup nativo de tipo de evento fuera del marco. EventTypeField reemplaza el popup por lista contenida al formulario. Revisar cerrado/abierto a 320, 360 y 390 px, placeholder largo, las cuatro opciones, scroll del menú y apertura hacia arriba con poco espacio. Comprobar teclado, Escape sin cambio, Tab/clic exterior, reset, resumen y WhatsApp tras cambiar la selección. No confundir la captura anterior con evidencia visual de la corrección nueva.
