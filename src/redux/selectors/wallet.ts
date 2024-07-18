import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const getLoadingWalletBalance = createSelector([(state: RootState) => state.wallet.loading], loading => loading)

export const getWalletBalance = createSelector(
  [(state: RootState) => state.wallet.walletBalance],
  walletBalance => walletBalance
)

export const getWalletCurrencies = createSelector(
  [(state: RootState) => state.wallet.walletCurrencies],
  walletCurrencies => walletCurrencies
)

export const getPriceCurrencies = createSelector(
  [(state: RootState) => state.wallet.priceCurrencies],
  priceCurrencies => priceCurrencies
)

export const getWalletToPriceCurrencyExchangeRates = createSelector(
  [(state: RootState) => state.wallet.walletToPriceCurrencyExchangeRates],
  walletToPriceCurrencyExchangeRates => walletToPriceCurrencyExchangeRates
)
