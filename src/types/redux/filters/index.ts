import { CategoryParams } from '@/src/types/redux/mainSearch'

export interface FiltersState {
  allCurrencies: string[]
  from: number | null
  to: number | null
  currency: string
  categoryParams: CategoryParams[]
}
