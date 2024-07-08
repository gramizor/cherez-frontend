import { Grid, Menu, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Button from '@mui/material/Button'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AvatarBox, { AvatarBoxSize } from '@/src/components/molecules/AvatarBox'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '@/src/redux/selectors/auth'
import { useRouter } from 'next/router'

type Props = {
  handleClose: () => void
  handleClick: () => void
  anchorEl: null | HTMLElement
}

const HeaderAvatarDialog = ({ anchorEl, handleClose, handleClick }: Props) => {
  const currentUser = useSelector(getCurrentUser)
  const router = useRouter()
  const { t } = useTranslation('common')
  const { palette } = useTheme()

  const open = Boolean(anchorEl)
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ mt: 1 }}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Button
            onClick={() => router.push('/my-account')}
            startIcon={<AvatarBox size={AvatarBoxSize.Small} user={currentUser} />}
          >
            <Typography color={palette.customColors.infoLabel} variant="h6">
              {currentUser?.nickName}
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button startIcon={<ExitToAppIcon />} onClick={handleClick}>
            <Typography color={palette.customColors.infoLabel} variant="h6">
              {t('logout')}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Menu>
  )
}

export default HeaderAvatarDialog
