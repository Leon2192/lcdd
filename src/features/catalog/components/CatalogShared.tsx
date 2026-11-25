import { Link } from 'react-router'
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
