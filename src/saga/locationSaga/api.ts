import axios from 'axios'
import { GetCitiesType } from '@/src/types/redux/location'

const getCities = (payload: GetCitiesType) => {
  const { order, limit, skip, country, searchLine } = payload
  const params: any = {
    order,
    limit,
    skip,
    where: JSON.stringify({
      country,
      ...(searchLine && { name: { $regex: searchLine } }), // Используем regex для поиска по названию города
    }),
  }
  const path = 'classes/City'
  return axios.get(path, { params })
}

export { getCities }
