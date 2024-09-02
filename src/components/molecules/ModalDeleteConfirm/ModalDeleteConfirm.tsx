import React from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

type Props = {
  open: boolean
  onClose: () => void
  onDelete?: () => void
  profileId: string | undefined
}

const ModalDeleteConfirm: React.FC<Props> = ({ open, onClose, onDelete, profileId }) => {
  const { t } = useTranslation(['common'])

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h4" component="h2">
          {t('delete_confirmation')}
        </Typography>
        <Typography variant="h6" component="h2">
          {t('are_you_sure')} {profileId}?
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={onDelete}>
            {t('yes')}
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            {t('no')}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalDeleteConfirm
