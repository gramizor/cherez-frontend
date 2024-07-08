import { Theme } from '@mui/material/styles'

const Input = (theme: Theme) => {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '13px',
          backgroundColor: theme.palette.customColors.lightBackground,
        },
        input: {
          height: '36px',
          paddingTop: 3,
          paddingBottom: 3,
          paddingLeft: '27px',
          color: theme.palette.secondary.main,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: '-3px',
          color: theme.palette.secondary.main,
          fontSize: 15,
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        },
        shrink: {
          top: '0px',
        },
      },
    },
  }
}

export default Input
