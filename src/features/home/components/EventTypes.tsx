import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'
import { homeContent } from '@/features/home/home-content'
export function EventTypes() {
  return (
    <Section className="home-events" aria-labelledby="home-events-title">
      <Container>
        <h2 id="home-events-title">Eventos para cada momento</h2>
        <ul>
          {homeContent.events.map((event) => (
            <li key={event}>
              <span aria-hidden="true">
                <Icon name="calendar" />
              </span>
              {event}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
