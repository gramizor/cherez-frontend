import { axiosClient } from 'src/lib/axios'
import { LoginProps, SignUpProps } from '@/src/types/structs/login'

const signUpUser = (payload: SignUpProps) => {
  const { email, nickname, password } = payload
  const path = 'users'
  return axiosClient.post(path, { email, username: email, nickName: nickname, password })
}

const loginUser = (payload: LoginProps) => {
  const { email, password } = payload
  const path = 'login'
  return axiosClient.post(path, { username: email, password })
}

const getCurrentUser = () => {
  const path = 'users/me'
  return axiosClient.get(path)
}

const logoutUser = () => {
  const path = 'logout'
  return axiosClient.post(path)
}

export { signUpUser, loginUser, getCurrentUser, logoutUser }
