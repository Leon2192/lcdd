import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { CategoryCard } from '@/components/ui/CategoryCard'
import { Checkbox } from '@/components/ui/Checkbox'
import { Container } from '@/components/ui/Container'
import { Drawer } from '@/components/ui/Drawer'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { ProductCard } from '@/components/ui/ProductCard'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { categories } from '@/config/categories'

const colors = [
  ['Petróleo', 'primary', '#315C5D'],
  ['Marfil', 'background', '#FAF8F5'],
  ['Arena', 'sand', '#EDE3D7'],
  ['Rosa', 'rose', '#DDBFB4'],
  ['Editorial', 'editorial', '#60432E'],
  ['Texto', 'text', '#292522'],
  ['Secundario', 'muted', '#71665D'],
  ['Blanco', 'white', '#FFFFFF'],
  ['Borde', 'border', '#DED4CA'],
  ['Taupe', 'taupe', '#9B8B7E'],
  ['Neutral', 'neutral', '#F2EFEB'],
  ['Éxito', 'success', '#356B4A'],
  ['Error', 'error', '#A33D3D'],
  ['Fondo de éxito', 'success-background', '#EAF3ED'],
] as const

export function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [touched, setTouched] = useState(false)
  return (
    <>
      <div className="demo-intro">
        <Container>
          <Section className="stack">
            <div className="cluster">
              <Badge>Fase 02 · Solo desarrollo</Badge>
              <Badge>Valores exactos propuestos</Badge>
            </div>
            <p className="eyebrow">LCDD · Editorial Boutique</p>
            <h1>Biblioteca visual</h1>
            <p>
              Fundamentos y componentes para revisión. Las fotografías son
              placeholders. Las familias propuestas son Cormorant Garamond y DM
              Sans; se sirven sus archivos locales con licencia OFL-1.1.
            </p>
            <nav
              className="cluster demo-nav"
              aria-label="Secciones del sistema de diseño"
            >
              {[
                'paleta',
                'tipografia',
                'botones',
                'formularios',
                'tarjetas',
                'interacciones',
              ].map((id) => (
                <a key={id} href={`#${id}`}>
                  {id}
                </a>
              ))}
            </nav>
          </Section>
        </Container>
      </div>
      <Container>
        <Section
          id="paleta"
          className="demo-section"
          aria-labelledby="paleta-title"
        >
          <SectionHeading
            id="paleta-title"
            eyebrow="01 · Color"
            description="Dirección artística aprobada; valores hexadecimales propuestos por Marketing."
          >
            Una paleta cálida, un acento petróleo
          </SectionHeading>
          <div className="demo-swatches">
            {colors.map(([label, token, hex]) => (
              <div key={token}>
                <div
                  className="demo-swatch-color"
                  style={{ backgroundColor: `var(--lcdd-${token})` }}
                />
                <p>{label}</p>
                <p className="text-muted">{hex}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section
          id="tipografia"
          className="demo-section"
          aria-labelledby="tipo-title"
        >
          <SectionHeading id="tipo-title" eyebrow="02 · Tipografía">
            La voz editorial
          </SectionHeading>
          <div className="demo-split">
            <div className="demo-panel stack">
              <Badge>Serif local · OFL-1.1</Badge>
              <p className="demo-type">Los detalles hacen la diferencia</p>
              <p className="demo-type">
                <em>Una muestra en cursiva</em>
              </p>
              <p>
                Cormorant Garamond Variable local. Regular 400 y cursiva real;
                fallback Georgia/serif.
              </p>
            </div>
            <div className="demo-panel stack">
              <Badge>Sans local · OFL-1.1</Badge>
              <p>
                Propuesta: DM Sans. Actual: DM Sans Variable local; fallback del
                sistema. Cuerpo de 16 px con interlínea 1.6.
              </p>
              <p>ÁÉÍÓÚ · áéíóú · Ññ · ¿Cómo estás? · ¡Celebramos!</p>
              <p className="text-muted">Texto secundario de muestra.</p>
              <p>
                <strong>Énfasis de interfaz</strong>
              </p>
            </div>
          </div>
        </Section>
        <Section
          id="botones"
          className="demo-section"
          aria-labelledby="botones-title"
        >
          <SectionHeading
            id="botones-title"
            eyebrow="03 · Acciones"
            description="Recorré con Tab para revisar el foco. Hover y presionado responden al puntero."
          >
            Botones y estados
          </SectionHeading>
          <div className="stack">
            <div className="cluster">
              <Button onClick={() => setMessage('Acción de ejemplo activada.')}>
                Acción principal
                <Icon name="arrow" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => setMessage('Acción secundaria activada.')}
              >
                Secundario
              </Button>
              <Button
                variant="outline"
                onClick={() => setMessage('Acción de contorno activada.')}
              >
                Contorno
              </Button>
              <Button
                variant="ghost"
                onClick={() => setMessage('Acción discreta activada.')}
              >
                Discreto
              </Button>
              <IconButton
                label="Acción de lista de ejemplo"
                onClick={() => setMessage('Lista de ejemplo activada.')}
              >
                <Icon name="list" />
              </IconButton>
            </div>
            <div className="cluster">
              <Button disabled>Deshabilitado</Button>
              <Button isPending>Acción pendiente</Button>
              <Badge>Provisional</Badge>
              <Badge tone="success">Estado correcto</Badge>
              <Badge tone="error">Revisar datos</Badge>
            </div>
            <p role="status">{message}</p>
          </div>
        </Section>
        <Section
          id="formularios"
          className="demo-section"
          aria-labelledby="form-title"
        >
          <SectionHeading
            id="form-title"
            eyebrow="04 · Controles"
            description="Ejemplos locales, sin guardar ni enviar datos. No definen campos comerciales obligatorios."
          >
            Una conversación clara
          </SectionHeading>
          <div className="demo-split">
            <div className="demo-panel stack">
              <Input
                label="Campo de ejemplo"
                hint="Probá escribir y navegar con teclado."
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => setTouched(true)}
                {...(touched && !name
                  ? { error: 'Escribí un texto para esta demostración.' }
                  : {})}
              />
              <Input
                label="Campo con error de muestra"
                error="Ejemplo de error asociado al campo."
                defaultValue=""
              />
              <Input label="Campo deshabilitado" disabled value="No editable" />
              <Select label="Selección de ejemplo" defaultValue="">
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                <option value="a">Opción A de muestra</option>
                <option value="b">Opción B de muestra</option>
              </Select>
            </div>
            <div className="demo-panel stack">
              <Textarea
                label="Texto de ejemplo"
                hint="No se envía ni persiste."
              />
              <Checkbox
                label="Casilla de ejemplo"
                hint="No representa una aceptación comercial."
              />
              <Checkbox label="Casilla deshabilitada" disabled />
              <QuantitySelector
                label="Cantidad de demostración"
                min={0}
                max={10}
                value={quantity}
                onChange={setQuantity}
              />
              <p className="text-muted">
                Rango técnico de muestra 0–10. No es un mínimo comercial ni
                aplica a Carpa QR o servicios.
              </p>
            </div>
          </div>
        </Section>
        <Section
          id="tarjetas"
          className="demo-section"
          aria-labelledby="cards-title"
        >
          <SectionHeading
            id="cards-title"
            eyebrow="05 · Tarjetas"
            description="Solo nombres oficiales. Sin descripciones comerciales propuestas, precios ni fotos ficticias."
          >
            El producto como protagonista
          </SectionHeading>
          <div className="product-grid">
            <ProductCard
              name="Vasos personalizados"
              to="/catalogo/producto/P-003"
              note="Muestra visual"
            />
            <ProductCard
              name="Abanicos personalizados"
              to="/catalogo/producto/P-004"
              note="Muestra visual"
            />
            {categories.slice(0, 2).map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                to={`/catalogo/categoria/${category.id}`}
              />
            ))}
          </div>
        </Section>
        <Section id="interacciones" aria-labelledby="interactions-title">
          <SectionHeading
            id="interactions-title"
            eyebrow="06 · Interacción"
            description="Sin reproducción automática. Los controles del carrusel funcionan con teclado y sin arrastrar."
          >
            Espacio para cada detalle
          </SectionHeading>
          <div className="stack">
            <div className="cluster">
              <Button onClick={() => setModalOpen(true)}>
                Abrir modal de muestra
              </Button>
              <Button variant="outline" onClick={() => setDrawerOpen(true)}>
                Abrir panel de muestra
              </Button>
            </div>
            <div className="demo-split">
              <Carousel
                label="Muestras de tarjetas"
                items={[
                  {
                    id: 'P-003',
                    content: (
                      <ProductCard
                        name="Vasos personalizados"
                        to="/catalogo/producto/P-003"
                      />
                    ),
                  },
                  {
                    id: 'P-004',
                    content: (
                      <ProductCard
                        name="Abanicos personalizados"
                        to="/catalogo/producto/P-004"
                      />
                    ),
                  },
                ]}
              />
              <EmptyState
                headingAs="h3"
                title="Sin elementos de muestra"
                description="Este estado vacío no representa un pedido real."
                action={
                  <Button
                    variant="outline"
                    onClick={() => setMessage('Estado vacío revisado.')}
                  >
                    Probar acción
                  </Button>
                }
              />
            </div>
          </div>
        </Section>
      </Container>
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Modal de muestra"
      >
        <div className="stack">
          <p>
            El foco permanece en este diálogo y vuelve al control que lo abrió.
            Escape permite cerrar.
          </p>
          <Input label="Control dentro del modal" />
          <Button onClick={() => setModalOpen(false)}>Listo</Button>
        </div>
      </Modal>
      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Panel de muestra"
      >
        <div className="stack">
          <p>Panel lateral adaptable. No modifica tu pedido.</p>
          <Button onClick={() => setDrawerOpen(false)}>
            Volver a la biblioteca
          </Button>
        </div>
      </Drawer>
    </>
  )
}
