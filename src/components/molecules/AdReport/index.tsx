import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useSelector } from 'react-redux'
import { getCurrentAd } from '@/src/redux/selectors/ad'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const AdReport = () => {
  const currentAd = useSelector(getCurrentAd)
  const { palette, breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('lg'))
  const { t } = useTranslation('ad')

  if (!currentAd) return null
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={12} lg={'auto'}>
        <Box display="flex">
          <Typography variant="h5" color={palette.customColors.bodyInfo}>
            {t('ad:id')}
          </Typography>
          <Typography variant="h5" color={palette.customColors.bodyInfo} ml={5}>
            {currentAd.objectId}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} lg={'auto'} mt={{ xs: 4, lg: 0 }}>
        <Button
          variant="contained"
          onClick={() => {}}
          sx={{
            background: palette.customColors.lightBackground,
            color: palette.customColors.bodyInfo,
            fontSize: 16,
            fontWeight: 400,
            width: isLarge ? 177 : '100%',
          }}
        >
          {t('ad:report')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default AdReport
