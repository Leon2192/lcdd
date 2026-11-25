import { useId } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { fieldDescription } from '@/lib/fieldDescription'
import type { FieldText } from '@/components/ui/Field'
export function Checkbox({
  id: providedId,
  label,
  hint,
  error,
  ...props
}: Omit<ComponentPropsWithRef<'input'>, 'type'> & FieldText) {
  const generatedId = useId()
  const id = providedId ?? generatedId
  return (
    <div className="field">
      <label className="checkbox-label" htmlFor={id}>
        <input
          {...props}
          type="checkbox"
          id={id}
          aria-invalid={error ? true : props['aria-invalid']}
          aria-describedby={fieldDescription(
            id,
            hint,
            error,
            props['aria-describedby'],
          )}
        />
        <span>{label}</span>
      </label>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}
