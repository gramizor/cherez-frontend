import { CategoriesType } from '@/src/enums/categories'

const categories = [
  CategoriesType.Services,
  CategoriesType.Vehicle,
  CategoriesType.RealEstate,
  CategoriesType.Devices,
  CategoriesType.Household,
  CategoriesType.Animals,
  CategoriesType.PersonalItems,
  CategoriesType.Jobs,
  CategoriesType.HealthItems,
  CategoriesType.SpareParts,
  CategoriesType.Other,
]

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 10,
  },
  largeDesktop: {
    breakpoint: { max: 2000, min: 1540 },
    items: 9,
  },
  desktop: {
    breakpoint: { max: 1540, min: 1200 },
    items: 8,
  },
  largeTablet: {
    breakpoint: { max: 1200, min: 980 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 980, min: 464 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
}

export { categories, responsive }
