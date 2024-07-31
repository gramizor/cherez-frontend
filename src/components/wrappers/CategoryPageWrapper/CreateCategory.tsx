import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import MainTopActions from '../../organisms/MainTopActions'
import LeftMenu from '../../molecules/LeftMenu'
import { useTranslation } from 'next-i18next'
import CreateCategoryForm from '../../forms/CreateCategoryForm'

type Props = {}

const CreateCategory = (props: Props) => {
  const { palette, breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))
  const { t } = useTranslation('promotion')

  return (
    <Box mt={{ xs: 4, md: '29px' }}>
      <MainTopActions isReturning />
      <Box mt="29px" display="flex">
        {isLarge && (
          <Box maxWidth="247px">
            <LeftMenu active="promotion" />
            <Box width={247}></Box>
          </Box>
        )}
        <Box flex="1" flexDirection="column" ml={isLarge ? 4 : 0} mr={isLarge ? 4 : 0}>
          <Typography variant="h3">{t('pro_page')}</Typography>
          <CreateCategoryForm />
        </Box>
      </Box>
    </Box>
  )
}

export default CreateCategory
