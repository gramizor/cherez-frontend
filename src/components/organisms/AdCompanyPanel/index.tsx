import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useSelector } from 'react-redux'
import { getProfileCompany } from '@/src/redux/selectors/ad'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { map } from 'lodash'

const AdCompanyPanel = () => {
  const profileCompany = useSelector(getProfileCompany)
  const { t } = useTranslation('ad')
  const { breakpoints, palette } = useTheme()

  const isTablet = useMediaQuery(breakpoints.down('lg'))

  if (!profileCompany) return null
  return (
    <Grid container flexDirection={'column'}>
      <Typography variant="h1">{t('about_company')}</Typography>
      <Grid item xs={12} mt={9.5}>
        <Image
          src={profileCompany.bannerUrl}
          alt={'COMPANY'}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: isTablet ? '200px' : '375px' }}
        />
      </Grid>
      <Typography variant="h4" color={palette.customColors.bodyInfo} sx={{ mt: 17 }} whiteSpace="pre-wrap">
        {profileCompany.description}
      </Typography>
      <Grid item mt={16}>
        <Grid container spacing={2}>
          {map(profileCompany.imageUrls, (image, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Image
                src={image}
                alt={'COMPANY'}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: isTablet ? '300px' : '602px' }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Typography variant="h4" color={palette.customColors.bodyInfo} sx={{ mt: 15, mb: 20 }} whiteSpace="pre-wrap">
        {profileCompany.description2}
      </Typography>
    </Grid>
  )
}

export default AdCompanyPanel
