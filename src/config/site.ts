export const siteConfig = {
  name: 'La Casa del Detalle',
  shortName: 'LCDD',
  domain: 'lacasadeldetalle.com.ar',
  locale: 'es-AR',
  contact: {
    email: 'contacto.lacasadeldetalle@gmail.com',
    instagram: {
      handle: '@lacasadeldetalle_arg',
      url: 'https://www.instagram.com/lacasadeldetalle_arg/',
    },
    whatsapp: {
      defaultMessage:
        '¡Hola! Me gustaría recibir más información sobre los productos de La Casa del Detalle.',
      displayNumber: '1135939460',
      internationalNumber: '5491135939460',
      // Verificación manual del propietario: abre la conversación LCDD (Fase 05.1).
      // No acredita envío ni recepción de mensajes.
      internationalNumberValidated: true,
    },
  },
} as const
