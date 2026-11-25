# La Casa del Detalle — PY01

Base local de la plataforma web LCDD, orientada a productos personalizados, souvenirs, invitaciones digitales y detalles para eventos. Permite preparar solicitudes de cotización por WhatsApp, sin precios públicos ni pagos.

**V1.0 — Finalización integral local autorizada.** Fase 06 aprobada por Dirección Técnica. Incluye páginas editoriales, recorrido comercial y entrega portable. Textos institucionales, fotografías, logo limpio y definiciones comerciales siguen pendientes; no se autoriza publicación. [Guía breve de recursos](docs/REPLACE_RESOURCES.md) y [estado operativo](docs/LOCAL_V1_SUMMARY.md).

**V1.1 — Interfaz comercial.** El encabezado muestra el carrito y la cantidad de productos distintos seleccionados. Cada alta válida muestra una confirmación durante cinco segundos con acceso a «Armá tu pedido». El acceso flotante abre WhatsApp con un mensaje de consulta preparado. Las fichas conservan una marca discreta en las imágenes ilustrativas y los espacios sin recurso muestran «Sin imagen». Los estados comerciales y el origen de los recursos se conservan en sus registros internos.

**V1.2 — Catálogo y recursos comerciales.** El catálogo operativo tiene 16 productos en cinco categorías. Kits conserva su URL y reúne Kits de baño, Kit antiresaca Bolsa, Pillow y Craft. Las selecciones guardadas de la revisión anterior conservan las líneas válidas y requieren volver a elegir el formato del kit genérico. En Inicio, hasta 767 px, las categorías y los destacados aparecen antes del hero.

En las fichas y el pedido, las cantidades nuevas se eligen en una lista de 10 a 200. Los valores ya guardados siguen disponibles hasta que se cambien. Al abrir una ficha desde el catálogo, la página enfoca el título situado sobre la galería. Bolsa y Pillow comparten la ilustración anterior del kit antiresaca.

## Entorno

Windows + WSL2, Ubuntu 24.04, Node 24, npm 11 y VS Code. Trabajar desde `~/projects/lcdd-web` en Ubuntu. `engines` exige Node 24/npm 11.

## Instalación y uso local

```bash
nvm use 24
npm ci
npm run dev
```

Las 29 dependencias directas están instaladas y el lockfile está sincronizado. `npm ci` permite reinstalar las versiones registradas en un entorno con acceso a npm o caché suficiente; se verificó una instalación limpia offline con la caché existente durante el cierre V1.0.

Vite informa la dirección local de desarrollo. `npm run preview` sirve exclusivamente para revisar localmente el resultado de `npm run build`.

## Comandos

| Comando                | Función                                             |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Desarrollo local                                    |
| `npm run typecheck`    | Comprobación de tipos de aplicación y configuración |
| `npm run build`        | TypeScript y compilación Vite en `dist/`            |
| `npm run lint`         | ESLint, sin advertencias permitidas                 |
| `npm test`             | Pruebas en una ejecución                            |
| `npm run test:watch`   | Pruebas durante desarrollo                          |
| `npm run format`       | Formatear con Prettier                              |
| `npm run format:check` | Verificar formato                                   |
| `npm run check`        | Formato, lint, pruebas y build                      |

Ejecutar `npm run check` para comprobar formato, lint, pruebas y build. El sandbox del agente rechaza sockets locales con `listen EPERM`. Fase 01 fue validada externamente; los cambios de Fase 06 y la validación completa requieren revisión manual en Chrome Windows. Chromium disponible no inicia por falta de libnspr4.so. Fase 06 no repitió intentos de servidor/Chromium; revisión externa de cambios según FINAL_QA_CHECKLIST.

## Arquitectura y alcance

Arquitectura Feature-Based, TypeScript estricto y alias `@/`. [Decisiones y estructura](docs/arquitectura.md). Los datos institucionales están centralizados en `src/config/site.ts`; navegación en `src/config/navigation.ts`.

Hay Home completa en `/`, catálogo funcional, cinco categorías y 14 fichas, layout compartido, páginas completas de Inspiración, Nosotros y Profesionales con contenido editorial identificado como propuesta, pedido persistido y formulario de cotización y recuperación 404. No hay contenido comercial inventado ni imágenes de productos.

React Router, Tailwind, Vitest, Testing Library y Prettier están instalados y configurados. La base de Fase 02 aporta 18 componentes UI y tokens. Fase 03 agrega Home modular, carrusel horizontal y pruebas de estructura y comportamiento. Fase 05 agrega Zustand, LocalStorage, React Hook Form y Zod: pedido, formulario candidato y mensaje revisable. TypeScript y npm run check satisfactorios, 220 pruebas; ver informe de Fase 06.

No se usan Git, servicios de backend, autenticación, pagos, checkout, hosting ni despliegues. Se encontró un directorio `.git` vacío y de solo lectura, sin metadatos de repositorio; no se modificó. No se puede declarar ausencia física absoluta de `.git`.

## Entrega local V1.0

Extraer `LCDD_Web_V1.0.zip`, abrir la carpeta `lcdd-web` en WSL y ejecutar `nvm use`, `npm ci`, `npm run dev`. Node 24/npm 11. No incluye node_modules ni dist: se regeneran con instalación/build. `npm run check` informa tiempos por control y comprueba catálogo/TypeScript dentro del build, sin duplicarlos. No contiene repositorios ni credenciales.

Para reemplazar imágenes y textos consultar [guía breve](docs/REPLACE_RESOURCES.md) y [25 piezas esperados](pending-assets/EXPECTED_FILES.csv). Los informes anteriores registran estados históricos; la autorización actual permite este cierre y su ZIP, sin habilitar publicación.

## Demo visual de desarrollo

Con `npm run dev`, abrir **`/__dev/design-system`**. No aparece en navegación comercial y se elimina del bundle de producción. Muestra paleta, familias/fallbacks, controles, estados, tarjetas, carrusel y overlays. Las fotografías son placeholders explícitos. No es una Home ni un catálogo operativo.

Documentos: [sistema de diseño](docs/DESIGN_SYSTEM.md), [decisiones](docs/DESIGN_DECISIONS.md), [inventario](docs/ASSET_INVENTORY.md) y [pendientes](docs/PENDING_ITEMS.md). Los 47 originales de Marketing y dos archivos oficiales de Productos se preservan íntegros en `docs/handoff/`. Prettier excluye esa entrega para conservar hashes.

Cormorant Garamond Variable y DM Sans Variable 5.3.0 se distribuyen localmente con normal/italic y licencias OFL verificadas; el build incluye cuatro WOFF2 Latin, sin servicios externos. El PNG original se preserva, pero ya no se renderiza: Brand utiliza temporalmente el nombre institucional en texto. El glyph legítimo de WhatsApp procede de Font Awesome Free Brands 7.3.1 y conserva atribución CC BY 4.0 en public/licenses. El contacto WhatsApp muestra el número local en un diálogo; el enlace internacional está activo tras verificación manual del propietario, reportada en Fase 05.1.

## Home y revisión manual

La Home reproduce la estructura de UI-01 con Hero, propuesta de valor, cinco categorías oficiales, destacados de demostración, inspiración, Nosotros, Profesionales, cómo funciona, eventos mobile, CTAs, contacto y footer. Las imágenes actuales se sirven desde recursos locales y sus orígenes se registran en `src/config/image-attribution.ts`. Los espacios sin recurso muestran «Sin imagen».

La selección de demostración está centralizada en `src/features/home/home-content.ts`. Las identidades proceden de Productos y se verifican contra su JSON oficial. Sin precios, cantidades mínimas ni cambios en Carpa QR. Los enlaces de productos y categorías llegan al catálogo funcional de Fase 04. Los CTA de pedido llevan a la selección funcional de Fase 05.

Para revisar, ejecutar Vite localmente y abrir `/` en Chrome de Windows a 320, 360, 390, 768, 1024, 1280, 1440 y 1920 px. No se ha certificado fidelidad visual desde el sandbox. El procedimiento y los resultados reales están en HOME_VISUAL_VALIDATION.md y PHASE_03_REPORT.md. No dedicar más tiempo a restricciones de Chromium que no afectan la aplicación.

## Actualización del catálogo oficial

`npm run catalog:sync` genera la fuente de ejecución desde `docs/catalog/PY01_catalogo_operativo_v1.2.json`. Los documentos originales de `docs/handoff/` se conservan como referencia histórica. `npm run catalog:check` verifica sincronización y se ejecuta en typecheck/build/check. Catálogo: `/catalogo`; categorías: `/catalogo/categoria/:categorySlug`; fichas: `/catalogo/producto/:productSlug`. Los ID anteriores redirigen a slugs legibles. Todos los datos comerciales pendientes conservan su estado; la vista local no aprueba publicación. Pedido, formulario y copia del mensaje están implementados; la apertura de WhatsApp está activa con el número internacional autorizado.

## Pedido y cotización local

Desde una ficha elegible, ingresá una cantidad explícita o elegí un servicio digital. `/arma-tu-pedido` permite editar, quitar, vaciar y continuar a `/cotizacion`. El formulario candidato es opcional mientras se valida su obligatoriedad. Podés revisar/copiar el mensaje; no se envía automáticamente y WhatsApp se abre con el texto preparado solo al elegir el enlace.

Solo se persisten IDs/cantidades y metadatos en lcdd:order. Los datos del evento quedan en memoria al navegar y se descartan al recargar. P-008/P-011/P-012 ofrecen consulta contextualizada por unidad pendiente; no se inventan reglas. Repetir un producto no suma cantidades. Nuevas bibliotecas: Zustand 5.1.0, React Hook Form 7.92.0 y Zod 4.6.7, instaladas por el usuario y verificadas con el lockfile.

## Optimización 05.1

El propietario confirmó manualmente que 5491135939460 abre la conversación LCDD. La revisión ofrece **Enviar solicitud por WhatsApp** como acción principal y copiar como secundaria. El usuario decide enviar desde WhatsApp; abrir/copiar no vacía el pedido ni confirma envío/recepción. Los accesos institucionales mantienen el diálogo con enlace activo y las fichas preparan consultas contextualizadas.

Revisión con desplazamiento/foco y reduced-motion, retorno a edición, resumen de fecha DD/MM/AAAA y relacionados en pista horizontal accesible. Tipo de evento con selector opcional: Fiesta de XV, Casamiento, Cumpleaños y Otro, aprobados posteriormente por el propietario; sin selección por defecto. Los demás campos mantienen su obligatoriedad. No se persistieron datos personales ni se incorporaron dependencias.

El desplegable de tipo de evento usa una lista contenida al ancho del formulario para evitar el popup nativo desbordado observado en Chrome Windows a 360 px. Mantiene las opciones aprobadas, el campo opcional, teclado y foco. Ver QUOTATION_IMPLEMENTATION para detalles y revalidación visual pendiente.

## Calidad y preparación local — Fase 06

Metadatos por ruta, noindex/robots y fallback de errores, mejoras de foco/recuperación/anuncios, React-vendor separado y registro local de imágenes aprobado. El mayor chunk baja de ~502 a ~288 kB; los bytes iniciales totales no se reducen. No se midieron Lighthouse ni Core Web Vitals. Auditoría npm externa del propietario: 0 vulnerabilidades conocidas en su informe; agente bloqueado por DNS. Sin dependencias nuevas.

Vite/preview se limitan a 127.0.0.1; Vite bloquea docs/handoff y carpetas sensibles: respuesta 403 comprobada en su middleware real; la comprobación por puerto queda pendiente en WSL. /inspiracion, /nosotros y /profesionales están implementadas. La interfaz comercial omite los estados internos de textos y colecciones. Noindex no es control de acceso. Toda publicación requiere decisión independiente; el cierre V1.0 autoriza el ZIP local.

## Cierre definitivo V1.0 — recursos ilustrativos

19 imágenes locales incorporadas (Home, tres inspiración, cuatro categorías y 11 productos), identificadas visiblemente como ilustraciones generadas con IA, no fotografías reales de LCDD. Categoría Experiencias y detalles para eventos, Estrellitas, Capitán de mesa y Save the date conservan placeholders. Logo textual y favicon tipográfico provisional. Registro de imágenes en src/config/media.ts; atribución IA en src/config/image-attribution.ts. No se modificaron catálogo ni reglas comerciales.

Para una publicación futura consultar [configuración breve](docs/DEPLOYMENT_NOTES.md). No se realizó despliegue ni se autorizó indexación.

Validación del cierre definitivo: npm run check ejecutado una vez; formato/ESLint satisfactorios y 243/245 pruebas aprobadas inicialmente. Dos expectativas anteriores a la incorporación de imágenes se actualizaron; repetición selectiva: 44/44 casos satisfactorios. Cobertura comprobada de 245 casos entre ambas ejecuciones. Catálogo/TypeScript/build posteriores satisfactorios. Las 19 imágenes decodifican, sus 26 referencias existen y los archivos se conservan íntegros en dist. No se realizó despliegue.
