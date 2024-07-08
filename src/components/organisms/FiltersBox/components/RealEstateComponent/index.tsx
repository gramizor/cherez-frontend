import { useTranslation } from 'next-i18next'
import FilterPrice from '@/src/components/molecules/FilterPrice'
import { Box } from '@mui/material'
import { subcategories } from '@/src/components/dialogs/CategoriesSearchDialog/constant'
import FilterParams from '@/src/components/molecules/FilterParams'
import { find, map } from 'lodash'
import FilterCountSelect from '@/src/components/molecules/FilterCountSelect'
import FilterCheckboxSelect from '@/src/components/molecules/FilterCheckboxSelect'
import { useDispatch, useSelector } from 'react-redux'
import { setInitialValue } from '@/src/redux/slices/filters'
import { getCategoryParamsFilters } from '@/src/redux/selectors/filters'
import { CategoriesType, KeysSubcategories, RealEstateCount } from '@/src/enums/categories'
import { OperationsEnum } from '@/src/enums/redux'

const RealEstateComponent = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('forms')
  const categoryParams = useSelector(getCategoryParamsFilters)

  const realEstate = subcategories[CategoriesType.RealEstate]
  const additional = realEstate.additional
  if (additional)
    return (
      <>
        <Box mt={{ xs: 6, md: 12 }}>
          {additional[0].array && (
            <FilterParams
              collection={additional[0].array}
              selected={find(categoryParams, param => param.key === additional[0].key)}
              setSelected={value =>
                dispatch(
                  setInitialValue({
                    categoryParams: [
                      ...categoryParams.filter(param => param.key !== additional[0]?.key),
                      {
                        operation: OperationsEnum.Equal,
                        key: additional[0]?.key as KeysSubcategories,
                        value,
                      },
                    ],
                  })
                )
              }
            />
          )}
        </Box>
        <Box mt={{ xs: 6, md: 12 }}>
          <FilterPrice />
        </Box>
        <Box mt={{ xs: 6, md: 12 }}>
          <FilterParams
            title={t('forms:parameters')}
            collection={realEstate.array}
            selected={find(categoryParams, param => param.key === realEstate.key)}
            setSelected={value =>
              dispatch(
                setInitialValue({
                  categoryParams: [
                    ...categoryParams.filter(param => param.key !== realEstate.key),
                    {
                      operation: OperationsEnum.Equal,
                      key: realEstate.key as KeysSubcategories,
                      value,
                    },
                  ],
                })
              )
            }
          />
        </Box>
        {map(['bedrooms', 'baths'], (item, index) => (
          <Box mt={{ xs: 6, md: 12 }} key={index}>
            <FilterCountSelect
              title={t(`forms:${item}`)}
              collection={additional[Number(index) + 1].array}
              selected={find(categoryParams, param => param.key === additional[Number(index) + 1].key)}
              setSelected={(value, valueIndex) =>
                dispatch(
                  setInitialValue({
                    categoryParams: [
                      ...categoryParams.filter(param => param.key !== additional[Number(index) + 1].key),
                      {
                        operation:
                          value === RealEstateCount.ThreeAndMore ? OperationsEnum.Greater : OperationsEnum.Equal,
                        key: additional[Number(index) + 1].key as KeysSubcategories,
                        value: value === RealEstateCount.ThreeAndMore ? 2 : valueIndex,
                      },
                    ],
                  })
                )
              }
            />
          </Box>
        ))}
        <Box mt={{ xs: 6, md: 12 }}>
          <FilterCheckboxSelect
            collection={[KeysSubcategories.Furniture, KeysSubcategories.Pool, KeysSubcategories.Gym]}
            additional={additional}
          />
        </Box>
      </>
    )
}

export default RealEstateComponent
