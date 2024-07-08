import { Theme } from '@mui/material/styles'

const Autocomplete = (theme: Theme) => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          height: 42,
          borderRadius: '10px',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: '27px',
          background: theme.palette.info.main,
        },
        input: {
          padding: `0px !important`,
          color: theme.palette.black,
        },
      },
    },
  }
}

export default Autocomplete
