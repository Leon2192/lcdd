import type { Ref } from 'react'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Select'

type QuantitySelectorProps = {
  label: string
  value: number | null
  onChange: (value: number) => void
  min: number
  max: number
  disabled?: boolean
  showSteppers?: boolean
  error?: string
  ref?: Ref<HTMLSelectElement>
}

export function QuantitySelector({
  label,
  value,
  onChange,
  min,
  max,
  disabled = false,
  showSteppers = true,
  error,
  ref,
}: QuantitySelectorProps) {
  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i)
  const isAvailable = (number: number) =>
    Number.isInteger(number) && number >= min && number <= max

  const select = (
    <Select
      ref={ref}
      label={label}
      disabled={disabled}
      value={value ?? ''}
      {...(error ? { error } : {})}
      onChange={(event) => {
        if (event.target.value === '') return
        const next = Number(event.target.value)
        if (isAvailable(next)) onChange(next)
      }}
    >
      {value === null && (
        <option value="" disabled>
          Elegí una cantidad
        </option>
      )}
      {value !== null && !isAvailable(value) && (
        <option value={value} disabled>
          {value} (guardada)
        </option>
      )}
      {options.map((quantity) => (
        <option key={quantity} value={quantity}>
          {quantity}
        </option>
      ))}
    </Select>
  )
  if (!showSteppers) return select

  return (
    <div className="quantity">
      <IconButton
        label={`Reducir ${label.toLowerCase()}`}
        disabled={disabled || value === null || !isAvailable(value - 1)}
        onClick={() => {
          if (value !== null) onChange(value - 1)
        }}
      >
        <Icon name="minus" />
      </IconButton>
      {select}
      <IconButton
        label={`Aumentar ${label.toLowerCase()}`}
        disabled={disabled || value === null || !isAvailable(value + 1)}
        onClick={() => {
          if (value !== null) onChange(value + 1)
        }}
      >
        <Icon name="plus" />
      </IconButton>
    </div>
  )
}
