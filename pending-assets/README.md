# Recursos gráficos mínimos — incorporación inmediata

Lista vigente: **25 piezas**, en EXPECTED_FILES.csv: 1 Home, 5 categorías, 14 principales de productos, 3 inspiración, logo y favicon. Actualización de cierre: **19 ilustraciones IA incorporadas**; faltan las imágenes de una categoría y tres productos, además del logo limpio. El favicon provisional sigue disponible. Las dimensiones son recomendaciones, no condiciones comerciales; el logo conserva su proporción real.

Los 32 recursos existentes se revisaron visualmente: referencias, mockups y captura del logo; no hay fotografías independientes aprobadas. Su uso legítimo está resumido en EXISTING_VISUALS.csv. No recortar mockups, no presentar conceptos como fotos reales. Originales intactos. El logo capturado no se incorpora como marca definitiva.

1. Recibir los archivos con los nombres exactos de EXPECTED_FILES.csv. Depositar aquí solo recursos aprobados para uso comercial. No generar imágenes vacías.
2. Previsualizar la incorporación: `node scripts/incorporate-visual-assets.mjs`.
3. Incorporar los archivos disponibles: `node scripts/incorporate-visual-assets.mjs --apply`. Copia a public/media, registra dimensiones reales en src/config/media.ts y conserva los placeholders de archivos ausentes. No toca catálogo ni lógica comercial. No elimina imágenes ya registradas.

Reutilización automática: Hero para Nosotros/Profesionales y cierre de Home; inspiración 1/2/3 para las cinco portadas de colecciones; principal de cada producto para tarjetas, ficha, relacionados y pedido. Una sola foto por producto basta para este cierre; tomas de galería adicionales no son imprescindibles. No se requieren imágenes exclusivas para About, conversion o colecciones.

Los ejemplos digitales deben ser diseños reales aprobados, sin datos personales y con su condición de muestra visible. Si un recurso es conceptual, conservar un aviso visible y no incorporarlo como fotografía real. El script no puede verificar procedencia ni aprobación.

No se ejecutan pruebas generales por esta intervención. Después de incorporar las imágenes, revisar sus encuadres en la web local y actualizar el ZIP. La lista de 74 recursos de la documentación anterior queda sustituida por este mínimo; las tomas adicionales son opcionales.
