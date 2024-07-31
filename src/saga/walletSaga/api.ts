import { getWalletBalanceState } from '@/src/types/redux/wallet'
import { axiosClient } from 'src/lib/axios'

const getWalletBalance = (payload: getWalletBalanceState) => {
  const { sync = true } = payload
  const path = 'functions/getWalletBalances'
  return axiosClient.post(path, {
    sync,
  })
}

const getWalletCurrencies = () => {
  const path = 'functions/getWalletCurrencies'
  return axiosClient.post(path)
}

const getPriceCurrencies = () => {
  const path = 'functions/getPriceCurrency'
  return axiosClient.post(path)
}

const getWalletToPriceCurrencyExchangeRates = () => {
  const path = 'functions/getWalletToPriceCurrencyExchangeRates'
  return axiosClient.post(path)
}

export { getWalletBalance, getWalletCurrencies, getPriceCurrencies, getWalletToPriceCurrencyExchangeRates }
