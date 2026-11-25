import { siteConfig } from '@/config/site'
import { Icon } from '@/components/ui/Icon'
import { openWhatsApp } from '@/lib/whatsapp'
import { useState } from 'react'
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
import { generateQuotationMessage } from './message'
import type { QuotationData } from './schema'
export function QuotationPage() {
  const lines = useOrder((state) => state.lines)
  const notice = useOrder((state) => state.notice)
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<QuotationData>()
  const dateUnknown = useWatch({ control, name: 'dateUnknown' })
  const [error, setError] = useState('')
  function submit(values: QuotationData) {
    setError('')
    try {
      if (openWhatsApp(generateQuotationMessage(lines, values))) return
      setError('WhatsApp no está disponible en este momento.')
    } catch {
      setError(
        'No pudimos preparar la cotización. Revisá tu pedido e intentá de nuevo.',
      )
    }
  }
  if (!lines.length)
    return (
      <div className="container-lcdd order-page">
        <h1 tabIndex={-1}>Contanos sobre tu evento</h1>
        {notice && (
          <p className="order-notice" role="status">
            {notice}
          </p>
        )}
        <EmptyState
          title="Primero elegí qué querés consultar"
          description="Agregá un producto o servicio a tu pedido para solicitar una cotización. También podés consultarnos por WhatsApp."
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
        <h1 tabIndex={-1}>Contanos sobre tu evento</h1>
        <p>
          Completá los datos que quieras compartir para solicitar la cotización
          por WhatsApp.
        </p>
      </header>
      <OrderSteps current="event" />
      {notice && (
        <p className="order-notice" role="status">
          {notice}
        </p>
      )}
      <div className="order-layout">
        <form
          className="quotation-form"
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <Input
            label="Tu nombre (opcional)"
            autoComplete="name"
            {...register('name')}
          />
          <EventTypeField />
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

          <Button type="submit">
            <Icon name="whatsapp" /> Cotizar por WhatsApp
          </Button>
          {error && <p role="alert">{error}</p>}
        </form>
        <aside className="order-review">
          <OrderSummary lines={lines} />
        </aside>
      </div>
    </div>
  )
}
