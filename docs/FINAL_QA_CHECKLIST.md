# Checklist final de QA — Fase 06

Estados: AUTO = ejecutado satisfactoriamente en pruebas/check; EXTERNO = evidencia comunicada por propietario/Dirección Técnica; MANUAL = pendiente en Chrome Windows. Ningún MANUAL debe interpretarse como aprobado por jsdom.

## Validación técnica y funcional

| Área                                                        | Estado / evidencia                                                              |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| TypeScript estricto, build, lint, Prettier, npm run check   | AUTO, código 0                                                                  |
| Suite completa                                              | AUTO, 220 pruebas / 16 archivos; 175 anteriores preservadas +45                 |
| npm ls --all / package-lock                                 | AUTO, consistentes; sin dependencias nuevas                                     |
| Auditoría de vulnerabilidades                               | EXTERNO, npm audit informado: 0 conocidas; intento del agente bloqueado por DNS |
| Fuente oficial / cinco categorías /14 fichas / relacionados | AUTO, integridad y navegación                                                   |
| Home / header / menú mobile / footer / enlaces internos     | AUTO; render real y tactilidad MANUAL                                           |
| Filtros/búsqueda / vacíos / rutas desconocidas              | AUTO; 404 HTTP MANUAL/no implementable por SPA sola                             |
| Altas/edición/quitar/duplicados/vaciado                     | AUTO                                                                            |
| Físicos/digitales/pendientes                                | AUTO; no se resuelven modalidades empresariales                                 |
| Persistencia/corrupción/versión/revisión/quota/permisos     | AUTO, casos aislados; cierre/reapertura real MANUAL                             |
| Evento/selector aprobado/resumen/revisión/copia/WhatsApp    | AUTO; recorrido general Fase 05 EXTERNO; cambios Fase 06 MANUAL                 |
| No precios/pagos/checkout/envío simulado                    | AUTO y revisión de código                                                       |
| Datos personales solo en memoria                            | AUTO en escenarios de prueba y revisión                                         |
| Originales y licencias preservados                          | AUTO, hashes/revisión                                                           |
| Metadata/noindex/robots/demo excluida/grafo de chunks       | AUTO; crawlers/social/HTTP no probados                                          |
| /inspiracion, /nosotros, /profesionales                     | Placeholders explícitos, pendientes de alcance autorizado                       |

## Matriz de navegador pendiente

| Pantalla / control                | 320    | 360    | 390    | 768    | 1024   | 1280   | 1440   | 1920   |
| --------------------------------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| Header, contador y menú           | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL |
| Home / secciones / carrusel       | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL |
| Catálogo / filtros / categorías   | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL |
| Fichas / relacionados / consultas | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL |
| Pedido / cantidades / resumen     | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL |
| Cotización / selector / revisión  | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL |
| Footer / textos largos / zoom     | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL | MANUAL |

No se repitieron Chromium/Playwright ni apertura de sockets por los antecedentes libnspr4.so/listen EPERM. La revisión satisfactoria del propietario del recorrido anterior no aporta anchos medidos ni screenshots nuevos de Fase 06.

## Procedimiento externo

1. Desde WSL: npm run check. Para desarrollo, npm run dev; para producción local, npm run build y npm run preview. Abrir en Chrome Windows la URL informada (loopback). Detener con Ctrl+C al terminar. No usar host público ni desplegar.
2. Recorrer /, /catalogo, cinco categorías, 14 fichas, P-003 por ID y direcciones desconocidas. Probar links, filtros múltiples, search con tildes, volver y vacíos. Revisar metadatos en DevTools/Elements y confirmar robots noindex; robots.txt debe bloquear todo. No atribuir HTTP 404 al título 404.
3. Agregar físico con cantidad explícita y servicio sin unidades. Repetir, editar, quitar y vaciar con cancelar/confirmar. P-008/011/012 solo consulta contextualizada. Mantener mismo navegador/origen al recargar/cerrar/reabrir. Si se prueba corrupción de storage, usar perfil de pruebas; no modificar handoffs reales.
4. Completar evento, elegir cada opción y volver a placeholder vacío. Navegar a pedido y regresar sin perder selección/campos; recargar conserva solo selección. Revisar fecha es-AR/DD/MM/AAAA y por definir. Cambiar evento tras revisar debe invalidar el texto anterior.
5. Comprobar foco/scroll de revisión, volver a editar, reduced-motion, copia dos veces y fallback sin permisos. Comparar texto/IDs/acentos/saltos de link WhatsApp; abrir solo si se desea probar esa acción y volver con selección intacta. La apertura no certifica envío ni recepción.
6. Tab/Shift+Tab/Enter/Espacio/Escape/flechas/Home/End/letras en menú/selector/carruseles. NVDA+Chrome, zoom 200/400%, forced-colors y foco no oculto. Confirmar áreas táctiles y que scrollWidth del documento no supera innerWidth en cada ancho.
7. Verificar que /docs/handoff/... y carpetas sensibles no devuelven originales por Vite; esto aún no fue comprobado por HTTP. Registrar método, resultado y URL sin publicar datos privados.
8. Medir Performance/Lighthouse local de producción solo si se dispone, anotando versión, perfil, red, caché y varias ejecuciones. Guardar resultados reales de LCP/INP/CLS; no extrapolar los bytes del build a esos indicadores.

Registrar aprobador, fecha, ancho/zoom, ruta, resultado y captura de cada caso. Sin datos reales de clientes en pruebas. Ver RELEASE_READINESS antes de autorizar Fase 07.
