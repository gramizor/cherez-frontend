import { Box, CircularProgress, Grid, Typography, useTheme } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {
  getAccount,
  getAccountAds,
  getCanLoadMore,
  getLoadingAccountAds,
  getSkipAccountParam,
} from '@/src/redux/selectors/account'
import { useEffect, useState } from 'react'
import { getAccountAdsRequested, setAccountAdsSearchParams, setLoadMore } from '@/src/redux/slices/account'
import { isEmpty, map } from 'lodash'
import AdsBox from '@/src/components/molecules/AdsBox'
import { setSavedAds } from '@/src/lib/storage'
import Button from '@mui/material/Button'

const AccountAds = () => {
  const dispatch = useDispatch()
  const loadingAds = useSelector(getLoadingAccountAds)
  const skip = useSelector(getSkipAccountParam)
  const ads = useSelector(getAccountAds)
  const canLoadMore = useSelector(getCanLoadMore)
  const account = useSelector(getAccount)

  const { t } = useTranslation(['common', 'account'])
  const { palette, breakpoints } = useTheme()

  const [savedAdsCollection, setSaved] = useState([])

  useEffect(() => {
    dispatch(getAccountAdsRequested())
    // @ts-ignore
    setSaved(setSavedAds())
  }, [])

  if (!account) return null
  return (
    <Box>
      <Typography variant="h5" fontWeight={500} color={palette.customColors.infoLabel}>
        {t('account:ads_count', { count: account.adsCount || 0 })}
      </Typography>
      {!isEmpty(ads) && (
        <Grid container mt={6} spacing={3.5}>
          {map(ads, (item, key) => {
            return (
              <Grid item key={key} xs={6}>
                <AdsBox
                  ad={item}
                  isLarge={false}
                  // @ts-ignore
                  isSaved={savedAdsCollection && savedAdsCollection.includes(item.objectId)}
                  // @ts-ignore
                  setSaved={setSaved}
                />
              </Grid>
            )
          })}
        </Grid>
      )}
      {loadingAds && (
        <Grid item xs={12} container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
      {canLoadMore && (
        <Grid item xs={12} mt={25}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(setAccountAdsSearchParams({ skip: skip + 12 }))
              dispatch(setLoadMore())
              dispatch(getAccountAdsRequested())
            }}
            disabled={loadingAds}
          >
            {t('load_more')}
          </Button>
        </Grid>
      )}
    </Box>
  )
}

export default AccountAds
