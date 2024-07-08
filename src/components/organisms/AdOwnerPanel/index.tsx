import { Box, CircularProgress, Grid } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentAd, getLoadingOwnerAd, getOwnerAd, getProfileCompany } from '@/src/redux/selectors/ad'
import { useEffect } from 'react'
import { getOwnerRequested } from '@/src/redux/slices/ad'
import OwnerBox from '@/src/components/molecules/OwnerBox'
import OwnerRatings from '@/src/components/molecules/OwnerRatings'
import CompanyBox from '@/src/components/molecules/CompanyBox'

const AdOwnerPanel = () => {
  const currentAd = useSelector(getCurrentAd)
  const loadingOwnerAd = useSelector(getLoadingOwnerAd)
  const owner = useSelector(getOwnerAd)
  const profileCompany = useSelector(getProfileCompany)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentAd) {
      dispatch(getOwnerRequested({ id: currentAd.owner.objectId }))
    }
  }, [currentAd])

  if (!currentAd) return null
  return (
    <Box>
      <Grid container>
        {loadingOwnerAd && (
          <Grid item xs={12} container justifyContent="center">
            <CircularProgress />
          </Grid>
        )}
        {!loadingOwnerAd && owner && !profileCompany && (
          <>
            <Grid item xs={12}>
              <OwnerBox user={owner} />
            </Grid>
            <Grid item xs={12} mt={4}>
              <OwnerRatings user={owner} />
            </Grid>
          </>
        )}
        {!loadingOwnerAd && profileCompany && owner && (
          <>
            <Grid item xs={12}>
              <CompanyBox company={profileCompany} />
            </Grid>
            <Grid item xs={12} mt={4}>
              <OwnerRatings user={owner} withAdsCount={false} withCompanyInfo={true} logoUrl={profileCompany.logoUrl} />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  )
}

export default AdOwnerPanel
