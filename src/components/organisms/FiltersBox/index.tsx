import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import FiltersBoxStepOne from '@/src/components/organisms/FiltersBox/components/FiltersBoxStepOne'
import FiltersBoxStepTwo from '@/src/components/organisms/FiltersBox/components/FiltersBoxStepTwo'
import { useSelector } from 'react-redux'
import { getCategoryMainSearchParam } from '@/src/redux/selectors/mainSearch'

const FiltersBox = () => {
  const { t } = useTranslation('common')
  const categoryMainSearchParam = useSelector(getCategoryMainSearchParam)

  const [step, setStep] = useState(categoryMainSearchParam ? 2 : 1)

  return (
    <Box>
      <Typography variant="h3" fontWeight={500} textAlign={{ xs: 'center', md: 'left' }}>
        {t('filters')}
      </Typography>
      {step === 1 && <FiltersBoxStepOne setStep={setStep} />}
      {step === 2 && <FiltersBoxStepTwo setStep={setStep} />}
    </Box>
  )
}

export default FiltersBox
