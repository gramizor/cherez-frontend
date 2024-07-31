import { adBoostState, createAdPromotionRequestState } from '@/src/types/redux/promotion'
import { axiosClient } from 'src/lib/axios'

const createAdPromotion = (payload: createAdPromotionRequestState) => {
  const { promotionName, tariffDays, paymentMethods } = payload
  const path = 'functions/createAdPromotion'
  return axiosClient.post(path, { promotionName, tariffDays, paymentMethods })
}

const getMyPromotions = () => {
  const path = 'functions/getMyPromotions'
  return axiosClient.post(path)
}
const getMyBoostedAds = () => {
  const path = 'functions/getMyBoostedAds'
  return axiosClient.post(path)
}

const getMyLargeAds = () => {
  const path = 'functions/getMyLargeAds'
  return axiosClient.post(path)
}

const setAdLarge = (payload: adBoostState) => {
  const { adId } = payload
  const path = 'functions/setAdLarge'
  return axiosClient.post(path, { adId })
}

const enableAdBoost = (payload: adBoostState) => {
  const { adId } = payload
  const path = 'functions/enableAdBoost'
  return axiosClient.post(path, { adId })
}

export { createAdPromotion, getMyPromotions, getMyBoostedAds, getMyLargeAds, setAdLarge, enableAdBoost }
