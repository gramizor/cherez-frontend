import { Box, Button, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import xl from 'src/assets/images/promotion/xl.svg'
import xl_gray from 'src/assets/images/promotion/xl_gray.svg'
import xlScreen from 'src/assets/images/promotion/xlScreen.png'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import PaymentMethod from '../../molecules/PaymentMethod'
import ChoicePrice from '../../molecules/ChoicePrice/ChoicePrice'
import { useDispatch, useSelector } from 'react-redux'
import {
  createAdPromotionRequested,
  getMyLargeAdsRequested,
  getMyPromotionsRequested,
} from '@/src/redux/slices/promotion'
import { createAdPromotionRequestState } from '@/src/types/redux/promotion'
import TextButton from '../../atoms/TextButton'
import {
  createAdPromotionError,
  createAdPromotionLoading,
  selectMyLargeAds,
  selectPromotions,
} from '@/src/redux/selectors/promotion'
import toast from 'react-hot-toast'
import BoostedAds from '../../molecules/BoostedAds/BoostedAds'
import useRequestStatus from '@/src/utils/useRequestStatus'

const PromotionXL = () => {
  const { t } = useTranslation(['promotion', 'common'])
  const dispatch = useDispatch()
  const { palette } = useTheme()

  const loading = useSelector(createAdPromotionLoading)
  const error = useSelector(createAdPromotionError)
  // const promotions = useSelector(selectPromotions)
  const adsLarge = useSelector(selectMyLargeAds)

  const [selectedPeriod, setSelectedPeriod] = useState<number>(0)
  const [selectedCurrencyIds, setSelectedCurrencyIds] = useState<string[]>([])

  const handlePeriodSelect = (period: number) => {
    setSelectedPeriod(period)
  }

  const handleCurrencySelect = (id: string) => {
    setSelectedCurrencyIds(prevSelectedCurrencyIds => {
      if (prevSelectedCurrencyIds.includes(id)) {
        return prevSelectedCurrencyIds.filter(currencyId => currencyId !== id)
      } else {
        return [...prevSelectedCurrencyIds, id]
      }
    })
  }

  const [startRequest] = useRequestStatus(loading, error, t('promotionSuccess'))
  const handleSubmit = () => {
    const payload: createAdPromotionRequestState = {
      promotionName: 'large',
      tariffDays: selectedPeriod,
      paymentMethods: selectedCurrencyIds,
    }
    startRequest()
    dispatch(createAdPromotionRequested(payload))
  }

  const isDisable = () => {
    return !selectedPeriod || selectedCurrencyIds.length === 0
  }

  return (
    <>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h3" sx={{ mr: 2 }}>
          {t('adXL')}
        </Typography>
        <Image src={xl} alt={xl} />
      </Box>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('xl.xlDesc1')}
      </Typography>
      <Image src={xlScreen} alt="ad example" width={536} height={338} />
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('xl.xlDesc2')}
      </Typography>
      <Box mb={2}>
        <Typography mb={2} fontSize="16px" lineHeight="146%" display="inline">
          {t('xl.xlDesc3_1')}
        </Typography>
        <Box display="inline-flex" alignItems="center" ml={1} mr={1} sx={{ verticalAlign: 'middle' }}>
          <Image src={xl_gray} alt="xl gray" width={37} height={19} />
          <ArrowForwardRoundedIcon sx={{ fontSize: 20, color: '#565555' }} />
          <Image src={xl} alt="xl green" width={37} height={22} />
        </Box>
        <Typography mb={2} fontSize="16px" lineHeight="146%" display="inline">
          {t('xl.xlDesc3_2')}
        </Typography>
      </Box>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('xl.xlDesc4')}
      </Typography>
      <ChoicePrice content="week" selectedPeriod={selectedPeriod} onPeriodSelect={handlePeriodSelect} />
      <PaymentMethod selectedCurrencyIds={selectedCurrencyIds} onCurrencySelect={handleCurrencySelect} />
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          sx={{
            minWidth: 150,
            fontWeight: 600,
            fontSize: '16px',
            width: 'fit-content',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDisable() ? palette.customColors.lightBackground : palette.primary.light,
            borderRadius: '10px',
            padding: '12px 15px 11px',
            color: palette.info.main,
          }}
          disabled={isDisable()}
          onClick={handleSubmit}
        >
          {t('common:pay_btn')}
        </Button>
      </Box>
      <BoostedAds content="xl" />
    </>
  )
}

export default PromotionXL
