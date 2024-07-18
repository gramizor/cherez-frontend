import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import xl from 'src/assets/images/promotion/xl.svg'
import xl_gray from 'src/assets/images/promotion/xl_gray.svg'
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

const PromotionXL = () => {
  const { t } = useTranslation(['promotion', 'common'])
  const dispatch = useDispatch()

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
  const handleSubmit = () => {
    const payload: createAdPromotionRequestState = {
      promotionName: 'large',
      tariffDays: selectedPeriod,
      paymentMethods: selectedCurrencyIds,
    }
    dispatch(createAdPromotionRequested(payload))

    if (!loading) {
      if (error !== null) {
        toast.error(error, {
          duration: 3000,
        })
      } else {
        toast.success(t('promotionSuccess'), {
          duration: 3000,
        })
      }
    }
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
        <TextButton isSelected={true} text={t('common.pay_btn')} sx={{ fontWeight: 600 }} onClick={handleSubmit} />
      </Box>
      <BoostedAds content="xl" />
    </>
  )
}

export default PromotionXL
