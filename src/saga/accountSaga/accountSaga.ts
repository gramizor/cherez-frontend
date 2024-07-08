import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  getAccountAdsFailed,
  getAccountAdsRequested,
  getAccountAdsSucceed,
  getAccountFailed,
  getAccountRequested,
  getAccountSucceed,
  setAboutMeFailed,
  setAboutMeRequested,
  setAboutMeSucceed,
  setPassportInfoFailed,
  setPassportInfoRequested,
  setPassportInfoSucceed,
  setPhoneFailed,
  setPhoneRequested,
  setPhoneSucceed,
} from 'src/redux/slices/account'
import { PayloadAction } from '@reduxjs/toolkit'
import { getAccount, getAccountAds, setAboutMe, setPassportInfo, setPhone } from '@/src/saga/accountSaga/api'
import { GetAccountState, ParamsState } from '@/src/types/redux/account'
import {
  MyAccountUpdateAboutMeProps,
  MyAccountUpdatePassportInfoProps,
  MyAccountUpdatePhoneProps,
} from '@/src/types/structs/account'

function* get(action: PayloadAction<GetAccountState>) {
  try {
    const { data } = yield call(getAccount, action.payload)
    yield put(getAccountSucceed(data))
  } catch (error: any) {
    yield put(getAccountFailed(error.response.data))
  }
}

function* fetchAccountAds(action: PayloadAction<any>) {
  const getParams = (state: { account: { params: ParamsState } }) => state.account.params
  const params: ParamsState = yield select(getParams)

  const getUserId = (state: { account: { user: { objectId: string } } }) => state.account.user.objectId
  const userId: ParamsState = yield select(getUserId)
  try {
    const {
      data: { result },
      // @ts-ignore
    } = yield call(getAccountAds, { userId, ...params })

    yield put(getAccountAdsSucceed(result))
  } catch (error: any) {
    yield put(getAccountAdsFailed(error.response.data))
  }
}

function* setPhoneParam(action: PayloadAction<MyAccountUpdatePhoneProps>) {
  try {
    yield call(setPhone, action.payload)
    yield put(setPhoneSucceed())
  } catch (error: any) {
    yield put(setPhoneFailed(error.response.data))
  }
}

function* setAboutMeParam(action: PayloadAction<MyAccountUpdateAboutMeProps>) {
  try {
    yield call(setAboutMe, action.payload)
    yield put(setAboutMeSucceed())
  } catch (error: any) {
    yield put(setAboutMeFailed(error.response.data))
  }
}

function* setPassportInfoParam(action: PayloadAction<MyAccountUpdatePassportInfoProps>) {
  try {
    yield call(setPassportInfo, action.payload)
    yield put(setPassportInfoSucceed())
  } catch (error: any) {
    yield put(setPassportInfoFailed(error.response.data))
  }
}

function* accountSaga() {
  yield takeLatest(getAccountRequested, get)
  yield takeLatest(getAccountAdsRequested, fetchAccountAds)
  yield takeLatest(setPhoneRequested, setPhoneParam)
  yield takeLatest(setAboutMeRequested, setAboutMeParam)
  yield takeLatest(setPassportInfoRequested, setPassportInfoParam)
}

export default accountSaga
