import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/src/redux/rootReducer'
import { useTranslation } from 'next-i18next'
import { getMyCommonAdsRequested } from '@/src/redux/slices/myAds'

const MyAdsSection = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('promotion')
  const myCommonAds = useSelector((state: RootState) => state.myAds.myAds)

  // useEffect(() => {
  //   dispatch(getMyCommonAdsRequested())
  // }, [])

  return (
    <Box>
      {myCommonAds.length > 0 ? (
        myCommonAds.map(ad => (
          <Box key={ad.objectId} sx={{ mb: 2 }}>
            <Typography variant="body1">{ad.label}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">{t('no_common_ads')}</Typography>
      )}
    </Box>
  )
}

export default MyAdsSection
