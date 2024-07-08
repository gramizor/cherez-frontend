import { AdsState, OwnerState } from '@/src/types/models'

export interface ParamsState {
  skip: number
  limit: number
}

export interface AccountState {
  error: string | null
  loading: boolean
  loadingAds: boolean
  user: OwnerState | null
  ads: AdsState[]
  loadMore: boolean
  canLoadMore: boolean
  params: ParamsState
}

export interface GetAccountState {
  id: string
}

export interface GetAccountAdsState {
  skip: number
  limit: number
  userId: string
}
