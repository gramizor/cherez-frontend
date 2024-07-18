import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrorResponse } from '@/src/types/redux'
import { getWalletBalanceState, WalletState } from '@/src/types/redux/wallet'
import { PriceCurrencies, WalletCurrencies, WalletsBalances } from '@/src/types/models'

const initialState: WalletState = {
  loading: false,
  error: null,
  walletBalance: null,
  walletCurrencies: null,
  priceCurrencies: null,
  walletToPriceCurrencyExchangeRates: null,
}

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    getWalletBalanceRequested: (state, action: PayloadAction<getWalletBalanceState>) => {
      state.loading = true
      state.error = null
    },
    getWalletBalanceSucceed: (state, action: PayloadAction<WalletsBalances>) => {
      state.walletBalance = action.payload
      state.loading = false
    },
    getWalletBalanceFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    getWalletCurrenciesRequested: state => {
      state.loading = true
      state.error = null
    },
    getWalletCurrenciesSucceed: (state, action: PayloadAction<WalletCurrencies>) => {
      state.walletCurrencies = action.payload
      state.loading = false
    },
    getWalletCurrenciesFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    getPriceCurrenciesRequested: state => {
      state.loading = true
      state.error = null
    },
    getPriceCurrenciesSucceed: (state, action: PayloadAction<PriceCurrencies>) => {
      state.priceCurrencies = action.payload
      state.loading = false
    },
    getPriceCurrenciesFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
    getWalletToPriceCurrencyExchangeRatesRequested: state => {
      state.loading = true
      state.error = null
    },
    getWalletToPriceCurrencyExchangeRatesSucceed: (state, action: PayloadAction<WalletsBalances>) => {
      state.walletToPriceCurrencyExchangeRates = action.payload
      state.loading = false
    },
    getWalletToPriceCurrencyExchangeRatesFailed: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload.error
      state.loading = false
    },
  },
})

export const {
  getWalletBalanceFailed,
  getWalletBalanceRequested,
  getWalletBalanceSucceed,
  getWalletCurrenciesFailed,
  getWalletCurrenciesRequested,
  getWalletCurrenciesSucceed,
  getPriceCurrenciesFailed,
  getPriceCurrenciesRequested,
  getPriceCurrenciesSucceed,
  getWalletToPriceCurrencyExchangeRatesFailed,
  getWalletToPriceCurrencyExchangeRatesRequested,
  getWalletToPriceCurrencyExchangeRatesSucceed,
} = slice.actions

export default slice.reducer
