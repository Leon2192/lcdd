import type { ReactNode } from 'react'
export type FieldText = { label: string; hint?: string; error?: string }
export function Field({
  id,
  label,
  hint,
  error,
  children,
}: FieldText & { id: string; children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
