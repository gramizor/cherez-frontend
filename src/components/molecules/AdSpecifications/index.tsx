import { Box } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useSelector } from 'react-redux'
import { getCurrentAd } from '@/src/redux/selectors/ad'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import { CategoriesType } from '@/src/enums/categories'
import VehicleSpecifications from '@/src/components/molecules/AdSpecifications/components/VehicleSpecifications'
import {
  CategoryInfoAnimals,
  CategoryInfoHealthItems,
  CategoryInfoHousehold,
  CategoryInfoJobs,
  CategoryInfoPersonalItems,
  CategoryInfoRealEstate,
  CategoryInfoServices,
  CategoryInfoSpareParts,
  CategoryInfoVehicle,
} from '@/src/types/models'
import ServicesSpecifications from '@/src/components/molecules/AdSpecifications/components/ServicesSpecifications'
import RealEstateSpecifications from '@/src/components/molecules/AdSpecifications/components/RealEstateSpecifications'
import HouseholdSpecifications from '@/src/components/molecules/AdSpecifications/components/HouseholdSpecifications'
import AnimalsSpecifications from '@/src/components/molecules/AdSpecifications/components/AnimalsSpecifications'
import PersonalItemsSpecifications from '@/src/components/molecules/AdSpecifications/components/PersonalItemsSpecifications'
import JobsSpecifications from '@/src/components/molecules/AdSpecifications/components/JobsSpecifications'
import HealthItemsSpecifications from '@/src/components/molecules/AdSpecifications/components/HealthItemsSpecifications'
import SparePartsSpecifications from '@/src/components/molecules/AdSpecifications/components/SparePartsSpecifications'

const AdSpecifications = () => {
  const currentAd = useSelector(getCurrentAd)
  const { t } = useTranslation('ad')

  function renderOptions() {
    if (currentAd) {
      switch (currentAd.categoryName) {
        case CategoriesType.Vehicle:
          return <VehicleSpecifications categoryInfo={currentAd.categoryInfo as CategoryInfoVehicle} />
        case CategoriesType.Services:
          return <ServicesSpecifications categoryInfo={currentAd.categoryInfo as CategoryInfoServices} />
        case CategoriesType.RealEstate:
          return <RealEstateSpecifications categoryInfo={currentAd.categoryInfo as CategoryInfoRealEstate} />
        case CategoriesType.Household:
          return <HouseholdSpecifications categoryInfo={currentAd.categoryInfo as CategoryInfoHousehold} />
        case CategoriesType.Animals:
          return <AnimalsSpecifications categoryInfo={currentAd.categoryInfo as CategoryInfoAnimals} />
        case CategoriesType.PersonalItems:
          return <PersonalItemsSpecifications categoryInfo={currentAd.categoryInfo as CategoryInfoPersonalItems} />
        case CategoriesType.Jobs:
          return <JobsSpecifications categoryInfo={currentAd.categoryInfo as CategoryInfoJobs} />
        case CategoriesType.HealthItems:
          return <HealthItemsSpecifications categoryInfo={currentAd.categoryInfo as CategoryInfoHealthItems} />
        case CategoriesType.SpareParts:
          return <SparePartsSpecifications categoryInfo={currentAd.categoryInfo as CategoryInfoSpareParts} />
        default:
          return null
      }
    }
    return null
  }

  if (!currentAd || !currentAd.categoryInfo) return null
  return (
    <Box>
      <Typography variant="h2" textAlign={{ xs: 'center', lg: 'left' }}>
        {t('ad:specifications')}
      </Typography>
      {renderOptions()}
    </Box>
  )
}

export default AdSpecifications
