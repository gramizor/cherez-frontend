import React, { useEffect } from 'react'
import { CategoriesType } from '@/src/enums/categories'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentAd, getAdRequested } from '@/src/redux/slices/ad'
import { useRouter } from 'next/router'
import { RootState } from '@/src/redux/rootReducer'
import LoadingCircular from '../../atoms/LoadingCircular/LoadingCircular.styled'
import { AdsState } from '@/src/types/models'
import { showErrorMessage } from '@/src/utils/useNotification'
import ServiceAdCreateForm from '@/src/components/forms/adCreate/ServiceAdCreateForm'
import VehicleAdCreateForm from '@/src/components/forms/adCreate/VehicleAdCreateForm'
import RealEstateAdCreateForm from '@/src/components/forms/adCreate/RealEstateAdCreateForm'
import DevicesAdCreateForm from '@/src/components/forms/adCreate/DevicesAdCreateForm'
import HouseholdAdCreateForm from '@/src/components/forms/adCreate/HouseholdAdCreateForm'
import PersonalItemsAdCreateForm from '@/src/components/forms/adCreate/PersonalItemsAdCreateForm'
import JobsAdCreateForm from '@/src/components/forms/adCreate/JobsAdCreateForm'
import HealthItemsAdCreateForm from '@/src/components/forms/adCreate/HealthItemsAdCreateForm'
import SparePartsAdCreateForm from '@/src/components/forms/adCreate/SparePartsAdCreateForm'
import AnimalsAdCreateForm from '@/src/components/forms/adCreate/AnimalsAdCreateForm'
import OtherAdCreateForm from '@/src/components/forms/adCreate/OtherAdCreateForm'
import { palette } from '@/src/theme/palette'
import { CreateAdForm } from '@/src/types/redux/adCreate'
import toast, { Renderable, Toast, ValueFunction } from 'react-hot-toast'
import { saveAdRequested } from '@/src/redux/slices/adCreate'

const forms = {
  [CategoriesType.Services]: <ServiceAdCreateForm />,
  [CategoriesType.Vehicle]: <VehicleAdCreateForm />,
  [CategoriesType.RealEstate]: <RealEstateAdCreateForm />,
  [CategoriesType.Devices]: <DevicesAdCreateForm />,
  [CategoriesType.Household]: <HouseholdAdCreateForm />,
  [CategoriesType.PersonalItems]: <PersonalItemsAdCreateForm />,
  [CategoriesType.Jobs]: <JobsAdCreateForm />,
  [CategoriesType.HealthItems]: <HealthItemsAdCreateForm />,
  [CategoriesType.SpareParts]: <SparePartsAdCreateForm />,
  [CategoriesType.Animals]: <AnimalsAdCreateForm />,
  [CategoriesType.Other]: <OtherAdCreateForm />,
}

const EditAdContainer = () => {
  const { t } = useTranslation(['common', 'categories'])
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const currentAd = useSelector((state: RootState) => state.ad.currentAd)
  const isLoading = useSelector((state: RootState) => state.ad.loading)
  const editLoading = useSelector((state: RootState) => state.adCreate.loading)

  useEffect(() => {
    if (id) {
      dispatch(clearCurrentAd())
      dispatch(getAdRequested({ adId: id }))
    } else {
      showErrorMessage(t('common:errors.noId'))
    }
  }, [id])

  const getInitialValues = (ad: AdsState) => {
    return {
      category: ad.categoryName || '',
      label: ad.label || '',
      currencyCode: ad.currencyCode || 'USD',
      price: ad.price || 0,
      categoryInfo: ad.categoryInfo || {},
      country: ad.country || '',
      city: ad.city || '',
      description: ad.description || '',
      asDraft: ad.draft || true,
      images: ad.images || [],
    }
  }

  const onSubmit = (values: CreateAdForm) => {
    const onFailed = (error: Renderable | ValueFunction<Renderable, Toast>) => {
      if (typeof error === 'string') {
        toast.error(t(`forms:${error.replace(/ /g, '_')}`), { duration: 3000 })
      }
    }
    const onSuccess = () => {
      toast.success(t('notifications:success'))
      router.push(`/announcements`)
    }
    dispatch(
      saveAdRequested({
        ...values,
        category: currentAd?.categoryName,
        objectId: currentAd?.objectId,
        onSuccess,
        onFailed,
      })
    )
  }

  return (
    <Box mt={{ xs: 6, md: 11 }} mb={20} sx={{ '& fieldset': { borderWidth: 0 } }}>
      {(isLoading || editLoading) && !currentAd ? (
        <LoadingCircular isLoading={isLoading} />
      ) : (
        currentAd && (
          <Box mt={3}>
            <Box
              sx={{ backgroundColor: palette.primary.light, px: 4, py: 2, width: 'fit-content', borderRadius: '10px' }}
            >
              <Typography color={palette.info.main} fontSize="16px">
                {t(`categories:${currentAd.categoryName}`)}
              </Typography>
            </Box>
            {currentAd.categoryName &&
              React.cloneElement(forms[currentAd.categoryName], {
                currentInitialValues: getInitialValues(currentAd),
                categoryName: currentAd.categoryName,
                objectId: id,
                submitHandler: onSubmit,
              })}
          </Box>
        )
      )}
    </Box>
  )
}

export default EditAdContainer
