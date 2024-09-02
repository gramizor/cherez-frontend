import { AdsState, CompanyState } from '../../models'
import { ProProfile } from '../pro'

export interface GetMyProAdsPayload {
  skip: number
  limit: number
}

export interface SetAdPublicPayload {
  adId: string
  isPublic: boolean
}

export interface isPublicPayload {
  isPublic: boolean
}

export interface adIdPayload {
  adId: string
}

export interface myAdsState {
  error: string | null
  loading: boolean
  myAds: AdsState[]
  myProProfiles: CompanyState[]
  myProAds: myProAd[]
  params: {
    skip: number
    limit: number
  }
  isActive: boolean
  proAdsCount: number
}

export interface myProAd {
  isActive: unknown
  objectId: string
  createdAt: string
  updatedAt: string
  owner: {
    __type: string
    className: string
    objectId: string
  }
  images: string[]
  label: string
  description: string
  price: number
  currencyCode: string
  country: string
  city: string
  geolocation?: {
    __type: string
    latitude: number
    longitude: number
  }
  categoryName: string
  categoryInfo: {
    adType: string
  }
  public: boolean
  draft: boolean
  publishedAt: {
    __type: string
    iso: string
  }
  publishedBefore: {
    __type: string
    iso: string
  }
  largeBefore: {
    __type: string
    iso: string
  }
  boostedBefore?: {
    __type: string
    iso: string
  }
}
