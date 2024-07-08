import { Box, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction } from 'react'
import { map } from 'lodash'
import TextButton from '@/src/components/atoms/TextButton'
import { sortOptions } from '@/src/components/dialogs/SortSearchDialog/constants'
import { SortAdsType } from '@/src/enums/redux'

type Props = {
  sort: SortAdsType | undefined
  setSort: Dispatch<SetStateAction<SortAdsType>>
}

const FilterSort = ({ sort, setSort }: Props) => {
  const { t } = useTranslation('common')

  return (
    <Box>
      <Typography sx={{ mb: 2 }} variant="subtitle1">
        {t('sort')}
      </Typography>
      <Grid container spacing={4}>
        {map(sortOptions, (item, index) => (
          <Grid item key={index} xs={12} md={'auto'}>
            <TextButton isSelected={sort === item} text={t(`sort_${item}`)} onClick={() => setSort(item)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FilterSort
