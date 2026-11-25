# PY01 — Informe de Fase 03 y correcciones 03.1

**Estado vigente: Fase 03 aprobada por Dirección Técnica para continuar tras revisar las correcciones 03.1. La aprobación estética definitiva y responsive completa siguen pendientes. Fase 04 y luego Fase 05 fueron autorizadas; ver sus informes para la implementación posterior.**

## Alcance y referencias

Dirección Técnica inspeccionó capturas reales de Home desktop/mobile, consideró satisfactoria la base y reportó un defecto crítico en los pasos a 360 px. Se trabajó sobre la implementación existente, sin reconstruir Home. Se volvieron a analizar visualmente UI-01 Inicio Desktop y Mobile vigentes de Marketing, respetando Editorial Boutique, paleta y jerarquía de fuentes. No se utilizaron propuestas históricas como diseño actual.

La Home conserva Hero, propuesta de valor, cinco categorías, destacados de demostración, inspiración, Nosotros, Profesionales, guía, eventos mobile, conversión, contacto y footer. No se implementó catálogo funcional, cotización ni persistencia.

## Causa raíz del error responsive

El problema primario era **el orden de capas CSS**, no el ancho del viewport por sí solo. HomePage importaba home.css antes de que globals.css estableciera las capas de Tailwind. El CSS productivo anterior empezaba por components y declaraba base después, dándole mayor precedencia para declaraciones normales.

Preflight define SVG como display block. Esa regla de base podía prevalecer sobre el display none del SVG mobile en los componentes. Cada paso tenía tres hijos directos —número, icono y párrafo— en un grid de dos columnas (44 px y resto flexible). Al quedar visible el icono, este ocupaba la segunda celda y el párrafo se autoasignaba a la siguiente fila, en la primera columna de **44 px**: texto comprimido contra el margen izquierdo y espacio vacío a la derecha, coincidente con el fallo auditado.

La inversión de capas también permitía que el color editorial de h2 en base prevaleciera sobre el blanco del footer y que Preflight anulara fondos/radios de botones. Se verificaron estas reglas en los archivos locales de Tailwind y el orden en el CSS realmente compilado. No se afirma haber reproducido el screenshot en un navegador del agente.

## Corrección estructural y de cascada

- Orden explícito **theme → base → components → utilities**, declarado antes de las reglas. globals se importa primero en main y el CSS de Home después, desde el mismo punto de entrada. HomePage deja de iniciar una carga de estilos independiente.
- Wrapper de pasos con una columna minmax(0,1fr), lista mobile flex vertical de ancho completo y min-width cero.
- Número e icono agrupados en un único marcador aria-hidden: cada paso tiene siempre dos hijos de maquetación, marcador y texto.
- Mobile: marcador de 44 px y texto en columna flexible, sin palabras forzadas a columnas de 44 px. Desktop desde 1024: lista de cuatro columnas y marcador con icono. Orden, contenido y composición desktop conservados.
- Sin ocultar overflow global, sin widths rígidos para el párrafo y sin reglas !important para tapar la cascada.

## Correcciones visuales generales

- Hero: pista explícita, min-width cero, texto introductorio de ancho 100% y máximo 40ch. Mantiene el diseño dividido desktop y apilado mobile.
- Home: espaciado de sección mobile de 28 px, 40 px desde tablet; separación entre headings y tarjetas de 20 px.
- Títulos de categorías/productos de 24 px, con jerarquía editorial y contraste existentes. No cambia ninguna identidad comercial.
- Propuesta de valor mobile: lista de una columna, icono de 32 px reservado y texto flexible; desktop conserva la banda de cuatro elementos.
- Footer y botones: prioridad de componentes recuperada sobre base. Encabezados/textos blancos sobre petróleo; blanco/petróleo calcula 7.45:1, sin alterar la paleta.
- Targets existentes de navegación y carrusel de al menos 44 px conservados. Botones principales mantienen 48–52 px, foco visible, teclado y movimiento reducido. La corrección de capas permite que sus radios/fondos prevalezcan.

## Tipografías locales y licencias

Paquetes ya instalados por el usuario, verificados al iniciar esta corrección:

| Dependencia                             | Versión | Distribución aplicada                                  |
| --------------------------------------- | ------- | ------------------------------------------------------ |
| @fontsource-variable/cormorant-garamond | 5.3.0   | Latin normal e italic, variable 300–700, upstream v21  |
| @fontsource-variable/dm-sans            | 5.3.0   | Latin normal e italic, variable 100–1000, upstream v17 |
| @fortawesome/free-brands-svg-icons      | 7.3.1   | Glyph faWhatsapp original                              |

Se leyeron las licencias incluidas y metadatos de ambos paquetes Fontsource: **SIL OFL-1.1**. src/styles/fonts.css declara cuatro archivos WOFF2 locales sin modificación, suficientes para es-AR. Los tokens utilizan los nombres exactos Cormorant Garamond Variable y DM Sans Variable, con fallbacks locales. Normal y cursiva reales, font-display swap, font-synthesis none y optical sizing auto. Los pesos de interfaz existentes 400/500/600 están dentro de los rangos, sin introducir una nueva escala.

Cormorant se aplica a títulos/marca temporal; DM Sans a cuerpo, navegación y controles. La demo visual se actualizó para no afirmar que siguen faltando archivos. Las licencias completas se copian a public/licenses y se incluyen en dist. ASSET_INVENTORY.md registra procedencia, tamaños y hashes de los cuatro WOFF2.

**No se realizan solicitudes a servicios externos de fuentes en runtime.** El build incorpora los cuatro WOFF2. No se instalaron dependencias adicionales durante este trabajo; el manifiesto ya contenía los tres paquetes solicitados y conserva 26 dependencias directas.

## WhatsApp

WhatsAppIcon importa faWhatsapp desde el paquete instalado de Font Awesome Free Brands. Mantiene geometría original, fill currentColor y tamaño coherente con Icon. Los SVG son decorativos (aria-hidden y focusable false); los controles conservan nombres accesibles.

Se usa en header, contacto Home, footer y paso informativo de cotización. Las formas genéricas de mensaje permanecen disponibles para otros usos, pero ya no sustituyen el glyph de WhatsApp en estos accesos. Licencia SVG/JS CC BY 4.0, atribución a Fonticons, Inc. y términos del paquete preservados en public/licenses/NOTICE.txt y Font-Awesome-Free.txt. Sin SDK adicional ni nueva dependencia para renderizar el SVG.

El icono no habilita el número internacional provisional. El contacto sigue mostrando el número local en el diálogo compartido, sin afirmar envío.

## Pruebas de regresión

Se mantienen las 52 pruebas anteriores y se agregan cuatro:

1. Regresión sobre CSS de un build real en memoria: base debe preceder components. Detecta la causa de cascada, no solo el código fuente de los selectores.
2. Build con cuatro WOFF2 Latin locales, normal/italic de ambas familias, sin URLs de fuentes externas.
3. Pasos con marcador agrupado y texto como segundo hijo: evita la reaparición de tres elementos en un grid de dos columnas.
4. Glyph legítimo de WhatsApp decorativo en controles con nombre accesible.

La prueba de build vive en tests/visual-foundations.test.ts, incluida en TypeScript estricto de configuración Node; no escribe dist ni abre servidor. El setup de pruebas DOM queda protegido para poder compartirlo con el entorno Node. No se añadieron herramientas de testing ni se relajaron controles.

## Resultados efectivamente ejecutados

| Validación                                        | Resultado                                                                     |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| Instalación y disponibilidad de los tres paquetes | Correcta; versiones y archivos físicos verificados                            |
| Licencias de fuentes e icono                      | Leídas; copias/atribución incluidas                                           |
| TypeScript durante corrección                     | Código 0                                                                      |
| Build durante corrección                          | Código 0; 64 módulos, cuatro WOFF2 locales y avisos legales                   |
| ESLint durante corrección                         | Código 0, sin advertencias                                                    |
| Testing durante corrección                        | Código 0; cinco archivos y 56 pruebas aprobadas                               |
| Prettier y npm run check finales                  | Código 0: formato, lint, 56 pruebas y build aprobados                         |
| Orden compilado                                   | theme/base/components/utilities; base ya no prevalece sobre components        |
| Nueva ejecución de Chromium/Playwright o servidor | No realizada: se respetó la instrucción de no insistir en bloqueos de entorno |

Auditoría final adicional: `npm ls --all` código 0 sin problemas; raíz del lockfile coincidente con package.json. Los 46 archivos del manifiesto Marketing conservan tamaños y SHA-256. El catálogo oficial mantiene SHA-256 `5207b6431d612f46412d96396b8ea88368ab0a3b2fd4144b8ebf90f746ee6a6f`; el logo original coincide con la copia preservada. Las tres licencias copiadas son idénticas a sus fuentes y están en dist; hay cuatro WOFF2 emitidos.

Las fallas previas de Chromium (libnspr4.so) y HTTP (EPERM) se conservan como antecedentes, no como ejecuciones nuevas ni como errores de la aplicación. No hay nuevos screenshots generados por el agente.

## Documentación y archivos principales

Modificados: main, globals, tokens, home.css, HomePage, HowItWorks, Icon, accesos WhatsApp, demo visual, pruebas Home, setup, tsconfig.node y AGENTS. Nuevos: fonts.css, WhatsAppIcon, prueba de CSS compilado y cuatro archivos de licencias/atribución en public/licenses.

Actualizados: este informe, HOME_VISUAL_VALIDATION, DESIGN_DECISIONS, PENDING_ITEMS, ASSET_INVENTORY, DESIGN_SYSTEM, HOME_IMPLEMENTATION y README. La indisponibilidad de fuentes/glyph registrada en la entrega inicial de Fase 03 queda superada; los diagnósticos históricos no se presentan como estado vigente.

## Pendientes y estado final

Revalidar manualmente la corrección a 360 px y los otros anchos desde Chrome Windows: lista legible, marcadores alineados, cuatro columnas desktop, Hero, categorías, footer, botones, contraste y ausencia de desbordamientos reales. No se afirma verificación de layout por jsdom ni aprobación visual completa.

Siguen pendientes fotografías reales, logo limpio (se mantiene denominación institucional temporal y original intacto), textos definitivos, selección aprobada de destacados, Comercial, número internacional y resolución empresarial de Carpa QR. Las fuentes locales y el glyph legítimo de WhatsApp ya no son pendientes técnicos.

**Actualización de Dirección Técnica: Fase 03 aprobada para continuar y Fase 04 autorizada tras inspección externa de las correcciones 03.1.** Se confirmó resuelto el error mobile y las fuentes locales. Permanecen pendientes estética definitiva, fotografías, logo limpio y validación responsive completa. No equivale a aprobación visual integral.
