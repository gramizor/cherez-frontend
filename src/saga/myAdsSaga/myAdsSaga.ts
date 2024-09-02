import { call, put, takeLatest } from 'redux-saga/effects'
import {
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
  getIsMyProAdsActiveRequested,
  getMyProAdsCountSucceed,
  getMyProAdsCountFailed,
  getIsMyProAdsActiveSucceed,
  getIsMyProAdsActiveFailed,
  setSkip,
} from '@/src/redux/slices/myAds'
import {
  getMyProAds,
  getMyCommonAds,
  setAdPublic,
  setCommonAdsPublic,
  setProAdsPublic,
  extendAd,
  deleteAd,
  getMyProAdsCount,
  getIsMyProAdsActive,
} from '@/src/saga/myAdsSaga/api'
import { GetMyProAdsPayload, SetAdPublicPayload, isPublicPayload, adIdPayload } from '@/src/types/redux/myAds'
import { PayloadAction } from '@reduxjs/toolkit'
import { getCompanyProfileAdsCountRequested } from '@/src/redux/slices/pro'

function* fetchMyProAds(action: PayloadAction<GetMyProAdsPayload>) {
  try {
    const { data } = yield call(getMyProAds, action.payload)
    yield put(getMyProAdsSucceed(data))
  } catch (error: any) {
    yield put(getMyProAdsFailed(error.response.data))
  }
}

function* fetchMyCommonAds() {
  try {
    const { data } = yield call(getMyCommonAds)
    yield put(getMyCommonAdsSucceed(data))
  } catch (error: any) {
    yield put(getMyCommonAdsFailed(error.response.data))
  }
}

function* updateAdPublicStatus(action: PayloadAction<SetAdPublicPayload>) {
  try {
    yield call(setAdPublic, action.payload)
    yield put(setAdPublicSucceed(action.payload))
  } catch (error: any) {
    yield put(setAdPublicFailed(error.response.data))
  }
}

function* updateCommonAdsPublicStatus(action: PayloadAction<isPublicPayload>) {
  try {
    yield call(setCommonAdsPublic, action.payload)
    yield put(setCommonAdsPublicSucceed())
  } catch (error: any) {
    yield put(setCommonAdsPublicFailed(error.response.data))
  }
}

function* updateProAdsPublicStatus(action: PayloadAction<isPublicPayload>) {
  try {
    yield call(setProAdsPublic, action.payload)
    yield put(setProAdsPublicSucceed(action.payload))
  } catch (error: any) {
    yield put(setProAdsPublicFailed(error.response.data))
  }
}

function* extendAdById(action: PayloadAction<string>) {
  try {
    yield call(extendAd, { adId: action.payload })
    yield put(extendAdSucceed({ adId: action.payload }))
  } catch (error: any) {
    yield put(extendAdFailed(error.response.data))
  }
}

function* deleteAdById(action: PayloadAction<adIdPayload>) {
  try {
    yield call(deleteAd, action.payload)
    yield put(deleteAdSucceed())
  } catch (error: any) {
    yield put(deleteAdFailed(error.response.data))
  }
}

function* fetchMyProAdsCount() {
  try {
    const { data } = yield call(getMyProAdsCount)
    yield put(getMyProAdsCountSucceed(data))
  } catch (error: any) {
    yield put(getMyProAdsCountFailed(error.response.data))
  }
}

function* fetchIsMyProAdsActive() {
  try {
    const { data } = yield call(getIsMyProAdsActive)
    yield put(getIsMyProAdsActiveSucceed(data))
  } catch (error: any) {
    yield put(getIsMyProAdsActiveFailed(error.response.data))
  }
}

function* handleShowMoreSaga(action: PayloadAction<{ skip: number; limit: number }>) {
  try {
    yield put(setSkip({ skip: action.payload.skip + 5 }))
    yield put(getMyProAdsRequested({ skip: action.payload.skip + 5, limit: action.payload.limit }))
  } catch (error: any) {
    console.error('Error in handleShowMoreSaga:', error)
  }
}

function* myAdsSaga() {
  yield takeLatest(getMyProAdsRequested.type, fetchMyProAds)
  yield takeLatest(getMyCommonAdsRequested.type, fetchMyCommonAds)
  yield takeLatest(setAdPublicRequested.type, updateAdPublicStatus)
  yield takeLatest(setCommonAdsPublicRequested.type, updateCommonAdsPublicStatus)
  yield takeLatest(setProAdsPublicRequested.type, updateProAdsPublicStatus)
  yield takeLatest(extendAdRequested.type, extendAdById)
  yield takeLatest(deleteAdRequested.type, deleteAdById)
  yield takeLatest(getMyProAdsCountRequested.type, fetchMyProAdsCount)
  yield takeLatest(getIsMyProAdsActiveRequested.type, fetchIsMyProAdsActive)

  yield takeLatest('myAds/handleShowMore', handleShowMoreSaga)
}

export default myAdsSaga
