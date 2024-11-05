import { getCities } from '@/src/saga/locationSaga/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { GetCitiesType, GetLocationResponseArr } from '@/src/types/redux/location';
import { getLocationFailed, getLocationRequested, getLocationSucceed } from '@/src/redux/slices/location';
import axios from 'axios';

function* citySaga(action: PayloadAction<GetCitiesType>) {
  try {
    const { data } = yield call(getCities, action.payload);
    const { results, hasMore } = data;
    yield put(getLocationSucceed({ results, hasMore }));
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      yield put(getLocationFailed(e.response.data || 'Unknown error'));
    } else {
      yield put(getLocationFailed('Unknown error'));
    }
  }
}

function* locationSaga() {
  yield takeLatest(getLocationRequested.type, citySaga);
}

export default locationSaga;