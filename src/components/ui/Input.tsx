import { useId } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { Field } from '@/components/ui/Field'
import { fieldDescription } from '@/lib/fieldDescription'
import type { FieldText } from '@/components/ui/Field'
import { cn } from '@/lib/cn'
export function Input({
  id: providedId,
  label,
  hint,
  error,
  className,
  ...props
}: ComponentPropsWithRef<'input'> & FieldText) {
  const generatedId = useId()
  const id = providedId ?? generatedId
  return (
    <Field
      id={id}
      label={label}
      {...(hint ? { hint } : {})}
      {...(error ? { error } : {})}
    >
      <input
        {...props}
        id={id}
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
