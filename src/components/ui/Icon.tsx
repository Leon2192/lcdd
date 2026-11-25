import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

type IconName =
  | 'search'
  | 'menu'
  | 'close'
  | 'list'
  | 'cart'
  | 'arrow'
  | 'previous'
  | 'plus'
  | 'minus'
  | 'message'
  | 'whatsapp'
  | 'instagram'
  | 'heart'
  | 'sparkles'
  | 'truck'
  | 'award'
  | 'gift'
  | 'monitor'
  | 'calendar'
  | 'users'
const paths: Record<Exclude<IconName, 'whatsapp'>, string> = {
  search: 'M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm5.3 12.8L22 22',
  heart:
    'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  sparkles: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z',
  truck:
    'M3 6h12v11H3V6Zm12 5h4l3 4v2h-7M7 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  award: 'M17 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM8 12 6 22l6-3 6 3-2-10',
  gift: 'M3 8h18v4H3V8Zm2 4v9h14v-9M12 8v13M12 8H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z',
  monitor: 'M3 3h18v13H3V3Zm9 13v5M7 21h10',
  calendar: 'M3 5h18v16H3V5Zm0 5h18M7 3v4M17 3v4',
  users:
    'M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM5 21v-3a7 7 0 0 1 14 0v3M19 4a3 3 0 0 1 0 6M22 21v-3a7 7 0 0 0-3-5M5 4a3 3 0 0 0 0 6M2 21v-3a7 7 0 0 1 3-5',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  cart: 'M2 3h3l3 12h11l3-9H6M8 15l-1 3h13M10 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
  list: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  previous: 'M20 12H4m6-6-6 6 6 6',
  plus: 'M12 4v16M4 12h16',
  minus: 'M4 12h16',
  message: 'M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.9-5A9 9 0 1 1 21 11Z',
  instagram:
    'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm9 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1-5h.01',
}

// Iconos geométricos de UI; no representan ni sustituyen el logo institucional.
export function Icon({ name }: { name: IconName }) {
  if (name === 'whatsapp') return <WhatsAppIcon />
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}
