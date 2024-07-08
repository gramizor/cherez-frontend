import { Box, Container } from '@mui/material'
import { ReactNode } from 'react'
import theme from 'src/theme'
import DefaultHeader from 'src/components/molecules/DefaultHeader'

type Props = {
  children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.common.white }}>
      <DefaultHeader />
      <Container
        disableGutters
        sx={{
          px: { xs: 4, md: 8, lg: 0 },
          mx: { xs: 0, lg: 'auto' },
          maxWidth: { xs: '100%', lg: 1080, xl: 1440 },
        }}
        maxWidth={false}
      >
        {children}
      </Container>
    </Box>
  )
}

export default DefaultLayout
