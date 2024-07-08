import { createTheme } from '@mui/material/styles'
import { palette } from 'src/theme/palette'
import typography from 'src/theme/typography'
import overrides from 'src/theme/overrides'

let theme = createTheme({
  palette,
  typography,
  spacing: 4,
})

theme = createTheme(theme, { components: { ...overrides(theme) } })

export default theme
