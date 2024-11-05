import { GetCitiesType, GetLocationResponseArr } from '@/src/types/redux/location'
import { axiosClient } from '@/src/lib/axios'

const getCities = (payload: GetCitiesType): Promise<{ results: GetLocationResponseArr[]; hasMore: boolean }> => {
  const { order, limit, skip, country, searchLine } = payload
  const params: any = {
    order,
    limit,
    skip,
    where: JSON.stringify({
      country,
      ...(searchLine && { name: { $regex: searchLine } }),
    }),
  }
  const path = 'classes/City'
  return axiosClient.get(path, { params })
}

export { getCities }
