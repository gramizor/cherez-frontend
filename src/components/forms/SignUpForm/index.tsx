import { Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Dispatch, SetStateAction, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useTranslation } from 'next-i18next'
import Button from '@mui/material/Button'
import { SignUpProps } from '@/src/types/structs/login'
import { LoginDialogSteps } from '@/src/enums/login'

interface Props {
  onSubmit: (values: SignUpProps) => void
  initialValues: SignUpProps
  setStep?: Dispatch<SetStateAction<LoginDialogSteps>>
}

const SignUpForm = ({ initialValues, onSubmit, setStep }: Props) => {
  const { t } = useTranslation(['common', 'forms'])

  const validationSchema = yup.object({
    email: yup.string().required(t('forms:email_required')),
    nickname: yup.string().required(t('forms:nickname_required')),
    password: yup.string().required(t('forms:password_required')),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), ''], t('forms:password_dont_match'))
      .required(t('forms:password_required')),
  })

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={5}>
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
            onChange={formik.handleChange}
            fullWidth
            label={t('forms:nickname')}
            name="nickname"
            value={formik.values.nickname || ''}
            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
            helperText={formik.touched.nickname && formik.errors.nickname}
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
            label={t('forms:password_confirmation')}
            name="passwordConfirmation"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.passwordConfirmation || ''}
            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          />
        </Grid>
      </Grid>
      <Grid container mt={7} justifyContent="flex-end">
        <Button
          variant="text"
          color="info"
          onClick={() => {
            formik.handleSubmit()
            // setStep && setStep(LoginDialogSteps.SendCode)
          }}
          sx={{ px: 0, pb: 0, justifyContent: 'flex-end' }}
        >
          <Typography variant="h5" color="primary">
            {t('sign_up')}
          </Typography>
        </Button>
      </Grid>
    </form>
  )
}

export default SignUpForm
