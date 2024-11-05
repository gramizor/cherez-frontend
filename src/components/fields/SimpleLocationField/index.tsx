import { Autocomplete, Box, TextField, Typography, useTheme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { countries } from '@/src/components/dialogs/LocationSearchDialog/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getLocationRequested } from '@/src/redux/slices/location'
import { useTranslation } from 'next-i18next'
import { CityType, GetCitiesType } from '@/src/types/redux/location'
import { CountriesType } from '@/src/enums/countries'
import { RootState } from '@/src/redux/rootReducer'
import { debounce } from 'lodash'

type CountryType = { title: string; id: CountriesType }

type Props = {
  countryValue: CountriesType
  cityValue: string
  handleCountryChange: (country: string) => void
  handleCityChange: (city: string) => void
}

const SimpleLocationField = ({ countryValue, cityValue, handleCountryChange, handleCityChange }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation(['common', 'forms', 'countries'])
  const [cities, setCities] = useState<CityType[]>([])
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const locationState = useSelector((state: RootState) => state.location.data)

  const country: CountryType | null = countries.find(c => c.id === countryValue) ?? null

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

  useEffect(() => {
    setCities(locationState)
  }, [locationState])

  const debouncedFetchCities = useMemo(
    () =>
      debounce((value: string) => {
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
      }, 300),
    [country]
  )

  useEffect(() => {
    if (inputValue) {
      debouncedFetchCities(inputValue)
    }
  }, [inputValue, debouncedFetchCities])

  useEffect(() => {
    if (cityValue) {
      setInputValue(cityValue)
    }
  }, [])

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
        popupIcon={null}
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
        popupIcon={null}
        options={cities}
        renderInput={params => <TextField {...params} sx={{ maxWidth: { xs: '100%', md: 331 } }} label={''} />}
        inputValue={inputValue}
        onInputChange={(_, value) => {
          if (!cityValue || value !== cityValue) {
            setInputValue(value)
            debouncedFetchCities(value)
          }
        }}
        onOpen={() => {
          if (country) {
            fetchCities('')
          }
        }}
        getOptionLabel={option => option.name || ''}
        value={cityValue ? cities.find(city => city.name === cityValue) || null : null}
        onChange={(_, selectedOption) => {
          handleCityChange(selectedOption ? selectedOption.name : '')
          setInputValue(selectedOption ? selectedOption.name : '')
        }}
        isOptionEqualToValue={(option, value) => option.objectId === value?.objectId}
      />
    </Box>
  )
}

export default SimpleLocationField
