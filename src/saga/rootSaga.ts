import { all } from 'redux-saga/effects'

import mainSearchSaga from 'src/saga/mainSearchSaga/mainSearchSaga'
import authSaga from 'src/saga/authSaga/authSaga'
import adSaga from 'src/saga/adSaga/adSaga'
import accountSaga from 'src/saga/accountSaga/accountSaga'
import adCreateSaga from 'src/saga/adCreateSaga/adCreateSaga'
import walletSaga from '@/src/saga/walletSaga/walletSaga'
import promotionSaga from '@/src/saga/promotionSaga/promotionSaga'
import proSaga from './proSaga/proSaga'

function* rootSaga() {
  yield all([
    mainSearchSaga(),
    authSaga(),
    adSaga(),
    accountSaga(),
    adCreateSaga(),
    walletSaga(),
    promotionSaga(),
    proSaga(),
  ])
}

export default rootSaga
