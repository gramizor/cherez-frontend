import {
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
} from '@/src/enums/categories'
import { SpecificationItemType } from '@/src/enums/ads'

export type FieldSpecification =
  | CategoryInfoServicesEnum.Subcategory
  | CategoryInfoVehicleEnum.Brand
  | CategoryInfoVehicleEnum.Model
  | CategoryInfoVehicleEnum.ReleaseYear
  | CategoryInfoVehicleEnum.Mileage
  | CategoryInfoVehicleEnum.Color
  | CategoryInfoVehicleEnum.TransmissionType
  | CategoryInfoVehicleEnum.Condition
  | CategoryInfoVehicleEnum.FuelType
  | CategoryInfoRealEstateEnum.RealEstateType
  | CategoryInfoRealEstateEnum.Area
  | CategoryInfoRealEstateEnum.Bedrooms
  | CategoryInfoRealEstateEnum.Pool
  | CategoryInfoRealEstateEnum.Baths
  | CategoryInfoRealEstateEnum.Furniture
  | CategoryInfoDevicesEnum.Subcategory
  | CategoryInfoDevicesEnum.Quality
  | CategoryInfoHouseholdEnum.Subcategory
  | CategoryInfoAnimalsEnum.AdType
  | CategoryInfoPersonalItemsEnum.ItemType
  | CategoryInfoPersonalItemsEnum.Quality
  | CategoryInfoJobsEnum.AdType
  | CategoryInfoHealthItemsEnum.Subcategory
  | CategoryInfoSparePartsEnum.Subcategory

export type AdSpecification = {
  [key in CategoriesType | '']: {
    field: FieldSpecification
    type: SpecificationItemType
    additional?: CategoryInfoVehicleEnum.MileageMeasure
  }[]
}
