import { Box, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { SendCodeProps } from '@/src/types/structs/login'
import { LoginDialogSteps } from '@/src/enums/login'

interface Props {
  onSubmit: (values: SendCodeProps) => void
  initialValues: SendCodeProps
  setStep?: Dispatch<SetStateAction<LoginDialogSteps>>
}

const SendCodeForm = ({ initialValues, onSubmit, setStep }: Props) => {
  const { t } = useTranslation(['common', 'forms'])

  const validationSchema = yup.object({
    code: yup.string().required(t('forms:code_required')),
  })

  const [checked, setChecked] = useState(true)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const { palette } = useTheme()

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <Typography variant="body1" color={palette.customColors.inputLabel}>
            {t('send_code_text')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <TextField
            onChange={formik.handleChange}
            fullWidth
            label={t('forms:enter_code')}
            name="code"
            value={formik.values.code || ''}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="text" color="info" onClick={() => {}} sx={{ p: 0 }}>
            <Typography variant="body2" color={palette.customColors.inputLabel}>
              {t('send_code_again')}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Box mt={7.5}>
        <Link passHref href={'/terms'}>
          <Typography variant="body1" color={palette.customColors.bodyInfo}>
            {t('terms')}
          </Typography>
        </Link>
      </Box>
      <Box>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color={'secondary'}
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            labelPlacement="start"
            label={t('forms:accept')}
            sx={{
              justifyContent: 'flex-end',
              margin: 0,
              '& .MuiTypography-root': {
                color: palette.customColors.bodyInfo,
              },
            }}
          />
        </FormGroup>
      </Box>
      <Grid container mt={11.5} justifyContent="space-between">
        <Grid item>
          <Link passHref href={'/help'}>
            <Typography variant="body1" color={palette.customColors.bodyInfo}>
              {t('help')}
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => {}} disabled={!checked}>
            {t('next')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SendCodeForm
