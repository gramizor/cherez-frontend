import { call, put, takeLatest } from 'redux-saga/effects'
import { CurrentUserResponse } from '@/src/types/redux/auth'
import {
  currentUserFailed,
  currentUserRequested,
  currentUserSucceeded,
  userLoginFailed,
  userLoginRequested,
  userLoginSucceed,
  userLogoutFailed,
  userLogoutRequested,
  userLogoutSucceed,
  userRegistrationFailed,
  userRegistrationRequested,
  userRegistrationSucceed,
} from 'src/redux/slices/auth'
import { getCurrentUser, loginUser, logoutUser, signUpUser } from 'src/saga/authSaga/api'
import { PayloadAction } from '@reduxjs/toolkit'

function* signUp(action: PayloadAction<any>) {
  try {
    yield call(signUpUser, action.payload)
    yield put(userRegistrationSucceed())
    yield put(currentUserRequested())
  } catch (error: any) {
    yield put(userRegistrationFailed(error.response.data))
  }
}

function* login(action: PayloadAction<any>) {
  try {
    yield call(loginUser, action.payload)
    yield put(userLoginSucceed())
    yield put(currentUserRequested())
  } catch (error: any) {
    yield put(userLoginFailed(error.response.data))
  }
}

function* currentUser() {
  try {
    const response: {
      data: CurrentUserResponse
    } = yield call(getCurrentUser)
    yield put(currentUserSucceeded(response.data))
  } catch (error: any) {
    yield put(currentUserFailed(error.response.data))
  }
}

function* logout() {
  try {
    yield call(logoutUser)
    yield put(userLogoutSucceed())
  } catch (error: any) {
    yield put(userLogoutFailed(error.response.data))
  }
}

function* authSaga() {
  yield takeLatest(userRegistrationRequested, signUp)
  yield takeLatest(userLoginRequested, login)
  yield takeLatest(currentUserRequested, currentUser)
  yield takeLatest(userLogoutRequested, logout)
}

export default authSaga
