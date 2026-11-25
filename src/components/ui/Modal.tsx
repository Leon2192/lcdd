import type { ComponentProps } from 'react'
import { Overlay } from '@/components/ui/Overlay'
export function Modal(props: Omit<ComponentProps<typeof Overlay>, 'kind'>) {
  return <Overlay {...props} kind="modal" />
}
