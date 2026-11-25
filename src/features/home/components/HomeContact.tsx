import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { homeContent } from '@/features/home/home-content'
export function HomeContact({ onContact }: { onContact: () => void }) {
  return (
    <section className="home-contact" aria-labelledby="home-contact-title">
      <Container className="contact-composition">
        <h2 id="home-contact-title">{homeContent.contact.title}</h2>
        <Button onClick={onContact}>
          <Icon name="whatsapp" />
          {homeContent.contact.action}
          <Icon name="arrow" />
        </Button>
      </Container>
    </section>
  )
}
