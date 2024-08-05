import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik, FormikErrors } from 'formik'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { selectProImageLimit, selectSingleProProfile } from '@/src/redux/selectors/pro'
import { SaveProProfile } from '@/src/types/redux/pro'
import toast, { Renderable, Toast, ValueFunction } from 'react-hot-toast'
import {
  deleteCompanyProfileRequested,
  getCompanyProfileRequested,
  getMyCompanyProfileImagesLimitRequested,
  resetProProfiles,
  saveCompanyProfileRequested,
} from '@/src/redux/slices/pro'
import SimpleTextField from '../../fields/SimpleTextField'
import LogoUpload from '../../fields/LogoUpload'
import SimpleFileUploader from '../../fields/SimpleFileUploader'
import ModalDeleteConfirm from '../../molecules/ModalDeleteConfirm/ModalDeleteConfirm'

type Props = {}

const CreateCategoryForm = (props: Props) => {
  const { t } = useTranslation(['common', 'forms'])
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const router = useRouter()
  const {
    query: { companyProfileId },
  } = useRouter()
  const imageLimit = useSelector(selectProImageLimit)
  const proProfile = useSelector(selectSingleProProfile)

  const [open, setOpen] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<SaveProProfile>({
    companyProfileId: '',
    companyName: '',
    companyDescription: '',
    companyDescription2: '',
    contactPersonName: '',
    companyLogo: undefined,
    companyBanner: undefined,
    companyImages: [],
    isPublic: false,
  })

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
    enableReinitialize: true,
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
    if (companyProfileId) {
      dispatch(resetProProfiles())
      dispatch(getCompanyProfileRequested({ companyProfileId }))
      dispatch(getMyCompanyProfileImagesLimitRequested())
    }
  }, [companyProfileId, dispatch])

  useEffect(() => {
    if (proProfile) {
      setInitialValues({
        companyProfileId: proProfile.objectId || '',
        companyName: proProfile.name || '',
        companyDescription: proProfile.description || '',
        companyDescription2: proProfile.description2 || '',
        contactPersonName: proProfile.contactPerson || '',
        companyLogo: proProfile.logoUrl ? proProfile.logoUrl : undefined,
        companyBanner: proProfile.bannerUrl ? proProfile.bannerUrl : undefined,
        companyImages: proProfile.imageUrls ? proProfile.imageUrls : [],
        isPublic: proProfile.public || false,
      })
    }
  }, [proProfile])

  const handleDelete = () => {
    if (typeof companyProfileId === 'string') {
      console.log('Deleting profile with id:', companyProfileId)
      dispatch(deleteCompanyProfileRequested({ profileId: companyProfileId }))
      setOpen(false)
    }
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
            <Typography sx={{ mb: 1.5 }} variant="subtitle1">
              {t('promotion:categoryAd')}
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                background: palette.primary.light,
                padding: '6px 16px',
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Typography color={palette.info.main} variant="h5">
                {t(`categories:${proProfile?.category}`)}
              </Typography>
            </Box>
          </Grid>

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

          <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
            <LogoUpload
              label={t('forms:company_logo')}
              name={'companyLogo'}
              image={formik.values.companyLogo}
              handleChange={(field: string, value: any, shouldValidate?: boolean) =>
                handleFieldChange(field, value, shouldValidate)
              }
              id="companyLogoUpload"
            />
          </Grid>

          <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
            <LogoUpload
              label={t('forms:company_banner')}
              name={'companyBanner'}
              image={formik.values.companyBanner}
              handleChange={(field: string, value: any, shouldValidate?: boolean) =>
                handleFieldChange(field, value, shouldValidate)
              }
              fullWidth
              id="companyBannerUpload"
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
                {t('forms:image_max')}: {imageLimit}
              </Typography>
            </Grid>
            TODO сделать вывод лимита
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
              inputProps={{ maxLength: 10000 }}
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
          <Button variant="text" sx={{ fontSize: 16, color: palette.error.main, mb: 2 }} onClick={() => setOpen(true)}>
            {t('common:delete')}
          </Button>
        </Grid>
      </form>
      <ModalDeleteConfirm
        open={open}
        onClose={() => setOpen(false)}
        onDelete={handleDelete}
        profileId={companyProfileId?.toString()}
      />
    </div>
  )
}

export default CreateCategoryForm
