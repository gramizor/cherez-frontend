import Button from '@mui/material/Button'
import { useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const FiltersSearchButton = () => {
  const { palette, breakpoints } = useTheme()
  const { t } = useTranslation('common')
  const isMobile = useMediaQuery(breakpoints.down('md'))

  return (
    <Link passHref href={'/filters'}>
      <Button
        variant="text"
        sx={{
          color: palette.black,
          fontSize: isMobile ? 14 : 16,
          fontWeight: isMobile ? 400 : 600,
          borderRadius: '10px 10px 0px 0px',
          padding: '15px 14px 0px 13px',
          borderBottom: '1px solid black',
        }}
      >
        {t('filters')}
      </Button>
    </Link>
  )
}

export default FiltersSearchButton
