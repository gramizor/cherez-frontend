import { Box, Breadcrumbs, useMediaQuery, useTheme } from '@mui/material'
import MainTopActions from '@/src/components/organisms/MainTopActions'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import LeftMenu from '@/src/components/molecules/LeftMenu'
import CreateAdBox from '@/src/components/organisms/CreateAdBox'
import { useEffect } from 'react'
import { setJWTBearerToken } from '@/src/lib/storage'
import { useRouter } from 'next/router'

const CreateAdPageWrapper = () => {
  const loadToken = async () => {
    return await setJWTBearerToken()
  }
  const { t } = useTranslation('common')
  const { palette, breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))
  const router = useRouter()

  useEffect(() => {
    loadToken().then(token => {
      if (!token) router.back()
    })
  }, [])

  return (
    <Box mt={{ xs: 4, md: '29px' }}>
      <MainTopActions isReturning />
      {isLarge && (
        <Box mt={6.5}>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator=""
            sx={{
              '& .MuiBreadcrumbs-separator': {
                mx: 4,
              },
            }}
          >
            <Link href="/">
              <Typography color={palette.customColors.bodyInfo} variant="h5">
                {`${t('root')} >`}
              </Typography>
            </Link>
            <Link href="/ads/create">
              <Typography color={palette.customColors.bodyInfo} variant="h5">
                {`${t('create_ad')} >`}
              </Typography>
            </Link>
            <Typography color={palette.customColors.bodyInfo} variant="h5">{`${t('select_category')} >`}</Typography>
          </Breadcrumbs>
        </Box>
      )}

      <Box mt="29px" display="flex">
        {isLarge && (
          <Box maxWidth="247px">
            <LeftMenu />
            <Box width={247}></Box>
          </Box>
        )}
        <Box ml={isLarge ? 28 : 0} width={'100%'}>
          <CreateAdBox />
        </Box>
      </Box>
    </Box>
  )
}

export default CreateAdPageWrapper
