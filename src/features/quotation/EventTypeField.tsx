import { useEffect, useId, useRef, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Field } from '@/components/ui/Field'
import { eventTypes } from './schema'
import type { QuotationData } from './schema'

const options = [
  { value: '', label: 'Seleccioná el tipo de evento' },
  ...eventTypes.map((value) => ({ value, label: value })),
] as const
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-AR')

// Combobox select-only: evita el popup nativo que puede exceder el viewport en Windows.
export function EventTypeField() {
  const { control } = useFormContext<QuotationData>()
  const { field, fieldState } = useController({ control, name: 'eventType' })
  const id = useId()
  const listId = `${id}-options`
  const wrapper = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const typing = useRef({ text: '', time: 0 })
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [geometry, setGeometry] = useState({ side: 'below', height: 264 })
  const error = fieldState.error
    ? 'Seleccioná un tipo de evento de la lista o dejalo sin definir.'
    : undefined

  function measure() {
    const rect = trigger.current?.getBoundingClientRect()
    if (!rect) return
    const viewport = window.visualViewport
    const top = viewport?.offsetTop ?? 0
    const bottom = top + (viewport?.height ?? window.innerHeight)
    const below = Math.max(0, bottom - rect.bottom - 8)
    const above = Math.max(0, rect.top - top - 8)
    const side = below >= Math.min(264, above) ? 'below' : 'above'
    const height = Math.max(44, Math.min(264, side === 'below' ? below : above))
    setGeometry((previous) =>
      previous.side === side && previous.height === height
        ? previous
        : { side, height },
    )
  }
  function show(
    index = Math.max(
      0,
      options.findIndex((option) => option.value === field.value),
    ),
  ) {
    typing.current = { text: '', time: 0 }
    measure()
    setActive(index)
    setOpen(true)
  }
  function choose(index: number) {
    const option = options[index]
    if (!option) return
    if (field.value !== option.value) field.onChange(option.value)
    field.onBlur()
    setOpen(false)
    trigger.current?.focus({ preventScroll: true })
  }
  useEffect(() => {
    if (!open) return
    function outside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !wrapper.current?.contains(event.target)
      )
        setOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    const viewport = window.visualViewport
    viewport?.addEventListener('resize', measure)
    viewport?.addEventListener('scroll', measure)
    return () => {
      document.removeEventListener('pointerdown', outside)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
      viewport?.removeEventListener('resize', measure)
      viewport?.removeEventListener('scroll', measure)
    }
  }, [open])
  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() =>
      document
        .getElementById(`${listId}-${active}`)
        ?.scrollIntoView?.({ block: 'nearest' }),
    )
    return () => cancelAnimationFrame(frame)
  }, [open, active, listId])

  return (
    <Field
      id={id}
      label="Tipo de evento (opcional)"
      {...(error ? { error } : {})}
    >
      <div
        className="event-type-select"
        ref={wrapper}
        onBlur={(event) => {
          field.onBlur()
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
        }}
      >
        <button
          ref={(node) => {
            trigger.current = node
            field.ref(node)
          }}
          id={id}
          name={field.name}
          value={field.value}
          type="button"
          role="combobox"
          className="control event-type-trigger"
          aria-haspopup="listbox"
          aria-controls={open ? listId : undefined}
          aria-expanded={open}
          aria-activedescendant={open ? `${listId}-${active}` : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onClick={() => (open ? setOpen(false) : show())}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault()
              if (!open) show()
              else
                setActive((index) =>
                  Math.max(
                    0,
                    Math.min(
                      options.length - 1,
                      index + (event.key === 'ArrowDown' ? 1 : -1),
                    ),
                  ),
                )
            } else if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              if (open) choose(active)
              else show()
            } else if (event.key === 'Escape' && open) {
              event.preventDefault()
              event.stopPropagation()
              setOpen(false)
            } else if (event.key === 'Tab') {
              setOpen(false)
            } else if (event.key === 'Home' || event.key === 'End') {
              event.preventDefault()
              show(event.key === 'Home' ? 0 : options.length - 1)
            } else if (event.key.length === 1) {
              event.preventDefault()
              const now = Date.now()
              const text =
                now - typing.current.time < 700
                  ? typing.current.text + event.key
                  : event.key
              const ordered = options.map(
                (_, index) => (active + index + 1) % options.length,
              )
              const find = (prefix: string) =>
                ordered.find((index) =>
                  normalize(options[index]?.label ?? '').startsWith(
                    normalize(prefix),
                  ),
                )
              const index = find(text) ?? find(event.key)
              typing.current = { text, time: now }
              if (!open) {
                measure()
                setOpen(true)
              }
              if (index !== undefined) setActive(index)
            }
          }}
        >
          <span>{field.value || options[0].label}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            focusable="false"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-label="Tipo de evento"
            className="event-type-options"
            data-side={geometry.side}
            style={{ maxHeight: geometry.height }}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={option.value === field.value}
                data-active={index === active}
                onMouseDown={(event) => event.preventDefault()}
                onPointerMove={() => setActive(index)}
                onClick={() => choose(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Field>
  )
}
