import { useFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { adCreateFormProps, CreateAdForm, SaveAdForm } from '@/src/types/redux/adCreate'
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
import { CountriesType } from '@/src/enums/countries'

const VehicleAdCreateForm: React.FC<adCreateFormProps> = ({
  currentInitialValues,
  categoryName,
  objectId,
  submitHandler,
}) => {
  const { t } = useTranslation(['common', 'forms'])
  const theme = useTheme()
  const { palette } = theme

  const allCurrencies = useSelector(getAllCurrenciesFilters)

  const vehicle = subcategories[CategoriesType.Vehicle]

  const initialValues: SaveAdForm = {
    category: categoryName || '',
    label: currentInitialValues?.label || '',
    currencyCode: currentInitialValues?.currencyCode || 'USD',
    price: currentInitialValues?.price || 0,
    country: currentInitialValues?.country || '',
    city: currentInitialValues?.city || '',
    description: currentInitialValues?.description || '',
    asDraft: currentInitialValues?.draft || false,
    images: currentInitialValues?.images || [],
    categoryInfo: {
      [vehicle.key as KeysSubcategories]:
        currentInitialValues?.categoryInfo && 'vehicleType' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.vehicleType
          : vehicle.array[0],
      [vehicle.additional[0].key as KeysSubcategories]:
        currentInitialValues?.categoryInfo && 'offerType' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.offerType
          : vehicle.additional[0].array[0],
      [KeysSubcategories.Brand]:
        currentInitialValues?.categoryInfo && 'brand' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.brand
          : '',
      [KeysSubcategories.Model]:
        currentInitialValues?.categoryInfo && 'model' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.model
          : '',
      [KeysSubcategories.ReleaseYear]:
        currentInitialValues?.categoryInfo && 'releaseYear' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.releaseYear
          : 2024,
      [KeysSubcategories.Mileage]:
        currentInitialValues?.categoryInfo && 'mileage' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.mileage
          : 0,
      [vehicle.additional[1].key as KeysSubcategories]:
        currentInitialValues?.categoryInfo && 'mileageMeasure' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.mileageMeasure
          : vehicle.additional[1].array[0],
      [vehicle.additional[2].key as KeysSubcategories]:
        currentInitialValues?.categoryInfo && 'condition' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.condition
          : vehicle.additional[2].array[0],
      [vehicle.additional[3].key as KeysSubcategories]:
        currentInitialValues?.categoryInfo && 'transmissionType' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.transmissionType
          : vehicle.additional[3].array[0],
      [vehicle.additional[4].key as KeysSubcategories]:
        currentInitialValues?.categoryInfo && 'fuelType' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.fuelType
          : vehicle.additional[4].array[0],
      [vehicle.additional[5].key as KeysSubcategories]:
        currentInitialValues?.categoryInfo && 'quality' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.quality
          : vehicle.additional[5].array[0],
      [vehicle.additional[6].key as KeysSubcategories]:
        currentInitialValues?.categoryInfo && 'color' in currentInitialValues.categoryInfo
          ? currentInitialValues.categoryInfo.color
          : vehicle.additional[6].array[0],
    },
    objectId: objectId || null,
  }

  const validationSchema = yup.object({})

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: submitHandler || (() => {}),
  })

  if (!vehicle) return null
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
                handleChange={e => formik.setFieldValue('price', Number(e.target.value))}
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
                { ...formik.values.categoryInfo, [vehicle.key as string]: item },
                true
              )
            }
            collection={vehicle.array}
            selected={formik.values.categoryInfo[vehicle.key as KeysSubcategories]}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <SimpleParamsField
            handleChange={item =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [vehicle.additional[0].key as string]: item },
                true
              )
            }
            collection={vehicle.additional[0].array}
            selected={formik.values.categoryInfo[vehicle.additional[0].key as KeysSubcategories]}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <SimpleParamsField
            handleChange={item =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [vehicle.additional[5].key as string]: item },
                true
              )
            }
            collection={vehicle.additional[5].array}
            selected={formik.values.categoryInfo[vehicle.additional[5].key as KeysSubcategories]}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleTextField
            maxWidth={SimpleTextFieldMaxWidth.Medium}
            value={formik.values.categoryInfo[KeysSubcategories.Brand] as string | number}
            label={t('forms:brand_name')}
            handleChange={e =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [KeysSubcategories.Brand]: e.target.value },
                false
              )
            }
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleTextField
            maxWidth={SimpleTextFieldMaxWidth.Small}
            value={formik.values.categoryInfo[KeysSubcategories.Model] as string | number}
            label={t('forms:model_name')}
            handleChange={e =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [KeysSubcategories.Model]: e.target.value },
                false
              )
            }
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <SimpleTextField
            maxWidth={SimpleTextFieldMaxWidth.Small}
            value={formik.values.categoryInfo[KeysSubcategories.ReleaseYear] as string | number}
            label={t('forms:release_year')}
            inputProps={{
              onKeyDown: e => {
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                  e.preventDefault()
                }
              },
            }}
            handleChange={e =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [KeysSubcategories.ReleaseYear]: e.target.value },
                false
              )
            }
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 6, md: 10 }}>
          <Grid container alignItems="flex-end" item xs={12}>
            <Grid item mr={8.5} mb={{ xs: 4, md: 0 }}>
              <SimpleTextField
                value={formik.values.categoryInfo[KeysSubcategories.Mileage] as string | number}
                label={t('forms:mileage_measure')}
                inputProps={{
                  onKeyDown: e => {
                    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                      e.preventDefault()
                    }
                  },
                }}
                handleChange={e =>
                  formik.setFieldValue(
                    'categoryInfo',
                    { ...formik.values.categoryInfo, [KeysSubcategories.Mileage]: Number(e.target.value) },
                    false
                  )
                }
              />
            </Grid>
            <Grid item>
              <SimpleParamsField
                handleChange={item =>
                  formik.setFieldValue(
                    'categoryInfo',
                    { ...formik.values.categoryInfo, [vehicle.additional[1].key as string]: item },
                    true
                  )
                }
                collection={vehicle.additional[1].array}
                selected={formik.values.categoryInfo[vehicle.additional[1].key as KeysSubcategories]}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <SimpleParamsField
            handleChange={item =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [vehicle.additional[6].key as string]: item },
                true
              )
            }
            collection={vehicle.additional[6].array}
            selected={formik.values.categoryInfo[vehicle.additional[6].key as KeysSubcategories]}
            label={t('forms:color')}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <SimpleParamsField
            handleChange={item =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [vehicle.additional[2].key as string]: item },
                true
              )
            }
            collection={vehicle.additional[2].array}
            selected={formik.values.categoryInfo[vehicle.additional[2].key as KeysSubcategories]}
            label={t('forms:condition')}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <SimpleParamsField
            handleChange={item =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [vehicle.additional[3].key as string]: item },
                true
              )
            }
            collection={vehicle.additional[3].array}
            selected={formik.values.categoryInfo[vehicle.additional[3].key as KeysSubcategories]}
            label={t('forms:transmission_type')}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 11 }}>
          <SimpleParamsField
            handleChange={item =>
              formik.setFieldValue(
                'categoryInfo',
                { ...formik.values.categoryInfo, [vehicle.additional[4].key as string]: item },
                true
              )
            }
            collection={vehicle.additional[4].array}
            selected={formik.values.categoryInfo[vehicle.additional[4].key as KeysSubcategories]}
            label={t('forms:fuel_type')}
          />
        </Grid>

        <Grid item xs={12} mt={{ xs: 5, md: 20 }}>
          <SimpleLocationField
            countryValue={formik.values.country as CountriesType}
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
            <Grid xs={12} md={5} mb={{ xs: 4, md: 0 }}>
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

export default VehicleAdCreateForm
