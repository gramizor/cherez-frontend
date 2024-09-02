import React, { useState } from 'react'
import { Box, Typography, Stack, Button } from '@mui/material'
import Image from 'next/image'
import { myProAd } from '@/src/types/redux/myAds'
import { useTranslation } from 'next-i18next'
import getSingleImage from '@/src/utils/helper'
import noPhoto from '/src/assets/images/common/no_photo.jpg'
import PromotionGroupBtns from '../PromotionGroupBtns/PromotionGroupBtns'
import dateFormatter, { calculateDaysUntil } from '@/src/utils/dateHelper'
import { palette } from '@/src/theme/palette'
import RadioSliderButton from '../../buttons/RadioSliderButton/RadioSliderButton'
import { useDispatch } from 'react-redux'

interface MyAdsCardComponentProps {
  ad: myProAd
  isActive: boolean
  togglePublicStatus: (newStatus: boolean) => void
  handleExtend: (adId: string) => void
  handleDeleteAd: (adId: string) => void
  handleXL: (adId: string) => void
  handleBoost: (adId: string) => void
  handleSettings: () => void
}

const MyAdsCardComponent: React.FC<MyAdsCardComponentProps> = ({
  ad,
  togglePublicStatus,
  handleExtend,
  handleDeleteAd,
  handleXL,
  handleBoost,
  handleSettings,
}) => {
  const { t } = useTranslation('promotion')
  const dispatch = useDispatch()

  const [isPublic, setIsPublic] = useState(ad.public)
  const imagePro = getSingleImage(ad.images) || noPhoto
  const daysUntil = calculateDaysUntil(ad?.publishedBefore?.iso)

  const handleTogglePublicStatus = () => {
    const newStatus = !isPublic
    setIsPublic(newStatus)
    togglePublicStatus(newStatus)
  }

  return (
    <Box
      key={ad.objectId}
      sx={{
        display: 'flex',
        p: 2,
        py: 5,
        borderBottom: `1px solid ${palette.black}`,
      }}
      width="100%"
      flexDirection="column"
      flex="1"
    >
      <Stack direction="row" flex="1" justifyContent="space-between" alignItems="center">
        <Typography my={2}>
          {t('ad_id')} {ad.objectId}
        </Typography>
        <Stack direction="row" gap="10px" alignItems="center">
          {daysUntil < 0 ? (
            <Typography variant="h4" color={palette.customColors.redLight}>
              {t('common:done_pro')}
            </Typography>
          ) : (
            ad?.publishedAt?.iso && (
              <Typography my={2}>
                {t('days_until')}: {calculateDaysUntil(ad?.publishedBefore?.iso)}
              </Typography>
            )
          )}
          <Typography my={2}>
            {ad?.publishedAt?.iso ? dateFormatter(ad?.publishedAt?.iso) : t('common:draft')}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" flex="1" width="100%">
        <Stack width={200} height={135} position="relative">
          <Image src={imagePro} alt={ad.objectId} layout="fill" objectFit="cover" />
        </Stack>
        <Stack flexDirection="column" flex="1" pl={2} justifyContent="space-between" gap="10px">
          <Stack direction="column" flex="1">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight="bold" mr={1}>
                {ad.price} {ad.currencyCode}
              </Typography>
              <RadioSliderButton checked={isPublic} onChange={handleTogglePublicStatus} />
            </Stack>
            <Stack direction="row" justifyContent="space-between" flex="1">
              <Stack direction="column" gap="5px">
                <Typography fontWeight="bold">{ad.label}</Typography>
                <Typography variant="h5" mr={1}>
                  {ad.description}
                </Typography>
              </Stack>
              <Stack justifyContent="space-between" alignItems="center">
                <Button onClick={() => handleExtend(ad.objectId)}>
                  <Typography variant="h4" color={palette.primary.light} fontWeight="bold">
                    {daysUntil < 0 ? 'Продлить' : ''}
                  </Typography>
                </Button>
                <Typography fontWeight="bold">{t(`categories:${ad?.categoryName}`)}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row">
              {ad?.country && (
                <Image
                  src={`/countries/flag_${ad?.country.toLowerCase()}.png`}
                  alt={ad.country}
                  width={21}
                  height={13}
                />
              )}
              <Typography variant="body1" fontSize={14} sx={{ ml: 1 }} color={'secondary'}>
                {ad.country} {ad.city}
              </Typography>
            </Stack>
            <PromotionGroupBtns
              ad={ad}
              handleDeleteAd={handleDeleteAd}
              handleXL={handleXL}
              handleBoost={handleBoost}
              handleSettings={handleSettings}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default MyAdsCardComponent
