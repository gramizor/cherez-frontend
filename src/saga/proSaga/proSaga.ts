import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  getCompanyProfile,
  findCompanyProfiles,
  getMyCompanyProfiles,
  getMyCompanyProfileImagesLimit,
  getCompanyProfileAdsCount,
  deleteCompanyProfile,
  createCompanyProfile,
  saveCompanyProfile,
} from './api'
import {
  createProProfileFailed,
  createProProfileRequested,
  createProProfileSucceed,
  findCompanyProfilesFailed,
  findCompanyProfilesRequested,
  findCompanyProfilesSucceed,
  getMyCompanyProfilesFailed,
  getMyCompanyProfilesRequested,
  getMyCompanyProfilesSucceed,
  getMyCompanyProfileImagesLimitFailed,
  getMyCompanyProfileImagesLimitRequested,
  getMyCompanyProfileImagesLimitSucceed,
  getCompanyProfileAdsCountFailed,
  getCompanyProfileAdsCountRequested,
  getCompanyProfileAdsCountSucceed,
  deleteCompanyProfileFailed,
  deleteCompanyProfileRequested,
  deleteCompanyProfileSucceed,
  saveCompanyProfileFailed,
  saveCompanyProfileRequested,
  saveCompanyProfileSucceed,
  getCompanyProfileFailed,
  getCompanyProfileRequested,
  getCompanyProfileSucceed,
} from '@/src/redux/slices/pro'
import {
  CreateProProfile,
  DeleteCompanyProfile,
  FindPro,
  GetCompanyProfile,
  SaveProProfile,
} from '@/src/types/redux/pro'

function* createProProfileSaga(action: PayloadAction<CreateProProfile>) {
  try {
    const {
      data: { result },
    } = yield call(createCompanyProfile, action.payload)
    yield put(createProProfileSucceed(result))
  } catch (error: any) {
    yield put(createProProfileFailed(error.response.data))
  }
}

function* findCompanyProfilesSaga(action: PayloadAction<FindPro>) {
  try {
    const {
      data: { result },
    } = yield call(findCompanyProfiles, action.payload)
    yield put(findCompanyProfilesSucceed(result))
  } catch (error: any) {
    yield put(findCompanyProfilesFailed(error.response.data))
  }
}

function* getCompanyProfileSaga(action: PayloadAction<GetCompanyProfile>) {
  try {
    const {
      data: { result },
    } = yield call(getCompanyProfile, action.payload)
    yield put(getCompanyProfileSucceed(result))
  } catch (error: any) {
    yield put(getCompanyProfileFailed(error.response.data))
  }
}

function* getMyCompanyProfilesSaga() {
  try {
    const {
      data: { result },
    } = yield call(getMyCompanyProfiles)
    yield put(getMyCompanyProfilesSucceed(result))
  } catch (error: any) {
    yield put(getMyCompanyProfilesFailed(error.response.data))
  }
}

function* getMyCompanyProfileImagesLimitSaga() {
  try {
    const {
      data: { result },
    } = yield call(getMyCompanyProfileImagesLimit)
    yield put(getMyCompanyProfileImagesLimitSucceed(result))
  } catch (error: any) {
    yield put(getMyCompanyProfileImagesLimitFailed(error.response.data))
  }
}

function* getCompanyProfileAdsCountSaga() {
  try {
    const {
      data: { result },
    } = yield call(getCompanyProfileAdsCount)
    yield put(getCompanyProfileAdsCountSucceed(result))
  } catch (error: any) {
    yield put(getCompanyProfileAdsCountFailed(error.response.data))
  }
}

function* deleteCompanyProfileSaga(action: PayloadAction<DeleteCompanyProfile>) {
  try {
    yield call(deleteCompanyProfile, action.payload)
    yield put(deleteCompanyProfileSucceed(action.payload))
  } catch (error: any) {
    yield put(deleteCompanyProfileFailed(error.response.data))
  }
}

function* saveCompanyProfileSaga(action: PayloadAction<SaveProProfile>) {
  try {
    const getToken = (state: {
      auth: {
        currentUser: {
          sessionToken: string
        }
      }
    }) => state.auth.currentUser.sessionToken
    const token: string = yield select(getToken)
    yield call(saveCompanyProfile, action.payload, token)
    yield put(saveCompanyProfileSucceed())
  } catch (error: any) {
    const errorMessage = error?.response?.data || 'An unknown error occurred'
    yield put(saveCompanyProfileFailed(errorMessage))
  }
}

function* proSaga() {
  yield takeLatest(createProProfileRequested.type, createProProfileSaga)
  yield takeLatest(findCompanyProfilesRequested.type, findCompanyProfilesSaga)
  yield takeLatest(getCompanyProfileRequested.type, getCompanyProfileSaga)
  yield takeLatest(getMyCompanyProfilesRequested.type, getMyCompanyProfilesSaga)
  yield takeLatest(getMyCompanyProfileImagesLimitRequested.type, getMyCompanyProfileImagesLimitSaga)
  yield takeLatest(getCompanyProfileAdsCountRequested.type, getCompanyProfileAdsCountSaga)
  yield takeLatest(deleteCompanyProfileRequested.type, deleteCompanyProfileSaga)
  yield takeLatest(saveCompanyProfileRequested.type, saveCompanyProfileSaga)
}

export default proSaga
