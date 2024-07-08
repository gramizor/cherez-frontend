import { Box, useTheme } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useSelector } from 'react-redux'
import { getCurrentAd } from '@/src/redux/selectors/ad'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'

const AdDescription = () => {
  const currentAd = useSelector(getCurrentAd)
  const { palette } = useTheme()

  const { t } = useTranslation('ad')

  if (!currentAd) return null
  return (
    <Box>
      <Typography variant="h2" textAlign={{ xs: 'center', lg: 'left' }}>
        {t('ad:description')}
      </Typography>
      <Typography variant="h5" color={palette.customColors.bodyInfo} sx={{ mt: 5.5 }} whiteSpace="pre-wrap">
        {currentAd.description}
      </Typography>
    </Box>
  )
}

export default AdDescription
