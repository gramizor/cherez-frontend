import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { RootState } from '@/src/redux/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearMyProAds,
  deleteAdRequested,
  extendAdRequested,
  getIsMyProAdsActiveRequested,
  getMyProAdsCountRequested,
  getMyProAdsRequested,
  setAdPublicRequested,
  setProAdsPublicRequested,
} from '@/src/redux/slices/myAds'
import { useTranslation } from 'next-i18next'
import MyAdsCardComponent from '../../molecules/MyAdsCardComponent/MyAdsCardComponent'
import { myProAd } from '@/src/types/redux/myAds'
import CategoryProCard from '../../molecules/CategoryProCard/CategoryProCard'
import { selectProProfiles } from '@/src/redux/selectors/pro'
import { DeleteCompanyProfile, ProProfile } from '@/src/types/redux/pro'
import ModalDeleteConfirm from '../../molecules/ModalDeleteConfirm/ModalDeleteConfirm'
import { deleteCompanyProfileRequested, getMyCompanyProfilesRequested } from '@/src/redux/slices/pro'
import { getLimitMyAds, getLoadingMyAds } from '@/src/redux/selectors/myAds'
import RadioSliderButton from '../../buttons/RadioSliderButton/RadioSliderButton'
import { palette } from '@/src/theme/palette'
import { enableAdBoostRequested, setAdLargeRequested } from '@/src/redux/slices/promotion'
import LoadingCircular from '../../atoms/LoadingCircular/LoadingCircular.styled'
import { createAdPromotionLoading } from '@/src/redux/selectors/promotion'
import { showErrorMessage } from '@/src/utils/useNotification'
import { useRouter } from 'next/router'

const MyProAdsSection = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation(['myAds', 'common'])
  const myProAds = useSelector((state: RootState) => state.myAds.myProAds)
  const adsPro = useSelector(selectProProfiles)
  const total = useSelector((state: RootState) => state.myAds.proAdsCount)
  const skip = 0
  const limit = useSelector(getLimitMyAds)
  const isLoading = useSelector(getLoadingMyAds)
  const loadingHandler = useSelector(createAdPromotionLoading)

  const [open, setOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<DeleteCompanyProfile | null>(null)
  const isActive = useSelector((state: RootState) => state.myAds.isActive)

  useEffect(() => {
    if (!isLoading) {
      dispatch(getMyCompanyProfilesRequested())
      dispatch(getMyProAdsCountRequested())
      dispatch(getMyProAdsRequested({ skip, limit }))
      dispatch(getIsMyProAdsActiveRequested())
    }
  }, [])

  const handleDelete = () => {
    if (selectedId) {
      dispatch(deleteCompanyProfileRequested(selectedId))
      setOpen(false)
      dispatch(getMyCompanyProfilesRequested())
    }
  }

  const setActiveSlider = () => {
    const newIsActive = !isActive
    dispatch(
      setProAdsPublicRequested({
        isPublic: newIsActive,
        successCallback: () => dispatch(getMyProAdsRequested({ skip, limit })),
      })
    )
  }

  const handleShowMore = () => {
    dispatch({ type: 'myAds/handleShowMore', payload: { skip, limit } })
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
        successCallback: () => dispatch(getMyProAdsRequested({ skip, limit })),
        failedCallback: () => router.push(`/promotion/xl`),
      })
    )
  }

  const handleBoost = (adId: string): void => {
    dispatch(
      enableAdBoostRequested({
        adId,
        successCallback: () => dispatch(getMyProAdsRequested({ skip, limit })),
        failedCallback: () => router.push(`/promotion/raise`),
      })
    )
  }

  const togglePublicStatus = (adId: string, isPublic: boolean) => {
    dispatch(setAdPublicRequested({ adId, isPublic, type: 'pro' }))
  }

  return (
    <Box position="relative">
      <LoadingCircular isLoading={isLoading || loadingHandler} />
      <Stack flexDirection="row" sx={{ borderBottom: `1px solid ${palette.black}` }}>
        <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>
          {t('my_pro_ads_active')}: {total}
          <RadioSliderButton checked={isActive} onChange={setActiveSlider} />
        </Typography>
      </Stack>
      <Box display="flex" flexDirection="column" gap={2} mt={7}>
        {Array.isArray(adsPro) &&
          adsPro.map((proCategory: ProProfile) => (
            <CategoryProCard
              key={proCategory.objectId}
              ad={proCategory}
              onDeleteClick={(profileId: string) => {
                setSelectedId({ profileId })
                setOpen(true)
              }}
            />
          ))}
      </Box>
      {Array.isArray(myProAds) && myProAds.length > 0 ? (
        <>
          {myProAds.map((ad: myProAd) => (
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
          ))}
          {myProAds.length < total && (
            <Button variant="outlined" color="secondary" onClick={handleShowMore} sx={{ my: 4 }}>
              {t('common:load_more')}
            </Button>
          )}
        </>
      ) : (
        <Typography variant="body1">{t('no_pro_ads')}</Typography>
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

export default MyProAdsSection
