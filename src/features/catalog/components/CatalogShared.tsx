import { Link } from 'react-router'
import { catalog, getCategoryPath } from '@/data/catalog/catalog'
export function CategoryNavigation() {
  return (
    <nav className="catalog-category-nav" aria-label="Categorías del catálogo">
      {catalog.categories.map((category) => (
        <Link key={category.id} to={getCategoryPath(category.id)}>
          {category.name}
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
      <Link className="button button--primary" to="/catalogo">
        Volver al catálogo
      </Link>
    </div>
  )
}
