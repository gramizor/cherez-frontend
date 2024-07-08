import { useTranslation } from 'next-i18next'
import Button from '@mui/material/Button'
import { Typography, useMediaQuery, useTheme } from '@mui/material'

type Props = {
  handleClickOpen: () => void
}

const HeaderLoginButton = ({ handleClickOpen }: Props) => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <>
      {isMobile ? (
        <Typography variant="h6" onClick={handleClickOpen}>
          {t('login')}
        </Typography>
      ) : (
        <Button variant="text" color="info" onClick={handleClickOpen}>
          {t('login')}
        </Button>
      )}
    </>
  )
}

export default HeaderLoginButton
