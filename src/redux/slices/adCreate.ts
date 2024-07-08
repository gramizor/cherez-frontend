import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { forEach } from 'lodash'
import { AdCreateState } from '@/src/types/redux/adCreate'
import { ErrorResponse } from '@/src/types/redux'

const initialState: AdCreateState = {
  form: {
    category: '',
    label: '',
    currencyCode: 'USD',
    price: 0,
    categoryInfo: {},
    country: '',
    city: '',
    description: '',
    asDraft: true,
    images: [],
  },
  loading: false,
  error: null,
  objectId: null,
}

const slice = createSlice({
  name: 'adCreate',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null
    },
    setField: (state, action) => {
      forEach(action.payload, (value, key: any) => {
        ;(state.form as any)[key] = value
      })
    },
    createAdRequested: (state, action) => {
      state.loading = true
    },
    createAdSucceed: (state, action) => {
      state.loading = false
      state.error = null
    },
    createAdFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    saveServicesAdRequested: (state, action) => {
      state.loading = true
    },
    saveVehicleAdRequested: (state, action) => {
      state.loading = true
    },
    saveAdSucceed: (state, action) => {
      state.loading = false
      state.error = null
    },
    saveAdFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
  },
})

export const {
  clearError,
  setField,
  createAdSucceed,
  createAdRequested,
  createAdFailed,
  saveServicesAdRequested,
  saveAdSucceed,
  saveAdFailed,
  saveVehicleAdRequested,
} = slice.actions

export default slice.reducer
