import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Button } from '@/components/ui/Button'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import {
  getProduct,
  getProductPath,
  getProductMedia,
} from '@/data/catalog/catalog'
import { ProductRail } from '@/components/ui/ProductRail'
import { useOrder } from './use-order'
import { selectOrderProducts, selectSuggestions } from './selectors'
import { getLineLabel, orderQuantityRange } from './rules'
import { OrderSummary } from './components/OrderSummary'
import { OrderSteps } from './components/OrderSteps'
export function OrderPage() {
  const lines = useOrder((state) => state.lines)
  const notice = useOrder((state) => state.notice)
  const update = useOrder((state) => state.updateQuantity)
  const remove = useOrder((state) => state.remove)
  const clear = useOrder((state) => state.clear)
  const [clearOpen, setClearOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [params] = useSearchParams()
  const referenceId = params.get('producto')
  const reference = referenceId ? getProduct(referenceId) : undefined
  const products = selectOrderProducts(lines)
  const suggestions = selectSuggestions(lines)
  return (
    <div className="container-lcdd order-page">
      <Breadcrumbs
        items={[{ label: 'Inicio', to: '/' }, { label: 'Armá tu pedido' }]}
      />
      <header className="order-heading">
        <p className="eyebrow">Prepará tu evento</p>
        <h1>Armá tu pedido</h1>
        <p>
          Revisá tu selección y contanos qué necesitás para solicitar una
          cotización personalizada.
        </p>
      </header>
      <OrderSteps current="selection" />
      {notice && (
        <p className="order-notice" role="status">
          {notice}
        </p>
      )}
      {reference && (
        <p>
          <Link to={getProductPath(reference)}>
            Elegir {reference.name} desde su ficha
          </Link>
          .
        </p>
      )}
      {referenceId && !reference && <p>No encontramos ese producto.</p>}
      {!lines.length ? (
        <EmptyState
          title="Tu pedido está vacío"
          description="Explorá el catálogo y elegí los productos o servicios que querés consultar."
          action={
            <Link className="button button--primary" to="/catalogo">
              Explorar catálogo
            </Link>
          }
        />
      ) : (
        <>
          <div className="order-layout">
            <section aria-labelledby="order-selection-title">
              <h2 id="order-selection-title">Tu selección</h2>
              <p>{lines.length} productos seleccionados</p>
              <div className="order-items">
                {products.map(({ line, product }) => {
                  const image = getProductMedia(product)[0]
                  return (
                    <article className="order-item" key={product.id}>
                      <div className="order-item-media">
                        {image ? (
                          <>
                            <img
                              src={image.src}
                              loading="lazy"
                              decoding="async"
                              alt={image.alt}
                              width={image.width}
                              height={image.height}
                            />
                          </>
                        ) : (
                          <MediaPlaceholder />
                        )}
                      </div>
                      <div className="order-item-copy">
                        <h3>
                          <Link to={getProductPath(product)}>
                            {product.name}
                          </Link>
                        </h3>
                        {line.kind === 'quantity' && line.quantity !== null ? (
                          <QuantitySelector
                            label={`Cantidad para ${product.name}`}
                            value={line.quantity}
                            {...orderQuantityRange}
                            onChange={(value) => {
                              if (update(product.id, value))
                                setStatus(
                                  `Cantidad de ${product.name} actualizada.`,
                                )
                            }}
                          />
                        ) : null}
                        <p className="field-hint">
                          {getLineLabel(product.id, line.quantity)}
                        </p>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            remove(product.id)
                            setStatus(`${product.name} se quitó del pedido.`)
                          }}
                          aria-label={`Quitar ${product.name}`}
                        >
                          Quitar
                        </Button>
                      </div>
                    </article>
                  )
                })}
              </div>
              <div className="order-actions order-utility-actions">
                <Link to="/catalogo" className="button button--outline">
                  Ver más productos
                </Link>
                <Button variant="outline" onClick={() => setClearOpen(true)}>
                  Vaciar pedido
                </Button>
              </div>
            </section>
            <aside className="order-review">
              <OrderSummary lines={lines} />
              <Link className="button button--primary" to="/cotizacion">
                Solicitar cotización
              </Link>
              <p>La solicitud no implica una compra confirmada.</p>
            </aside>
          </div>
          {suggestions.length > 0 && (
            <section className="order-suggestions">
              <h2>También te puede interesar</h2>
              <ProductRail
                products={suggestions}
                label="Sugerencias para tu pedido"
              />
            </section>
          )}
        </>
      )}
      <p role="status">{status}</p>
      <Modal
        open={clearOpen}
        onOpenChange={setClearOpen}
        title="¿Vaciar tu pedido?"
      >
        <p>Se quitarán los productos seleccionados de este navegador.</p>
        <div className="order-actions">
          <Button
            onClick={() => {
              clear()
              setClearOpen(false)
              setStatus('El pedido se vació.')
            }}
          >
            Sí, vaciar pedido
          </Button>
          <Button variant="outline" onClick={() => setClearOpen(false)}>
            Conservar pedido
          </Button>
        </div>
      </Modal>
    </div>
  )
}
