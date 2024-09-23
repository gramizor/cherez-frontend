import React from 'react'
import { Box, Modal, Stack, Button, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { palette } from '@/src/theme/palette'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'

type UIModalProps = {
  open: boolean
  onClose: () => void
  triggerButton: React.ReactNode
  children: React.ReactNode
  modalStyle?: React.CSSProperties
  header: string
}

const UIModal: React.FC<UIModalProps> = ({ open, onClose, triggerButton, children, modalStyle, header }) => {
  return (
    <>
      {triggerButton}
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            padding: '40px',
            minWidth: 550,
            borderRadius: '10px',
            gap: '30px',
            display: 'flex',
            flexDirection: 'column',
            ...modalStyle,
          }}
        >
          <Typography variant="h2" color={palette.customColors.greyInfo} textAlign="center">
            {header}
          </Typography>
          {children}
          <Box
            sx={{
              position: 'absolute',
              top: '-45px',
              right: '-50px',
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                color: palette.black,
                background: palette.primary.contrastText,
                borderRadius: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  background: palette.primary.contrastText,
                },
                height: 50,
                width: 50,
                minHeight: 40,
                minWidth: 40,
              }}
            >
              <ClearRoundedIcon sx={{ fontSize: 30, color: palette.customColors.greyInfo }} />
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default UIModal
