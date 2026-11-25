# LCDD · Interfaz comercial V1.1

- El encabezado reúne el acceso a «Armá tu pedido» y el contador de productos distintos. Cada alta válida muestra «Producto agregado al carrito» durante cinco segundos, con cierre manual y enlace al pedido.
- El acceso flotante a WhatsApp usa el contacto centralizado y el mensaje de consulta solicitado. El CSS reserva espacio de desplazamiento y coloca el toast encima del botón.
- Las fichas muestran una marca discreta «Imagen ilustrativa» sobre los recursos identificados. Los espacios sin imagen mantienen las proporciones de su vista. El catálogo conserva sus 14 productos, cinco categorías, filtros y estados internos.
- Se retiraron las referencias a procesos internos, los conteos de categorías y los códigos de producto en los mensajes que revisa el cliente. El pedido conserva su persistencia y los formularios conservan sus validaciones.

## Validación

- `npm run catalog:check` y `npm run build` aprobados con Node 24.22.3 y npm 11.19.1. Producción compilada en `dist/`.
- 223 casos cubiertos entre la ejecución dirigida y las repeticiones selectivas. En la primera ejecución aprobaron 216. Se actualizaron seis expectativas sobre textos retirados y se repitió en aislamiento un caso de navegación al pedido que había agotado la espera. Los siete casos aprobaron.
- ESLint aplicado a TypeScript y TSX modificados. Prettier verificado en fuentes, README y configuración. La configuración compartida preserva el formato del generador y excluye los handoffs.
- CSS compilado verificado para orden de capas, reservación de espacio, áreas seguras y movimiento reducido. También se verificaron las directivas locales de indexación en el build.
- Queda pendiente la revisión visual responsive y de superposiciones con controles de página en Chrome Windows.

## Archivos para el próximo commit

### Creados

- `.prettierignore`
- `.prettierrc.json`
- `docs/UI_V1_1_REPORT.md`
- `src/components/layout/FloatingWhatsApp.tsx`
- `src/features/order/components/OrderToast.tsx`
- `src/features/order/components/OrderToast.test.tsx`

### Modificados

- `README.md`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Header.tsx`
- `src/components/ui/CategoryCard.tsx`
- `src/components/ui/Icon.tsx`
- `src/components/ui/IllustrativeNotice.test.tsx`
- `src/components/ui/IllustrativeNotice.tsx`
- `src/components/ui/MediaPlaceholder.tsx`
- `src/components/ui/ProductCard.tsx`
- `src/components/ui/components.test.tsx`
- `src/config/editorial.ts`
- `src/config/media.test.tsx`
- `src/config/site.ts`
- `src/features/catalog/CatalogPage.tsx`
- `src/features/catalog/CategoryPage.tsx`
- `src/features/catalog/ProductDetailPage.tsx`
- `src/features/catalog/catalog.css`
- `src/features/catalog/catalog.test.tsx`
- `src/features/catalog/components/CatalogShared.tsx`
- `src/features/catalog/components/ProductGallery.tsx`
- `src/features/catalog/components/ProductInformation.tsx`
- `src/features/editorial/EditorialPage.test.tsx`
- `src/features/editorial/EditorialPage.tsx`
- `src/features/editorial/editorial.css`
- `src/features/home/HomePage.test.tsx`
- `src/features/home/HomePage.tsx`
- `src/features/home/components/AboutAndProfessionals.tsx`
- `src/features/home/components/FeaturedProducts.tsx`
- `src/features/home/components/Hero.tsx`
- `src/features/home/components/HomeConversion.tsx`
- `src/features/home/components/HomeMedia.tsx`
- `src/features/home/components/Inspiration.tsx`
- `src/features/home/components/ValueProposition.tsx`
- `src/features/home/home-content.ts`
- `src/features/home/home.css`
- `src/features/order/OrderPage.tsx`
- `src/features/order/components/OrderSelection.tsx`
- `src/features/order/index.ts`
- `src/features/order/order-flow.test.tsx`
- `src/features/order/order.css`
- `src/features/order/order.test.ts`
- `src/features/order/persistence.ts`
- `src/features/order/rules.ts`
- `src/features/order/store.ts`
- `src/features/quotation/DirectConsultation.tsx`
- `src/features/quotation/QuotationPage.tsx`
- `src/features/quotation/message.test.ts`
- `src/features/quotation/message.ts`
- `src/features/quotation/optimizations.test.tsx`
- `src/layouts/RootLayout.tsx`
- `src/pages/RouteErrorPage.tsx`
- `src/routes/quality.test.tsx`
- `src/routes/routes.test.tsx`
- `src/styles/components.css`
