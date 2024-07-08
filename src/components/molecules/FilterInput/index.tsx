import { Box, TextField, Typography } from '@mui/material'

type Props = {
  title: string
  value: string | undefined
  setValue: (value: string) => void
  big: boolean
}

const FilterInput = ({ title, value, setValue, big }: Props) => {
  return (
    <Box>
      <Typography sx={{ mb: 3 }} variant="subtitle1">
        {title}
      </Typography>
      <TextField
        sx={{ maxWidth: { xs: '100%', md: big ? 282 : 170 } }}
        // @ts-ignore
        onChange={event => setValue(event.target.value)}
        fullWidth
        value={value}
        color="secondary"
      />
    </Box>
  )
}

export default FilterInput
