import { Button, Stack } from '@mui/material'
import React from 'react'
import TextButton from '../../atoms/TextButton'
import { palette } from '@/src/theme/palette'

type Props = {
  cancelText: string
  confirmText: string
  onCancel: () => void
  onConfirm: () => void
}

const UIModalButtonsGroup = (props: Props) => {
  return (
    <Stack display="flex" flexDirection="row" justifyContent="space-around">
      <Button
        variant="contained"
        sx={{
          textTransform: 'uppercase',
          backgroundColor: palette.primary.light,
        }}
        onClick={props.onCancel}
      >
        {props.cancelText}
      </Button>
      <Button
        variant="contained"
        sx={{
          textTransform: 'uppercase',
          opacity: 0.72,
          backgroundColor: palette.customColors.redLight,
          '&:hover': {
            backgroundColor: palette.customColors.redLight,
            opacity: 1,
          },
        }}
        onClick={props.onConfirm}
      >
        {props.confirmText}
      </Button>
    </Stack>
  )
}

export default UIModalButtonsGroup
