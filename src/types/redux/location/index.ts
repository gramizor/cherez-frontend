export type GetCitiesType = {
  order?: string
  limit: string
  skip: string
  country: string
  searchLine?: string
}

export type LocationResponse = {
  data: Array<{
    objectId: string
    name: string
    country: string
    geolocation: { latitude: number; longitude: number }
  }>
  loading: boolean
  error: string | null
  hasMore: boolean
}
