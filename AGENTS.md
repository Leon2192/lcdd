# PY01 — La Casa del Detalle

## Alcance y autorizaciones

- Alcance vigente: finalización integral V1.0 autorizada tras aprobación de Fase 06. Completar páginas editoriales, optimizaciones justificadas y ZIP portable local. No habilitar publicación ni indexación. Esta autorización reemplaza restricciones históricas de avance y empaquetado.
- Prohibidos Git, repositorios, commits, ramas, GitHub, despliegues, hosting, cambios de dominio, Docker, backend, BFF, API, bases de datos remotas, autenticación, pagos y checkout.
- No ejecutar comandos Git ni inicializar repositorios. La presencia inicial de un directorio `.git` vacío, de solo lectura, está documentada; no modificarlo.
- No realizar solicitudes a servicios remotos desde la aplicación. Las instalaciones de paquetes de desarrollo necesarias para la fase están autorizadas.
- No inventar precios, productos, testimonios, condiciones comerciales, plazos, historia institucional ni fotografías de productos. Usar recursos oficiales cuando se entreguen.
- Implementar catálogo, categorías y fichas de los 14 productos conforme a UI-02 V1.1/UI-03/UI-04/UI-07. Preservar Home y sus correcciones. Implementar pedido con Zustand/LocalStorage y cotización con React Hook Form/Zod según el alcance autorizado. No convertir propuestas comerciales en reglas definitivas. Fotografías y textos pendientes deben identificarse como provisionales.

## Fuentes vigentes

- Jerarquía: resoluciones de Dirección General > validaciones funcionales/comerciales > catálogo oficial de `docs/handoff/productos` > especificaciones de diseño > mockups.
- Editorial Boutique original y UI-01 desktop/mobile son referencias prioritarias. Preservar el logo recibido; no mostrar capturas con fondo e iconos ajenos como identidad definitiva. Hasta recibir un logo limpio usar la denominación institucional en texto. No usar propuestas históricas como diseño vigente.
- Preservar íntegro `docs/handoff/`; no formatear ni modificar sus originales, JSON, documentos o manifiesto.
- Tokens exactos y pesos tipográficos del handoff son propuestas, no aprobaciones finales. Documentar ajustes técnicos y pendientes.
- Registrar la discrepancia de Carpa QR sin resolverla comercialmente. No recortar mockups para obtener fotografías.
- Fuentes locales Fontsource Variable y glyph WhatsApp Font Awesome con licencias/atribuciones preservadas en `public/licenses`. Sin fuentes externas en runtime.
- La cascada debe mantener `theme → base → components → utilities`; verificar el CSS compilado para evitar que Preflight anule componentes.
- Datos de ejecución comerciales generados desde el JSON oficial de Productos, sin editar originales ni duplicar campos manualmente. Conservar null, estados y publicationReady. Ejecutar catalog:check y verificar referencias.
- Demo visual exclusiva de desarrollo; fuera de la navegación comercial y del build de producción.

## Estándares

- React + Vite + TypeScript estricto. Node 24 y npm 11, desarrollo local en WSL2.
- Stack aprobado: Tailwind CSS, React Router, Zustand, React Hook Form, Zod, Lucide React, LocalStorage, ESLint, Prettier, Vitest y React Testing Library. Instalar solo lo necesario para la fase autorizada.
- Arquitectura Feature-Based: funcionalidades en `src/features/<feature>/`; código compartido sin dependencias hacia funcionalidades. No crear abstracciones, stores o carpetas sin necesidad real.
- `src/app` compone la aplicación; `src/routes` declara rutas; `src/layouts` estructura pantallas; `src/pages` contiene páginas transversales; `src/components` contiene UI compartida.
- Alias `@/` para `src/`, configurado tanto en TypeScript como en Vite/Vitest.
- Centralizar datos institucionales en `src/config/site.ts` y navegación en `src/config/navigation.ts`. No duplicarlos.
- Español de Argentina (`es-AR`), Mobile First, HTML semántico, foco visible, navegación por teclado y nombres accesibles.
- No introducir `any`, supresiones de TypeScript o aserciones no verificadas para ocultar errores. Preferir imports de tipo explícitos.
- WhatsApp internacional `5491135939460` autorizado: el propietario verificó manualmente que abre la conversación de LCDD (Fase 05.1). Centralizar número y URLs en site.ts/lib/whatsapp.ts. Abrir solo por acción explícita, nunca enviar automáticamente ni vaciar pedido al abrir. La evidencia no acredita envío/recepción.
- Persistir exclusivamente selección por ID y cantidades explícitas, con versión y validación de recuperación. No persistir datos personales del formulario. Campos y cantidades pendientes no se inventan; solicitudes estructuradas sin cantidad o unidad definida permanecen bloqueadas, con consulta directa disponible.
- Probar comportamiento observable y navegación con Vitest + React Testing Library. Evitar pruebas que solo repiten la implementación.
- Para el cierre V1.0 ejecutar `npm run check` una sola vez al finalizar los cambios; repetir únicamente controles que fallen. Reportar fallos y bloqueos reales; nunca declarar una validación que no se ejecutó.
- Mantener README y documentación técnica actualizados. Entregar V1.0 local y portable; publicación exige autorización independiente.

## Calidad — Fase 06

- Mantener noindex/nofollow/noarchive y robots Disallow durante desarrollo local; no canonical ni URLs sociales de publicación sin autorización.
- Metadatos por ruta y manejo genérico de errores, sin exponer datos del evento o trazas.
- Selector de evento aprobado: Fiesta de XV, Casamiento, Cumpleaños, Otro; opcional y sin selección inicial. Icono de carrito aprobado por el propietario.
- No afirmar Lighthouse, métricas de navegador, conformidad WCAG o ausencia de vulnerabilidades sin evidencia. No repetir bloqueos Chromium/HTTP conocidos; matriz manual Chrome Windows.
- No npm audit fix --force ni actualizaciones masivas; registrar limitaciones de conectividad.
