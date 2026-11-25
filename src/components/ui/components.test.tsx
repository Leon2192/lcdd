import { useState } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { ProductCard } from '@/components/ui/ProductCard'
import { CategoryCard } from '@/components/ui/CategoryCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { Carousel } from '@/components/ui/Carousel'
import { Modal } from '@/components/ui/Modal'
import { Drawer } from '@/components/ui/Drawer'
import { Header } from '@/components/layout/Header'
import { categories } from '@/config/categories'
import officialCatalog from '../../../docs/catalog/PY01_catalogo_operativo_v1.2.json'

describe('Acciones y controles', () => {
  it('activa un botón por teclado sin enviar formularios por defecto', async () => {
    const action = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={action}>Probar acción</Button>)
    await user.tab()
    await user.keyboard('{Enter}')
    expect(action).toHaveBeenCalledOnce()
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })
  it('bloquea una acción pendiente y anuncia que está ocupada', async () => {
    const action = vi.fn()
    const user = userEvent.setup()
    render(
      <Button isPending onClick={action}>
        Acción
      </Button>,
    )
    await user.click(screen.getByRole('button'))
    expect(action).not.toHaveBeenCalled()
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })
  it('da nombre accesible al botón de icono', () => {
    render(
      <IconButton label="Cerrar ejemplo">
        <span aria-hidden="true">×</span>
      </IconButton>,
    )
    expect(screen.getByRole('button', { name: 'Cerrar ejemplo' })).toBeVisible()
  })
  it('asocia etiqueta, ayuda y error al input', () => {
    render(
      <Input
        label="Nombre de ejemplo"
        hint="Ayuda de muestra"
        error="Revisá el texto"
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Nombre de ejemplo' })
    expect(input).toHaveAccessibleDescription(
      'Ayuda de muestra Revisá el texto',
    )
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('Revisá el texto')
  })
  it('permite escribir texto multilínea y seleccionar una opción', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Textarea label="Comentario" />
        <Select label="Opciones">
          <option value="a">A</option>
          <option value="b">B</option>
        </Select>
      </>,
    )
    await user.type(
      screen.getByRole('textbox'),
      'Primera línea{Enter}Segunda línea',
    )
    await user.selectOptions(screen.getByRole('combobox'), 'b')
    expect(screen.getByRole('textbox')).toHaveValue(
      'Primera línea\nSegunda línea',
    )
    expect(screen.getByRole('combobox')).toHaveValue('b')
  })
  it('alterna la casilla usando espacio y respeta disabled', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Checkbox label="Aceptar ejemplo" />
        <Checkbox label="Bloqueado" disabled />
      </>,
    )
    await user.tab()
    await user.keyboard(' ')
    expect(
      screen.getByRole('checkbox', { name: 'Aceptar ejemplo' }),
    ).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Bloqueado' })).toBeDisabled()
  })
  it('respeta límites técnicos y permite editar una cantidad entera', async () => {
    const user = userEvent.setup()
    function Example() {
      const [value, setValue] = useState(0)
      return (
        <QuantitySelector
          label="Cantidad de muestra"
          value={value}
          onChange={setValue}
          min={0}
          max={2}
        />
      )
    }
    render(<Example />)
    const reduce = screen.getByRole('button', {
      name: 'Reducir cantidad de muestra',
    })
    const increase = screen.getByRole('button', {
      name: 'Aumentar cantidad de muestra',
    })
    expect(reduce).toBeDisabled()
    await user.click(increase)
    await user.click(increase)
    expect(increase).toBeDisabled()
    const select = screen.getByRole('combobox', { name: 'Cantidad de muestra' })
    expect(
      within(select)
        .getAllByRole('option')
        .map((option) => option.textContent),
    ).toEqual(['0', '1', '2'])
    await user.selectOptions(select, '1')
    expect(select).toHaveValue('1')
    await user.selectOptions(select, '2')
    expect(select).toHaveValue('2')
  })
  it('mantiene visible una cantidad guardada fuera del rango hasta elegir otra', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <QuantitySelector
        label="Cantidad"
        min={10}
        max={200}
        value={6}
        onChange={onChange}
      />,
    )
    const select = screen.getByRole('combobox', { name: 'Cantidad' })
    expect(select).toHaveDisplayValue('6 (guardada)')
    expect(
      within(select).getByRole('option', { name: '6 (guardada)' }),
    ).toBeDisabled()
    expect(onChange).not.toHaveBeenCalled()
    await user.selectOptions(select, '10')
    expect(onChange).toHaveBeenCalledExactlyOnceWith(10)
  })
})

describe('Tarjetas y estados', () => {
  it('identifica las imágenes faltantes sin inventar fotografías ni acceso directo a pedido', () => {
    render(
      <MemoryRouter>
        <ProductCard
          name="Vasos personalizados"
          to="/catalogo/producto/P-003"
        />
        <CategoryCard name="Kits" to="/catalogo/categoria/kits-para-eventos" />
      </MemoryRouter>,
    )
    expect(screen.getAllByText('Sin imagen')).toHaveLength(2)
    expect(
      screen.getByRole('link', { name: /Vasos personalizados/ }),
    ).toHaveAttribute('href', '/catalogo/producto/P-003')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
  it('permite una imagen con alternativa textual explícita', () => {
    render(
      <MemoryRouter>
        <ProductCard
          name="Muestra"
          to="/catalogo"
          image={{ src: '/muestra.webp', alt: 'Imagen de prueba' }}
        />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('img', { name: 'Imagen de prueba' }),
    ).toHaveAttribute('loading', 'lazy')
  })
  it('ofrece una acción útil en el estado vacío', async () => {
    const user = userEvent.setup()
    const action = vi.fn()
    render(
      <EmptyState
        title="Sin elementos"
        description="Descripción"
        action={<Button onClick={action}>Revisar</Button>}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Revisar' }))
    expect(action).toHaveBeenCalledOnce()
  })
  it('recorre carrusel sin arrastre, anuncia posición y limita extremos', async () => {
    const user = userEvent.setup()
    render(
      <Carousel
        label="Galería"
        items={[
          { id: 'a', content: <a href="#a">Primera muestra</a> },
          { id: 'b', content: <a href="#b">Segunda muestra</a> },
        ]}
      />,
    )
    expect(
      screen.getByRole('button', { name: 'Anterior en Galería' }),
    ).toBeDisabled()
    expect(
      screen.queryByRole('link', { name: 'Segunda muestra' }),
    ).not.toBeInTheDocument()
    screen.getByRole('button', { name: 'Siguiente en Galería' }).focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('link', { name: 'Segunda muestra' })).toBeVisible()
    expect(screen.getByText('2 / 2')).toHaveAttribute('aria-live', 'polite')
    expect(
      screen.getByRole('button', { name: 'Siguiente en Galería' }),
    ).toBeDisabled()
  })
  it('trata un carrusel vacío sin controles inertes', () => {
    render(<Carousel label="Vacío" items={[]} />)
    expect(screen.getByText('No hay elementos para mostrar.')).toBeVisible()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

function OverlayExample({ kind }: { kind: 'modal' | 'drawer' }) {
  const [open, setOpen] = useState(false)
  const Component = kind === 'modal' ? Modal : Drawer
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir muestra</Button>
      <Component title="Ejemplo" open={open} onOpenChange={setOpen}>
        <Input label="Campo interno" />
        <Button onClick={() => setOpen(false)}>Finalizar</Button>
      </Component>
    </>
  )
}
describe('Diálogos y navegación', () => {
  it.each(['modal', 'drawer'] as const)(
    'gestiona foco, Tab, Escape y restauración en %s',
    async (kind) => {
      const user = userEvent.setup()
      render(<OverlayExample kind={kind} />)
      const trigger = screen.getByRole('button', { name: 'Abrir muestra' })
      await user.click(trigger)
      const dialog = screen.getByRole('dialog', { name: 'Ejemplo' })
      const close = within(dialog).getByRole('button', {
        name: 'Cerrar ejemplo',
      })
      const last = within(dialog).getByRole('button', { name: 'Finalizar' })
      expect(close).toHaveFocus()
      await user.tab({ shift: true })
      expect(last).toHaveFocus()
      await user.tab()
      expect(close).toHaveFocus()
      expect(document.body.style.overflow).toBe('hidden')
      await user.keyboard('{Escape}')
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(trigger).toHaveFocus()
      expect(document.body.style.overflow).not.toBe('hidden')
    },
  )
  it('cierra el modal desde su control visible', async () => {
    const user = userEvent.setup()
    render(<OverlayExample kind="modal" />)
    await user.click(screen.getByRole('button', { name: 'Abrir muestra' }))
    await user.click(screen.getByRole('button', { name: 'Cerrar ejemplo' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('abre menú mobile, anuncia estado y lo cierra al navegar', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Header onContact={vi.fn()} />
      </MemoryRouter>,
    )
    const trigger = screen.getByRole('button', { name: 'Abrir menú' })
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const nav = screen.getByRole('navigation', { name: 'Navegación mobile' })
    await user.click(within(nav).getByRole('link', { name: 'Catálogo' }))
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('preserva las cinco identidades de categoría del catálogo oficial', () => {
    expect(categories).toEqual(
      officialCatalog.categories.map(({ id, name }) => ({ id, name })),
    )
    expect(officialCatalog.products).toHaveLength(16)
    expect(
      officialCatalog.products.find((product) => product.id === 'P-011')
        ?.selection.label,
    ).toBe('Cantidad de tarjetas')
  })
})
