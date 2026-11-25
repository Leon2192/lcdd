import { z } from 'zod'
import type { Resolver } from 'react-hook-form'
import { isCalendarDate } from '@/lib/event-date'
export { isCalendarDate } from '@/lib/event-date'
// Opciones aprobadas expresamente por el propietario; campo opcional.
export const eventTypes = [
  'Fiesta de XV',
  'Casamiento',
  'Cumpleaños',
  'Otro',
] as const
export const quotationSchema = z
  .object({
    name: z.string().trim(),
    eventType: z.union([z.literal(''), z.enum(eventTypes)]),
    eventDate: z
      .string()
      .trim()
      .refine(
        (value) => !value || isCalendarDate(value),
        'Ingresá una fecha válida o dejala por definir.',
      ),
    dateUnknown: z.boolean(),
    location: z.string().trim(),
    comments: z.string().trim(),
  })
  .superRefine((data, context) => {
    if (data.dateUnknown && data.eventDate)
      context.addIssue({
        code: 'custom',
        path: ['eventDate'],
        message:
          'Elegí una fecha o marcala por definir, sin combinar ambas opciones.',
      })
  })
export type QuotationData = z.infer<typeof quotationSchema>
export const emptyQuotation: QuotationData = {
  name: '',
  eventType: '',
  eventDate: '',
  dateUnknown: false,
  location: '',
  comments: '',
}
// Integración tipada RHF/Zod sin agregar un paquete de resolvers.
export const quotationResolver: Resolver<QuotationData> = async (values) => {
  const parsed = quotationSchema.safeParse(values)
  if (parsed.success) return { values: parsed.data, errors: {} }
  const errors: Partial<
    Record<keyof QuotationData, { type: string; message: string }>
  > = {}
  for (const issue of parsed.error.issues) {
    const field = issue.path[0]
    if (
      field === 'name' ||
      field === 'eventType' ||
      field === 'eventDate' ||
      field === 'dateUnknown' ||
      field === 'location' ||
      field === 'comments'
    )
      errors[field] = { type: 'validate', message: issue.message }
  }
  return { values: {}, errors }
}
