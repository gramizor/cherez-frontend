import { CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCanLoadMoreMainSearchParam,
  getCollectionMainSearchParam,
  getLoadingMainSearch,
  getSkipMainSearchParam,
} from '@/src/redux/selectors/mainSearch'
import { isEmpty, map } from 'lodash'
import AdsBox from '@/src/components/molecules/AdsBox'
import checkLargeAd from '@/src/utils/checkLargeAd'
import { useEffect, useMemo, useState } from 'react'
import sortAdsCollection from '@/src/utils/sortAdsCollection'
import { setSavedAds } from '@/src/lib/storage'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import Button from '@mui/material/Button'
import { searchAdsRequested, setLoadMore, setSearchParams } from '@/src/redux/slices/mainSearch'

const AdsCollection = () => {
  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))
  const [savedAdsCollection, setSaved] = useState([])
  const collection = useSelector(getCollectionMainSearchParam)
  const loading = useSelector(getLoadingMainSearch)
  const canLoadMore = useSelector(getCanLoadMoreMainSearchParam)
  const skip = useSelector(getSkipMainSearchParam)
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  const sortedCollection = useMemo(() => sortAdsCollection(collection, isMobile), [collection])

  useEffect(() => {
    // @ts-ignore
    setSaved(setSavedAds())
  }, [])

  let counter = 0
  return (
    <Grid container sx={{ mt: 1 }} spacing={3.5}>
      {loading && (
        <Grid item xs={12} container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
      {!loading && isEmpty(sortedCollection) && (
        <Grid item xs={12} container justifyContent="center">
          <Grid item xs={12} container justifyContent="center">
            <TextSnippetOutlinedIcon fontSize="large" />
          </Grid>
          <Typography variant={'h5'}>{t('nothing_found')}</Typography>
        </Grid>
      )}
      {!loading &&
        !isEmpty(sortedCollection) &&
        map(sortedCollection, (item, key) => {
          const isLarge = item.largeBefore && checkLargeAd(item.largeBefore.iso)
          counter += isLarge ? 2 : 1
          return (
            <Grid
              item
              key={key}
              xs={isLarge ? 12 : 6}
              lg={isLarge ? 8 : 4}
              sx={{ mt: { xs: 0, lg: counter > 3 ? 5.5 : 0 } }}
            >
              <AdsBox
                ad={item}
                isLarge={!!isLarge}
                // @ts-ignore
                isSaved={savedAdsCollection && savedAdsCollection.includes(item.objectId)}
                // @ts-ignore
                setSaved={setSaved}
              />
            </Grid>
          )
        })}
      {canLoadMore && (
        <Grid item xs={12} mt={25}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(setSearchParams({ skip: skip + 12 }))
              dispatch(setLoadMore())
              dispatch(searchAdsRequested())
            }}
            disabled={loading}
          >
            {t('load_more')}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default AdsCollection
