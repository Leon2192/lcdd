import { siteConfig } from '@/config/site'
export function encodeWhatsAppUrl(
  internationalNumber: string,
  message: string,
): string {
  if (!/^\d+$/.test(internationalNumber) || !message.trim())
    throw new Error('Número internacional o mensaje inválido')
  const wellFormed = Array.from(message, (character) => {
    const code = character.charCodeAt(0)
    return character.length === 1 && code >= 0xd800 && code <= 0xdfff
      ? '\uFFFD'
      : character
  }).join('')
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(wellFormed)}`
}
export function getValidatedWhatsAppUrl(message?: string): string | null {
  const contact: {
    internationalNumberValidated: boolean
    internationalNumber: string
  } = siteConfig.contact.whatsapp
  if (!contact.internationalNumberValidated) return null
  return message === undefined
    ? `https://wa.me/${contact.internationalNumber}`
    : encodeWhatsAppUrl(contact.internationalNumber, message)
}
