import { useEffect } from 'react'
import { localRobots } from '@/config/seo'
import type { PageMetadata as Metadata } from '@/config/seo'
import { siteConfig } from '@/config/site'
export function PageMetadata({ metadata }: { metadata: Metadata }) {
  useEffect(() => {
    document.title = metadata.title
    function meta(
      attribute: 'name' | 'property',
      key: string,
      content: string,
    ) {
      const matches = document.head.querySelectorAll<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      )
      const element = matches[0] ?? document.createElement('meta')
      element.setAttribute(attribute, key)
      element.content = content
      if (!element.isConnected) document.head.append(element)
      matches.forEach((item, index) => {
        if (index > 0) item.remove()
      })
    }
    meta('name', 'description', metadata.description)
    meta('name', 'robots', localRobots)
    meta('property', 'og:title', metadata.title)
    meta('property', 'og:description', metadata.description)
    meta('property', 'og:type', 'website')
    meta('property', 'og:site_name', siteConfig.name)
    meta('property', 'og:locale', siteConfig.locale.replace('-', '_'))
    meta('name', 'twitter:card', 'summary')
    meta('name', 'twitter:title', metadata.title)
    meta('name', 'twitter:description', metadata.description)
  }, [metadata.title, metadata.description])
  return null
}
