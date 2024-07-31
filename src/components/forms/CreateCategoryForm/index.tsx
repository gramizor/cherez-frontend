import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useFormik, FormikErrors } from 'formik'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { selectSingleProProfile } from '@/src/redux/selectors/pro'
import { SaveProProfile } from '@/src/types/redux/pro'
import toast, { Renderable, Toast, ValueFunction } from 'react-hot-toast'
import { saveCompanyProfileRequested } from '@/src/redux/slices/pro'
import SimpleTextField from '../../fields/SimpleTextField'
import LogoUpload from '../../fields/LogoUpload'
import SimpleFileUploader from '../../fields/SimpleFileUploader'
import { getCompanyProfile } from '@/src/saga/proSaga/api'

type Props = {}

const CreateCategoryForm = (props: Props) => {
  const { t } = useTranslation(['common', 'forms'])
  const dispatch = useDispatch()
  const theme = useTheme()
  const { palette } = theme
  const router = useRouter()
  const {
    query: { companyProfileId },
  } = useRouter()
  const proProfile = useSelector(selectSingleProProfile)
  const category = proProfile?.category

  const initialValues: SaveProProfile = {
    companyProfileId: proProfile?.objectId || '',
    companyName: proProfile?.name || '',
    companyDescription: proProfile?.description || '',
    companyDescription2: proProfile?.description2 || '',
    contactPersonName: proProfile?.contactPerson || '',
    companyLogo: proProfile?.logoUrl || '',
    companyBanner: proProfile?.bannerUrl || '',
    companyImages: [],
    isPublic: proProfile?.public || true,
  }
  const validationSchema = yup.object({})

  const onSubmit = (values: SaveProProfile) => {
    const onFailed = (error: Renderable | ValueFunction<Renderable, Toast>) => {
      if (typeof error === 'string') {
        toast.error(t(`forms:${error.replace(/ /g, '_')}`), {
          duration: 3000,
        })
      }
    }

    const redirectToPro = () => {
      router.push(`/promotion/category`)
    }

    const onSuccess = () => {
      redirectToPro()
    }

    dispatch(saveCompanyProfileRequested({ ...values, isPublic: values.isPublic, onSuccess, onFailed }))
  }

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  })

  const handleFieldChange = (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ): Promise<void> | Promise<FormikErrors<any>> => {
    return formik.setFieldValue(field, value, shouldValidate)
  }

  useEffect(() => {
    if (Array.isArray(companyProfileId)) {
      dispatch(getCompanyProfile({ companyProfileId: companyProfileId[0] }))
    } else if (companyProfileId) {
      dispatch(getCompanyProfile({ companyProfileId }))
    }
  }, [companyProfileId, dispatch])

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Box sx={{ background: palette.customColors.lightBackground, color: palette.info.main }}>
            {t('forms:category')}
          </Box>
          <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
            <SimpleTextField
              value={formik.values.companyName}
              label={t('forms:company_name')}
              handleChange={e => handleFieldChange('companyName', e.target.value)}
              name={'companyName'}
              touched={formik.touched.companyName}
              error={formik.errors.companyName}
            />
          </Grid>

          <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
            <SimpleTextField
              value={formik.values.contactPersonName}
              label={t('forms:contact_person_name')}
              handleChange={e => handleFieldChange('contactPersonName', e.target.value)}
              name={'contactPersonName'}
              touched={formik.touched.contactPersonName}
              error={formik.errors.contactPersonName}
            />
          </Grid>

          <Grid>
            <LogoUpload
              label={t('forms:company_logo')}
              name={'companyLogo'}
              image={formik.values.companyLogo as unknown as File}
              handleChange={handleFieldChange}
            />
          </Grid>

          <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
            <SimpleTextField
              value={formik.values.companyBanner}
              label={t('forms:company_banner')}
              handleChange={e => handleFieldChange('companyBanner', e.target.value)}
              name={'companyBanner'}
              touched={formik.touched.companyBanner}
              error={formik.errors.companyBanner}
            />
          </Grid>

          <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
            <SimpleTextField
              value={formik.values.companyDescription}
              label={t('forms:company_description')}
              handleChange={e => handleFieldChange('companyDescription', e.target.value)}
              name={'companyDescription'}
              touched={formik.touched.companyDescription}
              error={formik.errors.companyDescription}
              multiline={true}
              maxRows={12}
              minRows={12}
              inputProps={{ maxLength: 10000 }}
            />
            <Grid container justifyContent="flex-end" mt={4}>
              <Typography variant="body2" color={palette.customColors.inputHelper} fontWeight={500}>
                {t('forms:ad_description_helper')}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
            <SimpleFileUploader
              label={t('forms:set_image')}
              images={formik.values.companyImages}
              name={'companyImages'}
              handleChange={(field: string, value: any, shouldValidate?: boolean) =>
                handleFieldChange(field, value, shouldValidate)
              }
            />
            <Grid container justifyContent="flex-end" mt={4}>
              <Typography variant="body2" color={palette.customColors.inputHelper} fontWeight={500}>
                {t('forms:image_max')}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
            <SimpleTextField
              value={formik.values.companyDescription2}
              label={t('forms:company_description2')}
              handleChange={e => handleFieldChange('companyDescription2', e.target.value)}
              name={'companyDescription2'}
              touched={formik.touched.companyDescription2}
              error={formik.errors.companyDescription2}
              multiline={true}
              maxRows={12}
              minRows={12}
              inputProps={{ maxlength: 10000 }}
            />
            <Grid container justifyContent="flex-end" mt={4}>
              <Typography variant="body2" color={palette.customColors.inputHelper} fontWeight={500}>
                {t('forms:ad_description_helper')}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={{ xs: 5, md: 11 }} display="flex" gap={2} mb={5}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => {
                formik.setFieldValue('isPublic', false).then(() => formik.handleSubmit())
              }}
            >
              {t('forms:save_draft')}
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ fontSize: 16 }}
              onClick={() => {
                formik.setFieldValue('isPublic', true).then(() => formik.handleSubmit())
              }}
            >
              {t('forms:save_ad')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default CreateCategoryForm
