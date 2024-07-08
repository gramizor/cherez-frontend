import { Box } from '@mui/material'
import FilterPrice from '@/src/components/molecules/FilterPrice'
import FilterParams from '@/src/components/molecules/FilterParams'
import { subcategories } from '@/src/components/dialogs/CategoriesSearchDialog/constant'
import { find } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryParamsFilters } from '@/src/redux/selectors/filters'
import { setInitialValue } from '@/src/redux/slices/filters'
import { CategoriesType } from '@/src/enums/categories'
import { OperationsEnum } from '@/src/enums/redux'

const ServiceComponent = () => {
  const dispatch = useDispatch()
  const services = subcategories[CategoriesType.Services]
  const categoryParams = useSelector(getCategoryParamsFilters)

  return (
    <>
      <Box mt={{ xs: 6, md: 14 }}>
        <FilterPrice />
      </Box>
      <Box mt={{ xs: 6, md: 14 }}>
        <FilterParams
          collection={services.array}
          selected={find(categoryParams, param => param.key === services.key)}
          setSelected={value =>
            dispatch(
              setInitialValue({
                categoryParams: [{ operation: OperationsEnum.Equal, key: services.key, value }],
              })
            )
          }
        />
      </Box>
    </>
  )
}

export default ServiceComponent
