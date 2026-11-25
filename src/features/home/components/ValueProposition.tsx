import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { homeContent } from '@/features/home/home-content'
export function ValueProposition() {
  return (
    <section
      className="home-values"
      aria-label="Propuesta de valor provisional"
    >
      <Container>
        <ul>
          {homeContent.values.map((item) => (
            <li key={item.text}>
              <Icon name={item.icon} />
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
