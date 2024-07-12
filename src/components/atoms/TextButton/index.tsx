import { SxProps, Typography, useTheme } from '@mui/material'

type Props = {
  isSelected: boolean
  text: string
  onClick: () => void
  sx?: SxProps
  isBlack?: boolean
}

const TextButton = ({ isSelected, text, onClick, sx, isBlack = false }: Props) => {
  const { palette } = useTheme()

  return (
    <Typography
      onClick={onClick}
      variant="h5"
      fontWeight={500}
      sx={{
        '&:hover': {
          background: palette.primary.light,
          color: isBlack ? palette.black : palette.info.main,
        },
        minWidth: 100,
        width: 'fit-content',
        textAlign: 'center',
        cursor: 'pointer',
        background: isSelected ? palette.primary.light : palette.customColors.lightBackground,
        borderRadius: '10px',
        padding: '12px 15px 11px',
        color: isBlack ? palette.black : isSelected ? palette.info.main : palette.black,
        ...sx,
      }}
    >
      {text}
    </Typography>
  )
}

export default TextButton
