// CategoryProCard.tsx
import { Card, CardContent, IconButton, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import deleteIcon from 'src/assets/images/promotion/delete.svg'
import { ProProfile } from '@/src/types/redux/pro'
import { getDaysUntilNextMonth, getMonthDifference } from '@/src/utils/dateHelper'
import UIModal from '../../UI/UIModal/UIModal'
import { palette } from '@/src/theme/palette'
import UIModalButtonsGroup from '../../UI/UIModalButtonsGroup/UIModalButtonsGroup'

interface CategoryProCardProps {
  ad: ProProfile
  handleDeleteProfile: (adId: string) => void
}

const CategoryProCard: React.FC<CategoryProCardProps> = ({ ad, handleDeleteProfile }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const { t } = useTranslation(['promotion', 'common', 'categories', 'myAds'])
  const router = useRouter()

  const isActive = new Date(ad.endsAt.iso) > new Date()
  const daysUntilNextMonth = getDaysUntilNextMonth(new Date(ad.endsAt.iso))

  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const confirmDeleteProfile = () => {
    handleDeleteProfile(ad.objectId)
    closeDeleteModal()
  }
  return (
    daysUntilNextMonth > 0 && (
      <Card
        sx={{
          display: 'flex',
          backgroundColor: isActive ? `${palette.primary.light}50` : `${palette.customColors.redLight}70`,
          borderRadius: '10px',
          marginBottom: '20px',
          minHeight: '100px',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          onClick={() => router.push(`/pro/create/${ad.objectId}`)}
        >
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center" mb={5}>
            <Typography color={palette.black} fontSize="18px" fontWeight={600} mb={1}>
              {`${t('promotion_service')} - ${t('common:pro_category')} "${t(`categories:${ad.category}`)}"`}
            </Typography>
            <Typography fontSize="16px" fontWeight={500} whiteSpace="nowrap">
              {isActive
                ? `${t('myAds:months_until')}: ${getMonthDifference(new Date(ad.startedAt.iso), new Date(ad.endsAt.iso))}`
                : t('common:done_pro')}
            </Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <Stack flexDirection="column" justifyContent="flex-end" gap={4}>
              <Typography color={palette.black} fontSize="16px" fontWeight={500}>
                {t('common:date.connected_before')} {new Date(ad.startedAt.iso).toLocaleString()}{' '}
                {t('common:date.connected_after')} {new Date(ad.endsAt.iso).toLocaleString()}
              </Typography>
              <Typography color={palette.black} fontSize="16px" fontWeight={500}>
                {isActive ? '' : `${t('myAds:days_until')} ${daysUntilNextMonth}`}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <UIModal
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          triggerButton={
            <IconButton
              sx={{ position: 'absolute', bottom: '10px', right: '10px', width: '37px', height: '37px' }}
              onClick={event => {
                event.stopPropagation()
                openDeleteModal()
              }}
            >
              <Image src={deleteIcon} alt="delete" />
            </IconButton>
          }
          header={t('delete_modal_header')}
        >
          <Typography color={palette.black} fontSize={16}>
            {`${t('delete_confirmation1')} "${t(`categories:${ad.category}`)}" ${t('delete_confirmation2')} "${t(`categories:${ad.category}`)}" ${t('delete_confirmation3')}`}
          </Typography>
          <UIModalButtonsGroup
            cancelText={t('cancel')}
            confirmText={t('delete')}
            onCancel={closeDeleteModal}
            onConfirm={confirmDeleteProfile}
          />
        </UIModal>
      </Card>
    )
  )
}

export default CategoryProCard
