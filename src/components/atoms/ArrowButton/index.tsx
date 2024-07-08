import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import Image from 'next/image'

type Props = {
  styles: {
    top?: number
    left?: number
    right?: number
    marginTop?: number
  }
  src: string
  handleClick: () => void
}

export const ArrowButton = ({ styles, src, handleClick }: Props) => {
  return (
    <Box position="absolute" sx={styles}>
      <IconButton color="info" aria-label="arrow-left" onClick={handleClick}>
        <Image src={src} alt={'arrow'} width={36} height={36} />
      </IconButton>
    </Box>
  )
}
