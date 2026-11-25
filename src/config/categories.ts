import { categories as officialCategories } from '@/data/catalog/catalog'
export const categories = officialCategories.map(({ id, name }) => ({
  id,
  name,
}))
