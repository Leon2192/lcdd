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
  ]
  return (
    <>
      <section>
        <h2>
          {product.description.status === 'confirmed'
            ? 'Descripción'
            : 'Descripción preliminar · En revisión'}
        </h2>
        {product.description.value && <p>{product.description.value}</p>}
      </section>
      <section>
        <h2>Opciones del producto</h2>
        {sections
          .filter(
            (section) =>
              section.status === 'confirmed' && section.values?.length,
          )
          .map((section) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.values?.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          ))}
        {sections.some(
          (section) =>
            section.status !== 'confirmed' || !section.values?.length,
        ) && (
          <p>
            Características, personalización y variantes pendientes de
            validación comercial. No se ofrecen opciones sin confirmar.
          </p>
        )}
      </section>
      <OrderSelection key={product.id} product={product} />
      <DirectConsultation
        key={`consult-${product.id}`}
        productId={product.id}
      />
    </>
  )
}
