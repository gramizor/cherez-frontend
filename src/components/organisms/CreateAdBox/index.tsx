import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import CreateAdBoxStepOne from '@/src/components/organisms/CreateAdBox/components/CreateAdBoxStepOne'

const CreateAdBox = () => {
  const { t } = useTranslation('common')

  return (
    <Box>
      <Typography variant="h3" fontWeight={500} textAlign={{ xs: 'center', md: 'left' }}>
        {t('new_ad')}
      </Typography>
      <CreateAdBoxStepOne />
    </Box>
  )
}

export default CreateAdBox
