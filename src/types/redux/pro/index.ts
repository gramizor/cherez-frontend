import { CategoriesType } from '@/src/enums/categories'

export interface ProState {
  error: string | null
  loading: boolean
  proImageLimit: number
  proAdsCounter: number
  proProfiles: ProProfile[]
  singleProProfile: ProProfile
}

export interface GetCompanyProfile {
  companyProfileId: string
}

export interface DeleteCompanyProfile {
  profileId: string
}

export interface FindPro {
  ownerId: string
  category: CategoriesType
}

export interface CreateProProfile {
  tariffMonths: number
  category: CategoriesType
  paymentMethods: string[]
}

export interface SaveProProfile {
  companyProfileId: string
  companyName: string
  companyDescription: string
  companyDescription2: string
  contactPersonName: string
  companyLogo: File | string | undefined
  companyBanner: File | string | undefined
  companyImages: File[] | string[]
  isPublic: boolean
}

export interface ProImageLimit {
  limit: number
}

export interface ProAdsCounter {
  limit: number
}

export interface ProProfile {
  objectId: string
  createdAt: string
  updatedAt: string
  owner: {
    objectId: string
  }
  category: string
  name: string
  description: string
  contactPerson: string
  logoUrl: string
  imageUrls: string[]
  public: boolean
  startedAt: {
    iso: string
  }
  endsAt: {
    iso: string
  }
  description2: string
  bannerUrl: string
}
