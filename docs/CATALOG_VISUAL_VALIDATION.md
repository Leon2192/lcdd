# Validación visual del catálogo — Fase 04

## Evidencia disponible

Se inspeccionaron visualmente los originales vigentes UI-02 Catálogo Desktop/Mobile V1.1, UI-03 Categorías, UI-04 Producto y UI-07 Invitaciones Desktop/Mobile, junto con las especificaciones y handoffs de Marketing y Productos. Las referencias históricas no se utilizaron como aprobaciones vigentes.

Se implementó composición editorial, agrupación por categorías, panel de filtros, ficha de dos columnas desktop y secuencia vertical mobile. Se preservaron tokens, familias locales y denominación institucional provisional. Se omitieron selectores de compra y características que aparecen en mockups pero no cuentan con validación comercial. Las fotografías y ejemplos digitales siguen siendo placeholders explícitos.

No se renderizó esta Fase 04 en Chromium. El bloqueo previo es libnspr4.so ausente; HTTP en sandbox tiene antecedente listen EPERM. Conforme a la instrucción del usuario no se repitieron intentos ni se instaló infraestructura para repararlos. jsdom no comprueba geometría ni contraste renderizado. No se afirma fidelidad visual comprobada, ausencia de overflow medida o aprobación estética.

## Revisión manual requerida en Chrome Windows

Desde WSL ejecutar `npm run dev`, abrir la URL local que informe Vite y verificar `/`, `/catalogo`, las cinco categorías, las 14 fichas, un ID antiguo y una dirección inexistente. Detener con Ctrl+C.

| Ancho   | Estado de revisión visual Fase 04 |
| ------- | --------------------------------- |
| 320 px  | Pendiente                         |
| 360 px  | Pendiente                         |
| 390 px  | Pendiente                         |
| 768 px  | Pendiente                         |
| 1024 px | Pendiente                         |
| 1280 px | Pendiente                         |
| 1440 px | Pendiente                         |
| 1920 px | Pendiente                         |

En cada ancho revisar grillas, texto largo, filtros, galería, áreas táctiles, navegación y ausencia de scroll horizontal (`document.documentElement.scrollWidth <= window.innerWidth`). Probar Tab/Shift+Tab/Enter/Espacio, foco visible, menú mobile y retorno desde ficha. Aplicar filtros combinados, recargar su URL, limpiar, buscar sin tildes y recuperar estados vacíos. Comparar con los mockups originales sin exigir fotografías aún inexistentes. Comprobar que servicios digitales carecen de selector físico, Carpa QR informa su discrepancia, los CTA no agregan productos y no hay precios. Revisar Home a 360 y desktop para descartar regresiones.

Las pruebas automatizadas verifican comportamiento, integridad y orden de capas CSS compilado; no sustituyen esta revisión.
