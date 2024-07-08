import { Autocomplete, Box, Grid, Menu, Slider, TextField, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { countries } from '@/src/components/dialogs/LocationSearchDialog/constants'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { CountriesType } from '@/src/enums/countries'
import axios from 'axios'
import { debounce, find } from 'lodash'
import { searchAdsRequested, setSearchParams } from '@/src/redux/slices/mainSearch'
import { useDispatch, useSelector } from 'react-redux'
import { getCityMainSearchParam, getCountryMainSearchParam } from '@/src/redux/selectors/mainSearch'

type Props = {
  handleClose: () => void
  anchorEl: null | HTMLElement
}

const LocationSearchDialog = ({ anchorEl, handleClose }: Props) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const open = Boolean(anchorEl)

  const countryMainSearchParam = useSelector(getCountryMainSearchParam)
  const cityMainSearchParam = useSelector(getCityMainSearchParam)

  const [country, setCountry] = useState<{
    id: CountriesType
    title: string
  } | null>(
    // @ts-ignore
    find(countries, { id: countryMainSearchParam }) ?? null
  )
  const [city, setCity] = useState<string | null>(cityMainSearchParam === '' ? null : cityMainSearchParam)
  const [cities, setCities] = useState([])
  const [km, setKm] = useState(30)

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
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => {
        handleClose()
        dispatch(searchAdsRequested())
      }}
      sx={{
        '.MuiPaper-root': {
          backgroundColor: palette.customColors.lightBackground,
          borderRadius: '0px 10px 10px 10px',
          boxShadow: 'none',
        },
        '.MuiList-root': {
          padding: 0,
        },
      }}
    >
      <Box
        sx={{
          paddingTop: '33px',
          paddingLeft: 9,
          paddingRight: '14px',
          paddingBottom: '27px',
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2.25 }}>
          {t('input_country')}
        </Typography>
        <Autocomplete
          sx={{ mb: 8.25 }}
          popupIcon={<></>}
          options={countries}
          renderInput={params => <TextField {...params} sx={{ maxWidth: 331 }} label="" />}
          getOptionLabel={option => t(`countries:${option.title}`) ?? option.id}
          value={country}
          onChange={(e, inputValue) => {
            setCountry(inputValue)
            dispatch(
              setSearchParams({
                country: inputValue ? inputValue.id : '',
              })
            )
          }}
        />
        <Typography variant="subtitle1" sx={{ mb: 2.5 }}>
          {t('input_city')}
        </Typography>
        <Autocomplete
          disabled={!country}
          sx={{ mb: 13 }}
          popupIcon={<></>}
          options={cities}
          renderInput={params => <TextField {...params} sx={{ maxWidth: 331 }} label="" />}
          onInputChange={debounce((event, value) => fetchCities(value), 500)}
          value={city}
          onChange={(e, inputValue) => {
            setCity(inputValue)
            dispatch(
              setSearchParams({
                city: inputValue ? inputValue : '',
              })
            )
          }}
        />
        <Grid container alignItems="center">
          <Slider
            sx={{ width: 446 }}
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
        <Typography variant="h5" sx={{ mt: 4.5 }}>
          {t('input_km_help')}
        </Typography>
      </Box>
    </Menu>
  )
}

export default LocationSearchDialog
