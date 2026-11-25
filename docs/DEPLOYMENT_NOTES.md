# Configuración para despliegue futuro — no ejecutado

- Construir con Node 24/npm 11: `npm ci`, `npm run build`. Publicar únicamente el contenido de `dist/`; no publicar raíz, src, pending-assets, docs/handoff, pruebas ni node_modules.
- Alojamiento estático con HTTPS y fallback SPA a index.html para rutas de React Router. Los archivos estáticos inexistentes deben responder 404, sin devolver HTML como imagen o JavaScript.
- Configuración actual preparada para raíz `/`: assets `/assets/`, imágenes `/media/`. Para subcarpeta haría falta coordinar base de Vite, basename del router y rutas absolutas de recursos; no cambiar solo una opción.
- No se requieren backend, API, base de datos ni credenciales. No incluir secretos en variables VITE_*; el código cliente es público. Estado del pedido limitado al navegador; datos personales solo en memoria.
- Configurar cabeceras de seguridad y caché en el futuro servidor: assets con hash pueden usar caché larga; index.html, imágenes sin hash y favicon requieren política de actualización adecuada. Validar la configuración real antes de publicar.
- Mantener noindex/nofollow/noarchive y robots Disallow hasta autorización expresa. Luego revisar metadatos/URLs sociales, estrategia SPA y 404; el dominio no se modificó.
- Conservar avisos visibles de ilustración IA; no equivalen a características comerciales confirmadas. Mantener placeholders y aprobar recursos definitivos, logo, textos y reglas comerciales pendientes antes de presentarlos como definitivos.
- Revisar desde el entorno futuro enlaces WhatsApp, navegación directa, imágenes, fuentes locales y responsive. Sin despliegue ni autorización de publicación en este cierre.
