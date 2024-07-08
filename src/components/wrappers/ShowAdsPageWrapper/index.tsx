import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import MainTopActions from '@/src/components/organisms/MainTopActions'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { findCompanyProfilesRequested, getAdRequested } from '@/src/redux/slices/ad'
import { getCurrentAd, getLoadingAd } from '@/src/redux/selectors/ad'
import Image from 'next/image'
import AdImagesCarousel from '@/src/components/molecules/AdImagesCarousel'
import AdActionsPanel from '@/src/components/organisms/AdActionsPanel'
import AdOwnerPanel from '@/src/components/organisms/AdOwnerPanel'
import AdSpecifications from '@/src/components/molecules/AdSpecifications'
import AdDescription from '@/src/components/molecules/AdDescription'
import AdReport from '@/src/components/molecules/AdReport'
import { MapComponent } from '@/src/components/organisms/MapComponent'
import AdCompanyPanel from '@/src/components/organisms/AdCompanyPanel'

const ShowAdsPageWrapper = () => {
  const dispatch = useDispatch()
  const {
    query: { id },
  } = useRouter()

  const loading = useSelector(getLoadingAd)
  const currentAd = useSelector(getCurrentAd)

  useEffect(() => {
    dispatch(getAdRequested({ adId: id }))
  }, [])

  useEffect(() => {
    if (currentAd?.owner && currentAd?.categoryName)
      dispatch(findCompanyProfilesRequested({ ownerId: currentAd?.owner?.objectId, category: currentAd?.categoryName }))
  }, [currentAd])
  return (
    <Box mt={{ xs: 4, md: '29px' }}>
      <MainTopActions isReturning />
      {loading && (
        <Grid item xs={12} container justifyContent="center" mt={10}>
          <CircularProgress />
        </Grid>
      )}
      {!loading && currentAd && (
        <Box mt={10}>
          <Typography variant="h2" textAlign={{ xs: 'center', lg: 'left' }}>
            {currentAd.label}
          </Typography>
          {currentAd.country && (
            <Grid
              container
              alignItems="center"
              mt={{ xs: 2, lg: 8.5 }}
              justifyContent={{ xs: 'center', lg: 'flex-start' }}
            >
              <Image
                src={`/countries/flag_${currentAd.country.toLowerCase()}.png`}
                alt={currentAd.country}
                width={21}
                height={13}
              />
              <Typography variant="body1" fontSize={14} sx={{ ml: 1 }} color={'secondary'}>
                {currentAd.country} {currentAd.city}
              </Typography>
            </Grid>
          )}

          <Grid
            container
            justifyContent={{
              xs: 'center',
              lg: 'space-between',
            }}
            mt={3}
          >
            <Grid item sx={{ width: { xs: '100%', lg: 693 } }}>
              <AdImagesCarousel images={currentAd.images} />
            </Grid>
            <Grid item sx={{ width: { xs: '100%', lg: 336 }, mt: { xs: 19.25, lg: 0 } }}>
              <Grid container flexDirection={{ xs: 'column', md: 'column' }} justifyContent="center">
                <AdActionsPanel />
                <Box mt={5.5}>
                  <AdOwnerPanel />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent="space-between" mt={{ xs: 19.25, lg: 6 }}>
            <Grid item sx={{ width: { xs: '100%', lg: 693 } }}>
              <Box>
                <AdSpecifications />
              </Box>
              <Box mt={19.25}>
                <AdDescription />
              </Box>
              <Box mt={10}>
                <AdReport />
              </Box>
              <Box mt={10} mb={25}>
                <MapComponent />
              </Box>
            </Grid>
            <Grid item sx={{ width: { xs: '100%', lg: 336 } }}></Grid>
          </Grid>

          <Box>
            <AdCompanyPanel />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ShowAdsPageWrapper
