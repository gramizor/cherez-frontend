import { axiosClient } from 'src/lib/axios'
import { ParamsState } from '@/src/types/redux/mainSearch'

const searchAds = (payload: ParamsState) => {
  const { searchText, country, skip, sort, limit, category, categoryParams, city, currencyCode, minPrice, maxPrice } =
    payload
  const path = 'functions/searchAds'
  return axiosClient.post(path, {
    country: country ?? undefined,
    skip,
    sort,
    limit,
    searchText,
    categoryName: category,
    categoryParams,
    city: city ?? undefined,
    currencyCode: currencyCode ?? undefined,
    minPrice: Number(minPrice) || undefined,
    maxPrice: Number(maxPrice) || undefined,
  })
}

export { searchAds }
