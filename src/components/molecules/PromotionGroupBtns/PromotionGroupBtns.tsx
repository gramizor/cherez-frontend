import { myProAd } from '@/src/types/redux/myAds'
import { Stack } from '@mui/material'
import React, { useState } from 'react'
import PromotionButton from '../../buttons/PromotionButton/PromotionButton'

type Props = {
  ad: myProAd
}

const PromotionGroupBtns: React.FC<Props> = ({ ad }) => {
  const [activeButtons, setActiveButtons] = useState({
    xl: !!ad?.largeBefore,
    plane: !!ad?.boostedBefore,
    delete: false,
    pro: false,
  })

  const handleClick = (variant: 'xl' | 'plane' | 'delete' | 'pro') => {
    setActiveButtons(prevState => ({
      ...prevState,
      [variant]: !prevState[variant],
    }))
  }

  return (
    <Stack direction="row" gap={2}>
      <PromotionButton variant={'xl'} handleClick={() => handleClick('xl')} isActive={activeButtons.xl} />
      <PromotionButton variant={'plane'} handleClick={() => handleClick('plane')} isActive={activeButtons.plane} />
      <PromotionButton variant={'delete'} handleClick={() => handleClick('delete')} isActive={activeButtons.delete} />
      <PromotionButton variant={'pro'} handleClick={() => handleClick('pro')} isActive={activeButtons.pro} />
    </Stack>
  )
}

export default PromotionGroupBtns
