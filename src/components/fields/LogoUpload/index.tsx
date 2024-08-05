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
  image: File | string | undefined
  handleChange: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<CreateAdForm>>
  fullWidth?: boolean
  id: string
}

const LogoUpload = ({ label, image, handleChange, name, fullWidth, id }: Props) => {
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
  }, [currentUser])

  if (!token) return null
  return (
    <>
      <Typography sx={{ mb: 4 }} variant="subtitle1">
        {label}
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-start' }}>
        <Box mr={5.5} mb={5} height={115} width={fullWidth ? '100%' : 115}>
          <label htmlFor={id}>
            <Box
              width={'100%'}
              height={'100%'}
              bgcolor={palette.customColors.checkbox}
              sx={{ cursor: 'pointer' }}
              position="relative"
            >
              {image && (
                <Box
                  onClick={e => {
                    e.preventDefault()
                    handleChange(name, null, false)
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
                    zIndex: 10,
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <DeleteIcon color="error" />
                </Box>
              )}
              {image && (
                <Image
                  src={typeof image === 'string' ? image : image instanceof File ? URL.createObjectURL(image) : ''}
                  alt="image-file"
                  layout="fill"
                  objectFit="cover"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </Box>
          </label>
          <input
            onChange={event => {
              if (event.target.files) {
                handleChange(name, event.target.files[0], false)
              }
            }}
            id={id}
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
      </Box>
    </>
  )
}

export default LogoUpload
