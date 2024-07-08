import { all } from 'redux-saga/effects'

import mainSearchSaga from 'src/saga/mainSearchSaga/mainSearchSaga'
import authSaga from 'src/saga/authSaga/authSaga'
import adSaga from 'src/saga/adSaga/adSaga'
import accountSaga from 'src/saga/accountSaga/accountSaga'
import adCreateSaga from 'src/saga/adCreateSaga/adCreateSaga'

function* rootSaga() {
  yield all([mainSearchSaga(), authSaga(), adSaga(), accountSaga(), adCreateSaga()])
}

export default rootSaga
