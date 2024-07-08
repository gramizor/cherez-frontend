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

// function* saveServices(action: PayloadAction<SaveAdForm>) {
//   try {
//     const getToken = (state: {
//       auth: {
//         currentUser: {
//           sessionToken: string
//         }
//       }
//     }) => state.auth.currentUser.sessionToken
//     const token: string = yield select(getToken)
//
//     yield call(saveServicesAd, action.payload, token)
//
//     runPayloadOption(action, 'onSuccess', action.payload.objectId)
//     yield put(saveAdSucceed)
//   } catch (error: any) {
//     yield put(saveAdFailed(error.response.data.error))
//     runPayloadOption(action, 'onFailed', error.response.data.error)
//   }
// }
//
// function* saveVehicle(action: PayloadAction<SaveAdForm>) {
//   try {
//     const getToken = (state: {
//       auth: {
//         currentUser: {
//           sessionToken: string
//         }
//       }
//     }) => state.auth.currentUser.sessionToken
//     const token: string = yield select(getToken)
//
//     yield call(saveVehicleAd, action.payload, token)
//
//     runPayloadOption(action, 'onSuccess', action.payload.objectId)
//     yield put(saveAdSucceed)
//   } catch (error: any) {
//     yield put(saveAdFailed(error.response.data.error))
//     runPayloadOption(action, 'onFailed', error.response.data.error)
//   }
// }

function* adCreateSaga() {
  yield takeLatest(createAdRequested, create)
  // yield takeLatest(saveServicesAdRequested, saveServices)
  // yield takeLatest(saveVehicleAdRequested, saveVehicle)
}

export default adCreateSaga
