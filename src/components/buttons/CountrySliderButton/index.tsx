import Box from '@mui/material/Box'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import { CountriesType } from '@/src/enums/countries'
import { useSelector } from 'react-redux'
import { getCountryMainSearchParam } from '@/src/redux/selectors/mainSearch'
import { useTranslation } from 'next-i18next'

type Props = {
  country: { code: CountriesType; img: string }
  handleChange: (code: CountriesType) => void
}

export const CountrySliderButton = ({ country, handleChange }: Props) => {
  const { t } = useTranslation('countries')
  const theme = useTheme()
  const { palette } = theme
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const countryMainSearchParam = useSelector(getCountryMainSearchParam)
  return (
    <Box
      onClick={() => handleChange(country.code)}
      sx={{
        maxWidth: '85px',
        background: country.code === countryMainSearchParam ? 'rgba(217, 217, 217, 0.5)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '10px',
        padding: { xs: 2, md: '13px 9px' },
        textTransform: 'none',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 600,
        color: `${palette.customColors.tabText} !important`,
        '& > img': {
          marginBottom: { xs: '6px !important', md: '12px !important' },
        },
      }}
    >
      <Image
        src={`/countries/${country.img}`}
        alt={country.code}
        width={isMobile ? 51 : 68}
        height={isMobile ? 32 : 42}
      />
      <Typography variant="body2" color={palette.customColors.tabText} fontWeight={600} textAlign="center">
        {t(`countries:${country.code}`)}
      </Typography>
    </Box>
  )
}
