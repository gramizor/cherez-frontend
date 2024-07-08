import { Grid, useTheme } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'next-i18next'
import { map } from 'lodash'
import Typography from '@mui/material/Typography'
import { SpecificationItemType } from '@/src/enums/ads'
import { CategoryInfoVehicle } from '@/src/types/models'
import { CategoryInfoVehicleEnum } from '@/src/enums/categories'
import SpecificationsItem from '@/src/components/atoms/SpecificationsItem'

type Props = {
  categoryInfo: CategoryInfoVehicle
}

const VehicleSpecifications = ({ categoryInfo }: Props) => {
  const { palette } = useTheme()

  const { t } = useTranslation('ad')

  const array = [
    { field: CategoryInfoVehicleEnum.Brand, type: SpecificationItemType.Text },
    { field: CategoryInfoVehicleEnum.Model, type: SpecificationItemType.Text },
    { field: CategoryInfoVehicleEnum.ReleaseYear, type: SpecificationItemType.Text },
    {
      field: CategoryInfoVehicleEnum.Mileage,
      type: SpecificationItemType.Additional,
      additional: CategoryInfoVehicleEnum.MileageMeasure,
    },
    { field: CategoryInfoVehicleEnum.Color, type: SpecificationItemType.Title },
    { field: CategoryInfoVehicleEnum.TransmissionType, type: SpecificationItemType.Title },
    { field: CategoryInfoVehicleEnum.Condition, type: SpecificationItemType.Title },
    { field: CategoryInfoVehicleEnum.FuelType, type: SpecificationItemType.Title },
  ]
  return (
    <Grid container justifyContent="space-between" mt={3}>
      {map(array, (item, index) => {
        const { field, additional, type } = item
        const value = categoryInfo[field]
        const additionalValue = additional && categoryInfo[additional]
        return (
          <Grid xs={12} md={index % 2 === 0 ? 6 : 'auto'} key={index} mt={2.5} display="flex">
            <Typography variant="h4" fontWeight="400" color={palette.customColors.bodyInfo}>
              {t(`ad:${item.field}`)}
            </Typography>
            {field && <SpecificationsItem type={type} field={field} value={value} additionalValue={additionalValue} />}
          </Grid>
        )
      })}
    </Grid>
  )
}

export default VehicleSpecifications
