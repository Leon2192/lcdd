import { useId } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { Field } from '@/components/ui/Field'
import { fieldDescription } from '@/lib/fieldDescription'
import type { FieldText } from '@/components/ui/Field'
import { cn } from '@/lib/cn'
export function Textarea({
  id: providedId,
  label,
  hint,
  error,
  className,
  rows = 4,
  ...props
}: ComponentPropsWithRef<'textarea'> & FieldText) {
  const generatedId = useId()
  const id = providedId ?? generatedId
  return (
    <Field
      id={id}
      label={label}
      {...(hint ? { hint } : {})}
      {...(error ? { error } : {})}
    >
      <textarea
        {...props}
        id={id}
        rows={rows}
        className={cn('control', className)}
        aria-invalid={error ? true : props['aria-invalid']}
        aria-describedby={fieldDescription(
          id,
          hint,
          error,
          props['aria-describedby'],
        )}
      />
    </Field>
  )
}
