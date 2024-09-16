import { myAdsState, SetAdPublicPayload } from '@/src/types/redux/myAds'
import { addOneMonthToDate } from '@/src/utils/dateHelper'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: myAdsState = {
  error: null,
  loading: false,
  myAds: [],
  myProProfiles: [],
  myProAds: [],
  params: {
    skip: 0,
    limit: 5,
  },
  proAdsCount: 0,
  isActive: false,
}

const slice = createSlice({
  name: 'myAds',
  initialState,
  reducers: {
    getMyProAdsCountRequested: state => {
      state.loading = true
      state.error = null
    },

    getMyProAdsCountSucceed: (state, action) => {
      state.loading = false
      state.proAdsCount = action.payload.result
      state.error = null
    },

    getMyProAdsCountFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },

    getIsMyProAdsActiveRequested: state => {
      state.loading = true
    },

    getIsMyProAdsActiveSucceed: (state, action) => {
      state.loading = false
      state.isActive = action.payload.result
      state.error = null
    },

    getIsMyProAdsActiveFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },

    setLimit: (state, { payload }) => {
      state.loading = false
      state.params.limit = payload
    },

    getMyProAdsRequested: (state, action) => {
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

    setAdPublicRequested: (state, action: PayloadAction<SetAdPublicPayload>) => {
      state.loading = true
    },
    setAdPublicSucceed: (state, action: PayloadAction<{ adId: string; isPublic: boolean }>) => {
      const commonAdIndex = state.myAds.findIndex(ad => ad.objectId === action.payload.adId)
      if (commonAdIndex !== -1) {
        state.myAds[commonAdIndex].public = action.payload.isPublic
      }
      const proAdIndex = state.myProAds.findIndex(ad => ad.objectId === action.payload.adId)
      if (proAdIndex !== -1) {
        state.myProAds[proAdIndex].public = action.payload.isPublic
      }
      state.error = null
      state.loading = false
    },
    setAdPublicFailed: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false
      state.error = action.payload.error
    },

    setCommonAdsPublicRequested: (state, action) => {
      state.loading = true
    },
    setCommonAdsPublicSucceed: (state, action) => {
      state.isActive = action.payload.isPublic
      state.myAds = state.myAds.map(ad => (ad.draft === false ? { ...ad, public: action.payload.isPublic } : ad))
      state.error = null
      state.loading = false
    },
    setCommonAdsPublicFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },

    setProAdsPublicRequested: (state, action) => {
      state.loading = true
    },
    setProAdsPublicSucceed: (state, action) => {
      state.isActive = action.payload.isPublic
      state.myProAds = state.myProAds.map(ad => (ad.draft === false ? { ...ad, public: action.payload.isPublic } : ad))
      state.error = null
      state.loading = false
    },
    setProAdsPublicFailed: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false
      state.error = action.payload.error
    },

    extendAdRequested: (state, action: PayloadAction<string>) => {
      state.loading = true
    },
    extendAdSucceed: (state, action: PayloadAction<{ adId: string }>) => {
      const commonAdIndex = state.myAds.findIndex(ad => ad.objectId === action.payload.adId)
      if (commonAdIndex !== -1) {
        const commonAd = state.myAds[commonAdIndex]
        if (commonAd.publishedBefore) {
          commonAd.publishedBefore.iso = addOneMonthToDate(new Date()).toISOString()
        }
      }

      const proAdIndex = state.myProAds.findIndex(ad => ad.objectId === action.payload.adId)
      if (proAdIndex !== -1) {
        const proAd = state.myProAds[proAdIndex]
        if (proAd.publishedBefore) {
          proAd.publishedBefore.iso = addOneMonthToDate(new Date()).toISOString()
        }
      }

      state.error = null
      state.loading = false
    },
    extendAdFailed: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false
      state.error = action.payload.error
    },

    deleteAdRequested: (state, action) => {
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

    clearMyProAds: state => {
      state.myProAds = []
    },

    showMoreRequested: (state, action: PayloadAction<{ skip: number; limit: number }>) => {
      state.loading = true
    },
    showMoreSucceed: (state, action: PayloadAction<{ result: any[] }>) => {
      state.myProAds = [...state.myProAds, ...action.payload.result]
      state.loading = false
      state.error = null
    },
    showMoreFailed: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const {
  setLimit,
  clearMyProAds,
  showMoreRequested,
  showMoreSucceed,
  showMoreFailed,
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
  getMyProAdsCountRequested,
  getMyProAdsCountSucceed,
  getMyProAdsCountFailed,
  getIsMyProAdsActiveRequested,
  getIsMyProAdsActiveSucceed,
  getIsMyProAdsActiveFailed,
} = slice.actions

export default slice.reducer
