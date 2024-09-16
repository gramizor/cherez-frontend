import { myProAd } from '@/src/types/redux/myAds'
import { Stack } from '@mui/material'
import React, { useState } from 'react'
import PromotionButton from '../../buttons/PromotionButton/PromotionButton'
import { RootState } from '@/src/redux/rootReducer'
import { useSelector } from 'react-redux'
import { AdsState } from '@/src/types/models'

type Props = {
  ad: myProAd | AdsState
  handleDeleteAd: (adId: string) => void
  handleXL: (adId: string) => void
  handleBoost: (adId: string) => void
  handleSettings: (adId: string) => void
}

const PromotionGroupBtns: React.FC<Props> = ({ ad, handleDeleteAd, handleXL, handleBoost, handleSettings }) => {
  const isXLActive = !!ad.largeBefore?.iso
  const isPlaneActive = !!ad.boostedBefore?.iso

  return (
    <Stack direction="row" gap={2}>
      <PromotionButton variant={'xl'} handleClick={() => handleXL(ad.objectId)} isActive={isXLActive} />
      <PromotionButton variant={'plane'} handleClick={() => handleBoost(ad.objectId)} isActive={isPlaneActive} />
      <PromotionButton variant={'delete'} handleClick={() => handleDeleteAd(ad.objectId)} isActive={false} />
      <PromotionButton variant={'pro'} handleClick={() => handleSettings(ad.objectId)} isActive={false} />
    </Stack>
  )
}

export default PromotionGroupBtns
