import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import { Box, Dialog, Grid, IconButton, Paper, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import cancelImage from '@/src/assets/images/common/cancel.svg'
import Image from 'next/image'
import StepLogin from '@/src/components/dialogs/LoginDialog/components/StepLogin'
import StepForgetPassword from '@/src/components/dialogs/LoginDialog/components/StepForgetPassword'
import StepSignUp from '@/src/components/dialogs/LoginDialog/components/StepSignUp'
import StepSendCode from '@/src/components/dialogs/LoginDialog/components/StepSendCode'
import { useDispatch, useSelector } from 'react-redux'
import { getErrorSignUp, getIsSignedIn } from '@/src/redux/selectors/auth'
import toast from 'react-hot-toast'
import { useTranslation } from 'next-i18next'
import { clearError } from '@/src/redux/slices/auth'
import { LoginDialogSteps } from '@/src/enums/login'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />
})

type Props = {
  open: boolean
  handleClose: () => void
}

const LoginDialog = ({ open, handleClose }: Props) => {
  const [step, setStep] = useState<LoginDialogSteps>(LoginDialogSteps.Login)
  const isSignedIn = useSelector(getIsSignedIn)
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const errorSignUp = useSelector(getErrorSignUp)

  useEffect(() => {
    if (isSignedIn) {
      toast.success(t('success_login'), {
        duration: 3000,
      })
      handleClose()
      setStep(LoginDialogSteps.Login)
    }
  }, [isSignedIn])

  useEffect(() => {
    if (errorSignUp !== null) {
      toast.error(errorSignUp, {
        duration: 3000,
      })
      dispatch(clearError())
    }
  }, [dispatch, errorSignUp])

  const goBack = () => {
    handleClose()
    setStep(LoginDialogSteps.Login)
  }

  function getStep() {
    switch (step) {
      case LoginDialogSteps.Login:
        return <StepLogin setStep={setStep} />
      case LoginDialogSteps.ForgetPassword:
        return <StepForgetPassword setStep={setStep} />
      case LoginDialogSteps.SignUp:
        return <StepSignUp setStep={setStep} />
      case LoginDialogSteps.SendCode:
        return <StepSendCode setStep={setStep} />
      default:
        return <StepLogin setStep={setStep} />
    }
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={goBack}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
        },
      }}
      PaperComponent={() => (
        <Box my={20} display="flex" position="relative">
          <Paper sx={{ borderRadius: '51px', minHeight: 680, maxWidth: { xs: 350, md: 455 } }}>
            <Grid
              container
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              pt={18}
              pb={15}
              px={{ xs: 4, md: 12 }}
              sx={{ height: '100%' }}
            >
              {getStep()}
            </Grid>
          </Paper>
          <IconButton
            sx={{
              p: { xs: 0, md: 2 },
              height: 64,
              right: { xs: 16 },
              top: { xs: 16 },
              position: { xs: 'absolute', md: 'static' },
              ml: { xs: 0, md: 3 },
            }}
            onClick={goBack}
          >
            <Image src={cancelImage} alt="cancel" />
          </IconButton>
        </Box>
      )}
    />
  )
}

export default LoginDialog
