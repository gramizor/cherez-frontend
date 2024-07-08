import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrorResponse } from '@/src/types/redux'
import { AdState } from '@/src/types/redux/ad'

const initialState: AdState = {
  loading: false,
  loadingOwner: false,
  error: null,
  currentAd: null,
  owner: null,
  companyProfile: null,
}

const slice = createSlice({
  name: 'ad',
  initialState,
  reducers: {
    getAdRequested: (state, action) => {
      state.loading = true
    },
    getAdSucceed: (state, action) => {
      state.currentAd = action.payload
      state.error = null
    },
    getAdFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
    },
    findCompanyProfilesRequested: (state, action) => {
      state.loading = true
    },
    findCompanyProfilesSucceed: (state, action) => {
      state.loading = false
      state.error = null
      if (action.payload.length > 0) {
        state.companyProfile = action.payload[0]
      }
    },
    findCompanyProfilesFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    getOwnerRequested: (state, action) => {
      state.loadingOwner = true
    },
    getOwnerSucceed: (state, action) => {
      state.owner = action.payload
      state.loadingOwner = false
      state.error = null
    },
    getOwnerFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loadingOwner = false
    },

    startChatByAdRequested: (state, action) => {},
    startChatByAdSucceed: state => {
      state.error = null
    },
    startChatByAdFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
    },
  },
})

export const {
  getAdRequested,
  getAdFailed,
  getAdSucceed,
  startChatByAdRequested,
  startChatByAdSucceed,
  startChatByAdFailed,
  getOwnerFailed,
  getOwnerRequested,
  getOwnerSucceed,
  findCompanyProfilesRequested,
  findCompanyProfilesSucceed,
  findCompanyProfilesFailed,
} = slice.actions

export default slice.reducer
