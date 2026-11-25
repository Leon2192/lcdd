import { illustrativeMediaSources } from '@/config/image-attribution'
export function IllustrativeNotice({ src }: { src: string }) {
  return illustrativeMediaSources.has(src) ? (
    <small
      className="illustrative-notice"
      title="Imagen ilustrativa generada mediante inteligencia artificial. No representa una fotografía real ni confirma características del producto LCDD."
    >
      Ilustración IA · No es foto real
    </small>
  ) : null
}
