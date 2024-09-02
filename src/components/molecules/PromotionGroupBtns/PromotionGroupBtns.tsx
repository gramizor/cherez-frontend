import { myProAd } from '@/src/types/redux/myAds'
import { Stack } from '@mui/material'
import React, { useState } from 'react'
import PromotionButton from '../../buttons/PromotionButton/PromotionButton'
import { RootState } from '@/src/redux/rootReducer'
import { useSelector } from 'react-redux'

type Props = {
  ad: myProAd
  handleDeleteAd: (adId: string) => void
  handleXL: (adId: string) => void
  handleBoost: (adId: string) => void
  handleSettings: (adId: string) => void
}

const PromotionGroupBtns: React.FC<Props> = ({ ad, handleDeleteAd, handleXL, handleBoost, handleSettings }) => {
  const [activeButtons, setActiveButtons] = useState({
    xl: !!ad.largeBefore?.iso,
    plane: !!ad.boostedBefore?.iso,
    delete: false,
    pro: false,
  })

  const isBoosted = ad.boostedBefore?.iso
  const isLarged = ad.largeBefore?.iso

  return (
    <Stack direction="row" gap={2}>
      <PromotionButton variant={'xl'} handleClick={() => handleXL(ad.objectId)} isActive={activeButtons.xl} />
      <PromotionButton variant={'plane'} handleClick={() => handleBoost(ad.objectId)} isActive={activeButtons.plane} />
      <PromotionButton
        variant={'delete'}
        handleClick={() => handleDeleteAd(ad.objectId)}
        isActive={activeButtons.delete}
      />
      <PromotionButton variant={'pro'} handleClick={() => handleSettings(ad.objectId)} isActive={activeButtons.pro} />
    </Stack>
  )
}

export default PromotionGroupBtns
