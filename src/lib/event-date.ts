import { siteConfig } from '@/config/site'
export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  )
}
const formatter = new Intl.DateTimeFormat(siteConfig.locale, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
})
export function formatEventDate(value: string): string {
  if (!isCalendarDate(value)) throw new RangeError('Fecha inválida')
  return formatter
    .formatToParts(new Date(`${value}T00:00:00Z`))
    .map((part) => (part.type === 'year' ? value.slice(0, 4) : part.value))
    .join('')
}
