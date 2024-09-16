import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/src/redux/rootReducer'
import { useTranslation } from 'next-i18next'
import {
  deleteAdRequested,
  extendAdRequested,
  getMyCommonAdsRequested,
  getMyProAdsRequested,
  setAdPublicRequested,
  setCommonAdsPublicRequested,
} from '@/src/redux/slices/myAds'
import LoadingCircular from '../../atoms/LoadingCircular/LoadingCircular.styled'
import RadioSliderButton from '../../buttons/RadioSliderButton/RadioSliderButton'
import { AdsState } from '@/src/types/models'
import MyAdsCardComponent from '../../molecules/MyAdsCardComponent/MyAdsCardComponent'
import { deleteCompanyProfileRequested } from '@/src/redux/slices/pro'
import ModalDeleteConfirm from '../../molecules/ModalDeleteConfirm/ModalDeleteConfirm'
import { enableAdBoostRequested, setAdLargeRequested } from '@/src/redux/slices/promotion'
import { palette } from '@/src/theme/palette'
import { DeleteCompanyProfile } from '@/src/types/redux/pro'
import { useRouter } from 'next/router'

const MyAdsSection = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('myAds')
  const isLoading = useSelector((state: RootState) => state.myAds.loading)
  const myCommonAds = useSelector((state: RootState) => state.myAds.myAds)

  const [open, setOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<DeleteCompanyProfile | null>(null)
  const isActive = myCommonAds.every((ad: AdsState) => ad.public)

  useEffect(() => {
    dispatch(getMyCommonAdsRequested())
  }, [])

  const handleDelete = () => {
    // if (selectedId) {
    //   dispatch(deleteCompanyProfileRequested(selectedId))
    //   setOpen(false)
    //   dispatch(getMyCompanyProfilesRequested())
    // }
  }

  const setActiveSlider = () => {
    const newIsActive = !isActive
    dispatch(setCommonAdsPublicRequested({ isPublic: newIsActive }))
    dispatch(getMyCommonAdsRequested())
  }

  const handleExtend = (adId: string) => {
    dispatch(extendAdRequested(adId))
  }

  const handleDeleteAd = (adId: string) => {
    dispatch(deleteAdRequested(adId))
  }

  const handleXL = (adId: string): void => {
    dispatch(
      setAdLargeRequested({
        adId,
        successCallback: () => dispatch(getMyCommonAdsRequested()),
        failedCallback: () => router.push(`/promotion/xl`),
      })
    )
  }

  const handleBoost = (adId: string): void => {
    dispatch(
      enableAdBoostRequested({
        adId,
        successCallback: () => dispatch(getMyCommonAdsRequested()),
        failedCallback: () => router.push(`/promotion/raise`),
      })
    )
  }

  const togglePublicStatus = (adId: string, isPublic: boolean) => {
    dispatch(setAdPublicRequested({ adId, isPublic, type: 'common' }))
  }

  return (
    <Box position="relative">
      <LoadingCircular isLoading={isLoading} />
      <Stack flexDirection="row" sx={{ borderBottom: `1px solid ${palette.black}` }}>
        <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>
          {t('my_common_ads')}: {myCommonAds.length}/20
          <RadioSliderButton checked={isActive} onChange={setActiveSlider} />
        </Typography>
      </Stack>
      {Array.isArray(myCommonAds) && myCommonAds.length > 0 ? (
        myCommonAds.map((ad: AdsState) => (
          <MyAdsCardComponent
            key={ad.objectId}
            ad={ad}
            togglePublicStatus={(newStatus: boolean) => togglePublicStatus(ad.objectId, newStatus)}
            handleExtend={() => handleExtend(ad.objectId)}
            handleDeleteAd={() => handleDeleteAd(ad.objectId)}
            handleXL={() => handleXL(ad.objectId)}
            handleBoost={() => handleBoost(ad.objectId)}
            handleSettings={function (): void {
              console.error('Function not implemented.')
            }}
          />
        ))
      ) : (
        <Typography variant="body1">{t('no_common_ads')}</Typography>
      )}
      <ModalDeleteConfirm
        open={open}
        onClose={() => setOpen(false)}
        onDelete={handleDelete}
        profileId={selectedId?.profileId}
      />
    </Box>
  )
}

export default MyAdsSection
