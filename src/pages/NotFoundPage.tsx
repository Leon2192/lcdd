import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
export function NotFoundPage() {
  return (
    <Container>
      <Section className="stack">
        <h1>Página no encontrada</h1>
        <p>La dirección que ingresaste no está disponible.</p>
        <p>
          <Link to="/" className="button button--outline">
            Volver al inicio
          </Link>
        </p>
      </Section>
    </Container>
  )
}
