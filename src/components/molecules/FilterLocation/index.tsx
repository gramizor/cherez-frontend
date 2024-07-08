import { Autocomplete, Box, Grid, Slider, TextField, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { debounce } from 'lodash'
import Typography from '@mui/material/Typography'
import { countries } from '@/src/components/dialogs/LocationSearchDialog/constants'
import { Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios'
import { CountriesType } from '@/src/enums/countries'

type Props = {
  country: {
    id: CountriesType
    title: string
  } | null
  setCountry: Dispatch<
    SetStateAction<{
      id: CountriesType
      title: string
    } | null>
  >
  city: string | null
  setCity: Dispatch<SetStateAction<string | null>>
  km: number
  setKm: Dispatch<SetStateAction<number>>
}

const FilterLocation = ({ country, setCountry, city, setCity, km, setKm }: Props) => {
  const { t } = useTranslation(['common', 'forms', 'countries'])
  const [cities, setCities] = useState([])
  const { palette } = useTheme()

  const fetchCities = (value: string) => {
    const axiosClient = axios.create({
      baseURL: process.env.API_CITIES_URL,
    })
    if (country) {
      axiosClient
        .get(
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
        {t('forms:location_form')}
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
        getOptionLabel={option => t(`countries:${option.title}`) ?? option.id}
        value={country}
        onChange={(e, inputValue) => {
          setCountry(inputValue)
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
        value={city}
        onChange={(e, inputValue) => {
          setCity(inputValue)
        }}
      />
      <Grid container alignItems="center">
        <Slider
          sx={{ width: { xs: '100%', md: 446 } }}
          size={'small'}
          aria-label="Km"
          defaultValue={30}
          color="secondary"
          min={10}
          max={300}
          value={km}
          onChange={(_event, value, _activeThumb) => setKm(value as number)}
        />
        <Grid item sx={{ ml: 6 }}>
          <Typography variant="h5" fontWeight={500}>
            {km} {t('input_km')}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: { xs: 4, md: 4.5 } }}>
        {t('input_km_help')}
      </Typography>
    </Box>
  )
}

export default FilterLocation
