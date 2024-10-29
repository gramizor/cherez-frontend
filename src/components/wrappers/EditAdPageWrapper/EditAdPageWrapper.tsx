import { Box, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import MainTopActions from '../../organisms/MainTopActions'
import LeftMenu from '../../molecules/LeftMenu'
import EditAdContainer from '../../organisms/EditAdContainer/EditAdContainer'

const EditAdPageWrapper = () => {
  const { breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))

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
        <Box ml={isLarge ? 28 : 0} width={'100%'} position={'relative'}>
          <EditAdContainer />
        </Box>
      </Box>
    </Box>
  )
}

export default EditAdPageWrapper
