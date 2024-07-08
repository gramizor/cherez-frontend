import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'

export type CreateAdCategoryInfo = {
  [KeysSubcategories.Subcategory]?: string
  [KeysSubcategories.ItemType]?: string
  [KeysSubcategories.AdType]?: string
  [KeysSubcategories.RealEstateType]?: string
  [KeysSubcategories.VehicleType]?: string
  [KeysSubcategories.OfferType]?: string
  [KeysSubcategories.Brand]?: string
  [KeysSubcategories.Model]?: string
  [KeysSubcategories.ReleaseYear]?: number
  [KeysSubcategories.MileageMeasure]?: string
  [KeysSubcategories.Mileage]?: number
  [KeysSubcategories.Condition]?: string
  [KeysSubcategories.FuelType]?: string
  [KeysSubcategories.TransmissionType]?: string
  [KeysSubcategories.BedroomsCount]?: number
  [KeysSubcategories.BathsCount]?: number
  [KeysSubcategories.Area]?: number
  [KeysSubcategories.Furniture]?: boolean
  [KeysSubcategories.Pool]?: boolean
  [KeysSubcategories.Gym]?: boolean
  [KeysSubcategories.Quality]?: string
  [KeysSubcategories.Target]?: string
  [KeysSubcategories.PartNumber]?: string
  [KeysSubcategories.Manufacturer]?: string
  [KeysSubcategories.VehicleColor]?: string
}

export type CreateAdForm = {
  category: CategoriesType | ''
  label: string
  currencyCode: string
  price: number
  categoryInfo: CreateAdCategoryInfo
  country: string
  city: string
  description: string
  asDraft: boolean
  images: File[]
}

export interface SaveAdForm extends CreateAdForm {
  objectId: string | null
}

export interface AdCreateState {
  form: CreateAdForm
  objectId: string | null
  loading: boolean
  error: string | null
}
