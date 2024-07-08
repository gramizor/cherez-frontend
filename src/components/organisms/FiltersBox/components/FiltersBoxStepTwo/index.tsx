import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCategoryMainSearchParam,
  getCategoryParamsMainSearchParam,
  getCityMainSearchParam,
  getCountryMainSearchParam,
  getCurrencyCodeMainSearchParam,
  getMaxPriceMainSearchParam,
  getMinPriceMainSearchParam,
  getSortMainSearchParam,
} from '@/src/redux/selectors/mainSearch'
import TextButton from '@/src/components/atoms/TextButton'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { find } from 'lodash'
import { setSearchParams } from '@/src/redux/slices/mainSearch'
import { countries } from '@/src/components/dialogs/LocationSearchDialog/constants'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import ServiceComponent from '@/src/components/organisms/FiltersBox/components/ServiceComponent'
import VehicleComponent from '@/src/components/organisms/FiltersBox/components/VehicleComponent'
import FilterLocation from '@/src/components/molecules/FilterLocation'
import FilterSort from '@/src/components/molecules/FilterSort'
import { sortOptions } from '@/src/components/dialogs/SortSearchDialog/constants'
import RealEstateComponent from '@/src/components/organisms/FiltersBox/components/RealEstateComponent'
import DevicesComponent from '@/src/components/organisms/FiltersBox/components/DevicesComponent'
import HouseholdComponent from '@/src/components/organisms/FiltersBox/components/HouseholdComponent'
import PersonalItemsComponent from '@/src/components/organisms/FiltersBox/components/PersonalItemsComponent'
import JobsComponent from '@/src/components/organisms/FiltersBox/components/JobsComponent'
import HealthItemsComponent from '@/src/components/organisms/FiltersBox/components/HealthItemsComponent'
import SparePartsComponent from '@/src/components/organisms/FiltersBox/components/SparePartsComponent'
import AnimalsComponent from '@/src/components/organisms/FiltersBox/components/AnimalsComponent'
import OtherComponent from '@/src/components/organisms/FiltersBox/components/OtherComponent'
import { setInitialValue } from '@/src/redux/slices/filters'
import {
  getCategoryParamsFilters,
  getCurrencyFilters,
  getFromFilters,
  getToFilters,
} from '@/src/redux/selectors/filters'
import { CategoriesType } from '@/src/enums/categories'
import { SortAdsType } from '@/src/enums/redux'
import { CountriesType } from '@/src/enums/countries'

type Props = {
  setStep: Dispatch<SetStateAction<number>>
}

const components = {
  [CategoriesType.Services]: <ServiceComponent />,
  [CategoriesType.Vehicle]: <VehicleComponent />,
  [CategoriesType.RealEstate]: <RealEstateComponent />,
  [CategoriesType.Devices]: <DevicesComponent />,
  [CategoriesType.Household]: <HouseholdComponent />,
  [CategoriesType.PersonalItems]: <PersonalItemsComponent />,
  [CategoriesType.Jobs]: <JobsComponent />,
  [CategoriesType.HealthItems]: <HealthItemsComponent />,
  [CategoriesType.SpareParts]: <SparePartsComponent />,
  [CategoriesType.Animals]: <AnimalsComponent />,
  [CategoriesType.Other]: <OtherComponent />,
}

const FiltersBoxStepTwo = ({ setStep }: Props) => {
  const { t } = useTranslation(['common', 'categories'])
  const dispatch = useDispatch()
  const router = useRouter()

  const categoryMainSearchParam = useSelector(getCategoryMainSearchParam)
  const maxPriceMainSearchParam = useSelector(getMaxPriceMainSearchParam)
  const minPriceMainSearchParam = useSelector(getMinPriceMainSearchParam)
  const currencyCodeMainSearchParam = useSelector(getCurrencyCodeMainSearchParam)
  const categoryParamsMainSearchParam = useSelector(getCategoryParamsMainSearchParam)
  const cityMainSearchParam = useSelector(getCityMainSearchParam)
  const countryMainSearchParam = useSelector(getCountryMainSearchParam)
  const sortMainSearchParam = useSelector(getSortMainSearchParam)
  const from = useSelector(getFromFilters)
  const to = useSelector(getToFilters)
  const currency = useSelector(getCurrencyFilters)
  const categoryParams = useSelector(getCategoryParamsFilters)

  const [km, setKm] = useState(30)
  const [city, setCity] = useState<string | null>(cityMainSearchParam === '' ? null : cityMainSearchParam)
  const [sort, setSort] = useState<SortAdsType>(sortMainSearchParam)
  const [country, setCountry] = useState<{
    id: CountriesType
    title: string
  } | null>(
    // @ts-ignore
    find(countries, { id: countryMainSearchParam }) ?? null
  )

  const search = () => {
    dispatch(
      setSearchParams({
        minPrice: from,
        maxPrice: to,
        currencyCode: currency,
        categoryParams,
        country: country?.id,
        city,
        sort,
      })
    )
    router.push('/').then()
  }

  useEffect(() => {
    dispatch(
      setInitialValue({
        from: minPriceMainSearchParam,
        to: maxPriceMainSearchParam,
        currency: currencyCodeMainSearchParam,
        categoryParams: categoryParamsMainSearchParam,
      })
    )
  }, [])

  return (
    <Box mt={{ xs: 6, md: 11 }} mb={20} sx={{ '& fieldset': { borderWidth: 0 } }}>
      <Typography variant="subtitle1">{t('category')}</Typography>
      <Box mt={3}>
        <TextButton isSelected text={t(`categories:${categoryMainSearchParam}`)} onClick={() => setStep(1)} />
      </Box>

      {categoryMainSearchParam && components[categoryMainSearchParam]}

      <Box mt={{ xs: 6, md: 11 }}>
        <FilterLocation country={country} setCountry={setCountry} city={city} setCity={setCity} km={km} setKm={setKm} />
      </Box>
      <Box mt={{ xs: 6, md: 11 }}>
        <FilterSort sort={find(sortOptions, param => param === sort)} setSort={value => setSort(value)} />
      </Box>

      <Grid container justifyContent="center" sx={{ mt: 30 }}>
        <Button
          sx={{ width: { xs: '100%', md: 331 }, fontWeight: 500, fontSize: 16 }}
          variant="contained"
          onClick={search}
        >
          {t('search_forms')}
        </Button>
      </Grid>
    </Box>
  )
}

export default FiltersBoxStepTwo
