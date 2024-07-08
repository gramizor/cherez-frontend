import { axiosClient } from 'src/lib/axios'
import { FindCompanyProfilesState, GetOwnerState, ParamsState, StartChatByIdState } from '@/src/types/redux/ad'

const getAd = (payload: ParamsState) => {
  const { adId } = payload
  const path = 'functions/getAd'
  return axiosClient.post(path, {
    adId,
  })
}

const findCompanyProfiles = (payload: FindCompanyProfilesState) => {
  const { ownerId, category } = payload
  const path = 'functions/findCompanyProfiles'
  return axiosClient.post(path, {
    ownerId,
    category,
  })
}

const getOwner = (payload: GetOwnerState) => {
  const { id } = payload
  const path = `users/${id}`
  return axiosClient.get(path)
}

const startChatByAd = (payload: StartChatByIdState) => {
  const { adId, firstMessageText } = payload
  const path = 'functions/startChatByAd'
  return axiosClient.post(path, {
    adId,
    firstMessageText,
  })
}

export { getAd, startChatByAd, getOwner, findCompanyProfiles }
