import { Box, useMediaQuery } from '@mui/material'
import { useRef, useState } from 'react'
import { categories, responsive } from '@/src/components/organisms/CategorySlider/constants'
import { searchAdsRequested, setSearchParams } from '@/src/redux/slices/mainSearch'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryMainSearchParam } from '@/src/redux/selectors/mainSearch'
import { ArrowButton } from '@/src/components/atoms/ArrowButton'
import ArrowLeftIcon from '@/src/assets/images/common/arrowLeft.svg'
import Carousel from 'react-multi-carousel'
import ArrowRightIcon from '@/src/assets/images/common/arrowRight.svg'
import { CategorySliderButton } from '@/src/components/buttons/CategorySliderButton'

const CountrySlider = () => {
  const dispatch = useDispatch()
  const categoryMainSearchParam = useSelector(getCategoryMainSearchParam)
  const ref = useRef()

  const isSuperLargeDesktop = useMediaQuery('(min-width:2000px)')
  const isLargeDesktop = useMediaQuery('(min-width:1540px)')
  const isDesktop = useMediaQuery('(min-width:1400px)')
  const isLargeTablet = useMediaQuery('(min-width:980px)')

  const [isLeftArrowDisplay, setIsLeftArrowDisplay] = useState(false)
  const [isRightArrowDisplay, setIsRightArrowDisplay] = useState(true)

  const handleChange = (value: string) => {
    const category = categoryMainSearchParam === value ? '' : value
    dispatch(setSearchParams({ category, categoryParams: [] }))
    dispatch(searchAdsRequested())
  }

  return (
    <Box mt={1} position="relative">
      {isLeftArrowDisplay && isLargeTablet && ref.current && (
        <ArrowButton
          styles={{ top: 0, left: 0, marginTop: 10 }}
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
          slidesToSlide={isSuperLargeDesktop ? 10 : isLargeDesktop ? 9 : isDesktop ? 8 : isLargeTablet ? 7 : 6}
          responsive={responsive}
          arrows={false}
          swipeable={true}
          draggable={false}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
        >
          {categories.map((category, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CategorySliderButton category={category} handleChange={handleChange} />
            </Box>
          ))}
        </Carousel>
      </Box>

      {isRightArrowDisplay && isLargeTablet && (
        <ArrowButton
          styles={{ top: 0, right: 0, marginTop: 10 }}
          src={ArrowRightIcon}
          // @ts-ignore
          handleClick={() => ref.current.goToSlide(ref.current.state.currentSlide + ref.current.state.slidesToShow)}
        />
      )}
    </Box>
  )
}

export default CountrySlider
