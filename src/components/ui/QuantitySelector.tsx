import { useId, useState } from 'react'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
type QuantitySelectorProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max?: number
  disabled?: boolean
}
// Los límites son técnicos y deben proporcionarse explícitamente. No define mínimos comerciales.
export function QuantitySelector({
  label,
  value,
  onChange,
  min,
  max,
  disabled = false,
}: QuantitySelectorProps) {
  const id = useId()
  const [draft, setDraft] = useState<string | null>(null)
  function update(next: number) {
    if (
      Number.isSafeInteger(next) &&
      next >= min &&
      (max === undefined || next <= max)
    )
      onChange(next)
  }
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="quantity">
        <IconButton
          label={`Reducir ${label.toLowerCase()}`}
          disabled={disabled || value <= min}
          onClick={() => {
            setDraft(null)
            update(value - 1)
          }}
        >
          <Icon name="minus" />
        </IconButton>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={1}
          value={draft ?? value}
          disabled={disabled}
          onBlur={() => setDraft(null)}
          onChange={(event) => {
            setDraft(event.target.value)
            if (event.target.value !== '') update(event.target.valueAsNumber)
          }}
        />
        <IconButton
          label={`Aumentar ${label.toLowerCase()}`}
          disabled={disabled || (max !== undefined && value >= max)}
          onClick={() => {
            setDraft(null)
            update(value + 1)
          }}
        >
          <Icon name="plus" />
        </IconButton>
      </div>
    </div>
  )
}
