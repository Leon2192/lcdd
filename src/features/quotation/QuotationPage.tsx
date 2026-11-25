import { siteConfig } from '@/config/site'
import { revealSection } from '@/lib/reveal-section'
import { EventSummary } from './EventSummary'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Link } from 'react-router'
import { useFormContext, useWatch } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { EventTypeField } from './EventTypeField'
import { Textarea } from '@/components/ui/Textarea'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { useOrder, OrderSummary, OrderSteps } from '@/features/order'
import { MessageReview } from './MessageReview'
import { generateQuotationMessage } from './message'
import { emptyQuotation } from './schema'
import type { QuotationData } from './schema'
export function QuotationPage() {
  const reviewHeading = useRef<HTMLHeadingElement>(null)
  const eventHeading = useRef<HTMLHeadingElement>(null)
  const lines = useOrder((state) => state.lines)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useFormContext<QuotationData>()
  const dateUnknown = useWatch({ control, name: 'dateUnknown' })
  const [review, setReview] = useState<{
    message: string
    selection: string
    data: QuotationData
  } | null>(null)
  const [error, setError] = useState('')
  function submit(values: QuotationData) {
    try {
      setReview({
        message: generateQuotationMessage(lines, values),
        selection: JSON.stringify(lines),
        data: values,
      })
      setError('')
    } catch {
      setError('Revisá el pedido: falta una selección válida para cotizar.')
      setReview(null)
    }
  }
  const currentReview =
    review?.selection === JSON.stringify(lines) ? review : null
  useEffect(() => {
    if (currentReview) revealSection(reviewHeading.current)
  }, [currentReview])
  if (!lines.length)
    return (
      <div className="container-lcdd order-page">
        <h1 ref={eventHeading} tabIndex={-1}>
          Contanos sobre tu evento
        </h1>
        <EmptyState
          title="Primero elegí qué querés consultar"
          description="La solicitud estructurada necesita al menos un producto o servicio. También podés consultar el contacto institucional sin una selección."
          action={
            <Link to="/catalogo" className="button button--primary">
              Explorar catálogo
            </Link>
          }
        />
      </div>
    )
  return (
    <div className="container-lcdd order-page">
      <Breadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: 'Armá tu pedido', to: '/arma-tu-pedido' },
          { label: 'Tu evento' },
        ]}
      />
      <header className="order-heading">
        <p className="eyebrow">Tu solicitud de cotización</p>
        <h1 ref={eventHeading} tabIndex={-1}>
          Contanos sobre tu evento
        </h1>
        <p>
          Completá los datos que quieras compartir y revisá el mensaje antes de
          continuar por WhatsApp.
        </p>
      </header>
      <OrderSteps current="event" />
      <p className="order-notice">
        Los campos del evento son opcionales mientras se valida el formulario
        comercial. Estos datos se descartan al recargar.
      </p>
      <div className="order-layout">
        <form
          className="quotation-form"
          noValidate
          onChange={() => setReview(null)}
          onSubmit={handleSubmit(submit)}
        >
          <Input
            label="Tu nombre (opcional)"
            autoComplete="name"
            {...register('name')}
          />
          <EventTypeField onValueChange={() => setReview(null)} />
          <Input
            label="Fecha del evento (opcional)"
            type="date"
            lang={siteConfig.locale}
            hint="En la solicitud se mostrará como DD/MM/AAAA."
            disabled={dateUnknown}
            {...register('eventDate')}
            {...(errors.eventDate?.message
              ? { error: errors.eventDate.message }
              : {})}
          />
          <Checkbox
            label="Fecha por definir"
            {...register('dateUnknown', {
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.checked)
                  setValue('eventDate', '', { shouldValidate: true })
              },
            })}
          />
          <Input
            label="Localidad (opcional)"
            autoComplete="address-level2"
            {...register('location')}
          />
          <Textarea
            label="Comentarios adicionales (opcional)"
            placeholder="¿Hay algo más que quieras contarnos?"
            {...register('comments')}
          />

          <Button type="submit">Revisar solicitud de cotización</Button>
          <Button
            variant="ghost"
            onClick={() => {
              reset(emptyQuotation)
              setReview(null)
            }}
          >
            Borrar datos del evento
          </Button>
          {error && <p role="alert">{error}</p>}
        </form>
        <aside className="order-review">
          <OrderSummary lines={lines} />
          <Link className="button button--outline" to="/arma-tu-pedido">
            Editar mi pedido
          </Link>
        </aside>
      </div>
      {currentReview && (
        <section
          className="quotation-preview"
          aria-labelledby="quotation-preview-title"
        >
          <h2 id="quotation-preview-title" tabIndex={-1} ref={reviewHeading}>
            Revisá tu solicitud
          </h2>
          <p>Revisá tu selección y los datos antes de continuar.</p>
          <div className="quote-review-summary">
            <p>{lines.length} productos seleccionados</p>
            <EventSummary data={currentReview.data} />
            <Button
              variant="outline"
              onClick={() => {
                setReview(null)
                revealSection(eventHeading.current)
              }}
            >
              Editar datos del evento
            </Button>
          </div>
          <MessageReview
            key={currentReview.message}
            message={currentReview.message}
          />
        </section>
      )}
    </div>
  )
}
