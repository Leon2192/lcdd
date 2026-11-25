export type ValidationStatus = 'confirmed' | 'proposed' | 'pending'
export type SelectionMode = 'quantity' | 'tables_or_units' | 'service'
export type CatalogImage = {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
  readonly origin?: 'lcdd-supplied'
  readonly fit?: 'contain'
  readonly objectPosition?: `${number}% ${number}%`
}
export type Category = {
  readonly id: string
  readonly name: string
  readonly status: ValidationStatus
}
export type Product = {
  readonly id: string
  readonly name: string
  readonly categoryId: string
  readonly identityStatus: ValidationStatus
  readonly description: {
    readonly value: string | null
    readonly status: ValidationStatus
  }
  readonly characteristics: {
    readonly values: readonly string[] | null
    readonly fieldsToValidate: string
    readonly status: ValidationStatus
  }
  readonly variants: {
    readonly options: readonly string[] | null
    readonly fieldsToValidate: string
    readonly status: ValidationStatus
  }
  readonly personalization: {
    readonly options: readonly string[] | null
    readonly proposal: string
    readonly status: ValidationStatus
  }
  readonly selection: {
    readonly mode: SelectionMode
    readonly label: string
    readonly status: ValidationStatus
    readonly minimumQuantity: number | null
    readonly minimumQuantityStatus: ValidationStatus | 'not_applicable_proposed'
  }
  readonly relatedProducts: {
    readonly ids: readonly string[]
    readonly status: ValidationStatus
  }
  readonly images: {
    readonly primary: string | null
    readonly gallery: readonly string[]
    readonly status: ValidationStatus
    readonly plannedShots: {
      readonly primary: string
      readonly context: string
      readonly detail: string
      readonly additional: string
    }
  }
  readonly publicationReady: boolean
}
export type Catalog = {
  readonly schemaVersion: string
  readonly catalogVersion: string
  readonly source: string
  readonly locale: string
  readonly status: 'preliminary_for_implementation'
  readonly publicationReady: boolean
  readonly categories: readonly Category[]
  readonly products: readonly Product[]
  readonly collections: readonly {
    readonly id: string
    readonly name: string
    readonly productIds: readonly string[]
    readonly status: ValidationStatus
  }[]
  readonly featuredProducts: {
    readonly ids: readonly string[] | null
    readonly status: ValidationStatus
  }
  readonly quotation: {
    readonly channel: 'whatsapp'
    readonly status: ValidationStatus
    readonly selectionLabel: {
      readonly value: string
      readonly status: ValidationStatus
    }
  }
  readonly pendingNotes: readonly {
    readonly productId: string
    readonly note: string
  }[]
  readonly statusDefinitions: Readonly<
    Record<ValidationStatus | 'not_applicable_proposed', string>
  >
}
