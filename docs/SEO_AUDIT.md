# SEO técnico — Fase 06

## Implementado para un entorno local

- HTML lang es-AR y fallback de título/description; noscript informa que la aplicación necesita JavaScript.
- Noindex, nofollow, noarchive en el HTML antes de ejecutar JS. public/robots.txt: User-agent:* / Disallow:/. La metadata por ruta conserva esa política; no hay un flag que habilite indexación.
- getPageMetadata centraliza títulos/descripciones de Home, catálogo, categorías, productos, pedido, cotización, placeholders, desconocidos y error. Usa identidades confirmadas, sin precios ni características propuestas como hechos. Normaliza barras finales.
- PageMetadata actualiza DOM sin innerHTML y evita duplicados de tags gestionados. Metadatos Open Graph title/description/type/site_name/locale es_AR y Twitter summary/title/description. No incluyen datos del formulario o de búsquedas.
- URLs legibles existentes con ID estable; enlaces por ID anterior redirigen localmente. Breadcrumbs y jerarquía semántica comprobados.
- Sin canonical, og:url, og:image ficticio, sitemap público ni datos estructurados Product/Offer con información no validada. Los recursos sociales y favicon finales siguen pendientes.

## Rutas y páginas pendientes

/inspiracion, /nosotros y /profesionales son placeholders identificados también en metadata; no se anuncian como secciones terminadas. Categoría/producto desconocidos muestran recuperación y título correspondiente, con noindex.

## Limitaciones SPA

Las páginas por ruta son renderizadas en cliente; el HTML inicial sigue siendo genérico. Los crawlers/social previews que no ejecutan JS pueden no leer los metadatos dinámicos. No se afirma indexabilidad, rich results ni tarjetas sociales completas. Un fallback SPA puede responder HTTP 200 ante ruta inválida (soft 404); solo se verifica 404 de interfaz, no un estado HTTP 404. No se incorpora backend/SSR/SSG ni se cambia hosting para resolverlo en esta fase.

## Estrategia futura de publicación (no ejecutada)

Requiere autorización independiente: cerrar contenido/recursos/condiciones; definir solución de prerender/SEO si procede; confirmar URLs canónicas y dominios existentes sin cambiarlos; preparar sitemap/robots y social image aprobados; validar HTTP 404 y cabeceras; retirar bloqueos de indexación solo tras aprobación de lanzamiento. Nunca deducir permiso de publicación del build o de aprobar esta fase.

Noindex/robots no son controles de acceso ni garantizan privacidad de una URL difundida. Ver SECURITY_AUDIT para medidas locales y pendientes de seguridad de una eventual publicación.
