import { Box, Menu, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { searchAdsRequested, setSearchParams } from '@/src/redux/slices/mainSearch'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import { sortOptions } from '@/src/components/dialogs/SortSearchDialog/constants'
import { SortAdsType } from '@/src/enums/redux'

type Props = {
  handleClose: () => void
  anchorEl: null | HTMLElement
}

const SortSearchDialog = ({ anchorEl, handleClose }: Props) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const open = Boolean(anchorEl)

  return (
    <Menu
      anchorOrigin={{ horizontal: -45, vertical: 'bottom' }}
      anchorEl={anchorEl}
      open={open}
      onClose={() => {
        handleClose()
        dispatch(searchAdsRequested())
      }}
      sx={{
        '.MuiPaper-root': {
          backgroundColor: palette.customColors.lightBackground,
          borderRadius: '10px',
          boxShadow: 'none',
        },
        '.MuiList-root': {
          padding: 0,
        },
      }}
    >
      <Box
        sx={{
          width: 233,
          paddingTop: 9,
          paddingLeft: 9,
          paddingBottom: 5.5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {sortOptions.map((option, key) => (
          <Button
            onClick={() => {
              handleClose()
              dispatch(
                setSearchParams({
                  sort: option === SortAdsType.Default ? '' : option,
                })
              )
              dispatch(searchAdsRequested())
            }}
            variant="text"
            key={key}
            sx={{
              padding: 0,
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: 5.5,
              color: palette.customColors.titleText,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {t(`sort_${option}`)}
          </Button>
        ))}
      </Box>
    </Menu>
  )
}

export default SortSearchDialog
