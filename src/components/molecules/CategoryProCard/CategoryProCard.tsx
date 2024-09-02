// CategoryProCard.tsx
import { Card, CardContent, IconButton, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import deleteIcon from 'src/assets/images/promotion/delete.svg'
import { ProProfile } from '@/src/types/redux/pro'
import { getDaysUntilNextMonth, getMonthDifference } from '@/src/utils/dateHelper'

interface CategoryProCardProps {
  ad: ProProfile
  onDeleteClick: (profileId: string) => void
}

const CategoryProCard: React.FC<CategoryProCardProps> = ({ ad, onDeleteClick }) => {
  const { palette } = useTheme()
  const { t } = useTranslation(['promotion', 'common', 'categories'])
  const router = useRouter()

  const isActive = new Date(ad.endsAt.iso) > new Date()
  const daysUntilNextMonth = getDaysUntilNextMonth(new Date(ad.endsAt.iso))

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
            <Typography color={palette.text.primary} fontSize="18px" fontWeight={600} mb={1}>
              {`${t('promotion_service')} - ${t('common:pro_category')} "${t(`categories:${ad.category}`)}"`}
            </Typography>
            <Typography fontSize="16px" fontWeight={500} whiteSpace="nowrap">
              {isActive
                ? `${getMonthDifference(new Date(ad.startedAt.iso), new Date(ad.endsAt.iso))} ${t('common:months')}`
                : t('common:done_pro')}
            </Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <Stack flexDirection="column" justifyContent="flex-end" gap={4}>
              <Typography color={palette.text.primary} fontSize="16px" fontWeight={500}>
                {t('common:date.connected_before')} {new Date(ad.startedAt.iso).toLocaleString()}{' '}
                {t('common:date.connected_after')} {new Date(ad.endsAt.iso).toLocaleString()}
              </Typography>
              <Typography color={palette.text.primary} fontSize="16px" fontWeight={500}>
                {isActive ? '' : `${t('common:days_until_delete')} ${daysUntilNextMonth} ${t('common:days')}`}
              </Typography>
            </Stack>
            <IconButton
              sx={{ width: '37px', height: '37px' }}
              onClick={event => {
                event.stopPropagation()
                onDeleteClick(ad.objectId)
              }}
            >
              <Image src={deleteIcon} alt="delete" />
            </IconButton>
          </Stack>
          <Stack></Stack>
        </CardContent>
      </Card>
    )
  )
}

export default CategoryProCard
