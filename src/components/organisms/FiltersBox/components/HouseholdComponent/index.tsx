import FilterPrice from '@/src/components/molecules/FilterPrice'
import { Box } from '@mui/material'
import { subcategories } from '@/src/components/dialogs/CategoriesSearchDialog/constant'
import { find, map } from 'lodash'
import FilterParams from '@/src/components/molecules/FilterParams'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryParamsFilters } from '@/src/redux/selectors/filters'
import { setInitialValue } from '@/src/redux/slices/filters'
import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'
import { AdditionalParamSearch, CategorySearch } from '@/src/types/structs/search'
import { OperationsEnum } from '@/src/enums/redux'

const HouseholdComponent = () => {
  const household = subcategories[CategoriesType.Household]
  const additional = household.additional
  const dispatch = useDispatch()
  const categoryParams = useSelector(getCategoryParamsFilters)

  const renderParams = (
    array: CategorySearch[] | AdditionalParamSearch[],
    key: KeysSubcategories | null,
    index: number
  ) => {
    return (
      <Box mt={{ xs: 6, md: 12 }} key={index}>
        <FilterParams
          collection={array}
          selected={find(categoryParams, param => param.key === key)}
          setSelected={value =>
            dispatch(
              setInitialValue({
                categoryParams: [
                  ...categoryParams.filter(param => param.key !== key),
                  { operation: OperationsEnum.Equal, key: key as KeysSubcategories, value },
                ],
              })
            )
          }
        />
      </Box>
    )
  }

  if (additional)
    return (
      <>
        <Box mt={{ xs: 6, md: 12 }}>
          <FilterPrice />
        </Box>
        {map(
          [
            { array: additional[0].array, key: additional[0].key },
            { array: household.array, key: household.key },
          ],
          (item, index) => renderParams(item.array, item.key, index)
        )}
      </>
    )
}

export default HouseholdComponent
