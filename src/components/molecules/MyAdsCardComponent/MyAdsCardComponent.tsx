import React, { useEffect, useState } from 'react'
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
import { AdsState } from '@/src/types/models'

interface MyAdsCardComponentProps {
  ad: myProAd | AdsState
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
  const { t } = useTranslation(['myAds', 'common', 'categories'])

  const [isPublic, setIsPublic] = useState(ad.public)
  const imagePro = getSingleImage(ad.images) || noPhoto
  const daysUntil = calculateDaysUntil(ad?.publishedBefore?.iso)

  const handleTogglePublicStatus = () => {
    const newStatus = !isPublic
    setIsPublic(newStatus)
    togglePublicStatus(newStatus)
  }

  useEffect(() => {
    setIsPublic(ad.public)
  }, [ad.public])

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
      <Stack direction="row" flex="1" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography my={2} color={palette.customColors.bodyInfo}>
          {t('ad_id')} {ad.objectId}
        </Typography>
        <Stack direction="row" gap="10px" alignItems="center">
          {daysUntil < 0 ? (
            <Typography variant="h4" color={palette.customColors.redLight}>
              {t('common:done_pro')}
            </Typography>
          ) : (
            ad?.publishedAt?.iso && (
              <Typography my={2} color={palette.customColors.bodyInfo}>
                {t('days_until')}: {calculateDaysUntil(ad?.publishedBefore?.iso)}
              </Typography>
            )
          )}
          <Typography my={2} color={palette.customColors.bodyInfo}>
            {ad?.publishedAt?.iso ? dateFormatter(ad?.publishedAt?.iso) : t('common:draft')}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" flex="1" width="100%" gap="10px">
        <Stack width={200} height={135} position="relative">
          <Image src={imagePro} alt={ad.objectId} layout="fill" objectFit="cover" />
        </Stack>
        <Stack flexDirection="column" flex="1" pl={2} justifyContent="space-between" gap="10px">
          <Stack direction="column" flex="1" height="100%">
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" position="relative">
              <Typography variant="h5" fontWeight="bold" mr={1}>
                {ad.price} {ad.currencyCode}
              </Typography>
              <RadioSliderButton
                checked={isPublic}
                onChange={handleTogglePublicStatus}
                sx={{ position: 'absolute', top: -10, right: 0 }}
              />
            </Stack>
            <Stack direction="row" gap="5px" justifyContent="space-between" mt={2}>
              <Typography fontWeight="bold" color={palette.customColors.bodyInfo} sx={{ maxWidth: '250px' }}>
                {ad.label}
              </Typography>
              {daysUntil < 0 ? (
                <Button onClick={() => handleExtend(ad.objectId)} sx={{ padding: 0 }}>
                  <Typography fontWeight="bold" color={palette.primary.light}>
                    {t('extend')}
                  </Typography>
                </Button>
              ) : null}
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
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
            <Stack direction="column" alignItems="flex-end" gap="10px">
              <Stack justifyContent="flex-end" alignItems="flex-end" flexDirection="row">
                <Typography fontWeight="bold" fontSize="16px">
                  {t(`categories:${ad?.categoryName}`)}
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
      </Stack>
    </Box>
  )
}

export default MyAdsCardComponent
