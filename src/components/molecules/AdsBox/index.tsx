import { Grid, IconButton, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import BookmarkIcon from 'src/assets/images/common/bookmark.svg'
import SavedBookmarkIcon from 'src/assets/images/common/savedBookmark.svg'
import getSymbolFromCurrency from 'currency-symbol-map'
import { format } from 'date-fns'
import { es, ru } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import { getSavedAds, setSavedAds } from '@/src/lib/storage'
import Link from 'next/link'
import { AdsState } from '@/src/types/models'
import { concat, map, slice } from 'lodash'

type Props = {
  ad: AdsState
  isLarge: boolean
  isSaved: boolean
  setSaved: (ads: string[]) => void
}

const AdsBox = ({ ad, isLarge, isSaved, setSaved }: Props) => {
  const { palette, breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('lg'))

  const currencyLabel = (code: string, price: number) => {
    if (code === 'USD') return `${getSymbolFromCurrency(code)}${price}`
    return `${price} ${getSymbolFromCurrency(code)}`
  }

  const {
    i18n: { language },
  } = useTranslation('common')

  const info = () => (
    <>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle1" fontWeight={700} color={palette.customColors.infoLabel}>
              {currencyLabel(ad.currencyCode, ad.price)}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="bookmark"
              sx={{ p: 0, color: palette.customColors.checkbox }}
              onClick={async e => {
                e.preventDefault()
                await getSavedAds(ad.objectId)
                setSaved(setSavedAds())
              }}
            >
              <Image src={isSaved ? SavedBookmarkIcon : BookmarkIcon} alt={'bookmark'} width={20} height={20} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          mt: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            maxWidth: 197,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '-moz-box-orient': 'vertical',
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
          }}
        >
          {ad.label}
        </Typography>
      </Grid>
      {isLarge && (
        <Grid item xs={12} mt={2}>
          <Typography
            variant="h5"
            color={palette.customColors.infoLabel}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '-moz-box-orient': 'vertical',
              display: '-webkit-box',
              '-webkit-line-clamp': isMobile ? '5' : '9',
              '-webkit-box-orient': 'vertical',
            }}
          >
            {ad.description}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} sx={{ mt: 2.5 }}>
        <Grid container alignItems="center">
          <Image src={`/countries/flag_${ad.country.toLowerCase()}.png`} alt={ad.country} width={21} height={13} />
          <Typography variant="body1" fontSize={14} sx={{ ml: 1 }} color={'secondary'}>
            {ad.country} {ad.city}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Typography variant="body1" fontSize={14} color={'secondary'}>
          {format(new Date(ad.publishedAt.iso), 'PP', { locale: language === 'ru-RU' ? ru : es })}
        </Typography>
      </Grid>
    </>
  )

  let firstLineArray: string[] = []
  let secondLineArray: string[] = []

  if (isLarge) {
    firstLineArray = slice(ad.images, 1, 5)
    while (firstLineArray.length < 4) {
      firstLineArray = concat(firstLineArray, ad.images)
    }
    firstLineArray = slice(firstLineArray, 0, 4)

    secondLineArray = slice(ad.images, 5, 9)
    while (secondLineArray.length < 4) {
      secondLineArray = concat(secondLineArray, ad.images)
    }
    secondLineArray = slice(secondLineArray, 0, 4)
  }

  return (
    <Link passHref href={`/ads/${ad.objectId}`}>
      <Grid container spacing={isLarge ? 3.5 : 0}>
        <Grid item xs={isLarge ? 7 : 12} sx={{ img: { objectFit: 'cover', width: '100%' } }}>
          <Image src={ad.images[0]} alt={'ads'} width={isMobile ? 160 : 266} height={isMobile ? 160 : 200} />
          {isLarge && (
            <Grid container spacing={1}>
              {map(firstLineArray, (image, key) => {
                return (
                  <Grid item xs={3} key={key}>
                    <Image src={image} alt={'ads'} width={isMobile ? 160 : 266} height={60} />
                  </Grid>
                )
              })}
              {!isMobile &&
                map(secondLineArray, (image, key) => {
                  return (
                    <Grid item xs={3} key={key}>
                      <Image src={image} alt={'ads'} width={isMobile ? 160 : 266} height={60} />
                    </Grid>
                  )
                })}
            </Grid>
          )}
        </Grid>
        {isLarge && (
          <Grid item xs={5}>
            <Grid container>{info()}</Grid>
          </Grid>
        )}
        {!isLarge && info()}
      </Grid>
    </Link>
  )
}

export default AdsBox
