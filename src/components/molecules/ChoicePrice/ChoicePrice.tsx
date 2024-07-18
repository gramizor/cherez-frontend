import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import TextButton from '../../atoms/TextButton'
import { useTranslation } from 'next-i18next'

interface ChoicePriceProps {
  content: 'year' | 'week'
  selectedPeriod: number
  onPeriodSelect: (period: number) => void
}

const ChoicePrice: React.FC<ChoicePriceProps> = ({ content, selectedPeriod, onPeriodSelect }) => {
  const { t } = useTranslation('promotion')
  const { palette } = useTheme()

  const getContent = (content: 'year' | 'week') => {
    if (content === 'year') {
      return {
        prices: [49, 135, 240, 450],
        periods: [1, 3, 6, 12],
      }
    } else if (content === 'week') {
      return {
        prices: [3, 5, 7],
        periods: [3, 5, 7],
      }
    } else {
      return { prices: [], periods: [] }
    }
  }

  const { prices, periods } = getContent(content)

  return (
    <>
      <Typography variant="h3" fontWeight={600} mb="30px" mt="30px">
        {t('paymentPlan')}
      </Typography>
      <Box display="flex" mb={2}>
        {periods.map((period, index) => (
          <Box display="flex" flexDirection="column" alignItems="center" mr={3} key={period}>
            <TextButton
              isSelected={selectedPeriod === period}
              text={`${prices[index]} USDT`}
              onClick={() => onPeriodSelect(period)}
              sx={{ fontWeight: '600', marginBottom: '10px' }}
              isBlack={true}
            />
            <Typography color={palette.black} fontSize="16px">
              {`${period} ${content === 'year' ? t('months') : t('days')}`}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default ChoicePrice
