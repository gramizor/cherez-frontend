import { InputBaseComponentProps, MenuItem, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import { ChangeEvent } from 'react'

const flagMap: Record<string, string> = {
  USD: '',
  THB: 'flag_th.png',
  VND: 'flag_vn.png',
  IDR: 'flag_id.png',
  MYR: 'flag_my.png',
  INR: 'flag_in.png',
  KHR: 'flag_kh.png',
  LAK: 'flag_la.png',
  RUB: 'flag_ru.png',
  AED: 'flag_ae.png',
  TRY: 'flag_tr.png',
  GEL: 'flag_ge.png',
  AMD: 'flag_am.png',
  CNY: 'flag_cn.png',
  ARS: 'flag_ar.png',
  AZN: 'flag_az.png',
  BRL: 'flag_br.png',
  BYN: 'flag_by.png',
  KZT: 'flag_kz.png',
  KGS: 'flag_kg.png',
  TMT: 'flag_tm.png',
  TJS: 'flag_tj.png',
  UAH: '',
  UZS: 'flag_uz.png',
}

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
            position: 'relative',
          },
        }}
        SelectProps={{
          MenuProps: {
            disableScrollLock: true,
          },
        }}
      >
        {collection &&
          collection.map(option => (
            <MenuItem key={option} value={option}>
              {flagMap[option] && (
                <Image
                  src={require(`@/public/countries/${flagMap[option]}`)}
                  alt={option}
                  width={20}
                  height={20}
                  style={{ marginRight: 8 }}
                />
              )}
              {option}
            </MenuItem>
          ))}
      </TextField>
    </>
  )
}

export default SimpleSelectField
