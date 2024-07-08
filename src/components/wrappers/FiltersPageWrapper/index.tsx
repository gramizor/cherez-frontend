import { Box, Breadcrumbs, useMediaQuery, useTheme } from '@mui/material'
import MainTopActions from '@/src/components/organisms/MainTopActions'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import LeftMenu from '@/src/components/molecules/LeftMenu'
import FiltersBox from '@/src/components/organisms/FiltersBox'

const FiltersPageWrapper = () => {
  const { t } = useTranslation('common')
  const { palette, breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))

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
            <Link href="/filters">
              <Typography color={palette.customColors.bodyInfo} variant="h5">
                {`${t('filters')} >`}
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
        <Box ml={isLarge ? 28 : 0}>
          <FiltersBox />
        </Box>
      </Box>
    </Box>
  )
}

export default FiltersPageWrapper
