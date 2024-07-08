import {
  AnimalsSubcategories,
  CategoriesType,
  CategoryInfoAnimalsEnum,
  CategoryInfoDevicesEnum,
  CategoryInfoHealthItemsEnum,
  CategoryInfoHouseholdEnum,
  CategoryInfoJobsEnum,
  CategoryInfoPersonalItemsEnum,
  CategoryInfoRealEstateEnum,
  CategoryInfoServicesEnum,
  CategoryInfoSparePartsEnum,
  CategoryInfoVehicleEnum,
  DevicesQualities,
  DevicesSubcategories,
  HealthItemsAdTypes,
  HealthItemsSubcategories,
  HouseholdSubcategories,
  JobsSubcategories,
  PersonalItemsOfferTypes,
  PersonalItemsSubcategories,
  PersonalItemsTargets,
  RealEstateOfferTypes,
  RealEstateSubcategories,
  ServiceSubcategories,
  SparePartsSubcategories,
  VehicleColor,
  VehicleCondition,
  VehicleFuelType,
  VehicleMileageMeasures,
  VehicleSubcategories,
  VehicleTransmissionType,
} from '@/src/enums/categories'

type Avatar = {
  url: string
  name: string
}

type PassportInfo = {
  fullName: string
  birthDate: string
  seriesAndNumber: string
  issueDate: string
  expireDate: string
  country: string
}

export type OwnerState = {
  aboutMe: string
  objectId: string
  createdAt: string
  username: string
  avatar?: Avatar
  nickName: string
  phone: string
  email: string
  rating: number
  reviewsCount: number
  adsCount: number
}

export type CompanyState = {
  category: CategoriesType
  objectId: string
  createdAt: string
  name: string
  description: string
  contactPerson: string
  logoUrl: string
  description2: string
  bannerUrl: string
  imageUrls: string[]
  public: boolean
}

export type User = {
  objectId: string
  username: string
  email: string
  nickName: string
  sessionToken?: string
  createdAt: string
  avatar?: Avatar
  passportInfo?: PassportInfo
}

export type CategoryInfoRealEstate = {
  [CategoryInfoRealEstateEnum.Area]: number
  [CategoryInfoRealEstateEnum.Baths]: number
  [CategoryInfoRealEstateEnum.Bedrooms]: number
  [CategoryInfoRealEstateEnum.Furniture]: boolean
  [CategoryInfoRealEstateEnum.Gym]: boolean
  [CategoryInfoRealEstateEnum.Name]: string
  [CategoryInfoRealEstateEnum.OfferType]: RealEstateOfferTypes
  [CategoryInfoRealEstateEnum.Pool]: boolean
  [CategoryInfoRealEstateEnum.RealEstateType]: RealEstateSubcategories
}

export type CategoryInfoAnimals = {
  [CategoryInfoAnimalsEnum.AdType]: AnimalsSubcategories
}

export type CategoryInfoPersonalItems = {
  [CategoryInfoPersonalItemsEnum.OfferType]: PersonalItemsOfferTypes
  [CategoryInfoPersonalItemsEnum.ItemType]: PersonalItemsSubcategories
  [CategoryInfoPersonalItemsEnum.Quality]: DevicesQualities
  [CategoryInfoPersonalItemsEnum.Target]: PersonalItemsTargets
}

export type CategoryInfoHealthItems = {
  [CategoryInfoHealthItemsEnum.AdType]: HealthItemsAdTypes
  [CategoryInfoHealthItemsEnum.Subcategory]: HealthItemsSubcategories
}

export type CategoryInfoHousehold = {
  [CategoryInfoHouseholdEnum.Quality]: DevicesQualities
  [CategoryInfoHouseholdEnum.Subcategory]: HouseholdSubcategories
}

export type CategoryInfoJobs = {
  [CategoryInfoJobsEnum.AdType]: JobsSubcategories
}

export type CategoryInfoServices = {
  [CategoryInfoServicesEnum.Subcategory]: ServiceSubcategories
}

export type CategoryInfoSpareParts = {
  [CategoryInfoSparePartsEnum.Subcategory]: ServiceSubcategories
  [CategoryInfoSparePartsEnum.Quality]: SparePartsSubcategories
  [CategoryInfoSparePartsEnum.Manufacturer]: string
  [CategoryInfoSparePartsEnum.PartNumber]: string
}

export type CategoryInfoVehicle = {
  [CategoryInfoVehicleEnum.VehicleType]: VehicleSubcategories
  [CategoryInfoVehicleEnum.Quality]: DevicesQualities
  [CategoryInfoVehicleEnum.Condition]: VehicleCondition
  [CategoryInfoVehicleEnum.MileageMeasure]: VehicleMileageMeasures
  [CategoryInfoVehicleEnum.Color]: VehicleColor
  [CategoryInfoVehicleEnum.TransmissionType]: VehicleTransmissionType
  [CategoryInfoVehicleEnum.FuelType]: VehicleFuelType
  [CategoryInfoVehicleEnum.Mileage]: number
  [CategoryInfoVehicleEnum.ReleaseYear]: number
  [CategoryInfoVehicleEnum.Brand]: string
  [CategoryInfoVehicleEnum.Model]: string
}

export type CategoryInfoDevices = {
  [CategoryInfoDevicesEnum.Subcategory]: DevicesQualities
  [CategoryInfoDevicesEnum.Quality]: DevicesSubcategories
  [CategoryInfoDevicesEnum.Brand]: string
}

export type CategoryInfo =
  | CategoryInfoRealEstate
  | CategoryInfoAnimals
  | CategoryInfoPersonalItems
  | CategoryInfoHealthItems
  | CategoryInfoHousehold
  | CategoryInfoJobs
  | CategoryInfoServices
  | CategoryInfoSpareParts
  | CategoryInfoVehicle
  | CategoryInfoDevices

export type AdsDateType = {
  iso: string
  __type: string
}

export type AdsState = {
  categoryInfo: CategoryInfo
  categoryName: CategoriesType
  public: boolean
  city: string
  description: string
  country: string
  label: string
  objectId: string
  currencyCode: string
  price: number
  images: string[]
  largeBefore?: AdsDateType
  publishedAt: AdsDateType
  owner: {
    objectId: string
  }
  geolocation: {
    latitude: number
    longitude: number
  }
}
