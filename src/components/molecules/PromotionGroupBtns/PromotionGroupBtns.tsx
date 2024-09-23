import React, { useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import PromotionButton from '../../buttons/PromotionButton/PromotionButton'
import { myProAd } from '@/src/types/redux/myAds'
import { AdsState } from '@/src/types/models'
import UIModal from '../../UI/UIModal/UIModal'
import UIModalButtonsGroup from '../../UI/UIModalButtonsGroup/UIModalButtonsGroup'
import { palette } from '@/src/theme/palette'
import { useTranslation } from 'next-i18next'

type Props = {
  ad: myProAd | AdsState
  handleDeleteAd: (adId: string) => void
  handleXL: (adId: string) => void
  handleBoost: (adId: string) => void
  handleSettings: (adId: string) => void
}

const PromotionGroupBtns: React.FC<Props> = ({ ad, handleDeleteAd, handleXL, handleBoost, handleSettings }) => {
  const { t } = useTranslation(['myAds', 'common'])
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isXlModalOpen, setXlModalOpen] = useState(false)
  const [isPlaneModalOpen, setPlaneModalOpen] = useState(false)
  const isXLActive = !!ad.largeBefore?.iso
  const isPlaneActive = !!ad.boostedBefore?.iso

  const openDeleteModal = () => setDeleteModalOpen(true)
  const openXlModal = () => setXlModalOpen(true)
  const openPlaneModal = () => setPlaneModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)
  const closeXlModal = () => setXlModalOpen(false)
  const closePlaneModal = () => setPlaneModalOpen(false)

  const confirmDeleteAd = () => {
    handleDeleteAd(ad.objectId)
    closeDeleteModal()
  }

  const confirmXl = () => {
    handleXL(ad.objectId)
    closeXlModal()
  }

  const confirmPlane = () => {
    handleBoost(ad.objectId)
    closePlaneModal()
  }

  return (
    <Stack direction="row" gap={2}>
      <UIModal
        open={isXlModalOpen}
        onClose={closeXlModal}
        triggerButton={<PromotionButton variant="xl" handleClick={openXlModal} isActive={isXLActive} />}
        header={t('confirm_xl')}
      >
        <Typography color={palette.customColors.greyInfo} fontSize={16}>
          {t('xl_confirmation')} {ad.label} ?
        </Typography>
        <UIModalButtonsGroup
          cancelText={t('cancel')}
          confirmText={t('xl_boost')}
          onCancel={closeXlModal}
          onConfirm={confirmXl}
        />
      </UIModal>

      <UIModal
        open={isPlaneModalOpen}
        onClose={closePlaneModal}
        triggerButton={<PromotionButton variant="plane" handleClick={openPlaneModal} isActive={isPlaneActive} />}
        header={t('confirm_boost')}
      >
        <Typography color={palette.customColors.greyInfo} fontSize={16}>
          {t('boost_confirmation')} {ad.label} ?
        </Typography>
        <UIModalButtonsGroup
          cancelText={t('cancel')}
          confirmText={t('plane_boost')}
          onCancel={closePlaneModal}
          onConfirm={confirmPlane}
        />
      </UIModal>

      <UIModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        triggerButton={<PromotionButton variant="delete" handleClick={openDeleteModal} isActive={false} />}
        header={t('delete_confirm_ad')}
      >
        <Typography color={palette.customColors.greyInfo} fontSize={16}>
          {t('delete_confirmation')} {ad.label} ?
        </Typography>
        <UIModalButtonsGroup
          cancelText={t('cancel')}
          confirmText={t('delete')}
          onCancel={closeDeleteModal}
          onConfirm={confirmDeleteAd}
        />
      </UIModal>

      <PromotionButton variant="pro" handleClick={() => handleSettings(ad.objectId)} isActive={false} />
    </Stack>
  )
}

export default PromotionGroupBtns
