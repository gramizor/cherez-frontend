import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction, useState } from 'react'
import { map } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import TextButton from '@/src/components/atoms/TextButton'
import { CategoriesType } from '@/src/enums/categories'
import { getCategoryAdCreateForm } from '@/src/redux/selectors/adCreate'
import { setField } from '@/src/redux/slices/adCreate'

type Props = {
  setStep: Dispatch<SetStateAction<number>>
}

const categories = [
  CategoriesType.Services,
  CategoriesType.Vehicle,
  CategoriesType.RealEstate,
  CategoriesType.Devices,
  CategoriesType.Household,
  CategoriesType.PersonalItems,
  CategoriesType.Jobs,
  CategoriesType.HealthItems,
  CategoriesType.SpareParts,
  CategoriesType.Animals,
  CategoriesType.Other,
]

const CreateAdBoxStepOne = ({ setStep }: Props) => {
  const { t } = useTranslation(['common', 'categories'])
  const dispatch = useDispatch()
  const { breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))

  const category = useSelector(getCategoryAdCreateForm)
  const [selected, setSelected] = useState(category)

  const handleClick = () => {
    if (selected) {
      setStep(2)
      dispatch(
        setField({
          category: selected,
        })
      )
    }
  }

  return (
    <Box mt={isLarge ? 11 : 4}>
      <Typography variant="subtitle1">{t('select_category')}</Typography>
      <Grid container spacing={3.5} mt={2.5}>
        {map(categories, (category, index) => (
          <Grid item key={index}>
            <TextButton
              isSelected={selected === category}
              text={t(`categories:${category}`)}
              onClick={() => setSelected(category)}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container mt={7} justifyContent={'flex-end'}>
        <Button variant="contained" onClick={handleClick} sx={{ width: isLarge ? 142 : '100%' }}>
          {t('continue')}
        </Button>
      </Grid>
    </Box>
  )
}

export default CreateAdBoxStepOne
