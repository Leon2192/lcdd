import { Link } from 'react-router'
export function Breadcrumbs({
  items,
}: {
  items: readonly { label: string; to?: string }[]
}) {
  return (
    <nav aria-label="Ruta de navegación" className="catalog-breadcrumbs">
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
