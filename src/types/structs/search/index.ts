import {
  AnimalsSubcategories,
  CategoriesType,
  DevicesQualities,
  DevicesSubcategories,
  HealthItemsAdTypes,
  HealthItemsSubcategories,
  HouseholdSubcategories,
  JobsSubcategories,
  KeysSubcategories,
  OtherSubcategories,
  PersonalItemsOfferTypes,
  PersonalItemsSubcategories,
  PersonalItemsTargets,
  RealEstateAddons,
  RealEstateCount,
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

export type CategorySearch =
  | ServiceSubcategories
  | VehicleSubcategories
  | RealEstateSubcategories
  | DevicesSubcategories
  | HouseholdSubcategories
  | AnimalsSubcategories
  | PersonalItemsSubcategories
  | JobsSubcategories
  | HealthItemsSubcategories
  | HealthItemsAdTypes
  | SparePartsSubcategories
  | OtherSubcategories
  | []

export type AdditionalParamSearch =
  | RealEstateOfferTypes
  | VehicleMileageMeasures
  | VehicleTransmissionType
  | VehicleFuelType
  | VehicleColor
  | VehicleCondition
  | RealEstateCount
  | RealEstateAddons
  | DevicesQualities
  | PersonalItemsOfferTypes
  | PersonalItemsTargets
  | HealthItemsAdTypes
  | []

export type AdditionalElement = {
  array: AdditionalParamSearch[]
  key: KeysSubcategories | null
}

export type CategoriesSearch = {
  [key in CategoriesType | '']: {
    array: CategorySearch[]
    key: KeysSubcategories | null
    additional: AdditionalElement[]
    checkAdditional: boolean
  }
}
