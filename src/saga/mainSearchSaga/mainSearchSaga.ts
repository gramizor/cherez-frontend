import { call, put, select, takeLatest } from 'redux-saga/effects'

import { searchAdsFailed, searchAdsRequested, searchAdsSucceed } from 'src/redux/slices/mainSearch'
import { PayloadAction } from '@reduxjs/toolkit'
import { searchAds } from '@/src/saga/mainSearchSaga/api'
import { ParamsState } from '@/src/types/redux/mainSearch'

function* search(action: PayloadAction<any>) {
  const getParams = (state: { mainSearch: { params: ParamsState } }) => state.mainSearch.params
  const params: ParamsState = yield select(getParams)
  try {
    const {
      data: { result },
    } = yield call(searchAds, params)
    yield put(searchAdsSucceed(result))
  } catch (error: any) {
    yield put(searchAdsFailed(error.response.data))
  }
}

function* mainSearchSaga() {
  yield takeLatest(searchAdsRequested, search)
}

export default mainSearchSaga
