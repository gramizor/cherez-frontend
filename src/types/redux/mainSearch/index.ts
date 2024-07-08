import { CountriesType } from '@/src/enums/countries'
import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'
import { AdsState } from '@/src/types/models'
import { OperationsEnum, SortAdsType } from '@/src/enums/redux'

export type CategoryParams = {
  operation: OperationsEnum
  key: KeysSubcategories
  value: string | number[] | number | boolean
}

export interface ParamsState {
  searchText: string
  city: string
  country: CountriesType | ''
  category: CategoriesType | ''
  categoryParams: CategoryParams[]
  sort: SortAdsType
  skip: number
  limit: number
  currencyCode: string
  minPrice: number | null
  maxPrice: number | null
}

export interface MainSearchState {
  error: string | null
  loading: boolean
  params: ParamsState
  collection: AdsState[]
  loadMore: boolean
  canLoadMore: boolean
}
