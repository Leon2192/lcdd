import { Button } from '@/components/ui/Button'
import { useId, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Brand } from '@/components/brand/Brand'
import { Container } from '@/components/ui/Container'
import { Drawer } from '@/components/ui/Drawer'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { navigation } from '@/config/navigation'
import { categories } from '@/config/categories'
import { siteConfig } from '@/config/site'

export function Header({
  onContact,
  orderCount = 0,
}: {
  onContact: () => void
  orderCount?: number
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  return (
    <header className="site-header">
      <Container className="header-inner">
        <IconButton
          className="header-mobile"
          label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen(true)}
        >
          <Icon name="menu" />
        </IconButton>
        <Brand className="header-brand" />
        <nav
          className="site-nav header-desktop"
          aria-label="Navegación principal"
        >
          <ul>
            {navigation
              .filter((item) => item.path !== '/arma-tu-pedido')
              .map((item) => (
                <li key={item.path} className="cluster">
                  <NavLink to={item.path} end>
                    {item.label}
                  </NavLink>
                  {item.path === '/catalogo' && (
                    <details className="catalog-menu">
                      <summary aria-label="Ver categorías">⌄</summary>
                      <ul className="catalog-panel">
                        <li>
                          <Link
                            to="/catalogo"
                            onClick={(event) =>
                              event.currentTarget
                                .closest('details')
                                ?.removeAttribute('open')
                            }
                          >
                            Ver catálogo completo
                          </Link>
                        </li>
                        {categories.map((category) => (
                          <li key={category.id}>
                            <Link
                              to={`/catalogo/categoria/${category.id}`}
                              onClick={(event) =>
                                event.currentTarget
                                  .closest('details')
                                  ?.removeAttribute('open')
                              }
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </li>
              ))}
          </ul>
        </nav>
        <div className="header-actions">
          <a
            className="icon-button button button--ghost header-desktop"
            href={siteConfig.contact.instagram.url}
            aria-label="Instagram de LCDD"
          >
            <Icon name="instagram" />
          </a>
          <IconButton
            className="header-desktop"
            label="Consultar WhatsApp"
            onClick={onContact}
          >
            <Icon name="whatsapp" />
          </IconButton>
          <Link
            to="/arma-tu-pedido"
            className="button button--primary header-order-link"
            aria-label={`Armá tu pedido, ${orderCount} productos seleccionados`}
          >
            <Icon name="cart" />
            <span className="header-order-text">Armá tu pedido</span>
            <span className="header-order-count" aria-hidden="true">
              {orderCount}
            </span>
          </Link>
        </div>
      </Container>
      <Drawer
        id={menuId}
        open={menuOpen}
        onOpenChange={setMenuOpen}
        title="Menú"
      >
        <nav className="mobile-nav" aria-label="Navegación mobile">
          <ul>
            {navigation.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end onClick={() => setMenuOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <details className="category-navigation">
            <summary>Categorías</summary>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/catalogo/categoria/${category.id}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </nav>
        <Button
          variant="outline"
          onClick={() => {
            setMenuOpen(false)
            onContact()
          }}
        >
          <Icon name="whatsapp" />
          Consultar WhatsApp
        </Button>
        <a
          href={siteConfig.contact.instagram.url}
          className="button button--outline"
        >
          <Icon name="instagram" />
          Instagram
        </a>
      </Drawer>
    </header>
  )
}
