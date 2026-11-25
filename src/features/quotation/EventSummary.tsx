import { formatEventDate } from '@/lib/event-date'
import type { QuotationData } from './schema'
export function EventSummary({ data }: { data: QuotationData }) {
  const fields = [
    { label: 'Nombre', value: data.name },
    { label: 'Tipo de evento', value: data.eventType },
    {
      label: 'Fecha del evento',
      value: data.eventDate
        ? formatEventDate(data.eventDate)
        : data.dateUnknown
          ? 'Por definir'
          : '',
    },
    { label: 'Localidad', value: data.location },
    { label: 'Comentarios', value: data.comments },
  ].filter((field) => field.value)
  return (
    <section
      className="quote-event-summary"
      aria-label="Datos del evento para revisar"
    >
      <h3>Tu evento</h3>
      {fields.length ? (
        <dl>
          {fields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p>No informaste datos del evento.</p>
      )}
    </section>
  )
}
