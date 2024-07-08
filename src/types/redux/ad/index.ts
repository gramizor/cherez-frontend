import { AdsState, CompanyState, OwnerState } from '@/src/types/models'
import { CategoriesType } from '@/src/enums/categories'

export interface AdState {
  error: string | null
  loading: boolean
  loadingOwner: boolean
  currentAd: AdsState | null
  owner: OwnerState | null
  companyProfile: CompanyState | null
}

export interface ParamsState {
  adId: string
}

export interface FindCompanyProfilesState {
  ownerId: string
  category: CategoriesType
}

export interface GetOwnerState {
  id: string
}

export interface StartChatByIdState {
  adId: string
  firstMessageText: string
}
