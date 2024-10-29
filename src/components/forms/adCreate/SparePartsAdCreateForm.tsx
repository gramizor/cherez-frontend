import { useFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { adCreateFormProps, SaveAdForm } from '@/src/types/redux/adCreate'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { getAllCurrenciesFilters } from '@/src/redux/selectors/filters'
import SimpleTextField, { SimpleTextFieldMaxWidth } from '@/src/components/fields/SimpleTextField'
import SimpleSelectField from '@/src/components/fields/SimpleSelectField'
import { subcategories } from '@/src/components/dialogs/CategoriesSearchDialog/constant'
import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'
import SimpleParamsField from '@/src/components/fields/SimpleParamsField'
import SimpleLocationField from '@/src/components/fields/SimpleLocationField'
import Button from '@mui/material/Button'
import SimpleFileUploader from '@/src/components/fields/SimpleFileUploader'

const SparePartsAdCreateForm: React.FC<adCreateFormProps> = ({
  currentInitialValues,
  categoryName,
  objectId,
  submitHandler,
}) => {
  const { t } = useTranslation(['common', 'forms'])
  const theme = useTheme()
  const { palette } = theme

  const allCurrencies = useSelector(getAllCurrenciesFilters)

  const spareParts = subcategories[CategoriesType.SpareParts]

  const initialValues: SaveAdForm = {
    category: categoryName || '',
    label: currentInitialValues?.label || '',
    currencyCode: currentInitialValues?.currencyCode || 'USD',
    price: currentInitialValues?.price || 0,
    categoryInfo: {
      [spareParts.key as KeysSubcategories]:
        currentInitialValues?.categoryInfo && 'subcategory' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.subcategory
          : spareParts.array[0],
      [spareParts.additional[0].key as KeysSubcategories]:
        currentInitialValues?.categoryInfo && 'quality' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.quality
          : spareParts.additional[0].array[0],
      [KeysSubcategories.Manufacturer]:
        currentInitialValues?.categoryInfo && 'manufacturer' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.manufacturer
          : '',
      [KeysSubcategories.PartNumber]:
        currentInitialValues?.categoryInfo && 'partNumber' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.partNumber
          : '',
    },
    country: currentInitialValues?.country || '',
    city: currentInitialValues?.city || '',
    description: currentInitialValues?.description || '',
    asDraft: currentInitialValues?.draft || false,
    images: currentInitialValues?.images || [],
    objectId: objectId || null,
  }

  const validationSchema = yup.object({})

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: submitHandler || (() => {}),
  })

  if (!spareParts) return null
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
                inputProps={{
                  onKeyDown: e => {
                    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                      e.preventDefault()
                    }
                  },
                }}
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
                { ...formik.values.categoryInfo, [spareParts.additional[0].key as string]: item },
                true
              )
            }
            collection={spareParts.additional[0].array}
            selected={formik.values.categoryInfo[spareParts.additional[0].key as KeysSubcategories]}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <SimpleParamsField
            handleChange={item =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [spareParts.key as string]: item },
                true
              )
            }
            collection={spareParts.array}
            selected={formik.values.categoryInfo[spareParts.key as KeysSubcategories]}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleTextField
            maxWidth={SimpleTextFieldMaxWidth.Medium}
            value={formik.values.categoryInfo[KeysSubcategories.Manufacturer] as string | number}
            label={t('forms:manufacturer')}
            handleChange={e =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [KeysSubcategories.Manufacturer]: e.target.value },
                false
              )
            }
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleTextField
            maxWidth={SimpleTextFieldMaxWidth.Small}
            value={formik.values.categoryInfo[KeysSubcategories.PartNumber] as string | number}
            label={t('forms:part_number')}
            handleChange={e =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [KeysSubcategories.PartNumber]: e.target.value },
                false
              )
            }
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
                {currentInitialValues ? t('forms:edit_ad') : t('forms:save_ad')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default SparePartsAdCreateForm
