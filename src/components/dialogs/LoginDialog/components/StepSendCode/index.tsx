import { Grid, useTheme } from '@mui/material'
import { LoginDialogSteps } from '@/src/enums/login'
import { SendCodeProps } from '@/src/types/structs/login'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import modalLogo from '@/src/assets/images/logo/modal-logo.svg'
import { Dispatch, SetStateAction } from 'react'
import SendCodeForm from '@/src/components/forms/SendCodeForm'

type Props = {
  setStep: Dispatch<SetStateAction<LoginDialogSteps>>
}

const StepSendCode = ({ setStep }: Props) => {
  const { palette } = useTheme()
  const { t } = useTranslation('common')

  const initialValues: SendCodeProps = {
    code: '',
  }

  const onSubmit = (values: SendCodeProps) => {
    console.log('SEND CODE')
  }
  return (
    <Grid item container justifyContent="center">
      <Grid item>
        <Image src={modalLogo} alt="cherez-logo" width={124} height={132} />
      </Grid>
      <Grid item mt={17}>
        <SendCodeForm onSubmit={onSubmit} initialValues={initialValues} setStep={setStep} />
      </Grid>
    </Grid>
  )
}

export default StepSendCode
