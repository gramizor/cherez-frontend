import { Box, Grid, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentAd } from '@/src/redux/selectors/ad'
import Image from 'next/image'
import eyeLogo from 'src/assets/images/ads/eye.png'
import { useTranslation } from 'next-i18next'
import { format } from 'date-fns'
import { es, ru } from 'date-fns/locale'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { getSavedAds, setSavedAds } from '@/src/lib/storage'
import sendImage from '@/src/assets/images/ads/send.png'
import { startChatByAdRequested } from '@/src/redux/slices/ad'

const AdActionsPanel = () => {
  const currentAd = useSelector(getCurrentAd)
  const { palette } = useTheme()
  const [isSaved, setIsSaved] = useState(false)
  const [firstMessageText, setFirstMessageText] = useState('')
  const dispatch = useDispatch()

  const {
    t,
    i18n: { language },
  } = useTranslation('ad')

  useEffect(() => {
    if (currentAd) {
      const savedAdsCollection = setSavedAds()
      setIsSaved(savedAdsCollection && savedAdsCollection.includes(currentAd.objectId))
    }
  }, [currentAd])

  if (!currentAd) return null

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box display="flex" alignItems="center">
            <Image src={eyeLogo} alt={'eye'} width={28} height={28} />
            <Typography variant="h5" fontSize={15} sx={{ ml: 2.5 }} color={palette.customColors.bodyInfo}>
              307
            </Typography>
          </Box>
        </Grid>
        {currentAd.publishedAt && (
          <Grid item>
            <Typography variant="h5" fontSize={15} color={palette.customColors.bodyInfo}>
              {t('ad:published_at', {
                date: format(new Date(currentAd.publishedAt.iso), 'PPP', { locale: language === 'ru-RU' ? ru : es }),
              })}
            </Typography>
          </Grid>
        )}
        {!currentAd.publishedAt && (
          <Grid item>
            <Typography variant="h5" fontSize={15} color={palette.customColors.bodyInfo}>
              {t('ad:not_published')}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Box width="100%" mt={4.5}>
        <Button
          variant="contained"
          onClick={async () => {
            await getSavedAds(currentAd.objectId)
            setIsSaved(!isSaved)
          }}
          fullWidth
          sx={{
            background: isSaved ? palette.customColors.lightBackground : palette.primary.light,
            fontWeight: 400,
            fontSize: 20,
            color: isSaved ? palette.customColors.bodyInfo : palette.info.main,
          }}
        >
          {t(isSaved ? 'ad:saved_ad' : 'ad:save_ad')}
        </Button>
      </Box>
      <Box width="100%" mt={3}>
        <TextField
          fullWidth
          label=""
          color="secondary"
          multiline
          placeholder={t('ad:hello_message')}
          maxRows={8}
          value={firstMessageText}
          onChange={e => setFirstMessageText(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    dispatch(startChatByAdRequested({ adId: currentAd.objectId, firstMessageText }))
                  }}
                >
                  <Image src={sendImage} alt="send" />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              '& > fieldset': {
                border: 'none',
              },
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default AdActionsPanel
