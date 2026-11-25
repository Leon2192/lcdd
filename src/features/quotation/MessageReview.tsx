import { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Icon } from '@/components/ui/Icon'
import { getValidatedWhatsAppUrl } from '@/lib/whatsapp'
export function MessageReview({
  message,
  label = 'Mensaje preparado',
  whatsappLabel = 'Enviar solicitud por WhatsApp',
}: {
  message: string
  label?: string
  whatsappLabel?: string
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [status, setStatus] = useState({
    message: '',
    copies: 0,
    copied: false,
  })
  const url = getValidatedWhatsAppUrl(message)
  async function copy() {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(message)
      setStatus((previous) => ({
        message: 'Mensaje copiado. Podés pegarlo en WhatsApp.',
        copies: previous.copies + 1,
        copied: true,
      }))
    } catch {
      ref.current?.focus()
      ref.current?.select()
      setStatus((previous) => ({
        ...previous,
        copied: false,
        message:
          'No pudimos copiar automáticamente. El texto está seleccionado: copiá con el teclado o el menú del dispositivo.',
      }))
    }
  }
  return (
    <section className="quote-message" aria-label="Revisión del mensaje">
      <Textarea ref={ref} label={label} value={message} readOnly rows={12} />
      <div className="order-actions quote-message-actions">
        {url ? (
          <a
            className="button button--primary"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" />
            {whatsappLabel}
          </a>
        ) : (
          <Button disabled>WhatsApp no disponible</Button>
        )}
        <Button variant="outline" onClick={() => void copy()}>
          Copiar mensaje
        </Button>
      </div>
      <p role="status" aria-atomic="true">
        {status.message}
        {status.copied && status.copies > 1 && (
          <span className="sr-only"> Copia número {status.copies}.</span>
        )}
      </p>
      <p>
        La solicitud no confirma una compra. WhatsApp se abre con el texto
        preparado; vos decidís enviarlo.
      </p>
    </section>
  )
}
