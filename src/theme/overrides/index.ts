import Button from './button'
import Input from './input'
import Checkbox from './checkbox'
import Autocomplete from './autocomplete'
import { Theme } from '@mui/material/styles'

const Overrides = (theme: Theme) => {
  const button = Button(theme)
  const input = Input(theme)
  const checkbox = Checkbox(theme)
  const autocomplete = Autocomplete(theme)
  return Object.assign(button, input, checkbox, autocomplete)
}

export default Overrides
