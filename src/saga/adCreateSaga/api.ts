import { axiosClient } from 'src/lib/axios'
import { CreateAdForm, SaveAdForm } from '@/src/types/redux/adCreate'
import axios from 'axios'
import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'

const createAd = (payload: CreateAdForm) => {
  const { country, city, categoryInfo, category, price, label, currencyCode, asDraft, description } = payload
  const path = 'functions/createAd'
  return axiosClient.post(path, {
    country,
    city,
    categoryInfo,
    categoryName: category,
    price,
    label,
    currencyCode,
    asDraft,
    description,
  })
}

const saveServicesAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload

  const path = 'functions/saveServicesAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    subcategory: categoryInfo.subcategory,
    images: files,
  })
}

const saveVehicleAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload

  const path = 'functions/saveVehicleAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    images: files,
    vehicleType: categoryInfo[KeysSubcategories.VehicleType],
    offerType: categoryInfo[KeysSubcategories.OfferType],
    quality: categoryInfo[KeysSubcategories.Quality],
    condition: categoryInfo[KeysSubcategories.Condition],
    mileageMeasure: categoryInfo[KeysSubcategories.MileageMeasure],
    transmissionType: categoryInfo[KeysSubcategories.TransmissionType],
    fuelType: categoryInfo[KeysSubcategories.FuelType],
    mileage: categoryInfo[KeysSubcategories.Mileage],
    releaseYear: categoryInfo[KeysSubcategories.ReleaseYear],
    brand: categoryInfo[KeysSubcategories.Brand],
    model: categoryInfo[KeysSubcategories.Model],
    color: categoryInfo[KeysSubcategories.VehicleColor],
  })
}

const saveSparePartsAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload

  const path = 'functions/saveSparePartsAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    images: files,
    quality: categoryInfo[KeysSubcategories.Quality],
    subcategory: categoryInfo[KeysSubcategories.Subcategory],
    manufacturer: categoryInfo[KeysSubcategories.Manufacturer],
    partNumber: categoryInfo[KeysSubcategories.PartNumber],
  })
}

const saveRealEstateAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload

  const path = 'functions/saveRealEstateAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    images: files,
    offerType: categoryInfo[KeysSubcategories.OfferType],
    realEstateType: categoryInfo[KeysSubcategories.RealEstateType],
    area: categoryInfo[KeysSubcategories.Area],
    bedrooms: categoryInfo[KeysSubcategories.BedroomsCount],
    baths: categoryInfo[KeysSubcategories.BathsCount],
    furniture: categoryInfo[KeysSubcategories.Furniture],
    pool: categoryInfo[KeysSubcategories.Pool],
    gym: categoryInfo[KeysSubcategories.Gym],
  })
}

const saveDevicesAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload

  const path = 'functions/saveDevicesAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    images: files,
    quality: categoryInfo[KeysSubcategories.Quality],
    subcategory: categoryInfo[KeysSubcategories.Subcategory],
    brand: categoryInfo[KeysSubcategories.Brand],
  })
}

const saveHouseholdAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload

  const path = 'functions/saveHouseholdAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    images: files,
    quality: categoryInfo[KeysSubcategories.Quality],
    subcategory: categoryInfo[KeysSubcategories.Subcategory],
  })
}

const saveAnimalsAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload

  const path = 'functions/saveAnimalsAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    images: files,
    adType: categoryInfo[KeysSubcategories.AdType],
  })
}

const savePersonalItemsAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload

  const path = 'functions/savePersonalItemsAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    images: files,
    offerType: categoryInfo[KeysSubcategories.OfferType],
    quality: categoryInfo[KeysSubcategories.Quality],
    target: categoryInfo[KeysSubcategories.Target],
    itemType: categoryInfo[KeysSubcategories.ItemType],
  })
}

const saveJobsAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload

  const path = 'functions/saveJobsAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    images: files,
    adType: categoryInfo[KeysSubcategories.AdType],
  })
}

const saveHealthItemsAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload
  const path = 'functions/saveHealthItemsAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    images: files,
    adType: categoryInfo[KeysSubcategories.AdType],
    subcategory: categoryInfo[KeysSubcategories.Subcategory],
  })
}

const saveOtherAd = async (payload: SaveAdForm, files: string[]) => {
  const { objectId, country, city, categoryInfo, price, label, currencyCode, asDraft, description } = payload
  const path = 'functions/saveOtherAd'
  return axiosClient.post(path, {
    asDraft,
    adId: objectId,
    label,
    description,
    price,
    currencyCode,
    countryCode: country,
    city,
    images: files,
  })
}

const loadImages = async (files: string[], images: (File | string)[], objectId: string, token: string) => {
  await Promise.all(
    images.map(image => {
      if (typeof image === 'string') {
        files.push(image)
      } else {
        return axios
          .create({
            baseURL: process.env.API_SERVER_URL,
            headers: {
              Accept: 'application/json',
              'X-Parse-Application-Id': process.env.APP_ID,
              'Content-Type': image.type,
              'X-Parse-Session-Token': token,
            },
          })
          .post(`files/${objectId}_adImage`, image)
          .then(res => {
            files.push(res.data.url)
          })
          .catch(error => console.log('error', error))
      }
    })
  )
}

const saveAd = async (payload: SaveAdForm, token: string) => {
  const files: string[] = []
  if (payload.objectId) {
    await loadImages(files, payload.images, payload.objectId, token)
  }

  switch (payload.category) {
    case CategoriesType.Services:
      return saveServicesAd(payload, files)
    case CategoriesType.Vehicle:
      return saveVehicleAd(payload, files)
    case CategoriesType.SpareParts:
      return saveSparePartsAd(payload, files)
    case CategoriesType.RealEstate:
      return saveRealEstateAd(payload, files)
    case CategoriesType.Devices:
      return saveDevicesAd(payload, files)
    case CategoriesType.Household:
      return saveHouseholdAd(payload, files)
    case CategoriesType.Animals:
      return saveAnimalsAd(payload, files)
    case CategoriesType.PersonalItems:
      return savePersonalItemsAd(payload, files)
    case CategoriesType.Jobs:
      return saveJobsAd(payload, files)
    case CategoriesType.HealthItems:
      return saveHealthItemsAd(payload, files)
    case CategoriesType.Other:
      return saveOtherAd(payload, files)
    default:
      return saveOtherAd(payload, files)
  }
}

export { createAd, saveServicesAd, saveVehicleAd, saveAd }
