import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { generateDirectConsultation } from './message'
import { MessageReview } from './MessageReview'
export function DirectConsultation({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Icon name="whatsapp" /> Consultar por este producto
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Consulta por el producto"
      >
        <p>Consulta directa, sin fijar cantidades ni condiciones pendientes.</p>
        <MessageReview
          message={generateDirectConsultation(productId)}
          label="Mensaje de consulta"
          whatsappLabel="Consultar por WhatsApp"
        />
      </Modal>
    </>
  )
}
