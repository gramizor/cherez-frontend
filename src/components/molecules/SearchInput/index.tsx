import { InputAdornment, TextField, useTheme } from '@mui/material'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { searchAdsRequested, setSearchParams } from '@/src/redux/slices/mainSearch'
import { useRouter } from 'next/router'

type Props = {
  isReturning?: boolean
}
const SearchInput = ({ isReturning }: Props) => {
  const { t } = useTranslation('common')
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const router = useRouter()

  const [value, setValue] = useState<string>('')
  return (
    <TextField
      fullWidth
      label=""
      value={value}
      onChange={event => setValue(event.target.value)}
      placeholder={t('search_placeholder')}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="text"
              color="primary"
              onClick={() => {
                if (isReturning) {
                  router.back()
                } else {
                  dispatch(setSearchParams({ searchText: value }))
                  dispatch(searchAdsRequested())
                }
              }}
              sx={{
                fontSize: 15,
                fontWeight: 600,
                width: { xs: 60, md: 107 },
                backgroundColor: palette.primary.light,
                color: palette.info.main,
                '&:hover': {
                  backgroundColor: palette.primary.light,
                },
              }}
            >
              {t('search')}
            </Button>
          </InputAdornment>
        ),
        sx: {
          backgroundColor: palette.info.main,
          borderRadius: '10px',
          paddingLeft: { xs: 1.25, md: 6.5 },
          paddingRight: 0,
          color: palette.customColors.searchText,
          border: `3px ${palette.primary.light} solid`,
          '& > input': {
            height: 30,
            borderRadius: '10px',
            paddingLeft: { xs: 0, md: 1 },
          },
          '& > fieldset': {
            border: 'none',
          },
        },
      }}
    />
  )
}

export default SearchInput
