import { Theme } from '@mui/material/styles'

const Checkbox = (theme: Theme) => {
  return {
    MuiCheckbox: {
      styleOverrides: {
        colorSecondary: {
          color: `${theme.palette.customColors.checkbox} !important`,
        },
        indeterminate: {
          color: `${theme.palette.secondary.main} !important`,
        },
      },
    },
  }
}

export default Checkbox
