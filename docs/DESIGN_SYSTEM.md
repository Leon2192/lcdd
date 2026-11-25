> Estado vigente 03.1: fuentes locales y WhatsApp ya integrados; consultar la actualización final de este documento. Las notas de descarga bloqueada de Fases 02/03 se conservan como antecedentes históricos.

# Sistema de diseño LCDD — Fase 02

Base Editorial Boutique original para revisión de Dirección Técnica. No es una nueva identidad ni la Home definitiva. Tokens exactos y pesos continúan siendo propuestas, de acuerdo con los extractos entregados.

Demo: **`/__dev/design-system`**, exclusivamente con `npm run dev`. No aparece en navegación comercial. `import.meta.env.DEV` elimina la ruta y su import dinámico del bundle de producción; se comprobó su ausencia en el JavaScript de `dist/`.

## Fuentes y jerarquía

Rigen Dirección General, validaciones comerciales, catálogo oficial de Productos, especificaciones de diseño y finalmente mockups, en ese orden. La orden actual autoriza la Fase 02 y confirma el cierre externo de Fase 01. Las propuestas históricas se conservan únicamente como archivo.

## Tokens

Fuente central: `src/styles/tokens.css`. Tailwind 4 recibe colores y familias con `@theme inline` y breakpoints con `@theme`. Los componentes consumen estas variables; no hay un tema paralelo en JavaScript. Los nombres de color de Tailwind incluyen `primary`, `background`, `sand`, `rose`, `editorial`, `ink`, `muted`, `line`, `success` y `error`.

La dirección artística y el logo recibido son vigentes. **Ningún hexadecimal se presenta como definitivamente aprobado**: el propio JSON indica aprobación exacta pendiente. Hover, pressed, escalas auxiliares, sombras y tiempos son decisiones técnicas provisionales de implementación.

| Color fuente        | Valor     | Estado                 |
| ------------------- | --------- | ---------------------- |
| `primary`           | `#315C5D` | Propuesta de Marketing |
| `background`        | `#FAF8F5` | Propuesta de Marketing |
| `sand`              | `#EDE3D7` | Propuesta de Marketing |
| `rose`              | `#DDBFB4` | Propuesta de Marketing |
| `editorial`         | `#60432E` | Propuesta de Marketing |
| `text`              | `#292522` | Propuesta de Marketing |
| `muted`             | `#71665D` | Propuesta de Marketing |
| `white`             | `#FFFFFF` | Propuesta de Marketing |
| `border`            | `#DED4CA` | Propuesta de Marketing |
| `taupe`             | `#9B8B7E` | Propuesta de Marketing |
| `neutral`           | `#F2EFEB` | Propuesta de Marketing |
| `success`           | `#356B4A` | Propuesta de Marketing |
| `error`             | `#A33D3D` | Propuesta de Marketing |
| `successBackground` | `#EAF3ED` | Propuesta de Marketing |

Complementos: hover `#244748`, pressed `#1C3839`, foco petróleo y borde de control taupe `#9B8B7E`. El borde suave `#DED4CA` se reserva para separación decorativa; no identifica por sí solo un campo.

| Grupo      | Valores implementados                                                    | Estado                                               |
| ---------- | ------------------------------------------------------------------------ | ---------------------------------------------------- |
| Familias   | Cormorant Garamond → Georgia/Times/serif; DM Sans → system-ui/sans-serif | Familias propuestas; binarios pendientes             |
| Pesos      | 400 editorial; 500 interfaz; 600 énfasis                                 | Técnicos provisionales, no aprobaciones de Marketing |
| Texto      | 12, 14, 16 y 18 px; cuerpo interlínea 1.6                                | Cuerpo 16 según handoff; auxiliares provisionales    |
| H1         | 32/36/44/56 px                                                           | Propuesta responsive de Marketing                    |
| H2/H3      | H2 32–40; H3 24 px                                                       | Dentro de la referencia; provisionales               |
| Espacios   | 4, 8, 12, 16, 24, 32, 48, 72 px                                          | Referencia base 8 más complementos técnicos          |
| Bordes     | 1 px                                                                     | Técnico provisional                                  |
| Radios     | Input 4; tarjeta 8; panel 16; pill 999 px                                | Referencia visual y complemento técnico              |
| Sombras    | Tarjeta 0 2px 8px / 8%; overlay 0 16px 48px / 18%                        | Técnicas provisionales                               |
| Movimiento | 180 ms ease-out; 0 ms con reduced-motion                                 | Técnico provisional                                  |
| Container  | Máximo de contenido 1280 px, gutters responsive                          | Propuesta de Marketing                               |
| Target     | Mínimo 44 px; botones principales 48–52 px                               | Referencia Mobile First                              |

### Responsive

| Ancho desde              | Columnas de tarjetas | Margen | Gap |  H1 | Header mínimo |
| ------------------------ | -------------------: | -----: | --: | --: | ------------: |
| Base (320 de referencia) |                    1 |     12 |  12 |  32 |            64 |
| 390                      |                    2 |     16 |  12 |  36 |            72 |
| 768                      |                    3 |     24 |  16 |  44 |            72 |
| 1440                     |                    4 |     48 |  24 |  56 |            96 |

Breakpoints Tailwind: `mobile` 390, `tablet` 768, `desktop` 1280 y `wide` 1440 px. El cambio de menú a desktop en 1280 es provisional técnico; la grilla pasa a cuatro columnas en 1440. El texto de marca se oculta en la cabecera estrecha para evitar overflow, sin ocultar el PNG ni el nombre accesible. Se usan minmax(0,1fr), wrapping y controles sin anchos mínimos rígidos; no se oculta overflow para encubrir errores. Safe areas en header, footer y drawer. Revisión efectiva de anchos y zoom en navegador pendiente.

## Tipografías y distribución

Se verificó la disponibilidad de ambas familias y su licencia familiar OFL-1.1 en el distribuidor: [Cormorant Garamond](https://fontsource.org/fonts/cormorant-garamond/about), [DM Sans](https://fontsource.org/fonts/dm-sans/about). Fontsource documenta [distribución local mediante paquetes](https://fontsource.org/docs/getting-started/install).

No se incluyen binarios ni se afirma verificar la licencia de un archivo descargado: la instalación de `@fontsource-variable/cormorant-garamond`, `@fontsource-variable/dm-sans` y Lucide falló por `EAI_AGAIN` en npm. Tampoco se encontraron estas familias en las ubicaciones locales de fuentes revisadas ni paquetes disponibles en caché. No se modificó el manifiesto para dejar imports faltantes.

Hasta obtener binarios legítimos y revisar la licencia adjunta y pesos, se usan fallbacks declarados y visibles como provisionales en la demo. No hay Google Fonts remoto en runtime ni se inventaron archivos de licencia. La fidelidad tipográfica definitiva queda pendiente.

## Componentes y contratos

Importar directamente desde `src/components/ui/<Componente>`. Se conservan props nativas, referencias React 19 y tipos estrictos donde corresponda.

| Componente                | Contrato y comportamiento                                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button                    | Variantes primary/secondary/outline/ghost; type button por defecto; pending deshabilita y anuncia aria-busy                                                    |
| IconButton                | Nombre accesible `label` obligatorio; target mínimo 44 px                                                                                                      |
| Container                 | Ancho máximo y márgenes centralizados                                                                                                                          |
| Section                   | Espaciado vertical, props semánticas de section                                                                                                                |
| SectionHeading            | H2, eyebrow, descripción y ornamento decorativo                                                                                                                |
| Badge                     | Neutral, éxito o error; texto explícito                                                                                                                        |
| Input / Textarea / Select | Label obligatorio, id estable, hint/error asociados, props nativas, estados disabled e inválido                                                                |
| Checkbox                  | Control nativo, label clickeable, hint/error asociados y disabled                                                                                              |
| QuantitySelector          | Controlado; min explícito, max opcional; enteros seguros, teclado, botones y edición; vacío temporal permitido, inválido revierte al valor controlado al salir |
| ProductCard               | Nombre, acceso a ficha y media validada opcional; sin añadir directamente ni precios                                                                           |
| CategoryCard              | Nombre oficial, destino y media validada opcional                                                                                                              |
| EmptyState                | Título, descripción y acción opcional                                                                                                                          |
| Drawer / Modal            | Dialog nativo, título accesible, Escape/cancel/cierre, ciclo Tab, scroll lock y restauración de foco                                                           |
| Carousel                  | Elementos con ID, navegación con botones, límites, anuncio de posición; sin autoplay ni arrastre obligatorio                                                   |

Auxiliares: Field, MediaPlaceholder, Overlay, Icon, Brand, Header y Footer. Los iconos geométricos de interfaz son locales y no constituyen rediseño del logo. Lucide no se pudo instalar; se evita añadir dependencias rotas.

Los límites de QuantitySelector son del consumidor; el rango 0–10 de la demo es únicamente técnico. No integra catálogo ni define mínimos comerciales. No se aplica a Carpa QR ni a servicios digitales en esta fase.

## Layout institucional

Header desktop con navegación, categorías desplegables nativas, Instagram, acceso a WhatsApp y pedido con icono de lista. Header mobile con logo, menú lateral y accesos de contacto/pedido. Footer petróleo con cinco categorías oficiales, navegación y contactos centralizados. No se agregan testimonios, condiciones, claims comerciales o redes no confirmadas.

WhatsApp abre un diálogo con el número local confirmado. No genera un enlace `wa.me` al internacional todavía provisional ni compone una cotización. Este acceso queda limitado expresamente hasta validar el número internacional. Instagram y correo usan la configuración institucional existente.

## Accesibilidad y límites de validación

Foco visible; cierre y restauración de foco; navegación con Tab/Shift+Tab; etiquetas y errores textuales; semántica nativa; nombres accesibles de iconos; medios pendientes identificados; carrusel sin autoplay; reduced-motion. Dialog nativo maneja top layer e inercia del fondo en navegadores compatibles. En jsdom se simula solo showModal/close: las pruebas de foco ejercitan el componente, no certifican su comportamiento en todos los navegadores.

Se prueban trece combinaciones de contraste con luminancia relativa: texto normal ≥4.5:1 y borde de control ≥3:1. Referencias medidas: blanco/petróleo 7.45:1, texto/marfil 14.33:1, secundario/marfil 5.27:1, error/marfil 6.02:1, éxito/fondo de éxito 5.53:1, taupe/marfil 3.10:1. No equivalen a certificación WCAG integral.

## Actualización de Fase 03

Dirección Técnica aprobó condicionadamente esta base y autorizó la Home. El PNG original se preserva, pero Brand utiliza ahora la denominación institucional en texto hasta recibir un original limpio. En mobile el nombre no se oculta: se centra entre columnas laterales iguales, con menú a la izquierda y contacto a la derecha; el acceso al pedido permanece en menú y CTAs. Desktop conserva navegación y pedido directo.

Espaciado de sección compartido actual: 32 px base y 48 px desde tablet; Home usa 32/40 px para moderar los espacios mobile. Carousel conserva el modo single y agrega rail responsive con scroll, botones, teclado y detección de extremos. Iconos auxiliares mantienen stroke 1.5 y tamaño consistente; el glyph oficial de WhatsApp sigue pendiente de distribución legítima.

Las familias siguen sin binarios locales: no se presenta la corrección tipográfica como completada. La Home indica texto e imágenes provisionales y requiere revisión manual desde Chrome en Windows. Contratos y decisiones de la nueva interfaz en HOME_IMPLEMENTATION.md.

## Actualización vigente 03.1

- Familias reales: Cormorant Garamond Variable (normal/italic 300–700), DM Sans Variable (normal/italic 100–1000); tokens usan exactamente esos nombres, con fallbacks locales y font-synthesis none.
- Cuatro WOFF2 Latin servidos localmente, font-display swap. Fuentes Fontsource 5.3.0 con licencias OFL-1.1 copiadas sin modificación a public/licenses.
- Glyph WhatsApp de Font Awesome Free Brands 7.3.1, original, CC BY 4.0; SVG decorativo con nombre accesible en el control padre. Se mantiene coherencia de tamaño/color y no se altera la geometría.
- Capas explícitas theme/base/components/utilities, globals antes que CSS de Home en main. Preflight no debe prevalecer sobre componentes. Regresión sobre el CSS compilado.
- Pasos mobile: marcador agrupado + texto, lista vertical ancho completo y pista flexible. Desktop: cuatro columnas. Contraste footer y botones recuperado por orden de capas sin modificar paleta.
- Home: sección 28 px mobile/40 tablet, separación heading-tarjeta 20 px y titulares de tarjetas 24 px. La nueva renderización requiere revisión externa.
