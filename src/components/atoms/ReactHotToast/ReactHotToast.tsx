import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const ReactHotToast = styled(Box)(({ theme }) => {
  return {
    '& > div': {
      left: `${theme.spacing(6)} !important`,
      right: `${theme.spacing(6)} !important`,
      bottom: `${theme.spacing(6)} !important`,
      top: '139px !important',
    },
    '& .react-hot-toast': {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontWeight: 400,
      fontSize: '1rem',
      borderRadius: '10px',
      letterSpacing: '0.14px',
      border: `4px solid ${theme.palette.primary.main}`,
      color: theme.palette.secondary.main,
      boxShadow: '0px 8px 16px -4px rgb(19 17 32 / 65%)',
      '&>:first-of-type:not([role])>:first-of-type': {
        width: 14,
        height: 14,
      },
    },
  }
})
