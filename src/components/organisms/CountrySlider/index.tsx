import { Box, useMediaQuery } from '@mui/material'
import { countries, responsive } from '@/src/components/organisms/CountrySlider/constants'
import { useDispatch, useSelector } from 'react-redux'
import { searchAdsRequested, setSearchParams } from '@/src/redux/slices/mainSearch'
import { getCountryMainSearchParam } from '@/src/redux/selectors/mainSearch'
import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'
import { useRef, useState } from 'react'
import ArrowRightIcon from 'src/assets/images/common/arrowRight.svg'
import ArrowLeftIcon from 'src/assets/images/common/arrowLeft.svg'
import { ArrowButton } from '@/src/components/atoms/ArrowButton'
import { CountrySliderButton } from '@/src/components/buttons/CountrySliderButton'

const CountrySlider = () => {
  const dispatch = useDispatch()
  const countryMainSearchParam = useSelector(getCountryMainSearchParam)
  const ref = useRef()

  const isSuperLargeDesktop = useMediaQuery('(min-width:2000px)')
  const isLargeDesktop = useMediaQuery('(min-width:1540px)')
  const isDesktop = useMediaQuery('(min-width:1400px)')
  const isLargeTablet = useMediaQuery('(min-width:980px)')

  const [isLeftArrowDisplay, setIsLeftArrowDisplay] = useState(false)
  const [isRightArrowDisplay, setIsRightArrowDisplay] = useState(true)

  const handleChange = (code: string) => {
    const country = countryMainSearchParam === code ? '' : code
    dispatch(setSearchParams({ country }))
    dispatch(searchAdsRequested())
  }

  return (
    <Box sx={{ mt: 3.5 }} position="relative">
      {isLeftArrowDisplay && isLargeTablet && ref.current && (
        <ArrowButton
          styles={{ top: 0, left: 0, marginTop: 2 }}
          src={ArrowLeftIcon}
          // @ts-ignore
          handleClick={() => ref.current.goToSlide(ref.current.state.currentSlide - ref.current.state.slidesToShow)}
        />
      )}

      <Box
        maxWidth={isLargeDesktop ? 1340 : isDesktop ? 1034 : isLargeTablet ? 990 : 860}
        ml={isLeftArrowDisplay && isLargeTablet ? 13 : 0}
        mr={isLeftArrowDisplay && isRightArrowDisplay && isLargeTablet ? 13 : 0}
      >
        <Carousel
          // @ts-ignore
          ref={ref}
          beforeChange={(nextSlide, { slidesToShow, totalItems }) => {
            if (nextSlide > 0) setIsLeftArrowDisplay(true)
            else setIsLeftArrowDisplay(false)

            if (nextSlide + slidesToShow >= totalItems) setIsRightArrowDisplay(false)
            else setIsRightArrowDisplay(true)
          }}
          slidesToSlide={isSuperLargeDesktop ? 14 : isLargeDesktop ? 12 : isDesktop ? 11 : isLargeTablet ? 10 : 8}
          responsive={responsive}
          arrows={false}
          swipeable={true}
          draggable={false}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
        >
          {countries.map((country, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CountrySliderButton country={country} handleChange={handleChange} />
            </Box>
          ))}
        </Carousel>
      </Box>

      {isRightArrowDisplay && isLargeTablet && (
        <ArrowButton
          styles={{ top: 0, right: 0, marginTop: 2 }}
          src={ArrowRightIcon}
          // @ts-ignore
          handleClick={() => ref.current.goToSlide(ref.current.state.currentSlide + ref.current.state.slidesToShow)}
        />
      )}
    </Box>
  )
}

export default CountrySlider
