import { useFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { CreateAdForm } from '@/src/types/redux/adCreate'
import { useDispatch, useSelector } from 'react-redux'
import { getAdCreateForm } from '@/src/redux/selectors/adCreate'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { getAllCurrenciesFilters } from '@/src/redux/selectors/filters'
import SimpleTextField, { SimpleTextFieldMaxWidth } from '@/src/components/fields/SimpleTextField'
import SimpleSelectField from '@/src/components/fields/SimpleSelectField'
import { subcategories } from '@/src/components/dialogs/CategoriesSearchDialog/constant'
import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'
import SimpleParamsField from '@/src/components/fields/SimpleParamsField'
import SimpleLocationField from '@/src/components/fields/SimpleLocationField'
import Button from '@mui/material/Button'
import { createAdRequested } from '@/src/redux/slices/adCreate'
import { useRouter } from 'next/router'
import toast, { Renderable, Toast, ValueFunction } from 'react-hot-toast'
import SimpleFileUploader from '@/src/components/fields/SimpleFileUploader'
import SimpleCheckboxListField from '@/src/components/fields/SimpleCheckboxListField'

const RealEstateAdCreateForm = () => {
  const { t } = useTranslation(['common', 'forms'])
  const dispatch = useDispatch()
  const theme = useTheme()
  const { palette } = theme
  const router = useRouter()

  const form = useSelector(getAdCreateForm)
  const allCurrencies = useSelector(getAllCurrenciesFilters)

  const realEstate = subcategories[CategoriesType.RealEstate]

  const initialValues: CreateAdForm = form

  const validationSchema = yup.object({})

  const onSubmit = (values: CreateAdForm) => {
    const onFailed = (error: Renderable | ValueFunction<Renderable, Toast>) => {
      if (typeof error === 'string') {
        toast.error(t(`forms:${error.replace(/ /g, '_')}`), {
          duration: 3000,
        })
      }
    }

    const onSuccess = (objectId: string) => {
      router.push(`/ads/${objectId}`).then()
    }

    dispatch(createAdRequested({ ...values, onSuccess, onFailed }))
  }

  const formik = useFormik({
    validationSchema,
    initialValues: {
      ...initialValues,
      categoryInfo: {
        [realEstate.key as KeysSubcategories]: realEstate.array[0],
        [realEstate.additional[0].key as KeysSubcategories]: realEstate.additional[0].array[0],
        [KeysSubcategories.Area]: 0,
        [realEstate.additional[1].key as KeysSubcategories]: 1,
        [realEstate.additional[2].key as KeysSubcategories]: 1,
        [realEstate.additional[3].key as KeysSubcategories]: false,
        [realEstate.additional[4].key as KeysSubcategories]: false,
        [realEstate.additional[5].key as KeysSubcategories]: false,
      },
    },
    onSubmit,
  })

  if (!realEstate) return null
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleFileUploader
            label={t('forms:set_image')}
            images={formik.values.images}
            name={'images'}
            handleChange={formik.setFieldValue}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <SimpleParamsField
            handleChange={item =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [realEstate.additional[0].key as string]: item },
                true
              )
            }
            collection={realEstate.additional[0].array}
            selected={formik.values.categoryInfo[realEstate.additional[0].key as KeysSubcategories]}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleTextField
            value={formik.values.label}
            label={t('forms:label')}
            handleChange={formik.handleChange}
            name={'label'}
            touched={formik.touched.label}
            error={formik.errors.label}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <Grid container>
            <Box width={{ xs: 'calc(100% - 116px)', md: 'calc(100% - 212px)', lg: 'calc(100% - 219px)' }}>
              <SimpleTextField
                label={t('forms:price')}
                handleChange={formik.handleChange}
                name={'price'}
                touched={formik.touched.price}
                error={formik.errors.price}
                inputProps={{ type: 'number', min: '0' }}
                value={formik.values.price}
              />
            </Box>
            <Box
              ml={{ xs: 4, md: 16 }}
              width={{ xs: '100px !important', md: '140px !important', lg: '147px !important' }}
            >
              <SimpleSelectField
                label={t('forms:currency')}
                handleChange={formik.handleChange}
                name={'currencyCode'}
                touched={formik.touched.currencyCode}
                error={formik.errors.currencyCode}
                collection={allCurrencies}
                value={formik.values.currencyCode}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <SimpleParamsField
            handleChange={item =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [realEstate.key as string]: item },
                true
              )
            }
            collection={realEstate.array}
            selected={formik.values.categoryInfo[realEstate.key as KeysSubcategories]}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleTextField
            maxWidth={SimpleTextFieldMaxWidth.Small}
            additional={'m2'}
            inputProps={{ type: 'number', min: '0', max: '10000' }}
            value={formik.values.categoryInfo[KeysSubcategories.Area] as string | number}
            label={t('forms:area')}
            handleChange={e =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [KeysSubcategories.Area]: e.target.value },
                false
              )
            }
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleTextField
            maxWidth={SimpleTextFieldMaxWidth.Small}
            inputProps={{ type: 'number', min: '0', max: '10' }}
            value={formik.values.categoryInfo[KeysSubcategories.BedroomsCount] as string | number}
            label={t('forms:bedrooms')}
            handleChange={e =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [KeysSubcategories.BedroomsCount]: e.target.value },
                false
              )
            }
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleTextField
            maxWidth={SimpleTextFieldMaxWidth.Small}
            value={formik.values.categoryInfo[KeysSubcategories.BathsCount] as string | number}
            label={t('forms:baths')}
            inputProps={{ type: 'number', min: '0', max: '10' }}
            handleChange={e =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [KeysSubcategories.BathsCount]: e.target.value },
                false
              )
            }
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleCheckboxListField
            handleChange={item => {
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [item]: !formik.values.categoryInfo[item] },
                false
              )
            }}
            collection={[KeysSubcategories.Furniture, KeysSubcategories.Pool, KeysSubcategories.Gym]}
            additional={realEstate.additional}
            categoryInfo={formik.values.categoryInfo}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 20 }}>
          <SimpleLocationField
            countryValue={formik.values.country}
            cityValue={formik.values.city}
            handleCountryChange={id => formik.setFieldValue('country', id, true)}
            handleCityChange={id => formik.setFieldValue('city', id, true)}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <SimpleTextField
            value={formik.values.description}
            label={t('forms:description')}
            handleChange={formik.handleChange}
            name={'description'}
            touched={formik.touched.description}
            error={formik.errors.description}
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

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <Grid container justifyContent="space-between">
            <Grid xs={12} md={5}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => {
                  formik.setFieldValue('asDraft', true, false).then(() => formik.handleSubmit())
                }}
              >
                {t('forms:save_draft')}
              </Button>
            </Grid>
            <Grid xs={12} md={5}>
              <Button
                fullWidth
                variant="contained"
                sx={{ fontSize: 16 }}
                onClick={() => {
                  formik.setFieldValue('asDraft', false, false).then(() => formik.handleSubmit())
                }}
              >
                {t('forms:save_ad')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default RealEstateAdCreateForm
