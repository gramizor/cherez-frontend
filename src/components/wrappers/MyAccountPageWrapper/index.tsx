import { Box, Breadcrumbs, Grid, TextField, useMediaQuery, useTheme } from '@mui/material'
import MainTopActions from '@/src/components/organisms/MainTopActions'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import LeftMenu from '@/src/components/molecules/LeftMenu'
import MyAccountUpdateForm from '@/src/components/forms/MyAccountUpdateForm'
import {
  getAccountRequested,
  setAboutMeRequested,
  setPassportInfoRequested,
  setPhoneRequested,
} from '@/src/redux/slices/account'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '@/src/redux/selectors/auth'
import { MyAccountUpdateProps } from '@/src/types/structs/account'
import { getAccount } from '@/src/redux/selectors/account'
import AvatarBox, { AvatarBoxSize } from '@/src/components/molecules/AvatarBox'
import OwnerRatings from '@/src/components/molecules/OwnerRatings'
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'
import { setJWTBearerToken } from '@/src/lib/storage'

const MyAccountPageWrapper = () => {
  const { palette, breakpoints } = useTheme()
  const isLarge = useMediaQuery(breakpoints.up('md'))
  const { t } = useTranslation(['common', 'account'])
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)
  const accountInfo = useSelector(getAccount)
  const [token, setToken] = useState<string | null>(null)

  const loadToken = async () => {
    setToken(await setJWTBearerToken())
  }

  useEffect(() => {
    if (currentUser) {
      dispatch(getAccountRequested({ id: currentUser.objectId }))
      loadToken().then()
    }
  }, [])

  const initialValues: MyAccountUpdateProps = {
    phone: accountInfo?.phone ?? '',
    aboutMe: accountInfo?.aboutMe ?? '',
    fullName: currentUser?.passportInfo?.fullName ?? '',
    birthDate: currentUser?.passportInfo?.birthDate ?? '',
    seriesAndNumber: currentUser?.passportInfo?.seriesAndNumber ?? '',
    issueDate: currentUser?.passportInfo?.issueDate ?? '',
    expireDate: currentUser?.passportInfo?.expireDate ?? '',
    country: currentUser?.passportInfo?.country ?? '',
  }

  const onSubmit = (values: MyAccountUpdateProps) => {
    if (values.phone !== initialValues.phone) {
      dispatch(setPhoneRequested({ phone: values.phone }))
    }
    if (values.aboutMe !== initialValues.aboutMe) {
      dispatch(setAboutMeRequested({ aboutMe: values.aboutMe }))
    }
    if (
      values.fullName !== initialValues.fullName ||
      values.birthDate !== initialValues.birthDate ||
      values.seriesAndNumber !== initialValues.seriesAndNumber ||
      values.expireDate !== initialValues.expireDate ||
      values.issueDate !== initialValues.issueDate ||
      values.country !== initialValues.country
    ) {
      dispatch(
        setPassportInfoRequested({
          fullName: values.fullName,
          birthDate: values.birthDate,
          seriesAndNumber: values.seriesAndNumber,
          expireDate: values.expireDate,
          issueDate: values.issueDate,
          country: values.country,
        })
      )
    }
  }

  return (
    <Box mt={{ xs: 4, md: '29px' }}>
      <MainTopActions isReturning />
      {isLarge && (
        <Box mt={6.5}>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator=""
            sx={{
              '& .MuiBreadcrumbs-separator': {
                mx: 4,
              },
            }}
          >
            <Link href="/">
              <Typography color={palette.customColors.bodyInfo} variant="h5">
                {`${t('root')} >`}
              </Typography>
            </Link>
            <Typography color={palette.customColors.bodyInfo} variant="h5">{`${t('account')} >`}</Typography>
          </Breadcrumbs>
        </Box>
      )}

      <Box mt="29px" display="flex">
        {isLarge && (
          <Box maxWidth="247px">
            <LeftMenu />
            <Box width={247}></Box>
          </Box>
        )}
        {accountInfo && token && (
          <Box ml={isLarge ? 28 : 0} mt={{ xs: 15, lg: 2 }} width="100%" mb={35}>
            <Grid container justifyContent={'center'}>
              <Grid item xs={12} mb={9}>
                <Grid container alignItems="center" flexDirection={'column'}>
                  <Box position={'relative'}>
                    <AvatarBox user={accountInfo} size={AvatarBoxSize.Biggest} />
                    <label htmlFor="avatar-file">
                      <Box
                        position="absolute"
                        bottom={0}
                        right={'8px'}
                        sx={{ background: palette.customColors.checkbox, width: 48, height: 48, borderRadius: 16 }}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <AddIcon />
                      </Box>
                    </label>
                    <input
                      onChange={event => {
                        if (event.target.files) {
                          axios
                            .create({
                              baseURL: process.env.API_SERVER_URL,
                              headers: {
                                Accept: 'application/json',
                                'X-Parse-Application-Id': process.env.APP_ID,
                                'Content-Type': event.target.files[0].type,
                                'X-Parse-Session-Token': token,
                              },
                            })
                            .post('files/avatar', event.target.files[0])
                            .then(
                              response => currentUser && dispatch(getAccountRequested({ id: currentUser.objectId }))
                            )
                            .catch(error => console.log('error', error))
                        }
                      }}
                      id="avatar-file"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      style={{
                        opacity: 0,
                        position: 'absolute',
                        zIndex: '-1',
                      }}
                    />
                  </Box>
                  <Box mt={8}>
                    <OwnerRatings user={accountInfo} withAdsCount={false} />
                  </Box>
                </Grid>
              </Grid>
              <Grid item sx={{ maxWidth: 391 }} container>
                <TextField
                  InputProps={{
                    sx: { fontSize: 24, '& > input': { textAlign: 'center', padding: 0 } },
                  }}
                  fullWidth
                  label={''}
                  placeholder=""
                  value={accountInfo.nickName}
                  color="secondary"
                />
                <Grid item container justifyContent="flex-end" mt={2}>
                  <Typography variant="body2" color={palette.customColors.inputHelper} fontWeight={500}>
                    {t('forms:nickname_helper')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <MyAccountUpdateForm onSubmit={onSubmit} initialValues={initialValues} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MyAccountPageWrapper
