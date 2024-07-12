import { Grid, useTheme } from '@mui/material'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useRouter } from 'next/router'

const headers = [
  { type: 'text', title: 'my_announcements', url: '/announcements' },
  {
    type: 'text',
    title: 'promotion',
    url: '/promotion',
    subHeaders: [
      { type: 'text', title: 'promotion_raise', url: '/promotion/raise' },
      { type: 'text', title: 'promotion_xl', url: '/promotion/xl' },
      { type: 'text', title: 'promotion_category', url: '/promotion/category' },
    ],
  },
  { type: 'text', title: 'wallet', url: '/wallet' },
  { type: 'text', title: 'saved', url: '/saved' },
  { type: 'text', title: 'messages', url: '/messages' },
  { type: 'text', title: 'help', url: '/help' },
]

interface LeftMenuProps {
  active?: string
}

const LeftMenu: React.FC<LeftMenuProps> = ({ active }) => {
  const { t } = useTranslation('common')
  const { palette } = useTheme()
  const router = useRouter()

  return (
    <Grid container spacing={2.5} flexDirection="column">
      {headers.map((header, index) => (
        <Grid item key={index} sx={{ cursor: 'pointer' }}>
          <Link passHref href={header.url}>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{
                color:
                  router.pathname === header.url || active === header.title
                    ? palette.primary.light
                    : palette.customColors.titleText,
              }}
            >
              {t(header.title)}
            </Typography>
          </Link>
          {header.subHeaders && router.pathname.startsWith(header.url) && router.pathname !== header.url && (
            <Grid mt="5px" container spacing={1} flexDirection="column" pl={2}>
              {header.subHeaders.map((subHeader, subIndex) => (
                <Grid item key={subIndex} sx={{ cursor: 'pointer' }}>
                  <Link passHref href={subHeader.url}>
                    <Typography
                      variant="h6"
                      fontWeight={500}
                      sx={{
                        color:
                          router.pathname === subHeader.url || active === subHeader.title
                            ? palette.primary.light
                            : palette.customColors.titleText,
                      }}
                    >
                      {t(subHeader.title)}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  )
}

export default LeftMenu
