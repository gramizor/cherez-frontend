export type GetCitiesType = {
  order?: string;
  limit: string;
  skip: string;
  country: string;
  searchLine?: string;
}

export type LocationResponse = {
  data: GetLocationResponseArr[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

export type GetLocationResponseArr = {
  objectId: string;
  name: string;
  country: string;
  geolocation: { latitude: number; longitude: number };
}

export type CityType = {
  objectId: string;
  name: string;
  country: string;
  geolocation: { latitude: number; longitude: number };
};