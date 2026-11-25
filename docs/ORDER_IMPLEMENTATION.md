# Implementación del pedido — Fase 05

## Arquitectura

`src/features/order/rules.ts` centraliza modalidades y bloqueos comerciales; `persistence.ts` valida con Zod y recupera datos; `store.ts` crea el store Zustand; `use-order.ts` ofrece selectores React; `selectors.ts` consulta Productos y deriva sugerencias. No se duplican nombres/descripciones/precios en el estado. La fuente sigue en src/data/catalog, sin dependencias hacia features.

Componentes: OrderSelection, OrderPage, OrderSummary y OrderSteps. Se reutilizan Input, Button, QuantitySelector, Modal, MediaPlaceholder, Breadcrumbs e Icon. ProductGrid se extrajo de CatalogShared a UI compartida porque ahora lo consumen catálogo y pedido, evitando dependencias de pedido hacia internos de catálogo. RootLayout compone el contador y entrega orderCount a Header: Header permanece ajeno al store.

## Selección y edición

Desde cada ficha elegible se ingresa una cantidad sin valor automático, o se selecciona un servicio sin unidades. Un mensaje accesible confirma solo una adición efectiva. Repetir un ID conserva la línea y avisa: ni suma ni reemplaza. Cambiar cantidad requiere edición explícita del pedido. No existen variantes reales confirmadas que justifiquen múltiples configuraciones del mismo ID.

P-008 (Capitán de mesa) y P-012 (Números de mesa) aceptan una cantidad sin especificar la unidad comercial. P-011 (Carpa QR) usa la etiqueta «Cantidad de tarjetas». La consulta directa sigue disponible en las tres fichas y la inclusión del servicio digital de Carpa QR se conserva como decisión pendiente.

Ruta `/arma-tu-pedido`: título editorial, dos etapas, lista con placeholders, edición/eliminación, resumen sin dinero, continuar explorando y solicitar cotización. No hay suma global de unidades heterogéneas. El vaciado solicita confirmación. Las sugerencias se derivan de relacionados oficiales, excluyen IDs seleccionados y repetidos, y no bloquean continuar. El parámetro legado `?producto=P-003` muestra enlace a ficha; nunca agrega automáticamente.

Accesos desde header desktop/mobile (lista y contador de productos diferentes), menú, footer, catálogo, categorías, fichas y CTA Home. Mobile conserva marca centrada: el acceso directo visible es pedido; WhatsApp continúa disponible en menú/contactos. Home no cambia su composición.

## Persistencia

Clave `lcdd:order`, versión 1:

```json
{
  "version": 1,
  "catalogRevision": "SHA-256 del JSON oficial",
  "lines": [{ "productId": "P-003", "kind": "quantity", "quantity": 25 }]
}
```

Servicios usan kind:service y quantity:null. Solo se guardan identificadores, modalidad técnica, cantidades y metadatos de versión/revisión. No se persisten nombre del cliente, evento, fecha, localidad, comentarios, mensaje generado ni datos personales de personalización.

Cada cambio de líneas se escribe de forma síncrona con manejo de errores. Navegar conserva el store y recargar/reabrir recupera la selección mientras el mismo navegador/origen mantenga LocalStorage. No implica sincronización entre dispositivos o perfiles ni simultánea entre pestañas.

La recuperación comprueba versión, revisión del catálogo, esquema, ID vigente, modalidad, cantidad y duplicados. Descarta líneas inválidas con aviso y limpia su almacenamiento. JSON dañado y versiones futuras se descartan. Si cambia el SHA del catálogo se requiere reseleccionar: política conservadora que invalida todas las líneas, incluso ante un cambio editorial; evita reinterpretar cantidades o modalidades sin revisión. Se documenta como deuda de granularidad, no migración comercial silenciosa.

Almacenamiento denegado o cuota agotada: la aplicación conserva selección en memoria y advierte que no podrá recuperarla. Vaciar elimina la clave; si falla el borrado se informa y no se afirma eliminación persistente. Las pruebas usan almacenamiento aislado y casos simulados, no alteran documentos reales.

## Límites y comprobación

No hay carrito monetario, precios, checkout, backend ni solicitudes remotas. Cantidades desconocidas no se rellenan con 1. El límite Number.MAX_SAFE_INTEGER es técnico; los mínimos comerciales siguen null. Responsive en una columna a 320/360, filas adaptables desde 390 y panel lateral desde 1024; las geometrías reales requieren revisión externa.

Pruebas: altas, errores numéricos, edición, eliminación, duplicados, físicos/servicios/pendientes, vacío, persistencia entre instancias, corrupción, versiones, revisión de catálogo, IDs eliminados, modo modificado, cuota/permisos y navegación. Ver PHASE_05_REPORT para resultados finales.

Las interfaces públicas order/index.ts y quotation/index.ts evitan que catálogo o composición importen detalles internos de otras funcionalidades. src/features/README.md refleja los cuatro dominios implementados.

## Optimización 05.1

Las sugerencias del pedido y relacionados de ficha usan ProductRail con Carousel, conservando todos los productos, su orden y acceso a ficha. Se reduce altura mobile sin alterar controles de cantidad/edición/eliminación, persistencia, vacío ni duplicados. El número internacional está autorizado por verificación manual del propietario: abrir WhatsApp desde revisión o consulta no vacía selección. No se confirma envío. Pruebas nuevas y matriz en PHASE_05_1_REPORT / PHASE_05_VISUAL_VALIDATION.
