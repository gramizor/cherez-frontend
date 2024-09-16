import { selectMyBoostedAds, selectMyLargeAds } from '@/src/redux/selectors/promotion'
import { getMyBoostedAdsRequested, getMyLargeAdsRequested } from '@/src/redux/slices/promotion'
import { Box, Typography, Card, CardContent, CardMedia, IconButton, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { countries } from '../../organisms/CountrySlider/constants'
import deleteIcon from 'src/assets/images/promotion/delete.svg'

type Props = {
  content: string
}
const getFlagImage = (countryCode: string) => {
  const country = countries.find(c => c.code === countryCode)
  return country ? `/countries/${country.img}` : null
}

const BoostedAds = ({ content }: Props) => {
  const { t } = useTranslation(['promotion', 'common'])
  const dispatch = useDispatch()
  const { palette } = useTheme()

  const adsLarge = useSelector(selectMyLargeAds)
  const adsBoosted = useSelector(selectMyBoostedAds)

  useEffect(() => {
    switch (content) {
      case 'xl':
        dispatch(getMyLargeAdsRequested())
        break
      case 'boost':
        dispatch(getMyBoostedAdsRequested())
        break
    }
  }, [content, dispatch])

  const adsToDisplay = content === 'xl' ? adsLarge : adsBoosted

  if (adsToDisplay.length === 0) {
    return (
      <Typography variant="h6" mb={5}>
        {t('no_ads')}
      </Typography>
    )
  }

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6">{t('connected_services')}</Typography>
      <Box borderTop="1px solid"></Box>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {adsToDisplay.map((ad: any) => (
          <Card
            key={ad.objectId}
            sx={{
              display: 'flex',
              backgroundColor: `${palette.primary.light}50`,
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          >
            <CardContent sx={{ flex: 1, position: 'relative' }}>
              <IconButton sx={{ position: 'absolute', top: 10, right: 10, width: '37px', height: '37px' }}>
                <Image src={deleteIcon} alt="delete" />
              </IconButton>
              {/* TODO добавить логику удаления объявления */}
              <Typography color={palette.text.primary} fontSize="18px" fontWeight={600} mb={1}>
                {t('promotion_service')} - {content === 'xl' ? 'Объявление XL' : 'Поднять объявление'}
              </Typography>
              <Typography color={palette.text.primary} fontSize="16px" fontWeight={600}>
                {t('common:date.connected_before')}{' '}
                {content === 'xl'
                  ? new Date(ad.largeBefore.iso).toLocaleString()
                  : new Date(ad.boostedBefore.iso).toLocaleString()}
              </Typography>
              <Box borderLeft="1px solid" px={2}>
                <Typography variant="h6" color={palette.text.secondary} mt={1}>
                  {ad.price.toLocaleString()} {ad.currencyCode}
                </Typography>
                <Typography variant="body2" color={palette.text.secondary}>
                  {ad.label}
                </Typography>
                <Typography variant="body2" color={palette.text.secondary}>
                  {ad.description}
                </Typography>
                <Box display="flex" alignItems="center" my={1}>
                  <Image
                    src={getFlagImage(ad.country) as string}
                    alt={ad.country}
                    width={24}
                    height={16}
                    style={{ marginRight: 4 }}
                  />
                  <Typography variant="body2" color={palette.text.secondary}>
                    {ad.country} {ad.city}
                  </Typography>
                </Box>
                <Typography variant="body2" color={palette.text.secondary}>
                  {new Date(ad.publishedAt.iso).toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center"></Box>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default BoostedAds
