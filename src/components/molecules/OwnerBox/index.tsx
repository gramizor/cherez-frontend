import { Box, Grid } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'next-i18next'
import { OwnerState } from '@/src/types/models'
import AvatarBox, { AvatarBoxSize } from '@/src/components/molecules/AvatarBox'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getCurrentUser, getIsSignedIn } from '@/src/redux/selectors/auth'

type Props = {
  user: OwnerState
}

const OwnerBox = ({ user }: Props) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('ad')

  const isSignedIn = useSelector(getIsSignedIn)
  const currentUser = useSelector(getCurrentUser)

  const isMyAccount = isSignedIn && currentUser && currentUser.objectId === user.objectId
  return (
    <Link passHref href={isMyAccount ? '/my-account' : `/account/${user.objectId}`}>
      <Box display="flex" justifyContent={{ xs: 'center', lg: 'flex-start' }}>
        <AvatarBox user={user} size={AvatarBoxSize.Big} />
        <Grid item container flexDirection="column" ml={4} justifyContent="space-around">
          <Typography variant="h4">{user.nickName}</Typography>
          <Typography variant="h5">{t('ad:individual')}</Typography>
        </Grid>
      </Box>
    </Link>
  )
}

export default OwnerBox
