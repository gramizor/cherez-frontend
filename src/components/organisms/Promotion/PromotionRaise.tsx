import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React from 'react'
import plane from 'src/assets/images/promotion/plane.svg'
import plane_gray from 'src/assets/images/promotion/plane_gray.svg'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import WeekPrice from '../../molecules/PromotionPrice/WeekPrice'
import PaymentMethod from '../../molecules/PaymentMethod'

const PromotionRaise = () => {
  const { palette } = useTheme()
  const { t } = useTranslation('promotion')

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
      <WeekPrice />
      <PaymentMethod />
    </>
  )
}

export default PromotionRaise
