# Auditoría técnica — Fase 06

Fecha: 24/11/2026. Alcance local autorizado tras aprobación de Fase 05. No se incorporan funciones comerciales ni se inicia Fase 07.

## Método y evidencia

Inventario de código, configuraciones, recursos y documentación; revisión de los módulos de navegación, UI, catálogo, pedido, cotización y sus pruebas. Se contrastaron los informes de fases anteriores y los handoffs de Marketing/Productos/Comercial, respetando su jerarquía y estados. El inventario temporal incluyó 210 archivos antes de cerrar esta documentación; no equivale a una prueba visual o de seguridad exhaustiva.

Marketing conserva 46/46 entradas con bytes/SHA-256 del manifiesto. Productos conserva JSON oficial (SHA-256 5207b6431d612f46412d96396b8ea88368ab0a3b2fd4144b8ebf90f746ee6a6f) y DOCX idéntico a su copia Marketing. Los nueve hashes locales de Comercial coinciden con el registro previo; su manifiesto no aporta hashes del emisor. No se modifica ningún original.

## Hallazgos técnicos

| ID   | Gravedad | Hallazgo                                                                                                    | Estado / tratamiento                                                                                 |
| ---- | -------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Q-01 | Alta     | La limpieza de almacenamiento podía descartar líneas válidas recuperadas si fallaba setItem                 | Corregido: se conserva la selección en memoria y se informa el fallo de limpieza                     |
| Q-02 | Alta     | Sin errorElement propio: un fallo de ruta podía sustituir el recorrido por el error técnico por defecto     | Corregido: recuperación genérica, metadatos noindex y foco; no se muestran detalles internos         |
| Q-03 | Media    | Falta de exclusión explícita de indexación en HTML y robots                                                 | Corregido: noindex/nofollow/noarchive y Disallow:/, sin habilitar publicación                        |
| Q-04 | Media    | Título y descripción estáticos para todas las rutas; sin metadatos sociales por página                      | Corregido: metadata por ruta/ID oficial y tratamiento de desconocidos/placeholder                    |
| Q-05 | Media    | Chunk inicial de 502 kB y aviso Vite                                                                        | Corregido el tamaño por chunk separando React; el total inicial NO disminuyó. Ver métricas           |
| Q-06 | Media    | encodeURIComponent arrojaba URIError con UTF-16 malformado admitido como texto                              | Corregido: sustitución de sustitutos aislados, sin alterar emoji ni Unicode válido                   |
| Q-07 | Media    | El sobre persistido aceptaba propiedades adicionales ajenas al contrato                                     | Corregido: esquema estricto, descarte y aviso; no se agregan datos personales                        |
| Q-08 | Media    | Sin gestión de foco/título al cambiar de página                                                             | Corregido: foco en H1 tras navegación, sin interferir con un control ya en uso ni con filtros/search |
| Q-09 | Baja     | Pista del carrusel enfocada sin nombre propio; saltos H1→H3 en algunos vacíos                               | Corregido: grupo nombrado y posición asociada; H2 en vacíos de página/H3 en categoría                |
| Q-10 | Baja     | Copias sucesivas podían no modificar el anuncio accesible                                                   | Corregido: contador accesible en región persistente, sin simular envío                               |
| Q-11 | Media    | Recursos Home/categorías/logo sin registro operativo único; destacados no conectados a imágenes de producto | Corregido: registro local vacío tipado y conexiones, sin cargar imágenes ficticias                   |
| Q-12 | Baja     | Helpers obsoletos de Fase 04 y documentación de fase activa desactualizada                                  | Corregido: eliminados getOrderPath/carpaQrPending sin consumidores; documentación vigente            |
| Q-13 | Baja     | Nuevos objetos de estado aun con mismos extremos/posición en scroll                                         | Corregido: igualdad previa en carrusel/selector; no se afirma ahorro medido de milisegundos          |
| Q-14 | Media    | El servidor de desarrollo no explicitaba loopback ni exclusión HTTP de handoffs/carpetas sensibles          | Configurado: host 127.0.0.1 y fs.deny. Prueba HTTP manual pendiente por entorno                      |

No se identificaron hallazgos críticos en las comprobaciones realizadas. Esto no demuestra ausencia de problemas no observables sin navegador/lector de pantalla ni sustituye validación comercial.

## Arquitectura y datos

Se conserva Feature-Based: app/routes/layouts componen; features implementan dominios; componentes/config/data compartidos no importan funcionalidades (las pruebas sí pueden hacerlo). TypeScript estricto, imports de tipo y alias se mantienen. No se añadieron dependencias ni supresiones. Las 29 dependencias directas tienen uso en aplicación o herramientas; npm ls --all y manifiesto/lock se verificaron. No se realizaron refactorizaciones masivas.

Catálogo generado exclusivamente desde Productos, con 14 IDs y cinco categorías; catalog:check impide desincronización. Null, publicationReady:false, colecciones y estados permanecen intactos. Regla de invalidar todo pedido ante cambio de hash se conserva como decisión conservadora documentada, no migración silenciosa. Nueve físicos y dos servicios permiten selección estructurada; P-008/P-011/P-012 siguen con consulta contextualizada. No se inventan cantidades, variantes ni condiciones.

El estado Zustand persiste solo versión/revisión/IDs/modalidad/cantidades. RHF mantiene evento en memoria; selector aprobado de cuatro opciones, opcional y vacío inicial. Copiar/abrir WhatsApp no borra selección ni confirma envío. El icono de carrito aprobado permanece, sin añadir precios/pagos/checkout.

## Auditoría funcional

Las pruebas cubren Home, nav/menu, cinco categorías y 14 fichas, filtros/búsqueda, relacionados, altas/duplicados/edición/eliminación/vacío, persistencia/corrupción, evento/selector/revisión/copia/WhatsApp/contexto, rutas antiguas y desconocidas. Se verifican enlaces locales de las páginas renderizadas contra rutas conocidas. No se hallaron acciones simuladas presentadas como exitosas en esos recorridos.

**Secciones sin implementación definitiva:** /inspiracion, /nosotros y /profesionales muestran explícitamente “Estamos preparando esta sección”. Siguen enlazadas y recuperables, pero no representan contenido institucional/comercial final ni se amplían en esta fase. La demo /__dev/design-system es solo desarrollo y está ausente del build productivo.

## Incidencias durante la corrección

La primera gestión de foco por RAF podía interrumpir escritura rápida; una prueba previa de conservación de nombre lo detectó. Se añadió la guarda de control ya enfocado y una regresión específica. El deny HTTP de docs impidió transformar fixtures JSON en Vitest: el runner Node excluye únicamente ese patrón de su configuración, manteniendo las demás exclusiones; Vite de desarrollo conserva el bloqueo. El test de artefactos heredaba NODE_ENV=test y sobrescribía build: ahora preserva las opciones reales y define producción de forma local, sin mutar el entorno global. Se corrigió además el tipo never del componente de fallo intencional del test. Ninguno queda como fallo final.

## Deuda y bloqueos que permanecen

Validación responsive real, lector de pantalla, métricas de navegador y cabeceras HTTP no comprobadas. Las páginas institucionales pendientes y las aprobaciones comerciales/gráficas no son defectos que deba resolver arbitrariamente Tecnología. Ver FINAL_QA_CHECKLIST y RELEASE_READINESS. No hay ZIP ni publicación autorizados.
