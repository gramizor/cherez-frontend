import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { map } from 'lodash'
import TextButton from '@/src/components/atoms/TextButton'
import { AdditionalParamSearch, CategorySearch } from '@/src/types/structs/search'
import { CategoryParams } from '@/src/types/redux/mainSearch'

type Props = {
  collection: CategorySearch[] | AdditionalParamSearch[]
  selected: CategoryParams | undefined
  setSelected: (item: CategorySearch | AdditionalParamSearch) => void
  title?: string
}

const FilterParams = ({ collection, selected, setSelected, title }: Props) => {
  const { t } = useTranslation(['common', 'forms'])

  return (
    <Box>
      {title && (
        <Typography sx={{ mb: 3 }} variant="subtitle1">
          {title}
        </Typography>
      )}
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {map(collection, (item, index) => (
          <Grid item key={index} xs={12} sm={'auto'}>
            <TextButton
              isSelected={selected?.value === item}
              text={t(`categories:${item}`)}
              // @ts-ignore
              onClick={() => setSelected(item)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FilterParams
