import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import rusLogo from 'src/assets/images/countries/flag-rus.svg'
import engLogo from 'src/assets/images/countries/flag-us.svg'
import { headers } from 'src/components/molecules/DefaultHeader/constants'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { MouseEvent, useEffect, useState } from 'react'
import HeaderLoginButton from '@/src/components/buttons/HeaderLoginButton'
import { useSelector } from 'react-redux'
import { getIsSignedIn } from '@/src/redux/selectors/auth'
import { useRouter } from 'next/router'
import { setLocale, getLocale } from '@/src/lib/storage'

type Props = {
  handleClickOpen: () => void
}
const DefaultHeaderMobileMenu = ({ handleClickOpen }: Props) => {
  const { t } = useTranslation('common')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
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

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAction = () => {
    handleClose()
    handleClickOpen()
  }

  const isSignedIn = useSelector(getIsSignedIn)

  return (
    <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
      <IconButton color="info" aria-label="menu" onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {headers.map((header, index) => (
          <MenuItem key={index} onClick={handleClose}>
            <Link passHref href={header.url}>
              <Typography variant="h6">{t(header.title)}</Typography>
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={changeLanguage}>
          <Image src={localeFlag} alt={localeName} width={28} height={17} />
          <Typography variant="h6" sx={{ ml: 1 }}>
            {localeName}
          </Typography>
        </MenuItem>
        {!isSignedIn && (
          <MenuItem>
            <HeaderLoginButton handleClickOpen={handleAction} />
          </MenuItem>
        )}
        {isSignedIn && (
          <MenuItem>
            <Link passHref href={'/my-account'}>
              <Typography variant="h6">{t('my_account')}</Typography>
            </Link>
          </MenuItem>
        )}
        {isSignedIn && (
          <MenuItem onClick={handleAction}>
            <Typography variant="h6">{t('logout')}</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}

export default DefaultHeaderMobileMenu
