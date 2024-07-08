import { Grid } from '@mui/material'
import { find, map } from 'lodash'
import TextButton from '@/src/components/atoms/TextButton'
import { KeysSubcategories } from '@/src/enums/categories'
import { AdditionalElement } from '@/src/types/structs/search'
import { CreateAdCategoryInfo } from '@/src/types/redux/adCreate'
import { useTranslation } from 'next-i18next'

type Props = {
  handleChange: (item: KeysSubcategories) => void
  collection: KeysSubcategories[]
  additional: AdditionalElement[]
  categoryInfo: CreateAdCategoryInfo
}

const SimpleCheckboxListField = ({ handleChange, collection, additional, categoryInfo }: Props) => {
  const { t } = useTranslation(['categories'])
  return (
    <Grid container spacing={{ xs: 2, md: 4 }}>
      {map(collection, (item, key) => (
        <Grid item key={key}>
          <TextButton
            isSelected={categoryInfo[item] as boolean}
            text={t(`categories:${find(additional, obj => obj.key === item)?.array[0]}`)}
            onClick={() => handleChange(item)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default SimpleCheckboxListField
