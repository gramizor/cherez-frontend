import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/redux/rootReducer'

export const getLoadingWallet = createSelector(
  [
    (state: RootState) => state.wallet.loading,
    (state: RootState) => state.wallet.walletBalance,
    (state: RootState) => state.wallet.walletCurrencies,
    (state: RootState) => state.wallet.priceCurrencies,
    (state: RootState) => state.wallet.walletToPriceCurrencyExchangeRates,
  ],
  (loading, walletBalance, walletCurrencies, priceCurrencies, walletToPriceCurrencyExchangeRates) =>
    loading || !walletBalance || !walletCurrencies || !priceCurrencies || !walletToPriceCurrencyExchangeRates
)

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
