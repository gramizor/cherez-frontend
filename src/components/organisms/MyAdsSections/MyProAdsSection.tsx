import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { RootState } from '@/src/redux/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
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
import { getLoadingMyAds, getSkipMyAds } from '@/src/redux/selectors/myAds'
import RadioSliderButton from '../../buttons/RadioSliderButton/RadioSliderButton'
import { palette } from '@/src/theme/palette'
import { enableAdBoostRequested, setAdLargeRequested } from '@/src/redux/slices/promotion'
import { adBoostState } from '@/src/types/redux/promotion'
import LoadingCircular from '../../atoms/LoadingCircular/LoadingCircular.styled'

const MyProAdsSection = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('promotion')
  const myProAds = useSelector((state: RootState) => state.myAds.myProAds)
  const adsPro = useSelector(selectProProfiles)
  const total = useSelector((state: RootState) => state.myAds.proAdsCount)
  const skip = useSelector(getSkipMyAds)
  const isLoading = useSelector(getLoadingMyAds)

  const [open, setOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<DeleteCompanyProfile | null>(null)
  const [isActive, setIsActive] = useState(useSelector((state: RootState) => !!state.myAds.isActive))

  useEffect(() => {
    if (!isLoading) {
      dispatch(getMyCompanyProfilesRequested())
      dispatch(getMyProAdsCountRequested())
      dispatch(getMyProAdsRequested({ skip, limit: 5 }))
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
    setIsActive(newIsActive)
    dispatch(setProAdsPublicRequested({ isPublic: newIsActive }))
  }

  const handleShowMore = () => {
    dispatch({ type: 'myAds/handleShowMore', payload: { skip, limit: 5 } })
  }

  const handleExtend = (adId: string) => {
    dispatch(extendAdRequested({ adId }))
  }

  const handleDeleteAd = (adId: string) => {
    dispatch(deleteAdRequested(adId))
  }

  const handleXL = (adId: adBoostState): void => {
    dispatch(setAdLargeRequested(adId))
  }

  const handleBoost = (adId: adBoostState): void => {
    dispatch(enableAdBoostRequested(adId))
  }

  const togglePublicStatus = (adId: string, isPublic: boolean) => {
    dispatch(setAdPublicRequested({ adId, isPublic }))
  }

  return (
    <Box position="relative">
      <LoadingCircular isLoading={isLoading} />
      <Stack flexDirection="row" sx={{ borderBottom: `1px solid ${palette.black}` }}>
        <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>
          {t('myProAdsActive')}: {total}
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
              isActive={isActive}
              togglePublicStatus={(newStatus: boolean) => togglePublicStatus(ad.objectId, newStatus)}
              handleExtend={() => handleExtend(ad.objectId)}
              handleDeleteAd={() => handleDeleteAd(ad.objectId)}
              handleXL={() => handleXL({ adId: ad.objectId })}
              handleBoost={() => handleBoost({ adId: ad.objectId })}
              handleSettings={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          ))}
          {myProAds.length < total && (
            <Button variant="outlined" color="secondary" onClick={handleShowMore} sx={{ my: 4 }}>
              {t('load_more')}
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
