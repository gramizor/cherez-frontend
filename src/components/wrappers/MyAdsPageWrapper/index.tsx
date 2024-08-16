import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import MainTopActions from '../../organisms/MainTopActions'
import LeftMenu from '../../molecules/LeftMenu'
import Image from 'next/image'
import cherezPlus from 'src/assets/images/promotion/cherezplus.svg'
import MyAdsSection from '../../organisms/MyAdsSections/MyAdsSection'
import MyProAdsSection from '../../organisms/MyAdsSections/MyProAdsSection'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/redux/rootReducer'

const MyAdsPageWrapper = () => {
  const { breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))
  const { t } = useTranslation('promotion')

  const loading = useSelector((state: RootState) => state.myAds.loading)
  const error = useSelector((state: RootState) => state.myAds.error)
  const [isPro, setIsPro] = useState(false)

  return (
    <Box mt={{ xs: 4, md: '29px' }}>
      <MainTopActions isReturning />
      <Box mt="29px" display="flex">
        {isLarge && (
          <Box maxWidth="247px">
            <LeftMenu />
            <Box width={247}></Box>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexDirection="column">
          <Tabs value={isPro ? 1 : 0} onChange={(e, value) => setIsPro(value === 1)}>
            <Tab label={t('all_active_ads')} />
            <Tab label={t('promotion_pro_category')} icon={<Image src={cherezPlus} alt={cherezPlus} width={130} />} />
          </Tabs>
          <Box flex="1" ml={isLarge ? 4 : 0} mr={isLarge ? 4 : 0} display="flex">
            <Box flex="3" mr={isLarge ? 4 : 0}>
              {loading ? (
                <Typography variant="body1">{t('loading')}</Typography>
              ) : error ? (
                <Typography variant="body1" color="error">
                  {t('error_loading_ads')}
                </Typography>
              ) : !isPro ? (
                <MyAdsSection />
              ) : (
                <MyProAdsSection />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MyAdsPageWrapper