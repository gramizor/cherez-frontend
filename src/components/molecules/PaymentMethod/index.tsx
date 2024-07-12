import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'next-i18next'
import TextButton from '../../atoms/TextButton'

type Props = {}

const PaymentMethod = (props: Props) => {
  const { t } = useTranslation('common')

  return (
    <Box mt="30px" mb="20px">
      <Typography mb={2} fontSize="18px" lineHeight="146%" fontWeight={500}>
        {t('payment_method')}
      </Typography>
      <Typography mb={2} fontSize="16px" lineHeight="146%" fontWeight={300}>
        {t('payment_method_description')}
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <TextButton isSelected={true} text={t('pay_btn')} sx={{ fontWeight: 600 }} onClick={() => {}} />
      </Box>
    </Box>
  )
}

export default PaymentMethod
