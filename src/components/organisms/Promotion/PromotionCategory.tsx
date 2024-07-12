import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React from 'react'
import pro from 'src/assets/images/promotion/pro.svg'
import PaymentMethod from '../../molecules/PaymentMethod'
import YearPrice from '../../molecules/PromotionPrice/YearPrice'

const PromotionCategory = () => {
  const { palette } = useTheme()
  const { t } = useTranslation('promotion')

  return (
    <>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h3" sx={{ mr: 2 }}>
          {t('categoryAd')}
        </Typography>
        <Image src={pro} alt={pro} />
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
      <YearPrice />
      <PaymentMethod />
    </>
  )
}

export default PromotionCategory
