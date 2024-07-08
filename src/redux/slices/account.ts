import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrorResponse } from '@/src/types/redux'
import { AccountState } from '@/src/types/redux/account'
import { forEach } from 'lodash'

const initialState: AccountState = {
  loading: false,
  loadingAds: false,
  error: null,
  user: null,
  ads: [],
  canLoadMore: true,
  loadMore: false,
  params: {
    skip: 0,
    limit: 12,
  },
}

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountAdsSearchParams: (state, action) => {
      forEach(action.payload, (value, key: any) => {
        ;(state.params as any)[key] = value
      })
    },
    getAccountRequested: (state, action) => {
      state.loading = true
    },
    getAccountSucceed: (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    getAccountFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    setLoadMore: state => {
      state.loadMore = !state.loadMore
    },
    getAccountAdsRequested: state => {
      state.loadingAds = true
    },
    getAccountAdsSucceed: (state, action) => {
      state.ads = state.loadMore ? [...state.ads, ...action.payload] : action.payload
      state.canLoadMore = action.payload.length === 12
      state.loadMore = false
      state.loadingAds = false
      state.error = null
    },
    getAccountAdsFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loadingAds = false
    },
    setPhoneRequested: (state, action) => {
      state.loading = true
    },
    setPhoneSucceed: state => {
      state.loading = false
      state.error = null
    },
    setPhoneFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    setAboutMeRequested: (state, action) => {
      state.loading = true
    },
    setAboutMeSucceed: state => {
      state.loading = false
      state.error = null
    },
    setAboutMeFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    setPassportInfoRequested: (state, action) => {
      state.loading = true
    },
    setPassportInfoSucceed: state => {
      state.loading = false
      state.error = null
    },
    setPassportInfoFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
  },
})

export const {
  getAccountRequested,
  getAccountSucceed,
  getAccountFailed,
  getAccountAdsRequested,
  getAccountAdsSucceed,
  getAccountAdsFailed,
  setLoadMore,
  setAccountAdsSearchParams,
  setPhoneFailed,
  setPhoneSucceed,
  setPhoneRequested,
  setAboutMeSucceed,
  setAboutMeFailed,
  setAboutMeRequested,
  setPassportInfoSucceed,
  setPassportInfoRequested,
  setPassportInfoFailed,
} = slice.actions

export default slice.reducer
