import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React from 'react'
import xl from 'src/assets/images/promotion/xl.svg'
import xl_gray from 'src/assets/images/promotion/xl_gray.svg'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import WeekPrice from '../../molecules/PromotionPrice/WeekPrice'
import PaymentMethod from '../../molecules/PaymentMethod'

const PromotionXL = () => {
  const { palette } = useTheme()
  const { t } = useTranslation('promotion')

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
      <WeekPrice />
      <PaymentMethod />
    </>
  )
}

export default PromotionXL
