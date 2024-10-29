import { Autocomplete, Box, TextField, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { countries } from '@/src/components/dialogs/LocationSearchDialog/constants'
import { debounce, find } from 'lodash'
import { useDispatch } from 'react-redux'
import { getLocationRequested } from '@/src/redux/slices/location'
import { useTranslation } from 'next-i18next'
import { GetCitiesType } from '@/src/types/redux/location'
import { CountriesType } from '@/src/enums/countries'

type CountryType = { title: string; id: CountriesType }

type Props = {
  countryValue: CountriesType
  cityValue: string
  handleCountryChange: (country: CountriesType) => void
  handleCityChange: (city: string) => void
}

const SimpleLocationField = ({ countryValue, cityValue, handleCountryChange, handleCityChange }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation(['common', 'forms', 'countries'])
  const [cities, setCities] = useState<string[]>([])
  const dispatch = useDispatch()

  const country: CountryType | null = find(countries, { id: countryValue }) ?? null

  const fetchCities = (value: string) => {
    if (country) {
      const payload: GetCitiesType = {
        country: country.id,
        searchLine: value,
        limit: '8',
        skip: '0',
        order: '',
      }
      dispatch(getLocationRequested(payload))
    }
  }

  useEffect(() => {
    if (country) {
      fetchCities('')
    } else {
      setCities([])
    }
  }, [country])

  return (
    <Box>
      <Typography sx={{ mb: { xs: 4, md: 10.5 } }} variant="subtitle1">
        {t('forms:set_location')}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2.25, fontSize: { xs: 16, md: 20 } }}>
        {t('input_country')}
      </Typography>
      <Autocomplete
        sx={{
          mb: { xs: 4, md: 10.5 },
          '& .MuiOutlinedInput-root': {
            background: palette.customColors.lightBackground,
          },
        }}
        popupIcon={<></>}
        options={countries}
        renderInput={params => <TextField {...params} sx={{ maxWidth: { xs: '100%', md: 331 } }} label="" />}
        getOptionLabel={option => t(`countries:${option?.title}`) ?? option?.id}
        value={country}
        onChange={(e, inputValue) => {
          if (inputValue) {
            handleCountryChange(inputValue.id as CountriesType)
          }
        }}
      />
      <Typography variant="subtitle1" sx={{ mb: 2.5, fontSize: { xs: 16, md: 20 } }}>
        {t('input_city')}
      </Typography>
      <Autocomplete
        disabled={!country}
        sx={{
          mb: { xs: 4, md: 13 },
          '& .MuiOutlinedInput-root': {
            background: palette.customColors.lightBackground,
          },
        }}
        popupIcon={<></>}
        options={cities}
        renderInput={params => <TextField {...params} sx={{ maxWidth: { xs: '100%', md: 331 } }} label="" />}
        onInputChange={debounce((event, value) => fetchCities(value), 500)}
        value={cityValue}
        onChange={(e, inputValue) => {
          if (inputValue) {
            handleCityChange(inputValue)
          }
        }}
      />
    </Box>
  )
}

export default SimpleLocationField
