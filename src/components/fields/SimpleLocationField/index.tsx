import { Autocomplete, Box, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { countries } from '@/src/components/dialogs/LocationSearchDialog/constants'
import { debounce, find } from 'lodash'
import axios from 'axios'
import { useTranslation } from 'next-i18next'

type Props = {
  countryValue: string
  cityValue: string
  handleCountryChange: (country: string) => void
  handleCityChange: (city: string) => void
}

const SimpleLocationField = ({ countryValue, cityValue, handleCountryChange, handleCityChange }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation(['common', 'forms', 'countries'])
  const country = find(countries, { id: countryValue }) ?? null
  const [cities, setCities] = useState([])
  const fetchCities = (value: string) => {
    const axiosClient = axios.create({
      baseURL: process.env.API_CITIES_URL,
    })
    if (country) {
      axiosClient
        .get(
          // @ts-ignore
          `searchJSON?maxRows=8&featureClass=P&username=${process.env.API_CITIES_USERNAME}&country=${country.id}&q=${value}`
        )
        .then(res => {
          // @ts-ignore
          setCities(res.data.geonames.map(({ name }) => name))
        })
    }
  }

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
        // @ts-ignore
        value={country}
        onChange={(e, inputValue) => {
          inputValue && handleCountryChange(inputValue.id)
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
          inputValue && handleCityChange(inputValue)
        }}
      />
    </Box>
  )
}

export default SimpleLocationField
