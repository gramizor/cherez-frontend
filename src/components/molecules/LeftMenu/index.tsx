import { Grid } from '@mui/material'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'

const headers = [
  { type: 'text', title: 'my_announcements', url: '/announcements' },
  { type: 'text', title: 'promotion', url: '/promotion' },
  { type: 'text', title: 'wallet', url: '/wallet' },
  { type: 'text', title: 'saved', url: '/saved' },
  { type: 'text', title: 'messages', url: '/messages' },
  { type: 'text', title: 'help', url: '/help' },
]

const LeftMenu = () => {
  const { t } = useTranslation('common')

  return (
    <Grid container spacing={2.5} flexDirection="column">
      {headers.map((header, index) => (
        <Grid item key={index} sx={{ cursor: 'pointer' }}>
          <Link passHref href={header.url}>
            <Typography variant="h5" fontWeight={500}>
              {t(header.title)}
            </Typography>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

export default LeftMenu
