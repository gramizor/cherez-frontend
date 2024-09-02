import { palette } from '@/src/theme/palette'
import { alpha, styled, Switch } from '@mui/material'

const RadioSliderButton = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: palette.primary.light,
    '&:hover': {
      backgroundColor: alpha(palette.primary.light, theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: palette.primary.light,
  },
}))

export default RadioSliderButton
