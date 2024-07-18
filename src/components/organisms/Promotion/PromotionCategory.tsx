import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { useState } from 'react'
import pro from 'src/assets/images/promotion/pro.svg'
import PaymentMethod from '../../molecules/PaymentMethod'
import ChoicePrice from '../../molecules/ChoicePrice/ChoicePrice'

const PromotionCategory: React.FC = () => {
  const { palette } = useTheme()
  const { t } = useTranslation('promotion')

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

  return (
    <>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h3" sx={{ mr: 2 }}>
          {t('categoryAd')}
        </Typography>
        <Image src={pro} alt="Promotion Icon" />
      </Box>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc1')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc2')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc3')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc4')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc5')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc6')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc7')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc8')}
      </Typography>
      <ChoicePrice content="year" selectedPeriod={selectedPeriod} onPeriodSelect={handlePeriodSelect} />
      <PaymentMethod selectedCurrencyIds={selectedCurrencyIds} onCurrencySelect={handleCurrencySelect} />
    </>
  )
}

export default PromotionCategory
