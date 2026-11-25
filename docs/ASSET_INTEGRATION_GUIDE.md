# Integración de recursos gráficos — Fase 06

## Estado real y puntos preparados

No hay fotografías definitivas, logo limpio ni favicon aprobado. Se mantienen placeholders y denominación institucional. Ninguna recomendación de este documento acredita existencia o aprobación comercial de una imagen.

src/config/media.ts contiene visualAssets.logo, visualAssets.home y visualAssets.categories, vacíos. LocalImage reutiliza CatalogImage y exige src local /media/..., alt, width y height. Los componentes existentes leen esos registros: no hace falta reconstruir HomeMedia, Brand o CategoryCard para sustituir sus placeholders. Destacados Home consultan ahora el mismo getProductMedia de catálogo/pedido.

Home slots: hero, inspiration-1, inspiration-2, inspiration-3, about y conversion. Categorías: los cinco IDs oficiales; el registro alimenta sus tarjetas existentes. /inspiracion continúa provisional: no se construye su página por incorporar imágenes de la Home.

Productos: registro unificado `visualAssets.products` en src/config/media.ts, por ID oficial y array de galería. Solo incorporar fotografías aprobadas para uso; su aprobación gráfica no altera los estados comerciales originales ni publicationReady. Ver REPLACE_RESOURCES.md y pending-assets/EXPECTED_FILES.csv.

## Estructura propuesta (solo crear al recibir archivos)

```text
public/media/
  brand/logo-principal-v01.png
  brand/favicon-32-v01.png
  home/hero-v01.webp
  home/inspiration-1-v01.webp
  home/about-v01.webp
  home/conversion-v01.webp
  categories/kits-para-eventos-v01.webp
  products/P-003/P-003_principal_01_v01.webp
  products/P-003/P-003_contexto_01_v01.webp
  products/P-003/P-003_detalle_01_v01.webp
```

Repetir solo para IDs/recursos realmente entregados. ASCII, guiones o convención P-003 indicada por Productos, versión explícita, sin espacios ni datos de clientes. Mantener originales maestros fuera de public; public solo contiene derivados aprobados. No copiar handoffs completos ni datos privados a public.

## Recomendaciones técnicas, no características de productos

| Uso                | Orientación recomendada                                   | Tratamiento                                                                                         |
| ------------------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Logo               | Archivo limpio con dimensiones reales/proporción original | PNG transparente o vector original legítimo aprobado; sin filtros, rediseño o conversión arbitraria |
| Hero/Home          | Derivado ~1600 px de ancho, evaluar recorte mobile        | Mantener composición aprobada; slots/cajas no fuerzan estirar la fotografía                         |
| Categorías         | ~800×600, referencia 4:3                                  | WebP/JPEG aprobado, alt descriptivo                                                                 |
| Producto principal | ~1200×1500, referencia 4:5                                | Imagen fiel y completa; Gallery usa contención                                                      |
| Detalle/contexto   | Referencias 1:1 /16:9 según handoff                       | Conservar contenido real; revisar cada recorte                                                      |
| Inspiración        | ~1200 px según caja editorial                             | Solo composición/fotografía autorizada, sin simular cliente/testimonio                              |
| Favicon            | Derivados 32/48 px y opcional touch 180 px                | Solo desde identidad aprobada; añadir link en index.html al recibirlo                               |

Dimensiones y pesos son recomendaciones de exportación: registrar dimensiones reales en código. Objetivos orientativos: tarjetas ~100–180 kB; principales/Hero ~200–350 kB si preservan calidad, no promesas de rendimiento. WebP con revisión visual; AVIF opcional tras validar compatibilidad; PNG para transparencia. Quitar EXIF sensible y referencias externas, revisar SVG legítimos y preservar perfiles/colores. No añadir un generador de imágenes ni usar fotos de terceros como LCDD.

## Procedimiento

1. Recibir archivos, permiso/procedencia y aprobación por uso/ID. Inventariar nombre, tamaño, dimensiones, formato, hash y responsable. No usar capturas de mockups ni el logo con iconos ajenos.
2. Optimizar una copia, conservar el original y validar recortes desktop/mobile. Copiar a public/media con nombre versionado; registrar alt objetivo y dimensiones reales.
3. Completar visualAssets. Mantener vacíos los recursos sin aprobar. Para favicon, incorporar el link local en index.html; para og:image/canonical esperar autorización de publicación y URL adecuada.
4. Ejecutar npm run check, verificar carga real de cada URL local en Chrome, formatos/alt/proporciones y ausencia de 404. Los strings de rutas public no garantizan por sí mismos existencia: esta comprobación es necesaria al recibir archivos.
5. Revisar ocho anchos, retina/zoom, LCP/CLS y captura final. Hero es eager/high; imágenes no prioritarias y miniaturas lazy/async, sin servicios externos. Registrar resultados en inventario y checklist.

No se crearon carpetas vacías innecesarias ni recursos ficticios. La incorporación futura puede hacerse editando registros/datos/HTML del favicon, conservando componentes y el flujo comercial.
