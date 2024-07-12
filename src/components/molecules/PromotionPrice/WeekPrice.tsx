import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import TextButton from '../../atoms/TextButton'
import { useTranslation } from 'next-i18next'

const WeekPrice = () => {
  const { t } = useTranslation('promotion')
  const { palette } = useTheme()

  return (
    <>
      <Typography variant="h3" fontWeight={600} mb="30px" mt="30px">
        {t('paymentPlan')}
      </Typography>
      <Box display="flex" mb={2}>
        {['3 USDT', '5 USDT', '7 USDT'].map((price, index) => (
          <Box display="flex" flexDirection="column" alignItems="center" mr={3} key={index}>
            <TextButton
              isSelected={index === 2}
              text={price}
              onClick={() => {}}
              sx={{ fontWeight: '600', marginBottom: '10px' }}
              isBlack={true}
            />
            <Typography color={palette.black} fontSize="16px">
              {[`${3} ${t('days2')}`, `${5} ${t('days')}`, `${7} ${t('days')}`][index]}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default WeekPrice
