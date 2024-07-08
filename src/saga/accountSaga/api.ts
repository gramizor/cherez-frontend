import { axiosClient } from 'src/lib/axios'
import { GetAccountAdsState, GetAccountState } from '@/src/types/redux/account'
import {
  MyAccountUpdateAboutMeProps,
  MyAccountUpdatePassportInfoProps,
  MyAccountUpdatePhoneProps,
} from '@/src/types/structs/account'

const getAccount = (payload: GetAccountState) => {
  const { id } = payload
  const path = `users/${id}`
  return axiosClient.get(path)
}

const getAccountAds = (payload: GetAccountAdsState) => {
  const { limit, skip, userId } = payload
  const path = 'functions/findAdsByUser'
  return axiosClient.post(path, {
    skip,
    limit,
    userId,
  })
}

const setPhone = (payload: MyAccountUpdatePhoneProps) => {
  const { phone } = payload
  const path = 'functions/setPhone'
  return axiosClient.post(path, { phone })
}

const setAboutMe = (payload: MyAccountUpdateAboutMeProps) => {
  const { aboutMe } = payload
  const path = 'functions/setAboutMe'
  return axiosClient.post(path, { aboutMe })
}

const setPassportInfo = (payload: MyAccountUpdatePassportInfoProps) => {
  const { fullName, expireDate, issueDate, birthDate, seriesAndNumber, country } = payload
  const path = 'functions/setPassportInfo'
  return axiosClient.post(path, { fullName, expireDate, issueDate, birthDate, seriesAndNumber, country })
}

export { getAccount, getAccountAds, setPhone, setAboutMe, setPassportInfo }
