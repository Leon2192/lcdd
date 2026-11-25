import { illustrativeMediaSources } from '@/config/image-attribution'
export function IllustrativeNotice({ src }: { src: string }) {
  return illustrativeMediaSources.has(src) ? (
    <span className="illustrative-notice">Imagen ilustrativa</span>
  ) : null
}
