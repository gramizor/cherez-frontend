import { Grid, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { ForgetPasswordProps } from '@/src/types/structs/login'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import modalLogo from '@/src/assets/images/logo/modal-logo.svg'
import ForgetPasswordForm from '@/src/components/forms/ForgetPasswordForm'
import { Dispatch, SetStateAction } from 'react'
import { LoginDialogSteps } from '@/src/enums/login'

type Props = {
  setStep: Dispatch<SetStateAction<LoginDialogSteps>>
}

const StepForgetPassword = ({ setStep }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation('common')

  const initialValues: ForgetPasswordProps = {
    email: '',
  }

  const onSubmit = (values: ForgetPasswordProps) => {
    console.log('FORGET')
  }
  return (
    <>
      <Grid item container justifyContent="center">
        <Grid item>
          <Image src={modalLogo} alt="cherez-logo" width={124} height={132} />
        </Grid>
        <Grid item mt={17}>
          <ForgetPasswordForm onSubmit={onSubmit} initialValues={initialValues} setStep={setStep} />
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

export default StepForgetPassword
