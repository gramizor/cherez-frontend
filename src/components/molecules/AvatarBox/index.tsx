import { Avatar, useTheme } from '@mui/material'
import { MouseEvent } from 'react'
import { OwnerState, User } from '@/src/types/models'

export enum AvatarBoxSize {
  Small = 'small',
  Normal = 'normal',
  Big = 'big',
  Biggest = 'biggest',
}

type Props = {
  size?: AvatarBoxSize
  onClick?: (event: MouseEvent<HTMLElement>) => void
  user: OwnerState | User | null
}

const sizeMap = {
  [AvatarBoxSize.Small]: 20,
  [AvatarBoxSize.Normal]: 32,
  [AvatarBoxSize.Big]: 61,
  [AvatarBoxSize.Biggest]: 224,
}

const fontSizeMap = {
  [AvatarBoxSize.Small]: '14px !important',
  [AvatarBoxSize.Normal]: 20,
  [AvatarBoxSize.Big]: 20,
  [AvatarBoxSize.Biggest]: 90,
}

const AvatarBox = ({ size = AvatarBoxSize.Normal, onClick, user }: Props) => {
  const { palette } = useTheme()
  const styles = {
    backgroundColor: palette.primary.main,
    width: sizeMap[size],
    height: sizeMap[size],
    fontSize: fontSizeMap[size],
  }

  return (
    <>
      {user?.avatar ? (
        <Avatar
          alt={user?.avatar?.name}
          src={user?.avatar?.url}
          sx={styles}
          onClick={(event: MouseEvent<HTMLElement>) => {
            onClick && onClick(event)
          }}
        />
      ) : (
        <Avatar
          onClick={(event: MouseEvent<HTMLElement>) => {
            onClick && onClick(event)
          }}
          sx={styles}
        >
          {user?.username[0].toUpperCase()}
        </Avatar>
      )}
    </>
  )
}

export default AvatarBox
