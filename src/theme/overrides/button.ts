import { Theme } from '@mui/material/styles'

const Button = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          boxShadow: 'none',
          backgroundColor: theme.palette.primary.light,
          borderRadius: '10px',
          minWidth: 138,
          height: 42,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: 15,
        },
        outlinedSecondary: {
          boxShadow: 'none',
          backgroundColor: theme.palette.customColors.lightBackground,
          borderRadius: '10px',
          height: 42,
          textTransform: 'none',
          fontWeight: 400,
          fontSize: 16,
          color: theme.palette.customColors.bodyInfo,
        },
        text: {
          textTransform: 'none',
        },
        textInfo: {
          fontWeight: 600,
        },
      },
    },
  }
}

export default Button
