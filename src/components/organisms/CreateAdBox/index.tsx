import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getCategoryMainSearchParam } from '@/src/redux/selectors/mainSearch'
import CreateAdBoxStepOne from '@/src/components/organisms/CreateAdBox/components/CreateAdBoxStepOne'
import CreateAdBoxStepTwo from '@/src/components/organisms/CreateAdBox/components/CreateAdBoxStepTwo'

const CreateAdBox = () => {
  const { t } = useTranslation('common')
  const categoryMainSearchParam = useSelector(getCategoryMainSearchParam)

  const [step, setStep] = useState(categoryMainSearchParam ? 2 : 1)

  return (
    <Box>
      <Typography variant="h3" fontWeight={500} textAlign={{ xs: 'center', md: 'left' }}>
        {t('new_ad')}
      </Typography>
      {step === 1 && <CreateAdBoxStepOne setStep={setStep} />}
      {step === 2 && <CreateAdBoxStepTwo setStep={setStep} />}
    </Box>
  )
}

export default CreateAdBox
