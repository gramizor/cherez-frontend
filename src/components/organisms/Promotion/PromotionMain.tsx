import { Box, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import plane from 'src/assets/images/promotion/plane.svg'
import xl from 'src/assets/images/promotion/xl.svg'
import pro from 'src/assets/images/promotion/pro.svg'
import TextButton from '../../atoms/TextButton'
import Link from 'next/link'
import ChoicePrice from '../../molecules/ChoicePrice/ChoicePrice'
import { useRouter } from 'next/router'

const PromotionMain: React.FC = () => {
  const { palette } = useTheme()
  const { t } = useTranslation('promotion')
  const router = useRouter()

  const [selectedPeriod, setSelectedPeriod] = useState<number>(0)

  const handlePeriodSelect = (period: number) => {
    setSelectedPeriod(period)
  }

  return (
    <>
      {/* Raise Ad Section */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" mb={6}>
          <Typography variant="h3" sx={{ mr: 2 }}>
            {t('promotion:raiseAd')}
          </Typography>
          <Image src={plane} alt={plane} />
        </Box>
        <Typography mb={2} fontSize="16px" lineHeight="146%">
          {t('raiseAdDescription')}
        </Typography>
        <Link passHref href={'promotion/raise'}>
          <Typography
            mb={3}
            fontSize="16px"
            sx={{
              color: palette.black,
            }}
          >
            {t('readMore')}
          </Typography>
        </Link>
        <ChoicePrice content="week" selectedPeriod={selectedPeriod} onPeriodSelect={handlePeriodSelect} />
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <TextButton
            isSelected={true}
            text={t('connect')}
            onClick={() => {
              router.push('promotion/raise')
            }}
          />
        </Box>
        <Box sx={{ borderBottom: '1px solid #D9D9D9', mb: 4 }} />
      </Box>

      {/* XL Ad Section */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" mb={6}>
          <Typography variant="h3" sx={{ mr: 2 }}>
            {t('adXL')}
          </Typography>
          <Image src={xl} alt={xl} />
        </Box>
        <Typography mb={3} fontSize="16px" lineHeight="146%">
          {t('adXLDescription')}
        </Typography>
        <Link passHref href={'promotion/xl'}>
          <Typography
            mb={3}
            fontSize="16px"
            sx={{
              color: palette.black,
            }}
          >
            {t('readMore')}
          </Typography>
        </Link>
        <ChoicePrice content="week" selectedPeriod={selectedPeriod} onPeriodSelect={handlePeriodSelect} />
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <TextButton
            isSelected={true}
            text={t('connect')}
            onClick={() => {
              router.push('promotion/xl')
            }}
          />
        </Box>
        <Box sx={{ borderBottom: '1px solid #D9D9D9', mb: 4 }} />
      </Box>

      {/* Pro Category Section */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h3" sx={{ mr: 2 }}>
            {t('categoryAd')}
          </Typography>
          <Image src={pro} alt={pro} />
        </Box>
        <Typography mb={2} fontSize="16px" lineHeight="146%">
          {t('categoryAdDescription')}
        </Typography>
        <Link passHref href={'promotion/category'}>
          <Typography
            mb={3}
            fontSize="16px"
            sx={{
              color: palette.black,
            }}
          >
            {t('readMore')}
          </Typography>
        </Link>
        <ChoicePrice content="year" selectedPeriod={selectedPeriod} onPeriodSelect={handlePeriodSelect} />
        <Box display="flex" justifyContent="flex-end">
          <TextButton
            isSelected={true}
            text={t('connect')}
            onClick={() => {
              router.push('promotion/category')
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default PromotionMain
