import { AppBar, Box, Grid, Toolbar } from '@mui/material'
import theme from 'src/theme'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import headerLogo from 'src/assets/images/logo/header-logo.svg'
import rusLogo from 'src/assets/images/countries/flag-rus.svg'
import engLogo from 'src/assets/images/countries/flag-us.svg'
import { headers } from './constants'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import DefaultHeaderMobileMenu from '@/src/components/atoms/DefaultHeaderMobileMenu'
import HeaderLoginButton from '@/src/components/buttons/HeaderLoginButton'
import LoginDialog from '@/src/components/dialogs/LoginDialog'
import { MouseEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, getIsSignedIn } from '@/src/redux/selectors/auth'
import AvatarBox from '@/src/components/molecules/AvatarBox'
import HeaderAvatarDialog from '@/src/components/dialogs/HeaderAvatarDialog'
import { userLogoutRequested } from '@/src/redux/slices/auth'
import { useRouter } from 'next/router'
import { setLocale, getLocale } from '@/src/lib/storage'

const DefaultHeader = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const { locale } = router
  const [currentLocale, setCurrentLocale] = useState(locale)

  useEffect(() => {
    const fetchLocale = async () => {
      const savedLocale = await getLocale()
      if (savedLocale !== locale) {
        router.push(router.asPath, router.asPath, { locale: savedLocale })
      }
      setCurrentLocale(savedLocale)
    }
    fetchLocale()
  }, [locale, router])

  const changeLanguage = async () => {
    const newLocale = currentLocale === 'ru-RU' ? 'en-US' : 'ru-RU'
    await setLocale(newLocale)
    router.push(router.asPath, router.asPath, { locale: newLocale })
    setCurrentLocale(newLocale)
  }

  const localeFlag = currentLocale === 'ru-RU' ? rusLogo : engLogo
  const localeName = currentLocale === 'ru-RU' ? 'Русский' : 'English'

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const isSignedIn = useSelector(getIsSignedIn)
  const currentUser = useSelector(getCurrentUser)

  const logout = () => {
    setAnchorEl(null)
    dispatch(userLogoutRequested())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.customColors.darkBackground }}>
        <Toolbar
          disableGutters
          sx={{
            mx: { xs: 8, lg: 'auto' },
            width: { lg: 1080, xl: 1440 },
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link passHref href="/">
                <Image src={headerLogo} alt="cherez-logo" width={120} height={30} />
              </Link>
            </Grid>
            <Grid item>
              <Grid container spacing={{ lg: 10 }} alignItems="center" sx={{ display: { xs: 'none', lg: 'flex' } }}>
                {headers.map((header, index) => (
                  <Grid item key={index} sx={{ cursor: 'pointer' }}>
                    <Link passHref href={header.url}>
                      <Typography variant="h6" color="white">
                        {t(header.title)}
                      </Typography>
                    </Link>
                  </Grid>
                ))}
                <Grid item onClick={changeLanguage} sx={{ cursor: 'pointer' }}>
                  <Image src={localeFlag} alt={localeName} width={28} />
                </Grid>
                {!isSignedIn && (
                  <Grid item>
                    <HeaderLoginButton handleClickOpen={handleClickOpen} />
                  </Grid>
                )}
                {isSignedIn && (
                  <Grid item sx={{ cursor: 'pointer' }}>
                    <AvatarBox
                      onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
                      user={currentUser}
                    />
                    <HeaderAvatarDialog
                      handleClose={() => setAnchorEl(null)}
                      anchorEl={anchorEl}
                      handleClick={logout}
                    />
                  </Grid>
                )}
              </Grid>
              <DefaultHeaderMobileMenu handleClickOpen={isSignedIn ? logout : handleClickOpen} />
            </Grid>
            <LoginDialog open={open} handleClose={handleClose} />
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default DefaultHeader
