import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { getPriceCurrencies, getWalletBalance, getWalletCurrencies, getWalletToPriceCurrencyExchangeRates } from './api'
import {
  getPriceCurrenciesFailed,
  getPriceCurrenciesRequested,
  getPriceCurrenciesSucceed,
  getWalletBalanceFailed,
  getWalletBalanceRequested,
  getWalletBalanceSucceed,
  getWalletCurrenciesFailed,
  getWalletCurrenciesRequested,
  getWalletCurrenciesSucceed,
  getWalletToPriceCurrencyExchangeRatesFailed,
  getWalletToPriceCurrencyExchangeRatesRequested,
  getWalletToPriceCurrencyExchangeRatesSucceed,
} from '@/src/redux/slices/wallet'
import { getWalletBalanceState } from '@/src/types/redux/wallet'

function* walletBalance(action: PayloadAction<getWalletBalanceState>) {
  try {
    const {
      data: { result },
    } = yield call(getWalletBalance, action.payload)
    yield put(getWalletBalanceSucceed(result))
  } catch (error: any) {
    yield put(getWalletBalanceFailed(error.response.data))
  }
}

function* walletCurrencies() {
  try {
    const {
      data: { result },
    } = yield call(getWalletCurrencies)
    yield put(getWalletCurrenciesSucceed(result))
  } catch (error: any) {
    yield put(getWalletCurrenciesFailed(error.response.data))
  }
}

function* priceCurriencies() {
  try {
    const {
      data: { result },
    } = yield call(getPriceCurrencies)
    yield put(getPriceCurrenciesSucceed(result))
  } catch (error: any) {
    yield put(getPriceCurrenciesFailed(error.response.data))
  }
}
function* walletToPriceCurrencyExchangeRates() {
  try {
    const {
      data: { result },
    } = yield call(getWalletToPriceCurrencyExchangeRates)
    yield put(getWalletToPriceCurrencyExchangeRatesSucceed(result))
  } catch (error: any) {
    yield put(getWalletToPriceCurrencyExchangeRatesFailed(error.response.data))
  }
}

function* walletSaga() {
  yield takeLatest(getWalletBalanceRequested.type, walletBalance)
  yield takeLatest(getWalletCurrenciesRequested.type, walletCurrencies)
  yield takeLatest(getPriceCurrenciesRequested.type, priceCurriencies)
  yield takeLatest(getWalletToPriceCurrencyExchangeRatesRequested.type, walletToPriceCurrencyExchangeRates)
}

export default walletSaga
