import { palette } from '@/src/theme/palette'
import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import plane from '/src/assets/images/promotion/plane.svg'
import plane_gray from '/src/assets/images/promotion/plane_gray.svg'
import xl from '/src/assets/images/promotion/xl.svg'
import xl_gray from '/src/assets/images/promotion/xl_gray.svg'
import delete_btn from '/src/assets/images/promotion/delete_btn.svg'
import settings from '/src/assets/images/promotion/settings.svg'
import Image from 'next/image'

type PromotionButtonProps = {
  variant: 'plane' | 'delete' | 'xl' | 'pro'
  handleClick: () => void
  isActive: boolean
}

const PromotionButton: React.FC<PromotionButtonProps> = ({ variant, handleClick, isActive }) => {
  const imageDisplay = (variant: 'plane' | 'delete' | 'xl' | 'pro') => {
    switch (variant) {
      case 'plane':
        return isActive ? plane : plane_gray
      case 'xl':
        return isActive ? xl : xl_gray
      case 'delete':
        return delete_btn
      case 'pro':
        return settings
      default:
        return null
    }
  }

  useEffect(() => {
    imageDisplay(variant)
  }, [variant, isActive])

  return (
    <IconButton sx={{ padding: 0, borderRadius: '10px' }} disabled={isActive} onClick={handleClick}>
      <Image width={60} height={30} src={imageDisplay(variant)} alt={variant} />
    </IconButton>
  )
}

export default PromotionButton
