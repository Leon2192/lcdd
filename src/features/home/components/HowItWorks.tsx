import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { homeContent } from '@/features/home/home-content'
export function HowItWorks() {
  return (
    <Section className="home-how" aria-labelledby="home-how-title">
      <Container className="how-composition">
        <h2 id="home-how-title">¿Cómo armar tu pedido?</h2>
        <ol className="how-list" aria-label="Pasos para armar tu pedido">
          {homeContent.steps.map((step, index) => (
            <li key={step.title} className="how-step">
              <span className="how-marker" aria-hidden="true">
                <span className="how-number">{index + 1}</span>
                <Icon name={step.icon} />
              </span>
              <p className="how-text">{step.title}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
