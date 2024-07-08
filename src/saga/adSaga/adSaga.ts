import { call, put, takeLatest } from 'redux-saga/effects'
import {
  findCompanyProfilesFailed,
  findCompanyProfilesRequested,
  findCompanyProfilesSucceed,
  getAdFailed,
  getAdRequested,
  getAdSucceed,
  getOwnerFailed,
  getOwnerRequested,
  getOwnerSucceed,
  startChatByAdFailed,
  startChatByAdRequested,
  startChatByAdSucceed,
} from 'src/redux/slices/ad'
import { PayloadAction } from '@reduxjs/toolkit'
import { findCompanyProfiles, getAd, getOwner, startChatByAd } from '@/src/saga/adSaga/api'
import { FindCompanyProfilesState, GetOwnerState, ParamsState, StartChatByIdState } from '@/src/types/redux/ad'

function* get(action: PayloadAction<ParamsState>) {
  try {
    const {
      data: { result },
    } = yield call(getAd, action.payload)
    yield put(getAdSucceed(result))
  } catch (error: any) {
    yield put(getAdFailed(error.response.data))
  }
}

function* findCompanyProfilesByOwner(action: PayloadAction<FindCompanyProfilesState>) {
  try {
    const {
      data: { result },
    } = yield call(findCompanyProfiles, action.payload)
    yield put(findCompanyProfilesSucceed(result))
  } catch (error: any) {
    yield put(findCompanyProfilesFailed(error.response.data))
  }
}

function* getOwnerById(action: PayloadAction<GetOwnerState>) {
  try {
    const { data } = yield call(getOwner, action.payload)
    yield put(getOwnerSucceed(data))
  } catch (error: any) {
    yield put(getOwnerFailed(error.response.data))
  }
}

function* startChat(action: PayloadAction<StartChatByIdState>) {
  try {
    yield call(startChatByAd, action.payload)

    yield put(startChatByAdSucceed())
  } catch (error: any) {
    yield put(startChatByAdFailed(error.response.data))
  }
}

function* adSaga() {
  yield takeLatest(getAdRequested, get)
  yield takeLatest(startChatByAdRequested, startChat)
  yield takeLatest(getOwnerRequested, getOwnerById)
  yield takeLatest(findCompanyProfilesRequested, findCompanyProfilesByOwner)
}

export default adSaga
