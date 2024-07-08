import { useTranslation } from 'next-i18next'
import FilterPrice from '@/src/components/molecules/FilterPrice'
import { Box } from '@mui/material'
import { subcategories } from '@/src/components/dialogs/CategoriesSearchDialog/constant'
import { find } from 'lodash'
import FilterParams from '@/src/components/molecules/FilterParams'
import FilterInput from '@/src/components/molecules/FilterInput'
import { useDispatch, useSelector } from 'react-redux'
import { setInitialValue } from '@/src/redux/slices/filters'
import { getCategoryParamsFilters } from '@/src/redux/selectors/filters'
import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'
import { OperationsEnum } from '@/src/enums/redux'

const DevicesComponent = () => {
  const { t } = useTranslation(['common', 'forms'])
  const dispatch = useDispatch()

  const devices = subcategories[CategoriesType.Devices]
  const additional = devices.additional
  const categoryParams = useSelector(getCategoryParamsFilters)

  if (additional)
    return (
      <>
        <Box mt={{ xs: 6, md: 12 }}>
          <FilterPrice />
        </Box>
        <Box mt={{ xs: 6, md: 12 }}>
          <FilterParams
            collection={additional[0].array}
            selected={find(categoryParams, param => param.key === additional[0]?.key)}
            setSelected={value =>
              dispatch(
                setInitialValue({
                  categoryParams: [
                    ...categoryParams.filter(param => param.key !== additional[0]?.key),
                    { operation: OperationsEnum.Equal, key: additional[0]?.key as KeysSubcategories, value },
                  ],
                })
              )
            }
          />
        </Box>
        <Box mt={{ xs: 6, md: 12 }}>
          <FilterInput
            title={t('brand_name')}
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
          <FilterParams
            collection={devices.array}
            selected={find(categoryParams, param => param.key === devices.key)}
            setSelected={value =>
              dispatch(
                setInitialValue({
                  categoryParams: [
                    ...categoryParams.filter(param => param.key !== devices.key),
                    {
                      operation: OperationsEnum.Equal,
                      key: devices.key as KeysSubcategories,
                      value,
                    },
                  ],
                })
              )
            }
          />
        </Box>
      </>
    )
}

export default DevicesComponent
