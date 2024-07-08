import Button from '@mui/material/Button'
import { MouseEvent, useState } from 'react'
import SortSearchDialog from '@/src/components/dialogs/SortSearchDialog'
import { useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { getSortMainSearchParam } from '@/src/redux/selectors/mainSearch'

const SortSearchButton = () => {
  const [anchorElSort, setAnchorElSort] = useState<null | HTMLElement>(null)
  const { palette, breakpoints } = useTheme()
  const { t } = useTranslation('common')
  const sortMainSearchParam = useSelector(getSortMainSearchParam)
  const isMobile = useMediaQuery(breakpoints.down('md'))

  return (
    <>
      <Button
        variant="text"
        sx={{
          color: palette.black,
          fontSize: isMobile ? 14 : 16,
          fontWeight: isMobile ? 400 : 600,
          borderRadius: '10px 10px 0px 0px',
          background: anchorElSort ? palette.customColors.lightBackground : '',
          paddingTop: '15px',
          paddingRight: '14px',
          paddingLeft: '13px',
          // paddingBottom: isMobile ? '2.5px' : anchorElSort ? '26px' : '0px',
          paddingBottom: isMobile ? '2.5px' : '0px',
          borderBottom: anchorElSort ? 'none' : '1px solid black',
        }}
        onClick={(event: MouseEvent<HTMLElement>) => setAnchorElSort(event.currentTarget)}
      >
        {t(sortMainSearchParam ? `sort_${sortMainSearchParam}` : 'sort')}
      </Button>
      <SortSearchDialog handleClose={() => setAnchorElSort(null)} anchorEl={anchorElSort} />
    </>
  )
}

export default SortSearchButton
