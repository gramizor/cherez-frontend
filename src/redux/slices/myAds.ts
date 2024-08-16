import { GetMyProAdsPayload, myAdsState } from '@/src/types/redux/myAds'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: myAdsState = {
  error: null,
  loading: false,
  myAds: [],
  myProProfiles: [],
  myProAds: [],
}

const slice = createSlice({
  name: 'myAds',
  initialState,
  reducers: {
    getMyProAdsRequested: (state, action: PayloadAction<GetMyProAdsPayload>) => {
      state.loading = true
    },
    getMyProAdsSucceed: (state, action) => {
      state.myProAds = action.payload.result
      state.error = null
      state.loading = false
    },
    getMyProAdsFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },

    getMyCommonAdsRequested: state => {
      state.loading = true
    },
    getMyCommonAdsSucceed: (state, action) => {
      state.myAds = action.payload.result
      state.error = null
      state.loading = false
    },
    getMyCommonAdsFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },

    setAdPublicRequested: state => {
      state.loading = true
    },
    setAdPublicSucceed: (state, action) => {
      state.error = null
      state.loading = false
    },
    setAdPublicFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },

    setCommonAdsPublicRequested: state => {
      state.loading = true
    },
    setCommonAdsPublicSucceed: state => {
      state.error = null
      state.loading = false
    },
    setCommonAdsPublicFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },

    setProAdsPublicRequested: state => {
      state.loading = true
    },
    setProAdsPublicSucceed: state => {
      state.error = null
      state.loading = false
    },
    setProAdsPublicFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },

    extendAdRequested: state => {
      state.loading = true
    },
    extendAdSucceed: state => {
      state.error = null
      state.loading = false
    },
    extendAdFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },

    deleteAdRequested: state => {
      state.loading = true
    },
    deleteAdSucceed: state => {
      state.error = null
      state.loading = false
    },
    deleteAdFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const {
  getMyProAdsRequested,
  getMyProAdsSucceed,
  getMyProAdsFailed,
  getMyCommonAdsRequested,
  getMyCommonAdsSucceed,
  getMyCommonAdsFailed,
  setAdPublicRequested,
  setAdPublicSucceed,
  setAdPublicFailed,
  setCommonAdsPublicRequested,
  setCommonAdsPublicSucceed,
  setCommonAdsPublicFailed,
  setProAdsPublicRequested,
  setProAdsPublicSucceed,
  setProAdsPublicFailed,
  extendAdRequested,
  extendAdSucceed,
  extendAdFailed,
  deleteAdRequested,
  deleteAdSucceed,
  deleteAdFailed,
} = slice.actions

export default slice.reducer
