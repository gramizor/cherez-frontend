import { Grid, useTheme } from '@mui/material'
import LoginForm from '@/src/components/forms/LoginForm'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { LoginDialogSteps } from '@/src/enums/login'
import { LoginProps } from '@/src/types/structs/login'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import modalLogo from '@/src/assets/images/logo/modal-logo.svg'
import { Dispatch, SetStateAction } from 'react'
import { userLoginRequested } from '@/src/redux/slices/auth'
import { useDispatch } from 'react-redux'

type Props = {
  setStep: Dispatch<SetStateAction<LoginDialogSteps>>
}

const StepLogin = ({ setStep }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  const initialValues: LoginProps = {
    email: '',
    password: '',
  }

  const onSubmit = (values: LoginProps) => {
    dispatch(userLoginRequested(values))
  }

  return (
    <>
      <Grid item container justifyContent="center">
        <Grid item>
          <Image src={modalLogo} alt="cherez-logo" width={124} height={132} />
        </Grid>
        <Grid item mt={17}>
          <LoginForm onSubmit={onSubmit} initialValues={initialValues} setStep={setStep} />
        </Grid>
      </Grid>

      <Grid item container justifyContent="flex-start">
        <Link passHref href={'/terms'}>
          <Typography variant="body1" color={palette.customColors.bodyInfo}>
            {t('terms')}
          </Typography>
        </Link>
      </Grid>
    </>
  )
}

export default StepLogin
