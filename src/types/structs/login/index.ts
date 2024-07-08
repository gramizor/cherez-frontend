export type LoginProps = {
  email: string
  password: string
}

export type SendCodeProps = {
  code: string
}

export interface SignUpProps extends LoginProps {
  passwordConfirmation: string
  nickname: string
}

export type ForgetPasswordProps = {
  email: string
}
