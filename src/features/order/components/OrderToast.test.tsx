import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { orderStore } from '../store'
import { OrderToast } from './OrderToast'

beforeEach(() => {
  orderStore.getState().clear()
  vi.useFakeTimers()
})
afterEach(() => vi.useRealTimers())

function renderToast() {
  render(
    <MemoryRouter>
      <button type="button">Agregar producto</button>
      <OrderToast />
    </MemoryRouter>,
  )
}

it('anuncia únicamente altas exitosas y desaparece a los cinco segundos', () => {
  renderToast()
  const live = screen.getByRole('status')
  const action = () => screen.queryByRole('link', { name: 'Ver mi pedido' })

  act(() => {
    orderStore.getState().add('P-003', 0)
    orderStore.getState().add('P-011', 3)
  })
  expect(live).toBeEmptyDOMElement()
  expect(action()).not.toBeInTheDocument()

  act(() => {
    orderStore.getState().add('P-003', 2)
  })
  expect(live).toHaveTextContent('Producto agregado al carrito')
  expect(action()).toHaveAttribute('href', '/arma-tu-pedido')
  act(() => vi.advanceTimersByTime(4_999))
  act(() => {
    orderStore.getState().add('P-003', 4)
  })
  expect(action()).toBeVisible()
  act(() => vi.advanceTimersByTime(1))
  expect(live).toBeEmptyDOMElement()
  act(() => vi.advanceTimersByTime(180))
  expect(action()).not.toBeInTheDocument()
})

it('permite cerrar, recupera el foco y reinicia el plazo con una nueva alta', () => {
  renderToast()
  const trigger = screen.getByRole('button', { name: 'Agregar producto' })
  trigger.focus()
  act(() => {
    orderStore.getState().add('P-003', 2)
  })
  act(() => vi.advanceTimersByTime(4_000))
  act(() => {
    orderStore.getState().add('P-013', null)
  })
  act(() => vi.advanceTimersByTime(1_000))
  const close = screen.getByRole('button', { name: 'Cerrar notificación' })
  close.focus()
  fireEvent.click(close)
  expect(trigger).toHaveFocus()
  expect(screen.getByRole('status')).toBeEmptyDOMElement()
  act(() => vi.advanceTimersByTime(180))
  expect(close).not.toBeInTheDocument()
})
