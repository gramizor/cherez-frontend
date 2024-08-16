import React, { useCallback, useEffect, useMemo } from 'react'
import { Box, Typography, Icon, Switch } from '@mui/material'
import Image from 'next/image'
import { myProAd } from '@/src/types/redux/myAds'
import { RootState } from '@/src/redux/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getMyProAdsRequested } from '@/src/redux/slices/myAds'
import { useTranslation } from 'next-i18next'
import getSingleImage from '@/src/utils/helper'
import noPhoto from '/src/assets/images/common/no_photo.jpg'

const MyProAdsSection = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('promotion')

  const myProAds = useSelector((state: RootState) => state.myAds.myProAds)

  useEffect(() => {
    if (!myProAds || myProAds.length === 0) {
      dispatch(getMyProAdsRequested({ skip: 0, limit: 10 }))
    }
  }, [dispatch, myProAds])

  return (
    <Box>
      {Array.isArray(myProAds) && myProAds.length > 0 ? (
        myProAds.map((ad: myProAd) => {
          const imagePro = getSingleImage(ad.images) || noPhoto
          return (
            <Box key={ad.objectId} sx={{ display: 'flex', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
              <Box width={120} height={120} position="relative">
                <Image src={imagePro} alt={ad.label} layout="fill" objectFit="contain" />
              </Box>
              <Box ml={2} flex="1">
                <Typography variant="body1" fontWeight="bold">
                  {ad.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ad.description}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Typography variant="h6" fontWeight="bold" mr={1}>
                    {ad.price} {ad.currencyCode}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ad.city}, {ad.country}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1}>
                  <Typography variant="body2" color="text.secondary" mr={1}>
                    {t('left_days', { days: 21 })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mr={1}>
                    {t('views', { count: 100 })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(ad.updatedAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1}>
                  <Box mr={2}>
                    <Icon>plane</Icon>
                  </Box>
                  <Box mr={2}>
                    <Icon>home</Icon>
                  </Box>
                  <Box mr={2}>
                    <Icon>car</Icon>
                  </Box>
                  <Switch checked={ad.public} />
                </Box>
              </Box>
            </Box>
          )
        })
      ) : (
        <Typography variant="body1">{t('no_pro_ads')}</Typography>
      )}
    </Box>
  )
}

export default MyProAdsSection
