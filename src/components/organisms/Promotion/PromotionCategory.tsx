import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import pro from 'src/assets/images/promotion/pro.svg'
import superElite from 'src/assets/images/promotion/superElite.png'
import superEliteProfile from 'src/assets/images/promotion/superEliteProfile.png'
import aboutPro from 'src/assets/images/promotion/aboutPro.png'
import deleteIcon from 'src/assets/images/promotion/delete.svg'
import PaymentMethod from '../../molecules/PaymentMethod'
import ChoicePrice from '../../molecules/ChoicePrice/ChoicePrice'
import TextButton from '../../atoms/TextButton'
import CreateAdBoxStepOne from '../CreateAdBox/components/CreateAdBoxStepOne'
import { CategoriesType } from '@/src/enums/categories'
import { useDispatch, useSelector } from 'react-redux'
import { map } from 'lodash'
import { proError, proLoading, selectProProfiles, selectSingleProProfile } from '@/src/redux/selectors/pro'
import {
  createProProfileRequested,
  createProProfileSucceed,
  deleteCompanyProfileRequested,
  getMyCompanyProfilesRequested,
} from '@/src/redux/slices/pro'
import { CreateProProfile, DeleteCompanyProfile, ProProfile } from '@/src/types/redux/pro'
import toast from 'react-hot-toast'
import useRequestStatus from '@/src/utils/useRequestStatus'
import { useRouter } from 'next/router'
import { object } from 'yup'
import ModalDeleteConfirm from '../../molecules/ModalDeleteConfirm/ModalDeleteConfirm'
import CategoryProCard from '../../molecules/CategoryProCard/CategoryProCard'

const categories = [
  CategoriesType.Services,
  CategoriesType.Vehicle,
  CategoriesType.RealEstate,
  CategoriesType.Devices,
  CategoriesType.Household,
  CategoriesType.Animals,
  CategoriesType.PersonalItems,
  CategoriesType.Jobs,
  CategoriesType.HealthItems,
  // CategoriesType.SpareParts,
  CategoriesType.Other,
]

const PromotionCategory: React.FC = () => {
  const { palette, breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))
  const { t } = useTranslation(['promotion', 'common', 'categories'])
  const dispatch = useDispatch()
  const router = useRouter()

  const [open, setOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedPeriod, setSelectedPeriod] = useState<number>(0)
  const [selectedCurrencyIds, setSelectedCurrencyIds] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState<DeleteCompanyProfile | null>(null)

  const adsPro = useSelector(selectProProfiles)
  const selectedPro = useSelector(selectSingleProProfile)
  const loading = useSelector(proLoading)
  const error = useSelector(proError)

  const handlePeriodSelect = (period: number) => {
    setSelectedPeriod(period)
  }

  useEffect(() => {
    dispatch(getMyCompanyProfilesRequested())
  }, [])

  const handleCurrencySelect = (id: string) => {
    setSelectedCurrencyIds(prevSelectedCurrencyIds => {
      if (prevSelectedCurrencyIds.includes(id)) {
        return prevSelectedCurrencyIds.filter(currencyId => currencyId !== id)
      } else {
        return [...prevSelectedCurrencyIds, id]
      }
    })
  }

  const [startRequest] = useRequestStatus(loading, error, t('promotionSuccess'), () => {
    const objectId = selectedPro?.objectId
    if (objectId) {
      router.push(`/pro/create/${objectId}`)
    }
  })

  const handleSubmit = () => {
    const payload: CreateProProfile = {
      category: selectedCategory as CategoriesType,
      tariffMonths: selectedPeriod,
      paymentMethods: selectedCurrencyIds,
    }
    startRequest()
    dispatch(createProProfileRequested(payload))
  }

  const isDisable = () => {
    return !selectedPeriod || selectedCurrencyIds.length === 0 || !selectedCategory
  }

  const handleDelete = () => {
    if (selectedId) {
      console.log('Deleting profile with id:', selectedId.profileId)
      dispatch(deleteCompanyProfileRequested(selectedId))
      setOpen(false)
      dispatch(getMyCompanyProfilesRequested())
    }
  }

  return (
    <>
      {loading && <CircularProgress />}
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h3" sx={{ mr: 2 }}>
          {t('categoryAd')}
        </Typography>
        <Image src={pro} alt="Promotion Icon" />
      </Box>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc1')}
      </Typography>
      <Image src={superEliteProfile} alt="pro profile" width={200} height={120} />
      <Typography my={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc2')}
      </Typography>
      <Box my={1} display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
        <Image src={aboutPro} alt="about company" width={220} height={440} />
        <Image src={superElite} alt="ads pro profile" width={288} height={178} />
      </Box>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc3')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc4')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc5')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc6')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc7')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%">
        {t('category.categoryDesc8')}
      </Typography>
      <ChoicePrice content="year" selectedPeriod={selectedPeriod} onPeriodSelect={handlePeriodSelect} />
      <Box mt={isLarge ? 11 : 4}>
        <Typography variant="subtitle1">{t('common:select_category')}</Typography>
        <Grid container spacing={3.5} mt={2.5}>
          {map(categories, (category, index) => (
            <Grid item key={index}>
              <TextButton
                isSelected={selectedCategory === category}
                text={t(`categories:${category}`)}
                onClick={() => setSelectedCategory(category)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <PaymentMethod selectedCurrencyIds={selectedCurrencyIds} onCurrencySelect={handleCurrencySelect} />{' '}
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          sx={{
            minWidth: 150,
            fontWeight: 600,
            fontSize: '16px',
            width: 'fit-content',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDisable() ? palette.customColors.lightBackground : palette.primary.light,
            borderRadius: '10px',
            padding: '12px 15px 11px',
            color: palette.info.main,
            '&:hover': {
              background: isDisable() ? palette.customColors.lightBackground : palette.primary.dark,
            },
          }}
          disabled={isDisable()}
          onClick={handleSubmit}
        >
          {t('common:pay_btn')}
        </Button>
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="h6">{t('connected_services')}</Typography>
        <Box borderTop="1px solid"></Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            {Array.isArray(adsPro) &&
              adsPro.map((ad: ProProfile) => (
                <CategoryProCard
                  key={ad.objectId}
                  ad={ad}
                  onDeleteClick={(profileId: string) => {
                    setSelectedId({ profileId })
                    setOpen(true)
                  }}
                />
              ))}
          </Box>
        )}
      </Box>
      <ModalDeleteConfirm
        open={open}
        onClose={() => setOpen(false)}
        onDelete={handleDelete}
        profileId={selectedId?.profileId}
      />
    </>
  )
}

export default PromotionCategory
