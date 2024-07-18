import { CategoriesType } from '@/src/enums/categories'

export interface PromotionState {
  error: string | null
  loading: boolean
  promotions: myPromotions[]
  boostedAds: myBoostedAds[]
  largeAds: myBoostedAds[]
}

export interface createAdPromotionRequestState {
  promotionName: 'boost' | 'large'
  tariffDays: number
  paymentMethods: string[]
}

export interface adBoostState {
  adId: string
}

export interface myPromotions {
  objectId: string
  createdAt: string
  updatedAt: string
  user: {
    __type: 'Pointer'
    className: '_User'
    objectId: string
  }
  tariffDays: number
  promotionName: string
}

export interface myBoostedAds {
  objectId: string
  createdAt: Date
  updatedAt: Date
  owner: {
    __type: 'Pointer'
    className: '_User'
    objectId: string
  }
  images: string[]
  label: string
  description: string
  price: number
  currencyCode: string
  country: string
  city: string
  geolocation: {
    __type: string
    latitude: Float32Array
    longitude: Float32Array
  }
  categoryName: string
  categoryInfo: {
    adType: CategoriesType
  }
  public: boolean
  draft: boolean
  publishedAt: {
    __type: string
    iso: Date
  }
  publishedBefore: {
    __type: string
    iso: Date
  }
  largeBefore: {
    __type: string
    iso: Date
  }
  boostedBefore: {
    __type: string
    iso: Date
  }
}
