import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import styled from '@emotion/styled'

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.5;
  z-index: 1000;
`

interface LoadingCircularProps {
  isLoading: boolean
}

const LoadingCircular: React.FC<LoadingCircularProps> = ({ isLoading }) => {
  if (!isLoading) return null
  return (
    <Overlay>
      <CircularProgress />
    </Overlay>
  )
}

export default LoadingCircular
