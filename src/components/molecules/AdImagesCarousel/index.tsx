import Carousel from 'react-multi-carousel'
import Image from 'next/image'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { map } from 'lodash'
import 'react-multi-carousel/lib/styles.css'
import { useRef } from 'react'

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 980 },
    items: 1,
  },

  tablet: {
    breakpoint: { max: 980, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

type Props = {
  images: string[]
}

const AdImagesCarousel = ({ images }: Props) => {
  const ref = useRef()
  const { breakpoints } = useTheme()

  const isLarge = useMediaQuery(breakpoints.up('sm'))
  return (
    <Box>
      <Carousel
        // @ts-ignore
        ref={ref}
        responsive={responsive}
        slidesToSlide={1}
        swipeable
        autoPlay={false}
        keyBoardControl
        containerClass="carousel-with-custom-dots"
        renderDotsOutside
      >
        {map(images, (image, key) => (
          <Box key={key} display="flex" justifyContent={{ xs: 'center', lg: 'flex-start' }}>
            <Image
              src={image}
              alt={`image-${key}`}
              style={{ maxWidth: isLarge ? 693 : 300, maxHeight: isLarge ? 492 : 300, width: 'auto', height: 'auto' }}
              width={isLarge ? 693 : 300}
              height={isLarge ? 492 : 300}
            />
          </Box>
        ))}
      </Carousel>
      <Grid container mt={4} spacing={2} justifyContent={{ xs: 'center', lg: 'flex-start' }}>
        {map(images, (image, key) => (
          <Grid
            item
            key={key}
            onClick={() => {
              // @ts-ignore
              ref.current.goToSlide(key)
            }}
            sx={{
              cursor: 'pointer',
            }}
          >
            <Image src={image} alt={`image-box-${key}`} width={80} height={53} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default AdImagesCarousel
