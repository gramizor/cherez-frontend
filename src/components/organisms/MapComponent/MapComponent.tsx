import React from 'react'
import { Circle, MapContainer, TileLayer } from 'react-leaflet'
import { Box, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { getCurrentAd } from '@/src/redux/selectors/ad'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

const MapComponent = () => {
  const { t } = useTranslation('ad')
  const currentAd = useSelector(getCurrentAd)
  const { palette } = useTheme()
  if (!currentAd || !currentAd.geolocation) return null
  return (
    <Box>
      <Typography variant="h2" textAlign={{ xs: 'center', lg: 'left' }}>
        {t('ad:location')}
      </Typography>
      <Box height={409} mt={6}>
        <MapContainer
          center={[currentAd.geolocation.latitude, currentAd.geolocation.longitude]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle
            center={[currentAd.geolocation.latitude, currentAd.geolocation.longitude]}
            pathOptions={{ fillColor: 'blue' }}
            radius={300}
          />
        </MapContainer>
      </Box>
      <Typography mt={3} variant="h5" color={palette.customColors.bodyInfo} textAlign={{ xs: 'center', lg: 'left' }}>
        {t('ad:location_approximate')}
      </Typography>
    </Box>
  )
}

export default MapComponent
