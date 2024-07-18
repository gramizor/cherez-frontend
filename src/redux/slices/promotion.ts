import { ErrorResponse } from '@/src/types/redux'
import {
  adBoostState,
  createAdPromotionRequestState,
  myBoostedAds,
  myPromotions,
  PromotionState,
} from '@/src/types/redux/promotion'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: PromotionState = {
  error: null,
  loading: false,
  promotions: [],
  boostedAds: [],
  largeAds: [],
}

const slice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {
    createAdPromotionRequested: (state, action: PayloadAction<createAdPromotionRequestState>) => {
      state.loading = true
      state.error = null
    },
    createAdPromotionSucceed: state => {
      state.loading = false
      state.error = null
    },
    createAdPromotionFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    getMyPromotionsRequested: state => {
      state.loading = true
      state.error = null
    },
    getMyPromotionsSucceed: (state, action: PayloadAction<myPromotions[]>) => {
      state.loading = false
      state.promotions = action.payload
      state.error = null
    },
    getMyPromotionsFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    getMyBoostedAdsRequested: state => {
      state.loading = true
      state.error = null
    },
    getMyBoostedAdsSucceed: (state, action: PayloadAction<myBoostedAds[]>) => {
      state.loading = false
      state.error = null
      state.boostedAds = action.payload
    },
    getMyBoostedAdsFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    getMyLargeAdsRequested: state => {
      state.loading = true
      state.error = null
    },
    getMyLargeAdsSucceed: (state, action: PayloadAction<myBoostedAds[]>) => {
      state.loading = false
      state.error = null
      state.largeAds = action.payload
    },
    getMyLargeAdsFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    setAdLargeRequested: (state, action: PayloadAction<adBoostState>) => {
      state.loading = true
      state.error = null
    },
    setAdLargeSucceed: state => {
      state.loading = false
      state.error = null
    },
    setAdLargeFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    enableAdBoostRequested: (state, action: PayloadAction<adBoostState>) => {
      state.loading = true
      state.error = null
    },
    enableAdBoostSucceed: state => {
      state.loading = false
      state.error = null
    },
    enableAdBoostFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const {
  createAdPromotionRequested,
  createAdPromotionSucceed,
  createAdPromotionFailed,
  getMyPromotionsFailed,
  getMyPromotionsRequested,
  getMyPromotionsSucceed,
  getMyBoostedAdsRequested,
  getMyBoostedAdsSucceed,
  getMyBoostedAdsFailed,
  getMyLargeAdsRequested,
  getMyLargeAdsSucceed,
  getMyLargeAdsFailed,
  setAdLargeRequested,
  setAdLargeSucceed,
  setAdLargeFailed,
  enableAdBoostRequested,
  enableAdBoostSucceed,
  enableAdBoostFailed,
} = slice.actions

export default slice.reducer
