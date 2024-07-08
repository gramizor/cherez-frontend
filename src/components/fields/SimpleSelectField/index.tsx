import { InputBaseComponentProps, MenuItem, TextField, Typography } from '@mui/material'
import { ChangeEvent } from 'react'

type Props = {
  label: string
  handleChange: (e: ChangeEvent<any>) => void
  name: string
  touched: boolean | undefined
  error: string | undefined
  inputProps?: InputBaseComponentProps
  collection: string[]
  value: string
}

const SimpleSelectField = ({ label, handleChange, name, touched, error, inputProps, collection, value }: Props) => {
  return (
    <>
      <Typography sx={{ mb: 1.5 }} variant="subtitle1">
        {label}
      </Typography>
      <TextField
        value={value}
        select
        name={name}
        fullWidth
        onChange={handleChange}
        error={touched && Boolean(error)}
        helperText={touched && error}
        inputProps={inputProps}
        sx={{
          '& .MuiSelect-select': {
            height: '36px!important',
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        {collection &&
          collection.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
      </TextField>
    </>
  )
}

export default SimpleSelectField
