// Interfaz compartida con composición raíz, catálogo y cotización.
export { useOrder } from './use-order'
export { OrderSelection } from './components/OrderSelection'
export { OrderSummary } from './components/OrderSummary'
export { OrderSteps } from './components/OrderSteps'
export { reconcileOrder, orderEnvelope } from './persistence'
export type { OrderLine } from './persistence'
export { getLineLabel } from './rules'
export { OrderToast } from './components/OrderToast'
