import { PriceCurrencies, WalletCurrencies, WalletsBalances } from '../../models'

export interface WalletState {
  error: string | null
  loading: boolean
  walletBalance: WalletsBalances | null
  walletCurrencies: WalletCurrencies | null
  priceCurrencies: PriceCurrencies | null
  walletToPriceCurrencyExchangeRates: WalletsBalances | null
}

export interface getWalletBalanceState {
  sync: boolean
}
