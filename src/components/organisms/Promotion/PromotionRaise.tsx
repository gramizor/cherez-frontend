import { Box, Button, Typography, useTheme } from '@mui/material'
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
import useRequestStatus from '@/src/utils/useRequestStatus'
import { useRouter } from 'next/router'

const PromotionRaise = () => {
  const { palette } = useTheme()
  const { t } = useTranslation('promotion')
  const dispatch = useDispatch()
  const router = useRouter()

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

  const [startRequest] = useRequestStatus(loading, error, t('promotionSuccess'), () => {
    router.push(`/announcements`)
  })
  const handleSubmit = () => {
    const payload: createAdPromotionRequestState = {
      promotionName: 'boost',
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
            '&:hover': {
              background: isDisable() ? palette.customColors.lightBackground : palette.primary.dark,
            },
          }}
          disabled={isDisable()}
          onClick={handleSubmit}
        >
          {t('common:pay_btn')}
        </Button>
      </Box>
      <BoostedAds content="boost" />
    </>
  )
}

export default PromotionRaise
