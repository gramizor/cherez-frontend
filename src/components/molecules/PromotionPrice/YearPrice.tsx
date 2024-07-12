import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import TextButton from '../../atoms/TextButton'
import { useTranslation } from 'next-i18next'

const YearPrice = () => {
  const { t } = useTranslation('promotion')
  const { palette } = useTheme()

  return (
    <>
      <Typography variant="h3" fontWeight={600} mb="30px" mt="30px">
        {t('paymentPlan')}
      </Typography>
      <Box display="flex" mb={2}>
        {['49 USDT', '135 USDT', '240 USDT', '450 USDT'].map((price, index) => (
          <Box display="flex" flexDirection="column" alignItems="center" mr={3} key={index}>
            <TextButton
              isSelected={index === 3}
              text={price}
              onClick={() => {}}
              sx={{ fontWeight: '600', marginBottom: '10px' }}
              isBlack={true}
            />
            <Typography color={palette.black} fontSize={'16px'}>
              {[1, 3, 6, 12][index]} {t('months')}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default YearPrice
