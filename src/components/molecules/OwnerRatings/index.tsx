import { Box, Grid, Rating, useTheme } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'next-i18next'
import { OwnerState } from '@/src/types/models'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

type Props = {
  user: OwnerState
  withAdsCount?: boolean
  withCompanyInfo?: boolean
  logoUrl?: string
}

const OwnerRatings = ({ user, withAdsCount = true, withCompanyInfo = false, logoUrl }: Props) => {
  const { palette } = useTheme()
  const {
    t,
    i18n: { language },
  } = useTranslation('ad')

  return (
    <Box>
      <Grid container alignItems="center" justifyContent={{ xs: 'flex-start' }}>
        <Typography color={palette.customColors.infoLabel} variant="h5" sx={{ mr: 2 }}>
          {user.rating}
        </Typography>
        <Rating sx={{ mr: 2 }} defaultValue={user.rating} precision={0.25} readOnly />
        <Typography color={palette.customColors.infoLabel} variant="h5" sx={{ mr: 2 }}>
          {t('ad:reviews_count', {
            count: user.reviewsCount || 0,
          })}
        </Typography>
      </Grid>
      {withAdsCount && (
        <Box mt={2.5} display="flex" justifyContent={{ xs: 'flex-start' }}>
          <Typography color={palette.customColors.infoLabel} variant="h5">
            {t('ad:ads_count', {
              count: user.adsCount,
            })}
          </Typography>
        </Box>
      )}
      {withCompanyInfo && (
        <Grid container mt={2.5} justifyContent={'space-between'}>
          <Grid item>
            <Grid container flexDirection={'column'} justifyContent={'space-between'} height={'100%'}>
              <Typography color={palette.customColors.infoLabel} variant="h5">
                {t('ad:ads_count', {
                  count: user.adsCount,
                })}
              </Typography>
              <Grid item>
                <Typography variant="h5" fontWeight={600}>
                  {user.nickName}
                </Typography>
                <Typography variant="h5">{t('ad:contact')}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {logoUrl && (
            <Grid item>
              <Image src={logoUrl} alt={'COMPANY'} width={107} height={74} style={{ objectFit: 'cover' }} />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}

export default OwnerRatings
