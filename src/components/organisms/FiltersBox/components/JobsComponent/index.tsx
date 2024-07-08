import FilterPrice from '@/src/components/molecules/FilterPrice'
import { Box } from '@mui/material'
import { subcategories } from '@/src/components/dialogs/CategoriesSearchDialog/constant'
import FilterParams from '@/src/components/molecules/FilterParams'
import { find } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryParamsFilters } from '@/src/redux/selectors/filters'
import { setInitialValue } from '@/src/redux/slices/filters'
import { CategoriesType, KeysSubcategories } from '@/src/enums/categories'
import { OperationsEnum } from '@/src/enums/redux'

const JobsComponent = () => {
  const jobs = subcategories[CategoriesType.Jobs]
  const additional = jobs.additional
  const dispatch = useDispatch()
  const categoryParams = useSelector(getCategoryParamsFilters)

  if (additional)
    return (
      <>
        <Box mt={{ xs: 6, md: 12 }}>
          <FilterPrice />
        </Box>

        <Box mt={{ xs: 6, md: 12 }}>
          <FilterParams
            collection={jobs.array}
            selected={find(categoryParams, param => param.key === jobs.key)}
            setSelected={value =>
              dispatch(
                setInitialValue({
                  categoryParams: [
                    ...categoryParams.filter(param => param.key !== jobs.key),
                    {
                      operation: OperationsEnum.Equal,
                      key: jobs.key as KeysSubcategories,
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

export default JobsComponent
