import Box from '@mui/material/Box'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { getCategoryMainSearchParam } from '@/src/redux/selectors/mainSearch'
import { useTranslation } from 'next-i18next'
import { CategoriesType } from '@/src/enums/categories'

type Props = {
  category: CategoriesType
  handleChange: (category: CategoriesType) => void
}

export const CategorySliderButton = ({ category, handleChange }: Props) => {
  const { t } = useTranslation('countries')
  const theme = useTheme()
  const { palette } = theme
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const categoryMainSearchParam = useSelector(getCategoryMainSearchParam)
  return (
    <Box
      onClick={() => handleChange(category)}
      sx={{
        maxWidth: '120px',
        background: category === categoryMainSearchParam ? 'rgba(217, 217, 217, 0.5)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '10px',
        padding: { xs: 2, md: '10px 7px' },
        textTransform: 'none',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 600,
        color: `${palette.customColors.tabText} !important`,
        '& > img': {
          marginBottom: { xs: '8px !important', md: '19.5px !important' },
        },
      }}
    >
      <Image
        src={`/categories/${category}.png`}
        alt={category}
        width={isMobile ? 85 : 100}
        height={isMobile ? 85 : 100}
      />
      <Typography
        variant="body2"
        color={palette.customColors.tabText}
        fontWeight={600}
        textAlign="center"
        sx={{ height: '30px' }}
      >
        {t(`categories:${category}`)}
      </Typography>
    </Box>
  )
}
