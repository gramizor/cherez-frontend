import { AppBar, Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import MainTopActions from '../../organisms/MainTopActions'
import LeftMenu from '../../molecules/LeftMenu'
import Image from 'next/image'
import cherezPlus from 'src/assets/images/promotion/pro_icon.svg'
import MyAdsSection from '../../organisms/MyAdsSections/MyAdsSection'
import MyProAdsSection from '../../organisms/MyAdsSections/MyProAdsSection'

const MyAdsPageWrapper = () => {
  const { breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))
  const { t } = useTranslation('myAds')
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          flexDirection="column"
          width="100%"
        >
          <Box width="100%">
            <Tabs
              value={isPro ? 1 : 0}
              onChange={(e, value) => setIsPro(value === 1)}
              variant="fullWidth"
              TabIndicatorProps={{
                style: { backgroundColor: 'black' },
              }}
              sx={{
                '& .MuiTab-root': { textTransform: 'none' },
                '& .Mui-selected': { color: 'black', borderBottom: '3px solid black' },
                '& .MuiTab-root.Mui-selected': { color: 'black' },
              }}
            >
              <Tab label={<h3 style={{ marginTop: 2, fontSize: '20px' }}>{t('all_active_ads')}</h3>} />
              <Tab
                label={<h3 style={{ marginTop: 2, fontSize: '20px' }}>{t('promotion_pro_category')} </h3>}
                icon={<Image src={cherezPlus} alt={cherezPlus} width={61} />}
                iconPosition="end"
                style={{ display: 'flex', alignItems: 'center' }}
              />
            </Tabs>
          </Box>
          <Box flex="1" ml={isLarge ? 4 : 0} mr={isLarge ? 4 : 0} display="flex" width="100%">
            <Box flex="3" mr={isLarge ? 4 : 0} width="100%">
              {!isPro ? <MyAdsSection /> : <MyProAdsSection />}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MyAdsPageWrapper
