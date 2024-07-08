import { Box, Grid } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'next-i18next'
import { CompanyState } from '@/src/types/models'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getCurrentUser, getIsSignedIn } from '@/src/redux/selectors/auth'

type Props = {
  company: CompanyState
}

const CompanyBox = ({ company }: Props) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('ad')

  const isSignedIn = useSelector(getIsSignedIn)
  const currentUser = useSelector(getCurrentUser)

  const isMyAccount = isSignedIn && currentUser && currentUser.objectId === company.objectId
  return (
    <Link passHref href={isMyAccount ? '/my-account' : `/account/${company.objectId}`}>
      <Box display="flex" justifyContent={{ xs: 'center', lg: 'flex-start' }}>
        <Grid item container flexDirection="column" ml={4} justifyContent="space-around">
          <Typography variant="h4">{company.name}</Typography>
          <Typography variant="h5">{t('ad:company')}</Typography>
        </Grid>
      </Box>
    </Link>
  )
}

export default CompanyBox
