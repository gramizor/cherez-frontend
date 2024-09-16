import { call, put, take, takeLatest } from 'redux-saga/effects'
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
  setLimit,
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
import { showErrorMessage, showSuccessMessage } from '@/src/utils/useNotification'

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

    if (action.payload.type === 'pro') {
      yield call(fetchIsMyProAdsActive)
    } else {
      yield call(fetchMyCommonAds)
    }
  } catch (error: any) {
    yield put(setAdPublicFailed(error.response.data))
  }
}

function* updateCommonAdsPublicStatus(action: PayloadAction<isPublicPayload>) {
  try {
    yield call(setCommonAdsPublic, action.payload)
    yield put(setCommonAdsPublicSucceed(action.payload))
  } catch (error: any) {
    yield put(setCommonAdsPublicFailed(error.response.data))
  }
}

function* updateProAdsPublicStatus(action: PayloadAction<{ isPublic: boolean; successCallback: () => void }>) {
  try {
    yield call(setProAdsPublic, { isPublic: action.payload.isPublic })
    yield put(setProAdsPublicSucceed(action.payload))
    if (action.payload.successCallback) {
      yield call(action.payload.successCallback)
    }
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
    const newLimit = action.payload.limit + 2
    yield put(setLimit(newLimit))
    yield put(getMyProAdsRequested({ skip: action.payload.skip, limit: newLimit }))
  } catch (error: any) {
    showErrorMessage(error)
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
