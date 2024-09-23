import { ErrorResponse } from '@/src/types/redux'
import {
  ProState,
  CreateProProfile,
  FindPro,
  SaveProProfile,
  ProProfile,
  DeleteCompanyProfile,
  GetCompanyProfile,
} from '@/src/types/redux/pro'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ProState = {
  error: null,
  loading: false,
  proImageLimit: 0,
  proAdsCounter: 0,
  proProfiles: [],
  singleProProfile: {
    objectId: '',
    createdAt: '',
    updatedAt: '',
    owner: {
      objectId: '',
    },
    category: '',
    name: '',
    description: '',
    contactPerson: '',
    logoUrl: '',
    imageUrls: [],
    public: false,
    startedAt: {
      iso: '',
    },
    endsAt: {
      iso: '',
    },
    description2: '',
    bannerUrl: '',
  },
}

const slice = createSlice({
  name: 'pro',
  initialState,
  reducers: {
    createProProfileRequested: (state, action: PayloadAction<CreateProProfile>) => {
      state.loading = true
      state.error = null
    },
    createProProfileSucceed: (state, action: PayloadAction<ProProfile>) => {
      state.loading = false
      state.singleProProfile = action.payload
      state.error = null
    },
    createProProfileFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    findCompanyProfilesRequested: (state, action: PayloadAction<FindPro>) => {
      state.loading = true
      state.error = null
    },
    findCompanyProfilesSucceed: (state, action: PayloadAction<ProProfile[]>) => {
      state.loading = false
      state.proProfiles = action.payload
      state.error = null
    },
    findCompanyProfilesFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    getMyCompanyProfilesRequested: state => {
      state.loading = true
      state.error = null
    },
    getMyCompanyProfilesSucceed: (state, action: PayloadAction<ProProfile[]>) => {
      state.loading = false
      state.proProfiles = action.payload
      state.error = null
    },
    getMyCompanyProfilesFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    getMyCompanyProfileImagesLimitRequested: state => {
      state.loading = true
      state.error = null
    },
    getMyCompanyProfileImagesLimitSucceed: (state, action: PayloadAction<number>) => {
      state.loading = false
      state.proImageLimit = action.payload
      state.error = null
    },
    getMyCompanyProfileImagesLimitFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    getCompanyProfileAdsCountRequested: state => {
      state.loading = true
      state.error = null
    },
    getCompanyProfileAdsCountSucceed: (state, action: PayloadAction<number>) => {
      state.loading = false
      state.proAdsCounter = action.payload
      state.error = null
    },
    getCompanyProfileAdsCountFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    deleteCompanyProfileRequested: (state, action: PayloadAction<{ profileId: string }>) => {
      state.loading = true
      state.error = null
    },
    deleteCompanyProfileSucceed: (state, action: PayloadAction<{ profileId: string }>) => {
      state.loading = false
      state.error = null
      state.proProfiles = state.proProfiles.filter(profile => profile.objectId !== action.payload.profileId)
    },
    deleteCompanyProfileFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    saveCompanyProfileRequested: (state, action) => {
      state.loading = true
      state.error = null
    },
    saveCompanyProfileSucceed: state => {
      state.loading = false
      state.error = null
    },
    saveCompanyProfileFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },

    resetProProfiles: state => {
      state.proProfiles = []
      state.singleProProfile = initialState.singleProProfile
    },
    getCompanyProfileRequested: (state, action) => {
      state.loading = true
      state.error = null
    },
    getCompanyProfileSucceed: (state, action) => {
      state.loading = false
      state.singleProProfile = action.payload
      state.error = null
    },
    getCompanyProfileFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const {
  createProProfileRequested,
  createProProfileSucceed,
  createProProfileFailed,
  findCompanyProfilesRequested,
  findCompanyProfilesSucceed,
  findCompanyProfilesFailed,
  getMyCompanyProfilesRequested,
  getMyCompanyProfilesSucceed,
  getMyCompanyProfilesFailed,
  getMyCompanyProfileImagesLimitRequested,
  getMyCompanyProfileImagesLimitSucceed,
  getMyCompanyProfileImagesLimitFailed,
  getCompanyProfileAdsCountRequested,
  getCompanyProfileAdsCountSucceed,
  getCompanyProfileAdsCountFailed,
  deleteCompanyProfileRequested,
  deleteCompanyProfileSucceed,
  deleteCompanyProfileFailed,
  saveCompanyProfileRequested,
  saveCompanyProfileSucceed,
  saveCompanyProfileFailed,
  getCompanyProfileFailed,
  getCompanyProfileRequested,
  getCompanyProfileSucceed,
  resetProProfiles,
} = slice.actions

export default slice.reducer
