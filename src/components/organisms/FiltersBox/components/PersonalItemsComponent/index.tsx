import FilterPrice from '@/src/components/molecules/FilterPrice'
import { Box } from '@mui/material'
import { subcategories } from '@/src/components/dialogs/CategoriesSearchDialog/constant'
import FilterParams from '@/src/components/molecules/FilterParams'
import { find, map } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryParamsFilters } from '@/src/redux/selectors/filters'
import { setInitialValue } from '@/src/redux/slices/filters'
import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'
import { OperationsEnum } from '@/src/enums/redux'

const PersonalItemsComponent = () => {
  const personalItems = subcategories[CategoriesType.PersonalItems]
  const additional = personalItems.additional
  const dispatch = useDispatch()
  const categoryParams = useSelector(getCategoryParamsFilters)
  if (additional)
    return (
      <>
        <Box mt={{ xs: 6, md: 12 }}>
          <FilterPrice />
        </Box>
        {map([0, 1, 2], (item, index) => (
          <Box mt={{ xs: 6, md: 12 }} key={index}>
            <FilterParams
              collection={additional[item].array}
              selected={find(categoryParams, param => param.key === additional[item]?.key)}
              setSelected={value =>
                dispatch(
                  setInitialValue({
                    categoryParams: [
                      ...categoryParams.filter(param => param.key !== additional[item]?.key),
                      { operation: OperationsEnum.Equal, key: additional[item]?.key as KeysSubcategories, value },
                    ],
                  })
                )
              }
            />
          </Box>
        ))}

        <Box mt={{ xs: 6, md: 12 }}>
          <FilterParams
            collection={personalItems.array}
            selected={find(categoryParams, param => param.key === personalItems.key)}
            setSelected={value =>
              dispatch(
                setInitialValue({
                  categoryParams: [
                    ...categoryParams.filter(param => param.key !== personalItems.key),
                    {
                      operation: OperationsEnum.Equal,
                      key: personalItems.key as KeysSubcategories,
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

export default PersonalItemsComponent
