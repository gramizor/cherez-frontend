import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import TextButton from '../../atoms/TextButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPriceCurrenciesRequested,
  getWalletBalanceRequested,
  getWalletCurrenciesRequested,
  getWalletToPriceCurrencyExchangeRatesRequested,
} from '@/src/redux/slices/wallet'
import {
  getLoadingWalletBalance,
  getPriceCurrencies,
  getWalletBalance,
  getWalletCurrencies,
  getWalletToPriceCurrencyExchangeRates,
} from '@/src/redux/selectors/wallet'
import { PriceCurrencies, WalletCurrencies, WalletsBalances } from '@/src/types/models'
import Image from 'next/image'

interface PaymentMethodProps {
  selectedCurrencyIds: string[]
  onCurrencySelect: (id: string) => void
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedCurrencyIds, onCurrencySelect }) => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const { t } = useTranslation('common')
  const loading = useSelector(getLoadingWalletBalance)
  const walletBalance = useSelector(getWalletBalance) as WalletsBalances
  const walletCurrencies = useSelector(getWalletCurrencies) as WalletCurrencies[] | null
  const walletToPriceCurrencyExchangeRates = useSelector(getWalletToPriceCurrencyExchangeRates) as WalletsBalances
  const priceCurrencies = useSelector(getPriceCurrencies) as PriceCurrencies

  useEffect(() => {
    dispatch(getPriceCurrenciesRequested())
    dispatch(getWalletCurrenciesRequested())
    dispatch(getWalletToPriceCurrencyExchangeRatesRequested())
    dispatch(getWalletBalanceRequested({ sync: true }))
  }, [dispatch])

  const calculateValue = (currencyId: string) => {
    if (!walletBalance || !walletToPriceCurrencyExchangeRates) return 0
    const balance = walletBalance[currencyId] || 0
    const exchangeRate = walletToPriceCurrencyExchangeRates[currencyId] || 0
    return balance * exchangeRate
  }

  return (
    <Box mt="30px" mb="20px">
      <Typography mb={2} fontSize="18px" lineHeight="146%" fontWeight={500}>
        {t('payment_method')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%" fontWeight={300}>
        {t('payment_method_description')}
      </Typography>

      {Array.isArray(walletCurrencies) && walletCurrencies.length > 0 ? (
        walletCurrencies.map((currency: WalletCurrencies) => (
          <Box
            key={currency.id}
            p="17px"
            mb={2}
            borderRadius="10px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              backgroundColor: selectedCurrencyIds.includes(currency.id)
                ? palette.primary.light
                : palette.customColors.lightBackground,
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => onCurrencySelect(currency.id)}
          >
            <Box display="flex" alignItems="center">
              <Image src={currency.iconUrl} alt={currency.name} width={50} height={50} style={{ marginRight: '6px' }} />
              <Box>
                <Typography fontSize="20px" fontWeight="600" color={palette.customColors.infoLabel}>
                  {currency.id}
                </Typography>
                <Typography fontSize="16px" color={palette.customColors.infoLabel}>
                  {currency.name}
                </Typography>
              </Box>
            </Box>
            <Box textAlign="right">
              {walletBalance && (
                <Typography fontSize="20px" fontWeight="600" color={palette.customColors.infoLabel}>
                  {walletBalance[currency.id] || '0'}
                </Typography>
              )}
              <Typography fontSize="16px" color={palette.customColors.infoLabel}>
                {calculateValue(currency.id)} {priceCurrencies && String(priceCurrencies)}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <span style={{ color: 'black' }}>No wallet currencies available</span>
      )}
    </Box>
  )
}

export default PaymentMethod
