import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { find, map } from 'lodash'
import TextButton from '@/src/components/atoms/TextButton'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryParamsFilters } from '@/src/redux/selectors/filters'
import { setInitialValue } from '@/src/redux/slices/filters'
import { KeysSubcategories } from '@/src/enums/categories'
import { AdditionalElement } from '@/src/types/structs/search'
import { OperationsEnum } from '@/src/enums/redux'

type Props = {
  collection: KeysSubcategories[]
  additional: AdditionalElement[]
}

const FilterCheckboxSelect = ({ collection, additional }: Props) => {
  const { t } = useTranslation(['common', 'forms'])
  const dispatch = useDispatch()
  const categoryParams = useSelector(getCategoryParamsFilters)
  return (
    <Grid mt={{ xs: 6, md: 12 }} container spacing={{ xs: 2, md: 4 }}>
      {map(collection, (item, index) => (
        <Grid item key={index}>
          <TextButton
            isSelected={!!find(categoryParams, param => param.key === item)}
            text={t(`categories:${find(additional, obj => obj.key === item)?.array[0]}`)}
            onClick={() => {
              let params = []
              if (find(categoryParams, param => param.key === item)) {
                params = categoryParams.filter(param => param.key !== item)
              } else {
                params = [
                  ...categoryParams.filter(param => param.key !== item),
                  { key: item, operation: OperationsEnum.Equal, value: true },
                ]
              }
              dispatch(
                setInitialValue({
                  categoryParams: params,
                })
              )
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default FilterCheckboxSelect
