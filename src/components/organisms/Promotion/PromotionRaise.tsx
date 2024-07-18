import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { useState } from 'react'
import plane from 'src/assets/images/promotion/plane.svg'
import plane_gray from 'src/assets/images/promotion/plane_gray.svg'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import PaymentMethod from '../../molecules/PaymentMethod'
import ChoicePrice from '../../molecules/ChoicePrice/ChoicePrice'
import { createAdPromotionError, createAdPromotionLoading } from '@/src/redux/selectors/promotion'
import { useDispatch, useSelector } from 'react-redux'
import { createAdPromotionRequestState } from '@/src/types/redux/promotion'
import { createAdPromotionRequested } from '@/src/redux/slices/promotion'
import toast from 'react-hot-toast'
import TextButton from '../../atoms/TextButton'
import BoostedAds from '../../molecules/BoostedAds/BoostedAds'

const PromotionRaise = () => {
  const { palette } = useTheme()
  const { t } = useTranslation('promotion')
  const dispatch = useDispatch()

  const [selectedPeriod, setSelectedPeriod] = useState<number>(0)
  const [selectedCurrencyIds, setSelectedCurrencyIds] = useState<string[]>([])

  const loading = useSelector(createAdPromotionLoading)
  const error = useSelector(createAdPromotionError)

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
      promotionName: 'boost',
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
          {t('raiseAd')}
        </Typography>
        <Image src={plane} alt={plane} />
      </Box>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('raise.raiseDesc1')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('raise.raiseDesc2')}
      </Typography>
      <Box mb={2}>
        <Typography mb={2} fontSize="16px" lineHeight="146%" display="inline">
          {t('raise.raiseDesc3_1')}
        </Typography>
        <Box display="inline-flex" alignItems="center" ml={1} mr={1} sx={{ verticalAlign: 'middle' }}>
          <Image src={plane_gray} alt="plane gray" width={45} height={23} />
          <ArrowForwardRoundedIcon sx={{ fontSize: 20, color: '#565555' }} />
          <Image src={plane} alt="plane green" width={45} height={23} />
        </Box>
        <Typography mb={2} fontSize="16px" lineHeight="146%" display="inline">
          {t('raise.raiseDesc3_2')}
        </Typography>
      </Box>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('raise.raiseDesc4')}
      </Typography>
      <ChoicePrice content="week" selectedPeriod={selectedPeriod} onPeriodSelect={handlePeriodSelect} />
      <PaymentMethod selectedCurrencyIds={selectedCurrencyIds} onCurrencySelect={handleCurrencySelect} />
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <TextButton isSelected={true} text={t('common.pay_btn')} sx={{ fontWeight: 600 }} onClick={handleSubmit} />
      </Box>
      <BoostedAds content="boost" />
    </>
  )
}

export default PromotionRaise
