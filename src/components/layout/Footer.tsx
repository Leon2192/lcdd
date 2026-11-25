import { Link } from 'react-router'
import { Brand } from '@/components/brand/Brand'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { categories } from '@/config/categories'
import { navigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'
export function Footer({ onContact }: { onContact: () => void }) {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="stack">
            <Brand />
            <Link to="/arma-tu-pedido" className="button button--secondary">
              <Icon name="cart" />
              Armá tu pedido
            </Link>
          </div>
          <nav aria-label="Categorías del catálogo">
            <h2>Productos</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/catalogo/categoria/${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Navegación del pie">
            <h2>Explorá</h2>
            <ul>
              {navigation
                .filter((item) => item.path !== '/arma-tu-pedido')
                .map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div>
            <h2>Conocenos</h2>
            <ul>
              <li>
                <button
                  className="footer-contact"
                  type="button"
                  onClick={onContact}
                >
                  <Icon name="whatsapp" />
                  WhatsApp: {siteConfig.contact.whatsapp.displayNumber}
                </button>
              </li>
              <li>
                <a href={siteConfig.contact.instagram.url}>
                  <Icon name="instagram" />
                  {siteConfig.contact.instagram.handle}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer-meta">
          {siteConfig.name} · {siteConfig.domain}
        </p>
      </Container>
    </footer>
  )
}
