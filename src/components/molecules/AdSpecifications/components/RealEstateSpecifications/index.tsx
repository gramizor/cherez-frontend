import { Grid, useTheme } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'next-i18next'
import { map } from 'lodash'
import Typography from '@mui/material/Typography'
import { SpecificationItemType } from '@/src/enums/ads'
import { CategoryInfoRealEstate } from '@/src/types/models'
import { CategoryInfoRealEstateEnum } from '@/src/enums/categories'
import SpecificationsItem from '@/src/components/atoms/SpecificationsItem'

type Props = {
  categoryInfo: CategoryInfoRealEstate
}

const RealEstateSpecifications = ({ categoryInfo }: Props) => {
  const { palette } = useTheme()

  const { t } = useTranslation('ad')

  const array = [
    { field: CategoryInfoRealEstateEnum.RealEstateType, type: SpecificationItemType.Title },
    { field: CategoryInfoRealEstateEnum.Area, type: SpecificationItemType.EndText },
    { field: CategoryInfoRealEstateEnum.Bedrooms, type: SpecificationItemType.Text },
    { field: CategoryInfoRealEstateEnum.Pool, type: SpecificationItemType.Boolean },
    { field: CategoryInfoRealEstateEnum.Baths, type: SpecificationItemType.Text },
    { field: CategoryInfoRealEstateEnum.Furniture, type: SpecificationItemType.Boolean },
  ]
  return (
    <Grid container justifyContent="space-between" mt={3}>
      {map(array, (item, index) => {
        const { field, type } = item
        const value = categoryInfo[field]
        return (
          <Grid xs={12} md={index % 2 === 0 ? 6 : 'auto'} key={index} mt={2.5} display="flex">
            <Typography variant="h4" fontWeight="400" color={palette.customColors.bodyInfo}>
              {t(`ad:${item.field}`)}
            </Typography>
            {field && <SpecificationsItem type={type} field={field} value={value} />}
          </Grid>
        )
      })}
    </Grid>
  )
}

export default RealEstateSpecifications
