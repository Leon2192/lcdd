import type { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { emptyQuotation, quotationResolver } from './schema'
import type { QuotationData } from './schema'
export function QuotationSession({ children }: { children: ReactNode }) {
  const methods = useForm<QuotationData>({
    defaultValues: emptyQuotation,
    resolver: quotationResolver,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  return <FormProvider {...methods}>{children}</FormProvider>
}
