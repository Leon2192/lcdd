# Funcionalidades

La arquitectura agrupa código por dominio real: home, catalog, order y quotation están implementados hasta el alcance autorizado de Fase 05. No crear stores ni carpetas sin necesidad concreta.

- home: composición y contenido de presentación; identidades obtenidas desde data/catalog.
- catalog: exploración, categorías, fichas y galerías.
- order: reglas, estado Zustand, persistencia/recuperación, selección y resumen.
- quotation: formulario RHF/Zod, sesión en memoria, mensaje y copia/consulta.

Compartidos (components/config/data) no importan features. Order y quotation exponen interfaces pequeñas en index.ts para sus consumidores; las rutas cargan sus páginas de entrada explícitas. Dentro de cada funcionalidad se usan módulos concretos; las pruebas pueden acceder a factories/reglas internas para aislar estado y datos de prueba. ProductGrid pasó a UI por uso real en catálogo y pedido. No hay dependencias circulares de dominio ni un catálogo comercial alternativo.

El pedido persiste exclusivamente referencias y cantidades. El formulario conserva datos personales solo en memoria. Modalidades/condiciones pendientes, imágenes ausentes y número internacional siguen explícitos. Fase 06 autorizada para auditoría/preparación técnica; Fase 07 y ZIP no autorizados. Detalles en docs/ORDER_IMPLEMENTATION.md, QUOTATION_IMPLEMENTATION.md y COMMERCIAL_RULES.md.
