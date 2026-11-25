import { ProductRail } from '@/components/ui/ProductRail'
import { Navigate, useParams } from 'react-router'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import {
  resolveProduct,
  getCategory,
  getCategoryPath,
  getProductPath,
  getRelatedProducts,
  getProductMedia,
} from '@/data/catalog/catalog'
import { CatalogMissing } from './components/CatalogShared'
import { ProductGallery } from './components/ProductGallery'
import { ProductInformation } from './components/ProductInformation'
export function ProductDetailPage() {
  const { productSlug = '' } = useParams()
  // Este enlace anterior describía el kit genérico, así que permite elegir formato.
  if (productSlug === 'p-001-kits-antiresaca')
    return <Navigate to={getCategoryPath('kits-para-eventos')} replace />
  const product = resolveProduct(productSlug)
  if (!product) return <CatalogMissing kind="Producto" />
  const canonical = getProductPath(product)
  if (productSlug !== canonical.split('/').at(-1))
    return <Navigate to={canonical} replace />
  const category = getCategory(product.categoryId)
  const related = getRelatedProducts(product)
  return (
    <div className="container-lcdd catalog-page">
      <Breadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: 'Catálogo', to: '/catalogo' },
          ...(category
            ? [{ label: category.name, to: getCategoryPath(category.id) }]
            : []),
          { label: product.name },
        ]}
      />
      <div className="catalog-detail">
        <ProductGallery
          key={product.id}
          name={product.name}
          images={getProductMedia(product)}
        />
        <div className="catalog-product-copy">
          <p className="eyebrow">{category?.name}</p>
          <h1>{product.name}</h1>
          <ProductInformation product={product} />
        </div>
      </div>
      {related.length > 0 && (
        <section className="catalog-related">
          <h2>Productos relacionados</h2>
          <ProductRail
            key={product.id}
            products={related}
            label="Productos relacionados"
          />
        </section>
      )}
    </div>
  )
}
