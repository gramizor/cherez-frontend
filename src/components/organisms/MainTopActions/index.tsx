import { useTranslation } from 'next-i18next'
import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import SearchInput from '@/src/components/molecules/SearchInput'
import CategoriesSearchDialog from '@/src/components/dialogs/CategoriesSearchDialog'
import { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'

type Props = {
  isReturning?: boolean
}

const MainTopActions = ({ isReturning }: Props) => {
  const { t } = useTranslation('common')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Button
          variant="contained"
          onClick={(event: MouseEvent<HTMLElement>) => (isReturning ? router.back() : setAnchorEl(event.currentTarget))}
          fullWidth
        >
          {t('categories')}
        </Button>
      </Grid>
      <Grid item xs={12} md={7} mt={0.15}>
        <SearchInput isReturning={isReturning} />
      </Grid>
      <Grid item xs={12} sm={6} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Button variant="contained" onClick={() => router.push('/ads/create')} fullWidth>
          {t('place_ad')}
        </Button>
      </Grid>
      <CategoriesSearchDialog handleClose={() => setAnchorEl(null)} anchorEl={anchorEl} />
    </Grid>
  )
}

export default MainTopActions
