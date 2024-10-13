import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import TextButton from '@/src/components/atoms/TextButton'
import { getCategoryAdCreateForm } from '@/src/redux/selectors/adCreate'
import { CategoriesType } from '@/src/enums/categories'
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

type Props = {
  setStep: Dispatch<SetStateAction<number>>
}

const forms = {
  [CategoriesType.Services]: <ServiceAdCreateForm categoryName={CategoriesType.Services} />,
  [CategoriesType.Vehicle]: <VehicleAdCreateForm categoryName={CategoriesType.Vehicle} />,
  [CategoriesType.RealEstate]: <RealEstateAdCreateForm categoryName={CategoriesType.RealEstate} />,
  [CategoriesType.Devices]: <DevicesAdCreateForm categoryName={CategoriesType.Devices} />,
  [CategoriesType.Household]: <HouseholdAdCreateForm categoryName={CategoriesType.Household} />,
  [CategoriesType.PersonalItems]: <PersonalItemsAdCreateForm categoryName={CategoriesType.PersonalItems} />,
  [CategoriesType.Jobs]: <JobsAdCreateForm categoryName={CategoriesType.Jobs} />,
  [CategoriesType.HealthItems]: <HealthItemsAdCreateForm categoryName={CategoriesType.HealthItems} />,
  [CategoriesType.SpareParts]: <SparePartsAdCreateForm categoryName={CategoriesType.SpareParts} />,
  [CategoriesType.Animals]: <AnimalsAdCreateForm categoryName={CategoriesType.Animals} />,
  [CategoriesType.Other]: <OtherAdCreateForm categoryName={CategoriesType.Other} />,
}

const CreateAdBoxStepTwo = ({ setStep }: Props) => {
  const { t } = useTranslation(['common', 'categories'])

  const category = useSelector(getCategoryAdCreateForm)

  return (
    <Box mt={{ xs: 6, md: 11 }} mb={20} sx={{ '& fieldset': { borderWidth: 0 } }}>
      <Typography variant="subtitle1">{t('category')}</Typography>
      <Box mt={3}>
        <TextButton isSelected text={t(`categories:${category}`)} onClick={() => setStep(1)} />
      </Box>

      {category && forms[category]}
    </Box>
  )
}

export default CreateAdBoxStepTwo
