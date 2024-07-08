import { Box, InputBaseComponentProps, TextField, Typography } from '@mui/material'
import { ChangeEvent } from 'react'

export enum SimpleTextFieldMaxWidth {
  Small = 'small',
  Medium = 'medium',
  Big = 'big',
}

type Props = {
  label: string
  handleChange: (e: ChangeEvent<any>) => void
  name?: string
  touched?: boolean | undefined
  error?: string | undefined
  inputProps?: InputBaseComponentProps
  multiline?: boolean
  maxRows?: number
  minRows?: number
  value: string | number
  additional?: string
  maxWidth?: SimpleTextFieldMaxWidth
}

const SimpleTextField = ({
  label,
  handleChange,
  name,
  touched,
  error,
  inputProps,
  multiline = false,
  maxRows = 1,
  minRows = 1,
  value = '',
  additional,
  maxWidth = SimpleTextFieldMaxWidth.Big,
}: Props) => {
  const getMaxWidth = () => {
    switch (maxWidth) {
      case SimpleTextFieldMaxWidth.Small:
        return 155
      case SimpleTextFieldMaxWidth.Medium:
        return 282
      case SimpleTextFieldMaxWidth.Big:
        return '100%'
      default:
        return '100%'
    }
  }

  return (
    <>
      <Typography sx={{ mb: 1.5 }} variant="subtitle1">
        {label}
      </Typography>
      <Box display={additional && 'flex'} alignItems="center" width={'100%'}>
        <TextField
          sx={{ maxWidth: getMaxWidth }}
          onChange={handleChange}
          fullWidth
          name={name}
          error={touched && Boolean(error)}
          helperText={touched && error}
          color="secondary"
          value={value}
          inputProps={inputProps}
          multiline={multiline}
          maxRows={maxRows}
          minRows={minRows}
        />
        {additional && (
          <Typography sx={{ ml: 6 }} variant="subtitle1">
            {additional}
          </Typography>
        )}
      </Box>
    </>
  )
}

export default SimpleTextField
