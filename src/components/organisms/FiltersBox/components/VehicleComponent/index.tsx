import { Box } from '@mui/material'
import FilterPrice from '@/src/components/molecules/FilterPrice'
import FilterParams from '@/src/components/molecules/FilterParams'
import { subcategories } from '@/src/components/dialogs/CategoriesSearchDialog/constant'
import { find } from 'lodash'
import FilterInput from '@/src/components/molecules/FilterInput'
import { useTranslation } from 'next-i18next'
import FilterRange from '@/src/components/molecules/FilterRange'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryParamsFilters } from '@/src/redux/selectors/filters'
import { setInitialValue } from '@/src/redux/slices/filters'
import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'
import { OperationsEnum } from '@/src/enums/redux'
import { CategoryParams } from '@/src/types/redux/mainSearch'

const VehicleComponent = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('forms')
  const categoryParams = useSelector(getCategoryParamsFilters)
  const vehicle = subcategories[CategoriesType.Vehicle]
  return (
    <>
      <Box mt={{ xs: 6, md: 12 }}>
        <FilterPrice />
      </Box>
      <Box mt={{ xs: 6, md: 12 }}>
        <FilterParams
          collection={vehicle.array}
          selected={find(categoryParams, param => param.key === vehicle.key)}
          setSelected={value =>
            dispatch(
              setInitialValue({
                categoryParams: [
                  ...categoryParams.filter(param => param.key !== vehicle.key),
                  {
                    operation: OperationsEnum.Equal,
                    key: vehicle.key as KeysSubcategories,
                    value,
                  },
                ],
              })
            )
          }
        />
      </Box>
      <Box mt={{ xs: 6, md: 12 }}>
        {vehicle.additional[0].array && (
          <FilterParams
            collection={vehicle.additional[0].array}
            selected={find(categoryParams, param => param.key === vehicle.additional[0].key)}
            setSelected={value =>
              dispatch(
                setInitialValue({
                  categoryParams: [
                    ...categoryParams.filter(param => param.key !== vehicle.additional[0].key),
                    { operation: OperationsEnum.Equal, key: vehicle.additional[0].key, value },
                  ],
                })
              )
            }
          />
        )}
      </Box>
      <Box mt={{ xs: 6, md: 12 }}>
        <FilterInput
          title={t('forms:brand_name')}
          value={find(categoryParams, param => param.key === KeysSubcategories.Brand)?.value as string | undefined}
          setValue={value =>
            dispatch(
              setInitialValue({
                categoryParams: [
                  ...categoryParams.filter(param => param.key !== KeysSubcategories.Brand),
                  { operation: OperationsEnum.Equal, key: KeysSubcategories.Brand, value },
                ],
              })
            )
          }
          big
        />
      </Box>
      <Box mt={{ xs: 6, md: 12 }}>
        <FilterInput
          title={t('forms:model_name')}
          value={find(categoryParams, param => param.key === KeysSubcategories.Model)?.value as string | undefined}
          setValue={value =>
            dispatch(
              setInitialValue({
                categoryParams: [
                  ...categoryParams.filter(param => param.key !== KeysSubcategories.Model),
                  { operation: OperationsEnum.Equal, key: KeysSubcategories.Model, value },
                ],
              })
            )
          }
          big={false}
        />
      </Box>
      <Box mt={{ xs: 6, md: 12 }}>
        <FilterRange
          title={t('forms:release_year')}
          setCategoryParams={(params: CategoryParams[]) =>
            dispatch(
              setInitialValue({
                categoryParams: params,
              })
            )
          }
          keyValue={KeysSubcategories.ReleaseYear}
        />
      </Box>
      <Box mt={{ xs: 6, md: 12 }} display="flex">
        <FilterRange
          title={t('forms:mileage_measure')}
          setCategoryParams={(params: CategoryParams[]) =>
            dispatch(
              setInitialValue({
                categoryParams: params,
              })
            )
          }
          keyValue={KeysSubcategories.Mileage}
          collection={vehicle.additional[1]?.array}
          selected={find(categoryParams, param => param.key === vehicle.additional[1]?.key)}
          setSelected={value =>
            dispatch(
              setInitialValue({
                categoryParams: [
                  ...categoryParams.filter(param => param.key !== vehicle.additional[1]?.key),
                  { operation: OperationsEnum.Equal, key: vehicle.additional[1]?.key, value },
                ],
              })
            )
          }
        />
      </Box>
      <Box mt={{ xs: 6, md: 12 }}>
        {vehicle.additional[2]?.array && (
          <FilterParams
            title={t('forms:condition')}
            collection={vehicle.additional[2].array}
            selected={find(categoryParams, param => param.key === vehicle.additional[2]?.key)}
            setSelected={value =>
              dispatch(
                setInitialValue({
                  categoryParams: [
                    ...categoryParams.filter(param => param.key !== vehicle.additional[2]?.key),
                    { operation: OperationsEnum.Equal, key: vehicle.additional[2]?.key, value },
                  ],
                })
              )
            }
          />
        )}
      </Box>
      <Box mt={{ xs: 6, md: 12 }}>
        {vehicle.additional[3]?.array && (
          <FilterParams
            title={t('forms:transmission_type')}
            collection={vehicle.additional[3].array}
            selected={find(categoryParams, param => param.key === vehicle.additional[3]?.key)}
            setSelected={value =>
              dispatch(
                setInitialValue({
                  categoryParams: [
                    ...categoryParams.filter(param => param.key !== vehicle.additional[3]?.key),
                    { operation: OperationsEnum.Equal, key: vehicle.additional[3]?.key, value },
                  ],
                })
              )
            }
          />
        )}
      </Box>
      <Box mt={{ xs: 6, md: 12 }}>
        {vehicle.additional[4]?.array && (
          <FilterParams
            title={t('forms:fuel_type')}
            collection={vehicle.additional[4].array}
            selected={find(categoryParams, param => param.key === vehicle.additional[4]?.key)}
            setSelected={value =>
              dispatch(
                setInitialValue({
                  categoryParams: [
                    ...categoryParams.filter(param => param.key !== vehicle.additional[4]?.key),
                    { operation: OperationsEnum.Equal, key: vehicle.additional[4]?.key, value },
                  ],
                })
              )
            }
          />
        )}
      </Box>
    </>
  )
}

export default VehicleComponent
