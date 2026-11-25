export function MediaPlaceholder({
  label = 'Fotografía pendiente de validación',
}: {
  label?: string
}) {
  return (
    <div className="media-placeholder">
      <span className="placeholder-mark" aria-hidden="true">
        ✧
      </span>
      <span>{label}</span>
    </div>
  )
}
