import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCurrenciesFilters,
  getCurrencyFilters,
  getFromFilters,
  getToFilters,
} from '@/src/redux/selectors/filters'
import { setInitialValue } from '@/src/redux/slices/filters'

const FilterPrice = () => {
  const { t } = useTranslation(['common', 'forms'])
  const dispatch = useDispatch()

  const from = useSelector(getFromFilters)
  const to = useSelector(getToFilters)
  const currency = useSelector(getCurrencyFilters)
  const allCurrencies = useSelector(getAllCurrenciesFilters)

  return (
    <Grid container>
      <Box>
        <Typography sx={{ mb: 1.5 }} variant="subtitle1">
          {t('forms:price')}
        </Typography>
        <TextField
          sx={{ maxWidth: { xs: 100, md: 140, lg: 170 } }}
          onChange={event => dispatch(setInitialValue({ from: event.target.value }))}
          fullWidth
          label={t('forms:price_from')}
          name="code"
          value={from}
          color="secondary"
          inputProps={{ type: 'number', min: '0' }}
        />
      </Box>
      <Box display="flex" alignItems="flex-end" ml={4}>
        <TextField
          sx={{ maxWidth: { xs: 100, md: 140, lg: 170 } }}
          onChange={event => dispatch(setInitialValue({ to: event.target.value }))}
          fullWidth
          label={t('forms:price_to')}
          name="code"
          value={to}
          color="secondary"
          inputProps={{ type: 'number', min: '0' }}
        />
      </Box>
      <Box ml={4}>
        <Typography sx={{ mb: 1.5 }} variant="subtitle1">
          {t('forms:currency')}
        </Typography>
        <TextField
          id="outlined-select-currency"
          select
          value={currency}
          onChange={event => dispatch(setInitialValue({ currency: event.target.value }))}
          sx={{
            width: { xs: '100px !important', md: '140px !important', lg: '147px !important' },
            '& .MuiSelect-select': {
              height: '36px!important',
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          {allCurrencies &&
            allCurrencies.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
        </TextField>
      </Box>
    </Grid>
  )
}

export default FilterPrice
