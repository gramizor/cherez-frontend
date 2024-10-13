import { call, put, select, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { createAd, saveAd } from '@/src/saga/adCreateSaga/api'
import { CreateAdForm, SaveAdForm } from '@/src/types/redux/adCreate'
import {
  createAdFailed,
  createAdRequested,
  saveAdFailed,
  saveAdRequested,
  saveAdSucceed,
} from '@/src/redux/slices/adCreate'
import runPayloadOption from '@/src/utils/runPayloadOption'

function* create(action: PayloadAction<CreateAdForm>) {
  try {
    const {
      data: { result },
    } = yield call(createAd, action.payload)
    const {
      objectId,
    }: {
      objectId: string
    } = result

    const getToken = (state: {
      auth: {
        currentUser: {
          sessionToken: string
        }
      }
    }) => state.auth.currentUser.sessionToken
    const token: string = yield select(getToken)

    yield call(saveAd, { ...action.payload, objectId }, token)
    runPayloadOption(action, 'onSuccess', objectId)
  } catch (error: any) {
    yield put(createAdFailed(error.response.data.error))
    runPayloadOption(action, 'onFailed', error.response.data.error)
  }
}

function* adSaveSaga(action: PayloadAction<SaveAdForm>) {
  try {
    const getToken = (state: {
      auth: {
        currentUser: { sessionToken: string }
      }
    }) => state.auth.currentUser.sessionToken
    const token: string = yield select(getToken)
    yield call(saveAd, action.payload, token)
    yield put(saveAdSucceed())
    runPayloadOption(action, 'onSuccess', {})
  } catch (error: any) {
    const errorMessage = error?.response?.data || 'An unknown error occurred'
    yield put(saveAdFailed(errorMessage))
    runPayloadOption(action, 'onFailed', {})
  }
}

function* adCreateSaga() {
  yield takeLatest(createAdRequested, create)
  yield takeLatest(saveAdRequested, adSaveSaga)
}

export default adCreateSaga
