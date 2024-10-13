import { Box, Breadcrumbs, Link, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import MainTopActions from '../../organisms/MainTopActions'
import { palette } from '@/src/theme/palette'
import LeftMenu from '../../molecules/LeftMenu'
import CreateAdBox from '../../organisms/CreateAdBox'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import EditAdContainer from '../../organisms/EditAdContainer/EditAdContainer'

const EditAdPageWrapper = () => {
  const { t } = useTranslation('common')
  const { breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))
  //   const router = useRouter()

  return (
    <Box mt={{ xs: 4, md: '29px' }}>
      <MainTopActions isReturning />
      <Box mt="29px" display="flex">
        {isLarge && (
          <Box maxWidth="247px">
            <LeftMenu />
            <Box width={247}></Box>
          </Box>
        )}
        <Box ml={isLarge ? 28 : 0} width={'100%'}>
          <EditAdContainer />
        </Box>
      </Box>
    </Box>
  )
}

export default EditAdPageWrapper
