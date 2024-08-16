import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'next-i18next'
import MainTopActions from '@/src/components/organisms/MainTopActions'
import LeftMenu from '@/src/components/molecules/LeftMenu'
import PromotionMain from '../../organisms/Promotion/PromotionMain'
import PromotionCategory from '../../organisms/Promotion/PromotionCategory'
import PromotionRaise from '../../organisms/Promotion/PromotionRaise'
import PromotionXL from '../../organisms/Promotion/PromotionXL'
import Image from 'next/image'
import cherezPlus from 'src/assets/images/promotion/cherezplus.svg'
import CreateCategory from '../CategoryPageWrapper/CreateCategory'

interface PromotionPageWrapperProps {
  content: 'Main' | 'Category' | 'Raise' | 'XL'
}

const PromotionPageWrapper: React.FC<PromotionPageWrapperProps> = ({ content }) => {
  const { breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))
  const { t } = useTranslation('promotion')
  const renderContent = () => {
    switch (content) {
      case 'Main':
        return <PromotionMain />
      case 'Category':
        return <PromotionCategory />
      case 'Raise':
        return <PromotionRaise />
      case 'XL':
        return <PromotionXL />
      default:
        return null
    }
  }

  return (
    <Box mt={{ xs: 4, md: '29px' }}>
      <MainTopActions isReturning />
      <Box mt="29px" display="flex">
        {isLarge && (
          <Box maxWidth="247px">
            <LeftMenu active="promotion" />
            <Box width={247}></Box>
          </Box>
        )}
        <Box flex="1" ml={isLarge ? 4 : 0} mr={isLarge ? 4 : 0}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" mb={4}>
            <Typography variant="h3" sx={{ mr: 2 }}>
              {t('promotion')}
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ padding: '5px 16px', border: '1px solid #D9D9D9', borderRadius: '10px' }}
            >
              <Image src={cherezPlus} alt={cherezPlus} width={130} />
            </Box>
          </Box>
          <Box sx={{ borderBottom: '1px solid #D9D9D9', mb: 4 }} />
          {renderContent()}
        </Box>
      </Box>
    </Box>
  )
}

export default PromotionPageWrapper
