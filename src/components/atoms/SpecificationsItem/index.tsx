import 'react-multi-carousel/lib/styles.css'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import { SpecificationItemType } from '@/src/enums/ads'
import {
  CategoryInfoAnimalsEnum,
  CategoryInfoDevicesEnum,
  CategoryInfoHealthItemsEnum,
  CategoryInfoHouseholdEnum,
  CategoryInfoJobsEnum,
  CategoryInfoPersonalItemsEnum,
  CategoryInfoRealEstateEnum,
  CategoryInfoServicesEnum,
  CategoryInfoSparePartsEnum,
  CategoryInfoVehicleEnum,
} from '@/src/enums/categories'

type Props = {
  type: SpecificationItemType
  field:
    | CategoryInfoVehicleEnum
    | CategoryInfoServicesEnum
    | CategoryInfoRealEstateEnum
    | CategoryInfoDevicesEnum
    | CategoryInfoHouseholdEnum
    | CategoryInfoAnimalsEnum
    | CategoryInfoPersonalItemsEnum
    | CategoryInfoJobsEnum
    | CategoryInfoHealthItemsEnum
    | CategoryInfoSparePartsEnum
  additionalValue?: string | number
  value: string | number | boolean
}

const SpecificationsItem = ({ type, field, value, additionalValue }: Props) => {
  const { t } = useTranslation('ad')

  return (
    <Typography variant="h4" fontWeight="400" ml={1}>
      {type === SpecificationItemType.Text && t(`${value}`)}
      {type === SpecificationItemType.Title && t(`categories:${value}`)}
      {type === SpecificationItemType.EndText && t(`ad:${field}_additional`, { count: Number(value) })}
      {type === SpecificationItemType.Additional && `${t(`${value}`)} ${t(`categories:${additionalValue}`)}`}
      {type === SpecificationItemType.Boolean && t(`ad:${value.toString()}`)}
    </Typography>
  )
}

export default SpecificationsItem
