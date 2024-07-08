import { Box, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { find, map } from 'lodash'
import TextButton from '@/src/components/atoms/TextButton'
import { useSelector } from 'react-redux'
import { getCategoryParamsFilters } from '@/src/redux/selectors/filters'
import { KeysSubcategories } from '@/src/enums/categories'
import { CategoryParams } from '@/src/types/redux/mainSearch'
import { AdditionalParamSearch, CategorySearch } from '@/src/types/structs/search'
import { OperationsEnum } from '@/src/enums/redux'

type Props = {
  title: string
  keyValue: KeysSubcategories
  setCategoryParams: (params: CategoryParams[]) => void
  collection?: CategorySearch[] | AdditionalParamSearch[]
  selected?: CategoryParams | undefined
  setSelected?: (item: CategorySearch | AdditionalParamSearch) => void
}

type valueType = number[] | boolean | number | string | null

const FilterRange = ({ title, setCategoryParams, keyValue, collection, selected, setSelected }: Props) => {
  const { t } = useTranslation('forms')
  const categoryParams = useSelector(getCategoryParamsFilters)
  const value = find(categoryParams, param => param.key === keyValue)
  let valueFrom: valueType, valueTo: valueType
  if (value?.operation === OperationsEnum.Clamp) {
    // @ts-ignore
    valueFrom = value?.value[0]
    // @ts-ignore
    valueTo = value?.value[1]
  } else if (value?.operation === OperationsEnum.Greater) {
    valueFrom = value?.value
  } else if (value?.operation === OperationsEnum.Less) {
    valueTo = value?.value
  }

  const handleFrom = (val: number) => {
    let params = categoryParams
    if (val) {
      if (value?.operation === OperationsEnum.Greater || !value) {
        params = [
          ...categoryParams.filter(param => param.key !== keyValue),
          { operation: OperationsEnum.Greater, key: keyValue, value: val },
        ]
      } else {
        params = [
          ...categoryParams.filter(param => param.key !== keyValue),
          { operation: OperationsEnum.Clamp, key: keyValue, value: [val, valueTo as number] },
        ]
      }
    } else {
      if (value?.operation === OperationsEnum.Clamp) {
        params = [
          ...categoryParams.filter(param => param.key !== keyValue),
          { operation: OperationsEnum.Less, key: keyValue, value: valueTo as number },
        ]
      } else {
        if (value?.operation === OperationsEnum.Greater) {
          params = categoryParams.filter(param => param.key !== keyValue)
        }
      }
    }
    setCategoryParams(params)
  }

  const handleTo = (val: number) => {
    let params = categoryParams
    if (val) {
      if (value?.operation === OperationsEnum.Less || !value) {
        params = [
          ...categoryParams.filter(param => param.key !== keyValue),
          { operation: OperationsEnum.Less, key: keyValue, value: val },
        ]
      } else {
        params = [
          ...categoryParams.filter(param => param.key !== keyValue),
          { operation: OperationsEnum.Clamp, key: keyValue, value: [valueFrom as number, val] },
        ]
      }
    } else {
      if (value?.operation === OperationsEnum.Clamp) {
        params = [
          ...categoryParams.filter(param => param.key !== keyValue),
          { operation: OperationsEnum.Greater, key: keyValue, value: valueFrom as number },
        ]
      } else {
        if (value?.operation === OperationsEnum.Less) {
          params = categoryParams.filter(param => param.key !== keyValue)
        }
      }
    }
    setCategoryParams(params)
  }

  return (
    <Box>
      <Typography sx={{ mb: 3 }} variant="subtitle1">
        {title}
      </Typography>
      <Box display={'flex'}>
        <TextField
          sx={{ maxWidth: 170 }}
          onChange={event => handleFrom(Number(event.target.value))}
          fullWidth
          // @ts-ignore
          value={valueFrom}
          color="secondary"
          placeholder={t('forms:price_from')}
          inputProps={{ type: 'number', min: '0' }}
        />
        <TextField
          sx={{ maxWidth: 170, ml: 8 }}
          onChange={event => handleTo(Number(event.target.value))}
          fullWidth
          // @ts-ignore
          value={valueTo}
          color="secondary"
          placeholder={t('forms:price_to')}
          inputProps={{ type: 'number', min: '0' }}
        />
        {collection &&
          collection.length > 0 &&
          map(collection, (item, index) => (
            <Box key={index} ml={Number(index) === 0 ? 5 : 2}>
              <TextButton
                isSelected={selected?.value === item}
                text={t(`categories:${item}`)}
                // @ts-ignore
                onClick={() => setSelected(item)}
              />
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default FilterRange
