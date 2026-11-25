import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

// Font Awesome Free Brands 7.3.1, Fonticons Inc., CC BY 4.0. Ver /licenses/NOTICE.txt.
export function WhatsAppIcon() {
  const [width, height, , , data] = faWhatsapp.icon
  const paths = typeof data === 'string' ? [data] : data
  return (
    <svg
      width="20"
      height="20"
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      data-icon="whatsapp"
    >
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  )
}
