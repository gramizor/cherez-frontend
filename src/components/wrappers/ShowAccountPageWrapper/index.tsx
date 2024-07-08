import { Box, Breadcrumbs, CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material'
import MainTopActions from '@/src/components/organisms/MainTopActions'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import LeftMenu from '@/src/components/molecules/LeftMenu'
import { getAccountRequested } from '@/src/redux/slices/account'
import { getAccount, getLoadingAccount } from '@/src/redux/selectors/account'
import AvatarBox, { AvatarBoxSize } from '@/src/components/molecules/AvatarBox'
import OwnerRatings from '@/src/components/molecules/OwnerRatings'
import { format } from 'date-fns'
import { es, ru } from 'date-fns/locale'
import AccountAds from '@/src/components/organisms/AccountAds'

const ShowAccountPageWrapper = () => {
  const dispatch = useDispatch()
  const {
    query: { id },
  } = useRouter()
  const { palette, breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))
  const {
    t,
    i18n: { language },
  } = useTranslation(['common', 'account'])
  const loading = useSelector(getLoadingAccount)
  const user = useSelector(getAccount)

  useEffect(() => {
    dispatch(getAccountRequested({ id }))
  }, [])

  return (
    <Box mt={{ xs: 4, md: '29px' }}>
      <MainTopActions isReturning />
      {isLarge && (
        <Box mt={6.5}>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator=""
            sx={{
              '& .MuiBreadcrumbs-separator': {
                mx: 4,
              },
            }}
          >
            <Link href="/">
              <Typography color={palette.customColors.bodyInfo} variant="h5">
                {`${t('root')} >`}
              </Typography>
            </Link>
            <Typography color={palette.customColors.bodyInfo} variant="h5">{`${t('account')} >`}</Typography>
          </Breadcrumbs>
        </Box>
      )}

      <Box mt="29px" display="flex">
        {isLarge && (
          <Box maxWidth="247px">
            <LeftMenu />
            <Box width={247}></Box>
          </Box>
        )}
        <Box ml={isLarge ? 28 : 0} mt={{ xs: 15, lg: 35 }} width="100%" mb={35}>
          {loading && (
            <Grid item xs={12} container justifyContent="center" mt={10}>
              <CircularProgress />
            </Grid>
          )}
          {user && !loading && (
            <>
              <Grid container alignItems="center" flexDirection={'column'}>
                <AvatarBox user={user} size={AvatarBoxSize.Biggest} />
                <Typography variant="h3" fontWeight={500} mt={18}>
                  {user.nickName}
                </Typography>
                <Box mt={8}>
                  <OwnerRatings user={user} withAdsCount={false} />
                </Box>
              </Grid>
              <Typography variant="h5" mt={13}>
                {user.aboutMe}
              </Typography>
              <Box mt={18} display="flex">
                <Typography variant="h5" fontWeight={500} color={palette.customColors.infoLabel}>
                  {t('account:created_at')}
                </Typography>
                <Typography variant="h5" fontWeight={500} color={palette.customColors.tabText} ml={3.5}>
                  {format(new Date(user.createdAt), 'PPP', { locale: language === 'ru-RU' ? ru : es })}
                </Typography>
              </Box>
              <Box mt={14}>
                <AccountAds />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ShowAccountPageWrapper
