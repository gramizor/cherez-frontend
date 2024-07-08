import { Grid, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Dispatch, SetStateAction, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useTranslation } from 'next-i18next'
import Button from '@mui/material/Button'
import { LoginProps } from '@/src/types/structs/login'
import { LoginDialogSteps } from '@/src/enums/login'

interface Props {
  onSubmit: (values: LoginProps) => void
  initialValues: LoginProps
  setStep?: Dispatch<SetStateAction<LoginDialogSteps>>
}

const LoginForm = ({ initialValues, onSubmit, setStep }: Props) => {
  const { t } = useTranslation(['common', 'forms'])

  const validationSchema = yup.object({
    email: yup.string().required(t('forms:email_required')),
    password: yup.string().required(t('forms:password_required')),
  })

  const { palette } = useTheme()

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={7}>
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
        <Grid item xs={12}>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            color="secondary"
            onChange={formik.handleChange}
            fullWidth
            label={t('forms:password')}
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password || ''}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
      </Grid>
      <Grid container mt={3}>
        <Grid item xs={6}>
          <Button
            variant="text"
            color="info"
            onClick={() => {
              setStep && setStep(LoginDialogSteps.ForgetPassword)
            }}
          >
            <Typography variant="h5" color={palette.customColors.infoLabel}>
              {t('forget_password')}
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={6} container flexDirection="column" alignItems="flex-end">
          <Button
            variant="text"
            color="info"
            onClick={() => formik.handleSubmit()}
            sx={{ px: 0, pb: 4, justifyContent: 'flex-end' }}
          >
            <Typography variant="h5" color="primary">
              {t('login')}
            </Typography>
          </Button>
          <Typography variant="h5" color={palette.customColors.infoLabel} sx={{ pb: 4, textTransform: 'lowercase' }}>
            {t('or')}
          </Typography>
          <Button
            variant="text"
            color="info"
            onClick={() => {
              setStep && setStep(LoginDialogSteps.SignUp)
            }}
            sx={{ px: 0, pb: 0, justifyContent: 'flex-end' }}
          >
            <Typography variant="h5" color={palette.customColors.infoLabel}>
              {t('sign_up')}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default LoginForm
