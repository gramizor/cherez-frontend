import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import plane from 'src/assets/images/promotion/plane.svg'
import xl from 'src/assets/images/promotion/xl.svg'
import pro from 'src/assets/images/promotion/pro.svg'
import TextButton from '../../atoms/TextButton'
import Link from 'next/link'
import YearPrice from '../../molecules/PromotionPrice/YearPrice'
import WeekPrice from '../../molecules/PromotionPrice/WeekPrice'

const PromotionMain: React.FC = () => {
  const { palette } = useTheme()
  const { t } = useTranslation('promotion')

  return (
    <>
      {/* Raise Ad Section */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" mb={2}>
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
        <WeekPrice />
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <TextButton isSelected={true} text={t('connect')} onClick={() => {}} />
        </Box>
        <Box sx={{ borderBottom: '1px solid #D9D9D9', mb: 4 }} />
      </Box>

      {/* XL Ad Section */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" mb={2}>
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
        <WeekPrice />
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <TextButton isSelected={true} text={t('connect')} onClick={() => {}} />
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
        <YearPrice />
        <Box display="flex" justifyContent="flex-end">
          <TextButton isSelected={true} text={t('connect')} onClick={() => {}} />
        </Box>
      </Box>
    </>
  )
}

export default PromotionMain
