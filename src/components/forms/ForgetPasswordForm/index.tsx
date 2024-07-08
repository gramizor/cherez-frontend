import { Grid, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import Button from '@mui/material/Button'
import { Dispatch, SetStateAction } from 'react'
import { ForgetPasswordProps } from '@/src/types/structs/login'
import { LoginDialogSteps } from '@/src/enums/login'

interface Props {
  onSubmit: (values: ForgetPasswordProps) => void
  initialValues: ForgetPasswordProps
  setStep?: Dispatch<SetStateAction<LoginDialogSteps>>
}

const ForgetPasswordForm = ({ initialValues, onSubmit, setStep }: Props) => {
  const { t } = useTranslation(['common', 'forms'])

  const validationSchema = yup.object({
    email: yup.string().required(t('forms:email_required')),
  })

  const { palette } = useTheme()

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="body1" color={palette.customColors.inputLabel}>
            {t('forget_password_text')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={formik.handleChange}
            fullWidth
            label={t('forms:email')}
            name="email"
            value={formik.values.email || ''}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            color="secondary"
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" mt={5}>
        <Button
          variant="text"
          color="info"
          onClick={() => {
            formik.handleSubmit()
            setStep && setStep(LoginDialogSteps.Login)
          }}
        >
          <Typography variant="h5" color="primary">
            {t('send')}
          </Typography>
        </Button>
      </Grid>
    </form>
  )
}

export default ForgetPasswordForm
