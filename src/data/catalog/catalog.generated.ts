// Generado por npm run catalog:sync. No editar manualmente.
// Fuente exclusiva: docs/handoff/productos/PY01_catalogo_publico_v1.0.json
import type { Catalog } from './types'
export const catalogSourceSha256 =
  '5207b6431d612f46412d96396b8ea88368ab0a3b2fd4144b8ebf90f746ee6a6f'
export const officialCatalog = {
  schemaVersion: '1.0',
  catalogVersion: '1.0',
  source: 'PY01 — Product & Catalog Handoff V1.0',
  locale: 'es-AR',
  status: 'preliminary_for_implementation',
  publicationReady: false,
  categories: [
    {
      id: 'kits-para-eventos',
      name: 'Kits para eventos',
      status: 'confirmed',
    },
    {
      id: 'souvenirs-personalizados',
      name: 'Souvenirs personalizados',
      status: 'confirmed',
    },
    {
      id: 'experiencias-y-detalles-para-eventos',
      name: 'Experiencias y detalles para eventos',
      status: 'confirmed',
    },
    {
      id: 'detalles-de-mesa',
      name: 'Detalles de mesa',
      status: 'confirmed',
    },
    {
      id: 'invitaciones-digitales',
      name: 'Invitaciones digitales',
      status: 'confirmed',
    },
  ],
  products: [
    {
      id: 'P-001',
      name: 'Kits antiresaca',
      categoryId: 'kits-para-eventos',
      identityStatus: 'confirmed',
      description: {
        value:
          'Un detalle pensado para cuidar a tus invitados y seguir disfrutando después de una gran celebración.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Contenido, materiales y dimensiones',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Presentaciones y composición',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Diseño y elementos personalizables por definir',
        status: 'pending',
      },
      selection: {
        mode: 'quantity',
        label: 'Cantidad de kits',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-002', 'P-003', 'P-005'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Kit completo',
          context: 'Evento',
          detail: 'Contenido',
          additional: 'Presentaciones',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-002',
      name: 'Kits de baño',
      categoryId: 'kits-para-eventos',
      identityStatus: 'confirmed',
      description: {
        value:
          'Pequeños detalles que hacen que tus invitados se sientan cuidados durante todo el evento.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Contenido, materiales y dimensiones',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Presentaciones y composición',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Diseño y presentación por definir',
        status: 'pending',
      },
      selection: {
        mode: 'quantity',
        label: 'Cantidad de kits',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-001', 'P-010'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Kit completo',
          context: 'Ambientación',
          detail: 'Contenido',
          additional: 'Presentaciones',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-003',
      name: 'Vasos personalizados',
      categoryId: 'souvenirs-personalizados',
      identityStatus: 'confirmed',
      description: {
        value:
          'Un recuerdo práctico y especial, diseñado para acompañar cada brindis de tu celebración.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Material, capacidad y accesorios',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Modelos y colores',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Diseño y técnica por confirmar',
        status: 'pending',
      },
      selection: {
        mode: 'quantity',
        label: 'Cantidad de unidades',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-005', 'P-004', 'P-001'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Vaso aislado',
          context: 'Celebración',
          detail: 'Personalización',
          additional: 'Variantes',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-004',
      name: 'Abanicos personalizados',
      categoryId: 'souvenirs-personalizados',
      identityStatus: 'confirmed',
      description: {
        value:
          'Un detalle que combina utilidad y estilo, pensado para acompañar a tus invitados.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Materiales y dimensiones',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Modelos y colores',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Diseño y técnica por definir',
        status: 'pending',
      },
      selection: {
        mode: 'quantity',
        label: 'Cantidad de unidades',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-005', 'P-003', 'P-010'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Abanico aislado',
          context: 'Evento',
          detail: 'Terminaciones',
          additional: 'Variantes',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-005',
      name: 'Lentes personalizados',
      categoryId: 'souvenirs-personalizados',
      identityStatus: 'confirmed',
      description: {
        value:
          'Sumá diversión y personalidad a los momentos más especiales de tu fiesta.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Materiales y dimensiones',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Modelos y colores',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Diseño y ubicación por definir',
        status: 'pending',
      },
      selection: {
        mode: 'quantity',
        label: 'Cantidad de unidades',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-003', 'P-004', 'P-007'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Lentes aislados',
          context: 'Fiesta',
          detail: 'Personalización',
          additional: 'Variantes',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-006',
      name: 'Diarios personalizados',
      categoryId: 'experiencias-y-detalles-para-eventos',
      identityStatus: 'confirmed',
      description: {
        value:
          'Una manera original de contar tu historia y compartirla con quienes forman parte de ese día.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Papel, dimensiones y cantidad de páginas',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Formatos y diseños',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Contenido, textos, fotografías y diseño por confirmar',
        status: 'pending',
      },
      selection: {
        mode: 'quantity',
        label: 'Cantidad de ejemplares',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-013', 'P-012', 'P-011'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Portada',
          context: 'Ambientación',
          detail: 'Interior',
          additional: 'Diseños',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-007',
      name: 'Estrellitas',
      categoryId: 'experiencias-y-detalles-para-eventos',
      identityStatus: 'confirmed',
      description: {
        value:
          'Un detalle para iluminar los momentos que merecen convertirse en recuerdos inolvidables.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Dimensiones, presentación y contenido incluido',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Formatos y diseños',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Elementos personalizables por confirmar',
        status: 'pending',
      },
      selection: {
        mode: 'quantity',
        label: 'Cantidad de unidades',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-008', 'P-011'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Presentación',
          context: 'Celebración',
          detail: 'Personalización',
          additional: 'Conjunto',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-008',
      name: 'Capitán de mesa',
      categoryId: 'experiencias-y-detalles-para-eventos',
      identityStatus: 'confirmed',
      description: {
        value:
          'Una propuesta divertida para convertir a tus invitados en protagonistas de la celebración.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Materiales, contenido y presentación',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Modelos y diseños',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Textos y elementos gráficos por confirmar',
        status: 'pending',
      },
      selection: {
        mode: 'tables_or_units',
        label: 'Cantidad de mesas o unidades',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-012', 'P-003', 'P-011'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Producto completo',
          context: 'Mesa',
          detail: 'Diseño',
          additional: 'Presentaciones',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-009',
      name: 'Difusores personalizados',
      categoryId: 'souvenirs-personalizados',
      identityStatus: 'confirmed',
      description: {
        value:
          'Un recuerdo delicado que permite revivir la esencia de un día especial.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Capacidad, envase y contenido',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Fragancias y presentaciones',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Diseño y elementos personalizables por confirmar',
        status: 'pending',
      },
      selection: {
        mode: 'quantity',
        label: 'Cantidad de unidades',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-010', 'P-004'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Difusor aislado',
          context: 'Ambientación',
          detail: 'Envase',
          additional: 'Variantes',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-010',
      name: 'Espejitos personalizados',
      categoryId: 'souvenirs-personalizados',
      identityStatus: 'confirmed',
      description: {
        value:
          'Un souvenir delicado, práctico y pensado especialmente para tus invitados.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Materiales y dimensiones',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Modelos, colores y presentaciones',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Diseño y técnica por confirmar',
        status: 'pending',
      },
      selection: {
        mode: 'quantity',
        label: 'Cantidad de unidades',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-004', 'P-009', 'P-002'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Espejito aislado',
          context: 'Ambientación',
          detail: 'Personalización',
          additional: 'Variantes',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-011',
      name: 'Carpa QR',
      categoryId: 'detalles-de-mesa',
      identityStatus: 'confirmed',
      description: {
        value:
          'Una forma sencilla de compartir experiencias digitales con tus invitados durante el evento.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Material, dimensiones y servicio asociado al QR',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Formatos y diseños',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Diseño y destino del QR por confirmar',
        status: 'pending',
      },
      selection: {
        mode: 'quantity',
        label: 'Cantidad de tarjetas',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-012', 'P-006', 'P-013'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Carpa armada',
          context: 'Mesa',
          detail: 'QR y diseño',
          additional: 'Formatos',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-012',
      name: 'Números de mesa',
      categoryId: 'detalles-de-mesa',
      identityStatus: 'confirmed',
      description: {
        value:
          'Organizá cada espacio de tu celebración con detalles que acompañen la estética de tu evento.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Material, dimensiones y soporte',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Formatos y diseños',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Numeración, tipografía y diseño por confirmar',
        status: 'pending',
      },
      selection: {
        mode: 'tables_or_units',
        label: 'Cantidad de mesas o unidades',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'pending',
      },
      relatedProducts: {
        ids: ['P-008', 'P-011'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Número de mesa',
          context: 'Mesa',
          detail: 'Tipografía',
          additional: 'Diseños',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-013',
      name: 'Invitaciones digitales',
      categoryId: 'invitaciones-digitales',
      identityStatus: 'confirmed',
      description: {
        value:
          'El primer encuentro de tus invitados con ese día tan especial, a través de un diseño que refleje tu historia.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Funcionalidades, modalidad de entrega y vigencia',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Modelos, estilos y funcionalidades',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Información del evento y diseño',
        status: 'pending',
      },
      selection: {
        mode: 'service',
        label: 'Servicio digital',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'not_applicable_proposed',
      },
      relatedProducts: {
        ids: ['P-014', 'P-006', 'P-011'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Mockup móvil',
          context: 'Presentación',
          detail: 'Secciones',
          additional: 'Modelos',
        },
      },
      publicationReady: false,
    },
    {
      id: 'P-014',
      name: 'Save the date',
      categoryId: 'invitaciones-digitales',
      identityStatus: 'confirmed',
      description: {
        value:
          'Anticipá tu gran día con una presentación especial para que nadie deje de reservar esa fecha.',
        status: 'proposed',
      },
      characteristics: {
        values: null,
        fieldsToValidate: 'Formato y modalidad de entrega',
        status: 'pending',
      },
      variants: {
        options: null,
        fieldsToValidate: 'Modelos y estilos',
        status: 'pending',
      },
      personalization: {
        options: null,
        proposal: 'Fecha, información del evento y diseño',
        status: 'pending',
      },
      selection: {
        mode: 'service',
        label: 'Servicio digital',
        status: 'proposed',
        minimumQuantity: null,
        minimumQuantityStatus: 'not_applicable_proposed',
      },
      relatedProducts: {
        ids: ['P-013', 'P-006'],
        status: 'proposed',
      },
      images: {
        primary: null,
        gallery: [],
        status: 'pending',
        plannedShots: {
          primary: 'Mockup móvil',
          context: 'Presentación',
          detail: 'Diseño',
          additional: 'Modelos',
        },
      },
      publicationReady: false,
    },
  ],
  collections: [
    {
      id: 'COL-001',
      name: 'Cuidá a tus invitados',
      productIds: ['P-001', 'P-002', 'P-010'],
      status: 'proposed',
    },
    {
      id: 'COL-002',
      name: 'Que empiece la fiesta',
      productIds: ['P-003', 'P-005', 'P-004', 'P-007'],
      status: 'proposed',
    },
    {
      id: 'COL-003',
      name: 'Cada mesa, un detalle',
      productIds: ['P-012', 'P-011', 'P-008'],
      status: 'proposed',
    },
    {
      id: 'COL-004',
      name: 'Recuerdos especiales',
      productIds: ['P-009', 'P-010', 'P-004'],
      status: 'proposed',
    },
    {
      id: 'COL-005',
      name: 'Contá tu historia',
      productIds: ['P-013', 'P-014', 'P-006'],
      status: 'proposed',
    },
  ],
  featuredProducts: {
    ids: null,
    status: 'pending',
  },
  quotation: {
    channel: 'whatsapp',
    status: 'confirmed',
    selectionLabel: {
      value: 'Armá tu pedido',
      status: 'proposed',
    },
  },
  pendingNotes: [
    {
      productId: 'P-011',
      note: 'Confirmar si el servicio digital está incluido o se contrata por separado.',
    },
    {
      productId: 'P-013',
      note: 'Confirmar funcionalidades específicas.',
    },
  ],
  statusDefinitions: {
    confirmed: 'Definición aprobada',
    proposed: 'Propuesta para diseño e implementación preliminar',
    pending: 'Requiere validación antes de publicación',
    not_applicable_proposed: 'Sin selector de unidades en propuesta inicial',
  },
} as const satisfies Catalog
