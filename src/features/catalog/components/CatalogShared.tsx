import { Link } from 'react-router'
import {
  catalog,
  getCategoryPath,
  getCategoryProducts,
} from '@/data/catalog/catalog'
export function CatalogNotice() {
  return (
    <p className="catalog-notice" role="note">
      Catálogo preliminar para revisión. La información comercial y la
      publicación definitiva están pendientes de validación.
    </p>
  )
}
export function CategoryNavigation() {
  return (
    <nav className="catalog-category-nav" aria-label="Categorías del catálogo">
      {catalog.categories.map((category) => (
        <Link key={category.id} to={getCategoryPath(category.id)}>
          {category.name}
          <span>{getCategoryProducts(category.id).length}</span>
        </Link>
      ))}
      <Link to="/catalogo">Ver todo el catálogo</Link>
    </nav>
  )
}
export function CatalogMissing({ kind }: { kind: 'Producto' | 'Categoría' }) {
  return (
    <div className="container-lcdd catalog-page">
      <h1>
        {kind} no {kind === 'Producto' ? 'encontrado' : 'encontrada'}
      </h1>
      <p>La dirección no corresponde al catálogo oficial.</p>
      <Link className="button button--primary" to="/catalogo">
        Volver al catálogo
      </Link>
    </div>
  )
}
export function OrderPreviewLink() {
  return (
    <aside className="catalog-order-preview">
      <h2>Armá tu pedido</h2>
      <p>
        Elegí desde cada ficha, revisá tu selección y prepará tu consulta
        personalizada.
      </p>
      <Link className="button button--outline" to="/arma-tu-pedido">
        Ver mi pedido
      </Link>
    </aside>
  )
}
