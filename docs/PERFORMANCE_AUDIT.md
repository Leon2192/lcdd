# Rendimiento — Fase 06

## Método reproducible

Se ejecutó build al inicio y después de corregir. Los bytes proceden de los archivos locales dist/assets; gzip estimado se calculó en ambos casos con node:zlib.gzipSync (mismo método, no una medición HTTP). JS inicial es la entrada más los modulepreload presentes en index.html; el manifiesto y el test de chunks verifican referencias estáticas. Se conservaron las cargas por ruta de pedido/cotización y se separó React/ReactDOM/scheduler con codeSplitting de Rolldown, según las declaraciones instaladas de Vite/Rolldown. No se elevó chunkSizeWarningLimit.

| Artefacto                       | Antes (bytes) | Después (bytes) |
| ------------------------------- | ------------: | --------------: |
| Mayor chunk JS                  |       502 143 |         287 984 |
| JS inicial (entrada + preloads) |       502 143 |         507 330 |
| JS inicial gzip estimado        |       153 562 |         155 942 |
| Todo el JS emitido              |       515 221 |         520 637 |
| Todo el JS gzip estimado        |       158 842 |         161 342 |
| CSS emitido                     |        39 676 |          39 903 |
| CSS gzip estimado               |         8 403 |           8 453 |
| Cuatro WOFF2                    |       153 544 |         153 544 |

El mayor chunk se redujo de 502 143 a 287 984 bytes (~42.6%). React-vendor ocupa 218 747 bytes. **No se redujo el JS inicial agregado:** aumentó de 502 143 a 507 330 bytes al incluir las correcciones técnicas, metadata y la separación. La mejora demostrada es granularidad de caché y desaparición del aviso por chunk, no un tiempo de carga menor. Una mejor reutilización de caché en futuras versiones es una expectativa, no una métrica observada.

## Recursos y renderizado

Cuatro WOFF2 Latin locales: Cormorant Garamond normal 37 640/italic 39 260, DM Sans normal 36 932/italic 39 712 bytes. font-display:swap, pesos variables y licencias preservados. No se agregaron preloads de fuentes sin evidencia que justifique forzar descargas.

Las tarjetas y miniaturas usan loading lazy/decoding async; Hero registrado mantiene eager/fetchpriority high. Anchos/altos y cajas con proporciones preparan estabilidad visual, pero hoy se mantienen placeholders. No se mide optimización de fotografías inexistentes ni se atribuyen ahorros ficticios.

Carrusel y selector evitan publicar objetos de estado nuevos si extremos/geometría no cambian. Los selectores del contador leen una primitiva y no obligan a RootLayout a actualizarse por una cantidad que no cambia el número de líneas. No se ejecutó React Profiler: no hay cifras de renders/tiempo ahorrado. No se detectaron recursos gráficos duplicados añadidos ni fuentes remotas.

## No medido

No se ejecutó Lighthouse, Chrome Performance, throttling ni captura de red en esta fase. LCP/INP/CLS/TTFB/FCP y p75 reales: **pendientes**. Los objetivos de Marketing (LCP≤2.5s, INP≤200ms, CLS≤0.1) son referencias propuestas, no resultados de LCDD.

En Chrome Windows medir desde npm run preview con perfil/dispositivo/red identificados, mismo recorrido y al menos varias ejecuciones; registrar mediana y variación, recursos usados y versión. Separar dev de producción y caché fría/caliente. No instalar analítica ni enviar datos a servicios remotos. Volver a medir con fotografías definitivas. Instrucciones en FINAL_QA_CHECKLIST.
