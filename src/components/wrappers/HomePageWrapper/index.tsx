import MainTopActions from '@/src/components/organisms/MainTopActions'
import { Box } from '@mui/material'
import CountrySlider from '@/src/components/organisms/CountrySlider'
import CategorySlider from '@/src/components/organisms/CategorySlider'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { searchAdsRequested } from '@/src/redux/slices/mainSearch'
import MainTopFilters from '@/src/components/organisms/MainTopFilters'
import AdsCollection from '@/src/components/organisms/AdsCollection'

const HomePageWrapper = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(searchAdsRequested())
  }, [])

  return (
    <Box mt={{ xs: 4, md: '29px' }}>
      <MainTopActions />
      <CountrySlider />
      <CategorySlider />
      <Box mr={{ xs: 0, md: '262px' }} mt={{ xs: 4, md: 9.5 }} pb={12.5}>
        <MainTopFilters />
        <AdsCollection />
      </Box>
    </Box>
  )
}

export default HomePageWrapper
