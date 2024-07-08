import { Grid, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { LoginDialogSteps } from '@/src/enums/login'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import modalLogo from '@/src/assets/images/logo/modal-logo.svg'
import SignUpForm from '@/src/components/forms/SignUpForm'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { userRegistrationRequested } from '@/src/redux/slices/auth'
import { SignUpProps } from '@/src/types/structs/login'

type Props = {
  setStep: Dispatch<SetStateAction<LoginDialogSteps>>
}

const StepSignUp = ({ setStep }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  const initialValues: SignUpProps = {
    email: '',
    password: '',
    nickname: '',
    passwordConfirmation: '',
  }

  const onSubmit = (values: SignUpProps) => {
    dispatch(userRegistrationRequested(values))
  }

  return (
    <>
      <Grid item container justifyContent="center">
        <Grid item>
          <Image src={modalLogo} alt="cherez-logo" width={124} height={132} />
        </Grid>
        <Grid item mt={14}>
          <SignUpForm onSubmit={onSubmit} initialValues={initialValues} setStep={setStep} />
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

export default StepSignUp
