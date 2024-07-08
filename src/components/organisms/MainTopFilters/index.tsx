import { useTranslation } from 'next-i18next'
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { MouseEvent, useState } from 'react'
import Button from '@mui/material/Button'
import LocationSearchDialog from '@/src/components/dialogs/LocationSearchDialog'
import { useSelector } from 'react-redux'
import { getCityMainSearchParam, getCountryMainSearchParam } from '@/src/redux/selectors/mainSearch'
import Image from 'next/image'
import { countries } from '@/src/components/organisms/CountrySlider/constants'
import { find } from 'lodash'
import SortSearchButton from '@/src/components/buttons/SortSearchButton'
import FiltersSearchButton from '@/src/components/buttons/FiltersSearchButton'
import { CountriesType } from '@/src/enums/countries'

const MainTopFilters = () => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const { palette } = theme
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [anchorElLocation, setAnchorElLocation] = useState<null | HTMLElement>(null)

  const countryMainSearchParam = useSelector(getCountryMainSearchParam)
  const cityMainSearchParam = useSelector(getCityMainSearchParam)
  const country = find(countries, { code: countryMainSearchParam }) as {
    img: string
    code: CountriesType
  }
  return (
    <Grid container justifyContent="space-between" alignItems="flex-end">
      <Grid item>
        <Button
          variant="text"
          sx={{
            color: palette.black,
            fontSize: isMobile ? 14 : 15,
            fontWeight: cityMainSearchParam && country ? 400 : 600,
            borderRadius: '10px 10px 0px 0px',
            background: anchorElLocation ? palette.customColors.lightBackground : '',
            paddingTop: '15px',
            paddingRight: '14px',
            paddingLeft: '13px',
            // paddingBottom: isMobile ? '2.5px' : anchorElLocation ? '26px' : '2.5px',
            paddingBottom: '2.5px',
            borderBottom: anchorElLocation ? 'none' : '1px solid black',
          }}
          onClick={(event: MouseEvent<HTMLElement>) => setAnchorElLocation(event.currentTarget)}
        >
          {cityMainSearchParam && country ? (
            <Grid container>
              {country && country.img && (
                <Image src={`/countries/${country.img}`} alt={country.code} width={22} height={14} />
              )}
              <Typography variant="h5" fontSize={15} sx={{ ml: 1.5 }}>
                {countryMainSearchParam} {cityMainSearchParam}
              </Typography>
            </Grid>
          ) : (
            t('location')
          )}
        </Button>
        <LocationSearchDialog handleClose={() => setAnchorElLocation(null)} anchorEl={anchorElLocation} />
      </Grid>
      {isMobile && (
        <>
          <Grid item>
            <SortSearchButton />
          </Grid>
          <Grid item>
            <FiltersSearchButton />
          </Grid>
        </>
      )}
      {!isMobile && (
        <Grid item>
          <Typography variant="h3" color={palette.customColors.titleText}>
            {t('ads')}
          </Typography>
        </Grid>
      )}
      {!isMobile && (
        <Grid item>
          <Box display="flex">
            <Box>
              <SortSearchButton />
            </Box>
            <Box sx={{ ml: 5.75 }}>
              <FiltersSearchButton />
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default MainTopFilters
