import { Box, Grid, Typography } from '@mui/material'
import { map } from 'lodash'
import TextButton from '@/src/components/atoms/TextButton'
import { KeysSubcategories } from '@/src/enums/categories'
import { AdditionalParamSearch, CategorySearch } from '@/src/types/structs/search'
import { CreateAdCategoryInfo } from '@/src/types/redux/adCreate'
import { useTranslation } from 'next-i18next'

type Props = {
  label?: string
  handleChange: (item: CategorySearch | AdditionalParamSearch) => void
  collection: CategorySearch[] | AdditionalParamSearch[]
  selected: CreateAdCategoryInfo[KeysSubcategories]
  prefix?: string
}

const SimpleParamsField = ({ label, handleChange, collection, selected, prefix = 'categories' }: Props) => {
  const { t } = useTranslation(['categories', 'forms'])
  return (
    <Box>
      {label && (
        <Typography sx={{ mb: 3 }} variant="subtitle1">
          {label}
        </Typography>
      )}
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {map(collection, (item, index) => (
          <Grid item key={index} xs={'auto'}>
            <TextButton
              isSelected={selected === item}
              text={t(`${prefix}:${item}`)}
              // @ts-ignore
              onClick={() => handleChange(item)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SimpleParamsField
