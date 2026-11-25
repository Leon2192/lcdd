import type { ComponentProps } from 'react'
import { Overlay } from '@/components/ui/Overlay'
export function Drawer(props: Omit<ComponentProps<typeof Overlay>, 'kind'>) {
  return <Overlay {...props} kind="drawer" />
}
