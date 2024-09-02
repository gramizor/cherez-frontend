import { axiosClient } from '@/src/lib/axios'
import { adIdPayload, GetMyProAdsPayload, isPublicPayload, SetAdPublicPayload } from '@/src/types/redux/myAds'

const getMyProAds = (payload: GetMyProAdsPayload) => {
  const { skip, limit } = payload
  const path = 'functions/getMyProAds'
  return axiosClient.post(path, { skip, limit })
}

const getMyCommonAds = () => {
  const path = 'functions/getMyCommonAds'
  return axiosClient.post(path)
}

const setAdPublic = (payload: SetAdPublicPayload) => {
  const { adId, isPublic } = payload
  const path = 'functions/setAdPublic'
  return axiosClient.post(path, { adId, isPublic })
}

const setCommonAdsPublic = (payload: isPublicPayload) => {
  const { isPublic } = payload
  const path = 'functions/setCommonAdsPublic'
  return axiosClient.post(path, { isPublic })
}

const setProAdsPublic = (payload: isPublicPayload) => {
  const { isPublic } = payload
  const path = 'functions/setProAdsPublic'
  return axiosClient.post(path, { isPublic })
}

const extendAd = (payload: { adId: string }) => {
  const { adId } = payload
  const path = 'functions/extendAd'
  return axiosClient.post(path, { adId })
}

const deleteAd = (payload: adIdPayload) => {
  const { adId } = payload
  const path = 'functions/deleteAd'
  return axiosClient.post(path, { adId })
}

const getMyProAdsCount = () => {
  const path = 'functions/getMyProAdsCount'
  return axiosClient.post(path)
}

const getIsMyProAdsActive = () => {
  const path = 'functions/isMyProAdsActive'
  return axiosClient.post(path)
}

export {
  getMyProAdsCount,
  getIsMyProAdsActive,
  getMyCommonAds,
  getMyProAds,
  setAdPublic,
  setCommonAdsPublic,
  setProAdsPublic,
  extendAd,
  deleteAd,
}
