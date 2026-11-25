import { OrderSelection } from '@/features/order'
import { DirectConsultation } from '@/features/quotation'
import type { Product } from '@/data/catalog/types'
export function ProductInformation({ product }: { product: Product }) {
  const sections = [
    {
      title: 'Características',
      status: product.characteristics.status,
      values: product.characteristics.values,
    },
    {
      title: 'Personalización',
      status: product.personalization.status,
      values: product.personalization.options,
    },
    {
      title: 'Variantes',
      status: product.variants.status,
      values: product.variants.options,
    },
  ].filter(
    (section) => section.status === 'confirmed' && section.values?.length,
  )
  return (
    <>
      {product.description.value && (
        <section>
          <h2>Descripción</h2>
          <p>{product.description.value}</p>
        </section>
      )}
      {sections.length > 0 && (
        <section>
          <h2>Opciones del producto</h2>
          {sections.map((section) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.values?.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
      <div className="catalog-request">
        <OrderSelection key={product.id} product={product} />
        <DirectConsultation
          key={`consult-${product.id}`}
          productId={product.id}
        />
      </div>
    </>
  )
}
