import { GetCitiesType, LocationResponse } from '@/src/types/redux/location'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: LocationResponse = {
  data: [],
  loading: false,
  error: null,
  hasMore: true,
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    getLocationRequested: (state, action: PayloadAction<GetCitiesType>) => {
      state.loading = true
      state.error = null
    },
    getLocationSucceed: (state, action: PayloadAction<{ results: LocationResponse['data']; hasMore: boolean }>) => {
      state.loading = false
      state.data = [...state.data, ...action.payload.results]
      state.hasMore = action.payload.hasMore
    },
    getLocationFailed: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { getLocationRequested, getLocationSucceed, getLocationFailed } = locationSlice.actions
export default locationSlice.reducer
