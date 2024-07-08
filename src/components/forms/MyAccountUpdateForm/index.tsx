import { Box, Grid, TextField, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import Button from '@mui/material/Button'
import { MyAccountUpdateProps } from '@/src/types/structs/account'
import { useSelector } from 'react-redux'
import { getAccount, getLoadingAccount } from '@/src/redux/selectors/account'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { es, ru } from 'date-fns/locale'
import { format } from 'date-fns'

interface Props {
  onSubmit: (values: MyAccountUpdateProps) => void
  initialValues: MyAccountUpdateProps
}

const MyAccountUpdateForm = ({ initialValues, onSubmit }: Props) => {
  const {
    t,
    i18n: { language },
  } = useTranslation(['common', 'account', 'forms'])
  const { palette } = useTheme()
  const accountInfo = useSelector(getAccount)
  const validationSchema = yup.object({})

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  })

  const loading = useSelector(getLoadingAccount)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={language === 'ru-RU' ? ru : es}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h5" mb={2} color={palette.customColors.inputLabel} fontWeight={500}>
            {t('forms:about_me')}
          </Typography>
          <TextField
            onChange={formik.handleChange}
            multiline
            minRows={12}
            maxRows={12}
            fullWidth
            label={''}
            placeholder={t('forms:about_me_placeholder')}
            name="aboutMe"
            value={formik.values.aboutMe}
            error={(formik?.touched?.aboutMe ?? false) && Boolean(formik.errors.aboutMe)}
            helperText={formik.touched.aboutMe && formik.errors.aboutMe}
            color="secondary"
          />
          <Grid container justifyContent="flex-end" mt={4}>
            <Typography variant="body2" color={palette.customColors.inputHelper} fontWeight={500}>
              {t('forms:about_me_helper')}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" mb={2} color={palette.customColors.inputLabel} fontWeight={500}>
            {t('forms:phone_number')}
          </Typography>
          <TextField
            sx={{ width: 211 }}
            onChange={formik.handleChange}
            fullWidth
            label={''}
            placeholder=""
            name="phone"
            value={formik.values.phone}
            error={(formik?.touched?.phone ?? false) && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            color="secondary"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" mb={2} color={palette.customColors.inputLabel} fontWeight={500}>
            {t('forms:full_name')}
          </Typography>
          <TextField
            onChange={formik.handleChange}
            fullWidth
            label={''}
            placeholder=""
            name="fullName"
            value={formik.values.fullName}
            error={(formik?.touched?.fullName ?? false) && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            color="secondary"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" mb={2} color={palette.customColors.inputLabel} fontWeight={500}>
            {t('forms:birth_date')}
          </Typography>
          <DatePicker
            onChange={date => formik.setFieldValue('birthDate', date, true)}
            value={new Date(formik.values.birthDate)}
            orientation="portrait"
            label=""
            slotProps={{
              textField: {
                error: (formik?.touched?.birthDate ?? false) && Boolean(formik.errors.birthDate),
                helperText: formik.touched.birthDate && formik.errors.birthDate,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" mb={2} color={palette.customColors.inputLabel} fontWeight={500}>
            {t('forms:series_and_number')}
          </Typography>
          <TextField
            sx={{ width: 211 }}
            onChange={formik.handleChange}
            fullWidth
            label={''}
            placeholder=""
            name="seriesAndNumber"
            value={formik.values.seriesAndNumber}
            error={(formik?.touched?.seriesAndNumber ?? false) && Boolean(formik.errors.seriesAndNumber)}
            helperText={formik.touched.seriesAndNumber && formik.errors.seriesAndNumber}
            color="secondary"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" mb={2} color={palette.customColors.inputLabel} fontWeight={500}>
            {t('forms:issue_date')}
          </Typography>
          <DatePicker
            onChange={date => formik.setFieldValue('issueDate', date, true)}
            value={new Date(formik.values.issueDate)}
            orientation="portrait"
            label=""
            name={'issueDate'}
            slotProps={{
              textField: {
                error: (formik?.touched?.issueDate ?? false) && Boolean(formik.errors.issueDate),
                helperText: formik.touched.issueDate && formik.errors.issueDate,
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" mb={2} color={palette.customColors.inputLabel} fontWeight={500}>
            {t('forms:expire_date')}
          </Typography>
          <DatePicker
            onChange={date => formik.setFieldValue('expireDate', date, true)}
            value={new Date(formik.values.expireDate)}
            orientation="portrait"
            label=""
            slotProps={{
              textField: {
                error: (formik?.touched?.expireDate ?? false) && Boolean(formik.errors.expireDate),
                helperText: formik.touched.expireDate && formik.errors.expireDate,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" mb={2} color={palette.customColors.inputLabel} fontWeight={500}>
            {t('forms:country')}
          </Typography>
          <TextField
            sx={{ width: 211 }}
            onChange={formik.handleChange}
            fullWidth
            label={''}
            placeholder=""
            name="country"
            value={formik.values.country}
            error={(formik?.touched?.country ?? false) && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            color="secondary"
          />
        </Grid>
      </Grid>

      <Box mt={40}>
        <Typography variant="h5" fontWeight={500} color={palette.customColors.infoLabel}>
          {t('account:ads_count', { count: accountInfo?.adsCount || 0 })}
        </Typography>
      </Box>

      {accountInfo && (
        <Box mt={3} display="flex">
          <Typography variant="h5" fontWeight={500} color={palette.customColors.infoLabel}>
            {t('account:email')}
          </Typography>
          <Typography variant="h5" fontWeight={500} color={palette.customColors.tabText} ml={3.5}>
            {accountInfo.email}
          </Typography>
        </Box>
      )}

      {accountInfo && (
        <Box mt={3} display="flex">
          <Typography variant="h5" fontWeight={500} color={palette.customColors.infoLabel}>
            {t('account:created_at')}
          </Typography>
          <Typography variant="h5" fontWeight={500} color={palette.customColors.tabText} ml={3.5}>
            {format(new Date(accountInfo.createdAt), 'PPP', { locale: language === 'ru-RU' ? ru : es })}
          </Typography>
        </Box>
      )}

      {/*<Grid container spacing={6} mt={8}>*/}
      {/*  <Grid item xs={12}>*/}
      {/*    <Typography variant="subtitle1">{t('forms:change_password')}</Typography>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}

      <Grid container mt={7} justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => {
            formik.handleSubmit()
          }}
          disabled={loading}
        >
          {t('account:save_account')}
        </Button>
      </Grid>
    </LocalizationProvider>
  )
}

export default MyAccountUpdateForm
