# PY01 — Auditoría final de Fase 01

Fecha: 24 de noviembre de 2026. Proyecto: La Casa del Detalle (LCDD), versión `0.1.0`.

**Estado final actualizado: Fase 01 completada y confirmada por Dirección Técnica al autorizar Fase 02.**

Dirección Técnica informa que el usuario verificó externamente el servidor mediante curl y obtuvo **HTTP/1.1 200 OK**. Es evidencia reportada por el usuario, no una ejecución del agente en el sandbox. Se preservan debajo los resultados históricos de la auditoría local y su EPERM; ese bloqueo ya no deja abierto el cierre de Fase 01.

Este es el informe vigente. Sustituye los estados de instalación pendiente documentados durante las revisiones anteriores. Los resultados corresponden a comandos ejecutados en esta auditoría; una revisión estática y pruebas en jsdom no equivalen a una validación visual en navegador.

## Arquitectura implementada

Base React + Vite + TypeScript estricto, preparada para desarrollo Feature-Based. `src/app` compone la aplicación y crea el router; `src/routes` declara las rutas; `src/layouts` estructura la interfaz compartida; `src/pages` contiene la página transversal 404; `src/components` contiene el placeholder reutilizable; `src/config` centraliza institución y navegación.

`src/features` documenta la ubicación de futuras funcionalidades. No hay lógica de negocio que justifique crear features, stores, servicios o abstracciones vacíos en esta fase. Los componentes compartidos no importan funcionalidades. Las páginas de dominio se incorporarán en su feature cuando sean autorizadas.

Alias `@/` configurado en TypeScript y Vite. Vitest hereda plugins y alias mediante `mergeConfig`. La configuración de desarrollo importa `defineConfig` de Vite y la de pruebas importa el de Vitest. Ambas quedan incluidas en TypeScript estricto.

## Árbol de directorios

Se omite el contenido generado de `node_modules` y `dist`, y los directorios internos de la herramienta que no forman parte del código de la aplicación.

```text
lcdd-web/
├── .git/                         Vacío, de solo lectura; sin modificar
├── .gitignore                    Archivo heredado; no implica uso de Git
├── .npmrc
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── AGENTS.md
├── README.md
├── package.json
├── package-lock.json
├── index.html
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── public/                       Sin recursos demo
├── docs/
│   ├── PHASE_01_REPORT.md
│   ├── arquitectura.md
│   ├── diagnostico-arranque.md
│   └── fase-01.md
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   └── router.ts
│   ├── assets/                   Vacío; reservado para recursos oficiales
│   ├── components/
│   │   └── PlaceholderPage.tsx
│   ├── config/
│   │   ├── navigation.ts
│   │   └── site.ts
│   ├── features/
│   │   └── README.md
│   ├── layouts/
│   │   └── RootLayout.tsx
│   ├── pages/
│   │   └── NotFoundPage.tsx
│   ├── routes/
│   │   ├── routes.tsx
│   │   └── routes.test.tsx
│   ├── styles/
│   │   └── globals.css
│   └── test/
│       └── setup.ts
├── node_modules/                 Dependencias locales
└── dist/                         Build local generado; no publicado
```

## Dependencias y versiones

Entorno observado: Node `24.19.0`, npm `11.17.0`. Cumple `engines` (Node 24/npm 11), `.nvmrc` y `.npmrc` con `engine-strict=true`.

| Paquete                       | Grupo      | Rango declarado | Versión instalada y registrada en lock |
| ----------------------------- | ---------- | --------------- | -------------------------------------- |
| `react`                       | Producción | `^19.3.1`       | `19.3.1`                               |
| `react-dom`                   | Producción | `^19.3.1`       | `19.3.1`                               |
| `react-router`                | Producción | `^7.0.0`        | `7.18.6`                               |
| `@eslint/js`                  | Desarrollo | `^10.0.1`       | `10.0.1`                               |
| `@types/node`                 | Desarrollo | `^24.19.2`      | `24.19.2`                              |
| `@types/react`                | Desarrollo | `^19.3.0`       | `19.3.0`                               |
| `@types/react-dom`            | Desarrollo | `^19.3.0`       | `19.3.0`                               |
| `@vitejs/plugin-react`        | Desarrollo | `^6.1.2`        | `6.3.0`                                |
| `eslint`                      | Desarrollo | `^10.14.0`      | `10.15.0`                              |
| `eslint-plugin-react-hooks`   | Desarrollo | `^7.1.1`        | `7.1.1`                                |
| `eslint-plugin-react-refresh` | Desarrollo | `^0.5.7`        | `0.5.8`                                |
| `globals`                     | Desarrollo | `^17.13.0`      | `17.14.0`                              |
| `typescript`                  | Desarrollo | `~6.0.3`        | `6.0.3`                                |
| `typescript-eslint`           | Desarrollo | `^8.72.1`       | `8.74.0`                               |
| `vite`                        | Desarrollo | `^8.3.6`        | `8.3.8`                                |
| `tailwindcss`                 | Desarrollo | `^4.0.0`        | `4.3.5`                                |
| `@tailwindcss/vite`           | Desarrollo | `^4.0.0`        | `4.3.5`                                |
| `prettier`                    | Desarrollo | `^3.0.0`        | `3.10.1`                               |
| `vitest`                      | Desarrollo | `^4.1.0`        | `4.1.12`                               |
| `jsdom`                       | Desarrollo | `^27.0.0`       | `27.4.0`                               |
| `@testing-library/react`      | Desarrollo | `^16.0.0`       | `16.3.3`                               |
| `@testing-library/jest-dom`   | Desarrollo | `^6.0.0`        | `6.9.1`                                |
| `@testing-library/user-event` | Desarrollo | `^14.0.0`       | `14.6.13`                              |

Hay 23 dependencias directas: 3 de producción y 20 de desarrollo. Todas están instaladas y sus versiones coinciden con el lockfile y satisfacen los rangos declarados. No se añadieron dependencias nuevas durante la auditoría.

Zustand, React Hook Form, Zod y Lucide React siguen fuera de la instalación porque no se usan en Fase 01. LocalStorage no requiere paquete y no se utiliza todavía.

### Consistencia de instalación y lockfile

- `package-lock.json` es JSON válido, formato 3, con raíz en versión `0.1.0`.
- `name`, `version`, `engines`, `dependencies` y `devDependencies` de su raíz coinciden con `package.json`.
- Verificados rangos semver, presencia de cada dependencia directa y coincidencia de versiones instaladas y bloqueadas.
- `npm ls --depth=0` y `npm ls --all` terminan con código 0 y sin dependencias faltantes, inválidas ni sobrantes después de la limpieza.
- Al inicio aparecieron seis paquetes sobrantes. Se ejecutó `npm prune --offline --ignore-scripts --no-audit --no-fund --cache /tmp/lcdd-npm-cache`: eliminó seis paquetes, código 0. No se cambiaron los rangos del manifiesto.
- El lockfile contiene 316 entradas de paquetes además de la raíz; incluye variantes opcionales que no necesariamente se instalan en esta plataforma.
- No se ejecutó una reinstalación destructiva con `npm ci`. La auditoría verifica consistencia del árbol actual; no afirma una reinstalación limpia comprobada.

## Funcionalidades implementadas

- Punto de entrada React con StrictMode y comprobación del nodo raíz.
- Layout compartido con header, navegación principal, contenido y footer institucional.
- Páginas provisionales de Inicio, Catálogo, Inspiración, Nosotros, Profesionales y Armá tu pedido.
- Rutas dinámicas provisionales de categoría y producto. No resuelven datos comerciales.
- Ruta 404 con enlace de recuperación al inicio.
- Datos institucionales centralizados y tipados; `es-AR` en configuración y HTML.
- WhatsApp local presentado como texto; número internacional provisional marcado sin validar y sin enlace activo.
- Tailwind integrado; estructura Mobile First, fuente del sistema, enlace para saltar al contenido, foco visible y HTML semántico. Estilo neutral provisional.
- Once pruebas de comportamiento: seis rutas principales, dos dinámicas, navegación al catálogo, recuperación de 404 y contactos sin enlace WhatsApp provisional.

No se implementaron Home definitiva, catálogo real, cotización, persistencia, autenticación ni pagos. No hay imágenes ficticias de productos ni información comercial inventada.

## Resultados reales de las validaciones

| Validación                                                 | Resultado                                                                         |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Auditoría del manifiesto y lockfile                        | Correcta: raíz coincidente y 23 versiones directas verificadas                    |
| `npm ls --all`                                             | Código 0; lista de problemas vacía                                                |
| `npm run typecheck`                                        | Código 0; comprobación TypeScript correcta                                        |
| `npm run build`                                            | Código 0; Vite compiló 28 módulos y generó `dist/`                                |
| `npm run lint`                                             | Código 0; sin advertencias                                                        |
| `npm run format:check`, primera ejecución                  | Código 1; diferencias de formato en diez archivos                                 |
| `npm run format` y `npm run check`, ejecución final        | Código 0; formato corregido y verificado, lint, 11 pruebas y build aprobados      |
| `npm run test`, primera ejecución                          | Código 0; un archivo y 11 pruebas aprobadas                                       |
| `npm run dev -- --host 127.0.0.1 --port 5199 --strictPort` | Código 1: `listen EPERM: operation not permitted 127.0.0.1:5199`                  |
| HTTP GET `http://127.0.0.1:5199/`                          | Sin respuesta HTTP: `Operation not permitted` en la conexión local                |
| Limpieza del servidor de prueba                            | Proceso finalizado con código 1; comprobado que el grupo de procesos ya no existe |

La configuración de Vite ya carga y comienza la optimización de dependencias; no reaparecen los errores de importación de Tailwind o Vitest. El arranque se detiene al abrir el socket local, antes de poder atender solicitudes HTTP. El entorno mantiene `CODEX_SANDBOX_NETWORK_DISABLED=1`; las políticas vigentes no permiten solicitar ejecución fuera del sandbox. No se intentó eludir la restricción.

Registro temporal del servidor: `/tmp/lcdd-phase01-audit-dev.log`. No se validó visualmente la aplicación en un navegador. Las pruebas en jsdom y el build no sustituyen la respuesta HTTP pendiente.

## Cambios realizados durante la auditoría

- Eliminados seis paquetes sobrantes con npm y verificado nuevamente el árbol completo de dependencias.
- Aplicado Prettier a los archivos con diferencias de formato; se conservó el comportamiento de la aplicación.
- Creado este informe y actualizados README, arquitectura, resumen de fase y diagnóstico para retirar los estados obsoletos de instalación pendiente.
- No se añadieron funcionalidades ni paquetes y no se modificó AGENTS.md.

## Decisiones técnicas

- Mantener `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, imports de tipos explícitos y comprobaciones de código no utilizado.
- Conservar la configuración Feature-Based sin crear lógica o capas de negocio prematuramente.
- Compartir plugins y alias entre Vite y Vitest, con archivos de configuración separados.
- Integrar Tailwind mediante su plugin oficial de Vite, sin una capa adicional de PostCSS.
- Separar ESLint y Prettier; mantener cero advertencias permitidas.
- Probar comportamiento observable con React Testing Library y user-event; cleanup explícito después de cada caso.
- Centralizar contenido institucional y no habilitar WhatsApp internacional antes de validarlo.
- Usar recursos y tipografías locales; no hay solicitudes remotas programáticas desde la aplicación. Los enlaces de correo e Instagram son contactos explícitos.
- No modificar versiones que ya compilan y pasan pruebas sin evidencia de incompatibilidad.

## Cumplimiento de AGENTS.md

| Regla                                                                   | Resultado de auditoría                                                       |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Trabajar solo en Fase 01                                                | Cumplida; sin trabajo de Fase 02                                             |
| Sin comandos Git ni GitHub                                              | Cumplida; `.git` vacío observado sin modificar                               |
| Sin backend, API, servicios remotos, autenticación, pagos o despliegues | Cumplida en el código revisado                                               |
| Arquitectura compartida sin dependencias hacia features                 | Cumplida; features todavía sin lógica de negocio                             |
| Configuración centralizada y alias                                      | Cumplida                                                                     |
| TypeScript estricto, sin `any` ni supresiones para ocultar errores      | Cumplida en el código revisado y comprobación de tipos aprobada              |
| Español argentino y accesibilidad básica Mobile First                   | Implementada; revisión estática y pruebas DOM, sin auditoría visual completa |
| WhatsApp provisional sin activar                                        | Cumplida y cubierta por prueba                                               |
| No inventar contenido comercial ni imágenes                             | Cumplida                                                                     |
| Ejecutar herramientas y reportar resultados reales                      | Cumplida; bloqueo HTTP explícito                                             |

## Deuda técnica

- Completar la comprobación del servidor y HTTP fuera de la restricción de sockets del entorno actual.
- Realizar revisión visual y de teclado en navegador, móvil y escritorio. No se certifica accesibilidad integral mediante las pruebas actuales.
- La base Feature-Based está preparada; aún no tiene módulos funcionales porque pertenecen a fases posteriores.
- No se configuró un umbral de cobertura ni una suite de navegador completa en Fase 01. Se conservan las pruebas básicas solicitadas.

La ausencia de contenido definitivo, catálogo y cotización corresponde al alcance autorizado; no es un fallo de implementación de Fase 01.

## Problemas pendientes al momento de la auditoría local

Actualización: el punto 1 quedó cubierto para Fase 01 por la validación HTTP externa del usuario. Los demás pendientes de contenido corresponden a fases futuras.

1. Bloqueo de permisos de red local: Vite no puede escuchar y la conexión HTTP es rechazada. Impide cerrar la validación solicitada del servidor local.
2. Número internacional de WhatsApp pendiente de validación institucional antes de cualquier flujo futuro.
3. Recursos oficiales y documentación visual pendientes para las siguientes fases.
4. Existe físicamente un `.git` vacío y de solo lectura, sin metadatos visibles de repositorio. No se puede declarar su ausencia absoluta ni modificarlo en esta tarea.

Los fallos anteriores por dependencias ausentes y lockfile desincronizado están resueltos en el estado inspeccionado de esta auditoría.

## Criterios de aceptación

| Criterio de Fase 01                                          | Estado                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Dependencias necesarias declaradas e instaladas              | Cumplido                                                     |
| Lockfile coherente con manifiesto y árbol instalado          | Cumplido                                                     |
| Arquitectura y restricciones permanentes                     | Cumplido                                                     |
| TypeScript estricto y alias                                  | Cumplido                                                     |
| Tailwind, ESLint, Prettier, Router y herramientas de pruebas | Cumplido; configuración y comando conjunto aprobados         |
| Layout y páginas provisionales, sin recursos demo            | Cumplido                                                     |
| Configuración institucional centralizada                     | Cumplido                                                     |
| Build, tipos, lint y pruebas básicas                         | Cumplido                                                     |
| Formato consistente y comando conjunto de calidad            | Cumplido; `npm run check` terminó con código 0               |
| Documentación actualizada e informe de auditoría             | Cumplido con este informe y documentos enlazados             |
| Servidor local operativo con respuesta HTTP correcta         | Cumplido por validación externa del usuario: HTTP/1.1 200 OK |
| Servidor de prueba detenido                                  | Cumplido                                                     |

## Estado final de la fase

**Fase 01 completada y confirmada por Dirección Técnica.** TypeScript, build, lint, formato y 11 pruebas fueron satisfactorios en la auditoría. La comprobación HTTP se completó externamente por el usuario con HTTP/1.1 200 OK, según su comunicación al autorizar Fase 02.

Los errores EPERM anteriores quedan como limitación histórica del entorno del agente, no como un rechazo del funcionamiento externo. La autorización actual permite únicamente Fase 02; no habilita Fase 03 ni publicación.
