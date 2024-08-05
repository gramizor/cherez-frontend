import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { setJWTBearerToken } from '@/src/lib/storage'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '@/src/redux/selectors/auth'
import Image from 'next/image'
import DeleteIcon from '@mui/icons-material/Delete'
import { FormikErrors } from 'formik'
import { CreateAdForm } from '@/src/types/redux/adCreate'

type Props = {
  label: string
  name: string
  images: File[] | string[]
  handleChange: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<CreateAdForm>>
}

const SimpleFileUploader = ({ label, images, handleChange, name }: Props) => {
  const { palette } = useTheme()
  const [token, setToken] = useState<string | null>(null)
  const currentUser = useSelector(getCurrentUser)

  const loadToken = async () => {
    setToken(await setJWTBearerToken())
  }

  useEffect(() => {
    if (currentUser) {
      loadToken().then()
    }
  }, [])

  if (!token) return null
  return (
    <>
      <Typography sx={{ mb: 4 }} variant="subtitle1">
        {label}
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-start' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <Box key={i} mr={5.5} mb={5} height={115} width={115}>
            <label htmlFor={`image-file-${i}`}>
              <Box
                width={'100%'}
                height={'100%'}
                bgcolor={palette.customColors.checkbox}
                sx={{ cursor: 'pointer' }}
                position="relative"
              >
                {images[i] && (
                  <Box
                    onClick={e => {
                      e.preventDefault()
                      handleChange(
                        name,
                        images.filter((element, index) => index !== i),
                        false
                      )
                    }}
                    position="absolute"
                    bottom={'4px'}
                    right={'4px'}
                    sx={{
                      background: palette.customColors.checkbox,
                      width: 36,
                      height: 36,
                      borderRadius: 16,
                      '&:hover': {
                        backgroundColor: palette.customColors.lightBackground,
                      },
                    }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <DeleteIcon color="error" />
                  </Box>
                )}
                {images[i] && (
                  <Image
                    src={typeof images[i] === 'string' ? images[i] : URL.createObjectURL(images[i])}
                    alt={`image-file-${i}`}
                    width={115}
                    height={115}
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </Box>
            </label>
            <input
              onChange={event => {
                if (event.target.files) {
                  if (images[i]) {
                    handleChange(
                      name,
                      [...images.filter((element, index) => index !== i), event.target.files[0]],
                      false
                    )
                  } else {
                    handleChange(name, [...images, event.target.files[0]], false)
                  }
                }
              }}
              id={`image-file-${i}`}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              style={{
                width: 1,
                opacity: 0,
                position: 'absolute',
                zIndex: '-1',
              }}
            />
          </Box>
        ))}
      </Box>
    </>
  )
}

export default SimpleFileUploader
