import { adBoostState, createAdPromotionRequestState } from '@/src/types/redux/promotion'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { createAdPromotion, enableAdBoost, getMyBoostedAds, getMyLargeAds, getMyPromotions, setAdLarge } from './api'
import {
  createAdPromotionFailed,
  createAdPromotionRequested,
  createAdPromotionSucceed,
  enableAdBoostFailed,
  enableAdBoostRequested,
  enableAdBoostSucceed,
  getMyBoostedAdsFailed,
  getMyBoostedAdsRequested,
  getMyBoostedAdsSucceed,
  getMyLargeAdsFailed,
  getMyLargeAdsRequested,
  getMyLargeAdsSucceed,
  getMyPromotionsFailed,
  getMyPromotionsRequested,
  getMyPromotionsSucceed,
  setAdLargeFailed,
  setAdLargeRequested,
  setAdLargeSucceed,
} from '@/src/redux/slices/promotion'
import { showErrorMessage, showSuccessMessage } from '@/src/utils/useNotification'
import { useRouter } from 'next/router'

function* createAdPromotionSaga(action: PayloadAction<createAdPromotionRequestState>) {
  try {
    const {
      data: { result },
    } = yield call(createAdPromotion, action.payload)
    yield put(createAdPromotionSucceed(result))
  } catch (error: any) {
    yield put(createAdPromotionFailed(error.response.data))
  }
}

function* getMyPromotionsSaga() {
  try {
    const {
      data: { result },
    } = yield call(getMyPromotions)
    yield put(getMyPromotionsSucceed(result))
  } catch (error: any) {
    yield put(getMyPromotionsFailed(error.response.data))
  }
}

function* getMyBoostedAdsSaga() {
  try {
    const {
      data: { result },
    } = yield call(getMyBoostedAds)
    yield put(getMyBoostedAdsSucceed(result))
  } catch (error: any) {
    yield put(getMyBoostedAdsFailed(error.response.data))
  }
}

function* getMyLargeAdsSaga() {
  try {
    const {
      data: { result },
    } = yield call(getMyLargeAds)
    yield put(getMyLargeAdsSucceed(result))
  } catch (error: any) {
    yield put(getMyLargeAdsFailed(error.response.data))
  }
}

function* setAdLargeSaga(action: PayloadAction<adBoostState>) {
  try {
    yield call(setAdLarge, action.payload)
    yield put(setAdLargeSucceed())

    if (action.payload.successCallback) {
      showSuccessMessage('setAdLargeSucceed')
      yield call(action.payload.successCallback)
    }
  } catch (error: any) {
    if (action.payload.failedCallback) {
      yield call(action.payload.failedCallback)
    }
    yield put(setAdLargeFailed(error.response.data))
  }
}

function* enableAdBoostSaga(action: PayloadAction<adBoostState>) {
  try {
    yield call(enableAdBoost, action.payload)
    yield put(enableAdBoostSucceed())

    if (action.payload.successCallback) {
      showSuccessMessage('enableAdBoostSucceed')
      yield call(action.payload.successCallback)
    }
  } catch (error: any) {
    if (action.payload.failedCallback) {
      yield call(action.payload.failedCallback)
    }
    yield put(enableAdBoostFailed(error.response.data))
  }
}

function* promotionSaga() {
  yield takeLatest(createAdPromotionRequested.type, createAdPromotionSaga)
  yield takeLatest(getMyPromotionsRequested.type, getMyPromotionsSaga)
  yield takeLatest(getMyBoostedAdsRequested.type, getMyBoostedAdsSaga)
  yield takeLatest(getMyLargeAdsRequested.type, getMyLargeAdsSaga)
  yield takeLatest(setAdLargeRequested.type, setAdLargeSaga)
  yield takeLatest(enableAdBoostRequested.type, enableAdBoostSaga)
}

export default promotionSaga
