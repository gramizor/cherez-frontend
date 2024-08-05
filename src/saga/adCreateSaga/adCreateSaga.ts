import { call, put, select, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { createAd, saveAd } from '@/src/saga/adCreateSaga/api'
import { CreateAdForm } from '@/src/types/redux/adCreate'
import { createAdFailed, createAdRequested } from '@/src/redux/slices/adCreate'
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

function* adCreateSaga() {
  yield takeLatest(createAdRequested, create)
}

export default adCreateSaga
