import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { describe, it, expect, vi } from 'vitest'
import { EventTypeField } from './EventTypeField'
import { emptyQuotation, quotationResolver } from './schema'
import type { QuotationData } from './schema'
function Harness() {
  const methods = useForm<QuotationData>({
    defaultValues: emptyQuotation,
    resolver: quotationResolver,
  })
  return (
    <FormProvider {...methods}>
      <EventTypeField />
      <button type="button">Siguiente campo</button>
      <button type="button" onClick={() => methods.reset(emptyQuotation)}>
        Limpiar
      </button>
    </FormProvider>
  )
}
function setup() {
  render(<Harness />)
  return {
    combo: screen.getByRole('combobox', { name: 'Tipo de evento (opcional)' }),
  }
}
describe('Selector de evento contenido en el formulario', () => {
  it('inicia cerrado, opcional y sin selección de evento', () => {
    const { combo } = setup()
    expect(combo).toHaveTextContent('Seleccioná el tipo de evento')
    expect(combo).toHaveAttribute('aria-expanded', 'false')
    expect(combo).not.toHaveAttribute('aria-required', 'true')
    expect(screen.queryByRole('listbox')).toBeNull()
  })
  it('permite abrir, recorrer y confirmar por teclado sin enviar el formulario', async () => {
    const user = userEvent.setup()
    const { combo } = setup()
    combo.focus()
    await user.keyboard('{ArrowDown}{End}')
    expect(combo).toHaveAttribute('aria-expanded', 'true')
    const active = combo.getAttribute('aria-activedescendant')
    expect(active).toBe(screen.getByRole('option', { name: 'Otro' }).id)
    await user.keyboard('{Enter}')
    expect(combo).toHaveTextContent('Otro')
    expect(combo).toHaveFocus()
    expect(screen.queryByRole('listbox')).toBeNull()
  })
  it('busca por letras y permite dejar nuevamente el campo vacío', async () => {
    const user = userEvent.setup()
    const { combo } = setup()
    combo.focus()
    await user.keyboard('cu{Enter}')
    expect(combo).toHaveTextContent('Cumpleaños')
    await user.keyboard('{Home}{Enter}')
    expect(combo).toHaveTextContent('Seleccioná el tipo de evento')
    expect(combo).toHaveValue('')
  })
  it('Escape cancela la exploración sin cambiar la selección confirmada', async () => {
    const user = userEvent.setup()
    const { combo } = setup()
    combo.focus()
    await user.keyboard('c{Enter}')
    expect(combo).toHaveTextContent('Casamiento')
    await user.keyboard('{ArrowDown}{End}{Escape}')
    expect(combo).toHaveTextContent('Casamiento')
    expect(combo).toHaveAttribute('aria-expanded', 'false')
    expect(combo).toHaveFocus()
  })
  it('Tab cierra y sigue el orden de foco sin confirmar otra opción', async () => {
    const user = userEvent.setup()
    const { combo } = setup()
    combo.focus()
    await user.keyboard(' {End}{Tab}')
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(
      screen.getByRole('button', { name: 'Siguiente campo' }),
    ).toHaveFocus()
    expect(combo).toHaveValue('')
  })
  it('cierra con clic exterior sin robar el foco ni cambiar el valor', async () => {
    const user = userEvent.setup()
    const { combo } = setup()
    await user.click(combo)
    await user.click(screen.getByRole('button', { name: 'Siguiente campo' }))
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(
      screen.getByRole('button', { name: 'Siguiente campo' }),
    ).toHaveFocus()
    expect(combo).toHaveValue('')
  })
  it('responde al reset de React Hook Form', async () => {
    const user = userEvent.setup()
    const { combo } = setup()
    await user.click(combo)
    await user.click(screen.getByRole('option', { name: 'Fiesta de XV' }))
    expect(combo).toHaveValue('Fiesta de XV')
    await user.click(screen.getByRole('button', { name: 'Limpiar' }))
    expect(combo).toHaveValue('')
    expect(combo).toHaveTextContent('Seleccioná el tipo de evento')
  })
  it('abre hacia arriba cuando falta espacio debajo del campo', async () => {
    const user = userEvent.setup()
    const { combo } = setup()
    vi.spyOn(combo, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(24, window.innerHeight - 60, 240, 48),
    )
    await user.click(combo)
    const popup = screen.getByRole('listbox')
    expect(popup).toHaveAttribute('data-side', 'above')
    expect(Number.parseFloat(popup.style.maxHeight)).toBeLessThanOrEqual(264)
  })
})
