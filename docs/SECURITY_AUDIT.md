# Seguridad y privacidad — Fase 06

## Alcance y resultados

Auditoría frontend local de entradas, persistencia, URLs, dependencias, enlaces y archivos. No es pentest ni certificación de seguridad. No hay backend, autenticación, pagos, API propia, base remota o telemetría añadidos.

Entradas: Zod valida cantidades enteras positivas seguras, modos/IDs/revisión del catálogo y evento/fechas/enum aprobados. El sobre persistido ahora es estricto, no acepta metadatos personales adicionales. La recuperación conserva líneas válidas aunque falle limpiar storage y no afirma borrado si falló. No se inventan mínimos comerciales.

Texto: React representa valores como texto, sin dangerouslySetInnerHTML/innerHTML/eval del código de aplicación. Se probó contenido con etiquetas/script: se presenta como dato, sin crear elementos ejecutables. Metadata usa document.title/content, no HTML. WhatsApp fija https://wa.me y número de configuración, codifica query y normaliza sustitutos UTF-16 aislados para evitar URIError; Unicode válido/emoji se conservan.

Enlaces externos nuevos con target blank tienen noopener noreferrer. La activación de WhatsApp es explícita; no se envía automáticamente, no se confirma recepción y no se vacía pedido. Número autorizado 5491135939460, evidencia manual del propietario de Fase 05.1, no una prueba de envío de esta auditoría.

## Datos y superficie local

LocalStorage contiene solo lcdd:order con versión, hash e IDs/modalidades/cantidades. El formulario y mensaje quedan en memoria y desaparecen al recargar/cerrar. No hay sesión personal en LocalStorage/sessionStorage/IndexedDB/cookies ni servicios de seguimiento añadidos. La conducta del autocompletado del navegador es ajena al almacenamiento de la aplicación.

El escaneo textual de código/configuración y revisión de datos no encontró credenciales/secretos; cero archivos .env en raíz. Se excluyeron de inspección carpetas privadas de herramientas y no se afirma detectar toda forma posible de secreto.

Vite y preview se configuran en 127.0.0.1. Vite conserva deny para .env/certificados/.git y bloquea docs/handoff y carpetas de herramientas por HTTP. El runner Vitest Node permite únicamente la lectura de docs como fixtures, conservando las demás exclusiones. No se alteró ningún original. **La regla está configurada/revisada, no probada por HTTP desde el sandbox.** En validación externa comprobar que una URL /docs/handoff/... no devuelve el contenido original. Preview sirve solo dist.

Noindex/robots no son autenticación. CSP, HTTPS y cabeceras de una futura publicación requieren entorno/decisiones de hosting autorizados y pruebas; no se inventaron cabeceras ni se puso CSP no comprobada que pudiera romper desarrollo.

## Dependencias y vulnerabilidades conocidas

Comando del agente: npm audit --json --fetch-retries=0 --fetch-timeout=10000. Falló al resolver registry.npmjs.org con EAI_AGAIN; no se afirma una auditoría de red exitosa del agente.

El propietario ejecutó npm audit --json desde WSL y compartió auditReportVersion:2, vulnerabilities:{}; metadata.vulnerabilities: info 0, low 0, moderate 0, high 0, critical 0, total 0. Su informe indica metadata.dependencies.total:322. Se registra como **evidencia externa informada por el propietario al ejecutar Fase 06**, no como garantía de ausencia de vulnerabilidades futuras/desconocidas ni ejecución propia.

npm ls --all y manifiesto/lock locales son consistentes; 29 dependencias directas (9 producción, 20 desarrollo). No se instalaron paquetes nuevos, no se cambiaron versiones ni se ejecutó audit fix/force. Para repetir con red: npm audit --json (y opcionalmente npm audit --omit=dev --json), registrar fecha/versiones y evaluar correcciones puntuales, sin actualizaciones masivas.

## Pendientes

Prueba de navegador/portapapeles/enlaces reales y reglas HTTP; revisión de fotografías/SVG aprobados antes de incorporar; políticas comerciales/textos de privacidad finales; evaluación de entorno de publicación cuando exista autorización. Los tests no enviaron mensajes ni verificaron recepción. Ningún hallazgo crítico de seguridad fue identificado dentro de estas comprobaciones, sin afirmar cobertura absoluta.
