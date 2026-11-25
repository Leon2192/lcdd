import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { IllustrativeNotice } from './IllustrativeNotice'
import { illustrativeMediaSources } from '@/config/image-attribution'

describe('Identificación de ilustraciones IA', () => {
  it.each([...illustrativeMediaSources])(
    'identifica visiblemente %s sin presentarla como fotografía real',
    (src) => {
      render(<IllustrativeNotice src={src} />)
      expect(screen.getByText('Imagen ilustrativa')).toBeVisible()
    },
  )
  it('no atribuye IA a recursos desconocidos o fotografías futuras', () => {
    const { container } = render(
      <IllustrativeNotice src="/media/foto-real-validada.webp" />,
    )
    expect(container).toBeEmptyDOMElement()
  })
})
