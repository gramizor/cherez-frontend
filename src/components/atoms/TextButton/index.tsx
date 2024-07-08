import { Typography, useTheme } from '@mui/material'

type Props = {
  isSelected: boolean
  text: string
  onClick: () => void
}

const TextButton = ({ isSelected, text, onClick }: Props) => {
  const { palette } = useTheme()

  return (
    <Typography
      onClick={onClick}
      variant="h5"
      fontWeight={500}
      sx={{
        '&:hover': {
          background: palette.primary.light,
          color: palette.info.main,
        },
        minWidth: 100,
        width: 'fit-content',
        textAlign: 'center',
        cursor: 'pointer',
        background: isSelected ? palette.primary.light : palette.customColors.lightBackground,
        borderRadius: '10px',
        padding: '12px 15px 11px',
        color: isSelected ? palette.info.main : palette.black,
      }}
    >
      {text}
    </Typography>
  )
}

export default TextButton
